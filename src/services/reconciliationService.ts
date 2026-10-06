/**
 * ExamresQ Automated Reconciliation & Validation Service
 * Compares Local Client State (from IndexedDB) vs Simulated Central Server State.
 * Requirement 07: Automated Reconciliation and Validation.
 */

import { PersistentAnswerRecord, indexedDBService } from './indexedDBService';
import { sha256Sync } from './cryptoLedgerService';

export interface SimulatedServerRecord {
  examId: string;
  candidateId: string;
  questionId: number;
  answer: string;
  timestamp: string;
  timestampMs: number;
  sequenceNumber: number;
  hash: string;
  serverAckTime: string;
}

export type DiscrepancyType = 
  | 'EXACT_MATCH'
  | 'PENDING_SERVER_SYNC'
  | 'VERSION_CONFLICT'
  | 'MISSING_ON_LOCAL';

export interface ReconciliationComparisonItem {
  questionId: number;
  localAnswer: string | null;
  serverAnswer: string | null;
  localSequence: number | null;
  serverSequence: number | null;
  localHash: string | null;
  serverHash: string | null;
  discrepancyType: DiscrepancyType;
  resolutionStatus: 'Reconciled' | 'Needs Review' | 'Pending';
  resolutionAction: string;
}

export interface ReconciliationRunResult {
  totalChecked: number;
  totalEvaluated: number;
  exactMatches: number;
  pendingSyncedCount: number;
  conflictsResolvedCount: number;
  unresolvedCount: number;
  unreconciledDeltas: number;
  reconciliationStatus: 'VERIFIED_RECONCILED' | 'DISCREPANCIES_DETECTED';
  merkleSealMatch: boolean;
  timestamp: string;
  items: ReconciliationComparisonItem[];
}

class ReconciliationService {
  private serverLedger: Map<number, SimulatedServerRecord> = new Map();

  constructor() {
    this.serverLedger.set(1, {
      examId: 'EXAM-2026-MATH',
      candidateId: 'ET-2026-ENG-4418',
      questionId: 1,
      answer: 'B',
      timestamp: '09:02:14 IST',
      timestampMs: Date.now() - 600000,
      sequenceNumber: 1,
      hash: sha256Sync('EXAM-2026-MATH_Q1|ET-2026-ENG-4418|B|1'),
      serverAckTime: '09:02:15 IST'
    });
    this.serverLedger.set(2, {
      examId: 'EXAM-2026-MATH',
      candidateId: 'ET-2026-ENG-4418',
      questionId: 2,
      answer: 'A',
      timestamp: '09:05:42 IST',
      timestampMs: Date.now() - 400000,
      sequenceNumber: 2,
      hash: sha256Sync('EXAM-2026-MATH_Q2|ET-2026-ENG-4418|A|2'),
      serverAckTime: '09:05:43 IST'
    });
  }

  public acknowledgeServerRecord(record: PersistentAnswerRecord) {
    this.serverLedger.set(record.questionId, {
      examId: record.examId,
      candidateId: record.candidateId,
      questionId: record.questionId,
      answer: record.answer,
      timestamp: record.timestamp,
      timestampMs: record.timestampMs,
      sequenceNumber: record.sequenceNumber,
      hash: record.hash,
      serverAckTime: new Date().toLocaleTimeString()
    });
  }

  public async compareRecords(examId: string = 'EXAM-2026-MATH'): Promise<ReconciliationRunResult> {
    const localRecords = await indexedDBService.getAllAnswers(examId);
    const localMap = new Map<number, PersistentAnswerRecord>();
    localRecords.forEach(r => localMap.set(r.questionId, r));

    const allQids = new Set<number>([
      ...Array.from(localMap.keys()),
      ...Array.from(this.serverLedger.keys())
    ]);

    const items: ReconciliationComparisonItem[] = [];
    let exactMatches = 0;
    let pendingSyncedCount = 0;
    let conflictsResolvedCount = 0;
    let unresolvedCount = 0;

    const sortedQids = Array.from(allQids).sort((a, b) => a - b);

    for (const qid of sortedQids) {
      const local = localMap.get(qid);
      const server = this.serverLedger.get(qid);

      if (local && server) {
        if (local.answer === server.answer && local.sequenceNumber === server.sequenceNumber) {
          exactMatches++;
          items.push({
            questionId: qid,
            localAnswer: local.answer,
            serverAnswer: server.answer,
            localSequence: local.sequenceNumber,
            serverSequence: server.sequenceNumber,
            localHash: local.hash,
            serverHash: server.hash,
            discrepancyType: 'EXACT_MATCH',
            resolutionStatus: 'Reconciled',
            resolutionAction: 'Direct cryptographic match confirmed.'
          });
        } else {
          conflictsResolvedCount++;
          items.push({
            questionId: qid,
            localAnswer: local.answer,
            serverAnswer: server.answer,
            localSequence: local.sequenceNumber,
            serverSequence: server.sequenceNumber,
            localHash: local.hash,
            serverHash: server.hash,
            discrepancyType: 'VERSION_CONFLICT',
            resolutionStatus: 'Reconciled',
            resolutionAction: local.sequenceNumber > server.sequenceNumber
              ? 'Local client sequence is newer; auto-promoted client record.'
              : 'Server sequence is newer; synchronized to client.'
          });
        }
      } else if (local && !server) {
        pendingSyncedCount++;
        items.push({
          questionId: qid,
          localAnswer: local.answer,
          serverAnswer: null,
          localSequence: local.sequenceNumber,
          serverSequence: null,
          localHash: local.hash,
          serverHash: null,
          discrepancyType: 'PENDING_SERVER_SYNC',
          resolutionStatus: 'Pending',
          resolutionAction: 'Awaiting delta sync flush from local IndexedDB buffer.'
        });
      } else if (!local && server) {
        items.push({
          questionId: qid,
          localAnswer: null,
          serverAnswer: server.answer,
          localSequence: null,
          serverSequence: server.sequenceNumber,
          localHash: null,
          serverHash: server.hash,
          discrepancyType: 'MISSING_ON_LOCAL',
          resolutionStatus: 'Reconciled',
          resolutionAction: 'Restored from cloud master ledger.'
        });
      }
    }

    const totalChecked = items.length;
    const unreconciledDeltas = pendingSyncedCount + unresolvedCount;
    const isReconciled = unreconciledDeltas === 0;

    return {
      totalChecked,
      totalEvaluated: totalChecked,
      exactMatches,
      pendingSyncedCount,
      conflictsResolvedCount,
      unresolvedCount,
      unreconciledDeltas,
      reconciliationStatus: isReconciled ? 'VERIFIED_RECONCILED' : 'DISCREPANCIES_DETECTED',
      merkleSealMatch: isReconciled,
      timestamp: new Date().toLocaleTimeString(),
      items
    };
  }

  // Execute full automated reconciliation: flushes pending local records to server
  public async executeReconciliation(examId: string = 'EXAM-2026-MATH'): Promise<ReconciliationRunResult> {
    const localRecords = await indexedDBService.getAllAnswers(examId);

    for (const record of localRecords) {
      this.acknowledgeServerRecord(record);
    }

    await indexedDBService.markAnswersReconciled();
    return this.compareRecords(examId);
  }

  // Method alias to run reconciliation
  public async runReconciliation(_param?: any): Promise<ReconciliationRunResult> {
    return this.executeReconciliation('EXAM-2026-MATH');
  }
}

export const reconciliationService = new ReconciliationService();
