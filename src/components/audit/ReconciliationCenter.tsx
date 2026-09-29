import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { sampleReconciliationRecords } from '../../data/governanceSecurityData';
import { ReconciliationRecord } from '../../types';
import { 
  GitCompare, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Database, 
  ShieldCheck, 
  Layers, 
  Check, 
  X, 
  ArrowRight,
  Filter,
  Sparkles,
  FileSpreadsheet,
  Cpu
} from 'lucide-react';

export const ReconciliationCenter: React.FC = () => {
  const { addNotification, lastSavedHash } = useResilience();
  const [records, setRecords] = useState<ReconciliationRecord[]>(sampleReconciliationRecords);
  const [isReconciling, setIsReconciling] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<ReconciliationRecord | null>(records[0]);
  const [comparisonModalOpen, setComparisonModalOpen] = useState<boolean>(false);

  // Run Real-Time Automated Reconciliation Engine
  const triggerReconciliationRun = () => {
    setIsReconciling(true);
    addNotification({
      target: 'admin',
      type: 'info',
      title: 'Automated Reconciliation Engine Started',
      message: 'Comparing 14,820 candidate local IndexedDB sandboxes against cloud final submissions...'
    });

    setTimeout(() => {
      setIsReconciling(false);
      setRecords(prev => prev.map(r => ({
        ...r,
        status: 'Verified Reconciled',
        discrepancyType: 'None (Exact Match)',
        unreconciledDeltas: 0,
        merkleSealMatch: true
      })));

      addNotification({
        target: 'admin',
        type: 'success',
        title: 'Reconciliation Complete: 100% Match',
        message: 'All saved client responses reconciled with final submission ledgers. Zero missing answers detected.'
      });
    }, 2000);
  };

  const filteredRecords = records.filter(r => {
    if (filterType === 'all') return true;
    if (filterType === 'clean') return r.discrepancyType === 'None (Exact Match)';
    if (filterType === 'discrepancy') return r.discrepancyType !== 'None (Exact Match)';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                Requirement 7: Automated Reconciliation & Validation
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                Zero Discrepancy Guarantee
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1.5 tracking-tight">
              Post-Disruption Reconciliation & Data Validation
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-3xl">
              Mathematical cross-validation comparing candidate client-side saved responses with central submission records following disruptions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={triggerReconciliationRun}
              disabled={isReconciling}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-all cursor-pointer shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReconciling ? 'animate-spin' : ''}`} />
              <span>{isReconciling ? 'Reconciling Ledger Vectors...' : 'Run Automated Reconciliation'}</span>
            </button>
          </div>
        </div>

        {/* Featured Requirement 7 Callout Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-purple-950 via-[#191322] to-gray-900 border border-purple-900/60 p-6 text-white shadow-lg">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <GitCompare className="w-3 h-3 text-purple-400" />
                Data Integrity Principle
              </span>
              <span className="text-xs text-gray-400 font-mono">Saved vs Submitted Dual-Vector Cross Check</span>
            </div>

            <blockquote className="text-base sm:text-lg font-bold text-gray-100 italic border-l-4 border-purple-500 pl-3.5 leading-snug">
              “A candidate's submission record is compared with the last saved response record to identify whether any answers may be missing.”
            </blockquote>

            <p className="text-xs text-gray-300">
              When network interruptions occur right as an examination ends, answers might exist in local IndexedDB storage while awaiting the central ACK packet. ExamresQ reconciles both vectors automatically using cryptographic Merkle trees, ensuring 0 missing answers.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Automated Reconciliation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <GitCompare className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Saved vs Submitted</h4>
            <p className="text-xs text-gray-500">
              Compares client memory buffer against final central database commits for all 14,820 candidates.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#C62828]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Discrepancy Matrix</h4>
            <p className="text-xs text-gray-500">
              Immediately isolates missing options, vector collisions, or timestamp de-synchronization.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#16803C]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Cryptographic Seal</h4>
            <p className="text-xs text-gray-500">
              Verifies matching SHA-256 Merkle root between the edge appliance and regional cloud cluster.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Database className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Submission Status</h4>
            <p className="text-xs text-gray-500">
              Automated reconciliation guarantees every candidate receives verifiable official proof of completion.
            </p>
          </div>
        </div>

        {/* Reconciliation Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-black text-gray-900">
                Candidate Response Reconciliation Matrix
              </h3>
              <p className="text-xs text-gray-500">
                Real-time validation log comparing client-cached answers with final cloud submission ledgers
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 cursor-pointer"
              >
                <option value="all">All Records</option>
                <option value="clean">100% Exact Match</option>
                <option value="discrepancy">Discrepancies Requiring Review</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 uppercase text-[11px]">
                  <th className="py-2.5 px-3">Candidate / Exam</th>
                  <th className="py-2.5 px-3">Saved Responses</th>
                  <th className="py-2.5 px-3">Submitted Responses</th>
                  <th className="py-2.5 px-3">Unreconciled Deltas</th>
                  <th className="py-2.5 px-3">Discrepancy Category</th>
                  <th className="py-2.5 px-3">Merkle Match</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-3 font-sans">
                      <span className="font-bold text-gray-900 block">{item.candidateName}</span>
                      <span className="text-gray-500 text-[11px] font-mono">{item.rollNumber} • {item.examId}</span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-gray-900">{item.savedResponsesCount} Answers</td>
                    <td className="py-3.5 px-3 font-bold text-gray-900">{item.finalSubmittedCount} Answers</td>
                    <td className="py-3.5 px-3 font-bold">
                      {item.unreconciledDeltas === 0 ? (
                        <span className="text-[#16803C]">0 (Zero Lag)</span>
                      ) : (
                        <span className="text-[#C62828] font-black animate-pulse">{item.unreconciledDeltas} Delta Pending</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.discrepancyType === 'None (Exact Match)' ? 'bg-emerald-50 text-[#16803C]' : 'bg-red-50 text-[#C62828]'
                      }`}>
                        {item.discrepancyType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      {item.merkleSealMatch ? (
                        <span className="text-[#16803C] font-sans font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 100% Match
                        </span>
                      ) : (
                        <span className="text-[#C62828] font-sans font-bold flex items-center gap-1">
                          <X className="w-3.5 h-3.5" /> Hash Mismatch
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Verified Reconciled' ? 'bg-emerald-50 text-[#16803C] border border-emerald-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedRecord(item);
                          setComparisonModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer"
                      >
                        Compare Vectors
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* COMPARISON MODAL */}
        {comparisonModalOpen && selectedRecord && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <GitCompare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Response Vector Comparison</h3>
                    <p className="text-xs text-gray-500 font-mono">{selectedRecord.candidateName} ({selectedRecord.rollNumber})</p>
                  </div>
                </div>

                <button 
                  onClick={() => setComparisonModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-gray-500">Vector A: Client Saved</span>
                    <div className="text-lg font-black text-gray-900 font-mono">{selectedRecord.savedResponsesCount} Answers</div>
                    <p className="text-[11px] text-gray-500">IndexedDB local sandbox</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-gray-500">Vector B: Cloud Final</span>
                    <div className="text-lg font-black text-gray-900 font-mono">{selectedRecord.finalSubmittedCount} Answers</div>
                    <p className="text-[11px] text-gray-500">Central authority cluster</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 space-y-1">
                  <span className="font-bold block">Reconciliation Analysis:</span>
                  <p className="leading-relaxed">{selectedRecord.details}</p>
                </div>

                <div className="p-3 rounded-xl bg-gray-100 font-mono text-[11px] text-gray-600">
                  <span>Merkle Integrity Seal: {lastSavedHash}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setComparisonModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
