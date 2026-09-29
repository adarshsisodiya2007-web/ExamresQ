import { 
  AuditAccessRecord, 
  SuspiciousPatternAlert, 
  ReconciliationRecord, 
  CandidateCommunicationMessage, 
  DecisionSupportRecord, 
  FairnessComparisonItem, 
  StudentGrievanceTicket, 
  PostExamAuditReport 
} from '../types';

// Requirement 5: Secure and Tamper-Evident Storage (Access and Tamper Logs)
export const sampleAuditAccessLogs: AuditAccessRecord[] = [
  {
    id: 'ACC-LOG-8812',
    accessorName: 'Dr. V. K. Raman',
    role: 'Central Auditor',
    action: 'INSPECT_LEDGER',
    targetCandidate: 'ET-2026-ENG-4418 (Adarsh Singh)',
    timestamp: '2026-09-30 02:18:22 IST',
    ipAddress: '10.240.12.8 (Govt VPN)',
    authLevel: 'Read-Only Cryptographic Inspection (Zero-Edit Mode)',
    outcome: 'PERMITTED_READ_ONLY'
  },
  {
    id: 'ACC-LOG-8813',
    accessorName: 'Anonymous IP Attempt',
    role: 'Read-Only Inspector',
    action: 'ATTEMPT_EDIT_REJECTED',
    targetCandidate: 'ET-2026-ENG-4418 (Q14 Response)',
    timestamp: '2026-09-30 02:19:04 IST',
    ipAddress: '192.168.1.104',
    authLevel: 'Unauthorized Mutation Attempt',
    outcome: 'TAMPER_PREVENTED'
  },
  {
    id: 'ACC-LOG-8814',
    accessorName: 'Prof. Ananya Sen',
    role: 'Chief Invigilator',
    action: 'VERIFY_HASH',
    targetCandidate: 'Centre 08 Complete Session Pool',
    timestamp: '2026-09-30 02:20:15 IST',
    ipAddress: '10.240.12.14 (LAN Ring)',
    authLevel: 'Hardware TPM 2.0 Signer',
    outcome: 'AUTHENTICATED'
  },
  {
    id: 'ACC-LOG-8815',
    accessorName: 'Dr. S. K. Mahajan',
    role: 'Security Officer',
    action: 'EXPORT_CERTIFICATE',
    targetCandidate: 'ET-2026-MED-1092 (Priya Sharma)',
    timestamp: '2026-09-30 02:22:40 IST',
    ipAddress: '10.240.12.2',
    authLevel: 'Official Digital Seal Dispenser',
    outcome: 'AUTHENTICATED'
  }
];

// Requirement 6: Intelligent Identification of Suspicious Patterns
export const sampleSuspiciousPatternAlerts: SuspiciousPatternAlert[] = [
  {
    id: 'PAT-ALERT-104',
    candidateId: 'ET-2026-CS-8891',
    candidateName: 'Vikram Malhotra',
    rollNumber: 'ET-2026-8891',
    centreId: 'Centre 08 (North Delhi)',
    category: 'Speed Anomaly (<2s/answer)',
    severity: 'High',
    flaggedAt: '02:14:10 AM',
    confidenceScore: 89,
    evidenceDetails: [
      'Answers for 7 complex differential equations submitted within 9.4 seconds.',
      'Average keystroke pause was 42ms (sub-human cognitive threshold).',
      'Option telemetry indicates automated browser scripting or clipboard paste injection.'
    ],
    status: 'Flagged for Review',
    reviewedBy: 'Under Examination Official Queue'
  },
  {
    id: 'PAT-ALERT-105',
    candidateId: 'ET-2026-EC-3312',
    candidateName: 'Rohan Gupta',
    rollNumber: 'ET-2026-3312',
    centreId: 'Centre 14 (Bengaluru Tech Park)',
    category: 'Repeated Abnormal Login',
    severity: 'Medium',
    flaggedAt: '02:11:45 AM',
    confidenceScore: 74,
    evidenceDetails: [
      '3 session authentication handshakes detected within 45 seconds from alternating subnets.',
      'Primary Workstation MAC 00:1A:2B:3C:4D:5E; Secondary IP originated from proxy gateway.',
      'Evidence flags possible session token cloning.'
    ],
    status: 'Under Investigation',
    reviewedBy: 'Prof. Ananya Sen'
  },
  {
    id: 'PAT-ALERT-106',
    candidateId: 'ET-2026-ENG-4418',
    candidateName: 'Adarsh Singh',
    rollNumber: 'ET-2026-4418',
    centreId: 'Centre 08 (North Delhi)',
    category: 'Rapid IP Hop',
    severity: 'Low',
    flaggedAt: '01:58:30 AM',
    confidenceScore: 48,
    evidenceDetails: [
      'IP shifted from 10.0.8.42 to 10.0.8.99 during secondary microwave WAN failover.',
      'Edge gateway confirmed legitimate automated network route migration.'
    ],
    status: 'Cleared (Legitimate)',
    reviewedBy: 'Dr. V. K. Raman',
    reviewRemarks: 'Legitimate edge gateway carrier failover during simulated carrier drop. Candidate session integrity validated.'
  }
];

// Requirement 7: Automated Reconciliation and Validation
export const sampleReconciliationRecords: ReconciliationRecord[] = [
  {
    id: 'REC-2026-001',
    candidateId: 'ET-2026-ENG-4418',
    candidateName: 'Adarsh Singh',
    rollNumber: 'ET-2026-4418',
    examId: 'ENG-304 (Maths III)',
    savedResponsesCount: 40,
    finalSubmittedCount: 40,
    unreconciledDeltas: 0,
    discrepancyType: 'None (Exact Match)',
    details: 'All 40 client IndexedDB responses match central Merkle tree root. Zero discrepancies.',
    merkleSealMatch: true,
    status: 'Verified Reconciled'
  },
  {
    id: 'REC-2026-002',
    candidateId: 'ET-2026-MED-1092',
    candidateName: 'Priya Sharma',
    rollNumber: 'ET-2026-1092',
    examId: 'MED-102 (Human Anatomy)',
    savedResponsesCount: 38,
    finalSubmittedCount: 38,
    unreconciledDeltas: 0,
    discrepancyType: 'None (Exact Match)',
    details: 'Buffered delta stream synchronized successfully upon edge gateway resumption.',
    merkleSealMatch: true,
    status: 'Verified Reconciled'
  },
  {
    id: 'REC-2026-003',
    candidateId: 'ET-2026-CS-9912',
    candidateName: 'Tanvi Nair',
    rollNumber: 'ET-2026-9912',
    examId: 'CS-401 (Algorithms)',
    savedResponsesCount: 35,
    finalSubmittedCount: 34,
    unreconciledDeltas: 1,
    discrepancyType: 'Missing Answer',
    details: 'Local cache contains Q35 answer buffered during uplink sever; cloud submission ack timed out.',
    merkleSealMatch: false,
    status: 'Discrepancy Pending Review'
  }
];

// Requirement 8: Candidate Communication and Real-Time Status Updates
export const sampleCandidateBroadcastHistory: CandidateCommunicationMessage[] = [
  {
    id: 'MSG-CAND-01',
    timestamp: '02:04:12 AM',
    sessionState: 'Connected',
    title: 'Examination Paper Initialized',
    instruction: 'Exam paper ENG-304 loaded. Periodic auto-save heartbeat is active every 3 seconds.',
    isPaused: false,
    deliveryChannel: 'On-Screen Banner',
    acknowledged: true
  },
  {
    id: 'MSG-CAND-02',
    timestamp: '02:18:02 AM',
    sessionState: 'Interrupted',
    title: 'Temporary Network Outage Detected',
    instruction: 'Please remain seated and calm. Your responses are encrypted and safely locked in client memory. The exam timer is paused.',
    isPaused: true,
    deliveryChannel: 'On-Screen Banner',
    acknowledged: true
  },
  {
    id: 'MSG-CAND-03',
    timestamp: '02:19:15 AM',
    sessionState: 'Recovering',
    title: 'Secondary Route Authenticated',
    instruction: 'Network handshake restored. Synchronizing buffered responses with the central examination ledger...',
    isPaused: true,
    deliveryChannel: 'On-Screen Banner',
    acknowledged: true
  },
  {
    id: 'MSG-CAND-04',
    timestamp: '02:20:05 AM',
    sessionState: 'Resumed',
    title: 'Examination Resumed (Time Compensated)',
    instruction: 'Session resumed at Question 14. +120 seconds compensatory time added to your clock. 0 seconds of exam time lost.',
    isPaused: false,
    deliveryChannel: 'On-Screen Banner',
    acknowledged: true
  }
];

// Requirement 9: Decision Support for Rescheduling or Re-Conducting Exams
export const sampleDecisionSupportRecords: DecisionSupportRecord[] = [
  {
    id: 'DEC-SUP-2026-01',
    incidentId: '#ET-1042',
    centreId: 'centre-08',
    centreName: 'Centre 08 - North Delhi Technical Campus',
    affectedCandidates: 420,
    incidentDurationMinutes: 4.2,
    responseRecoveryPercent: 100.0,
    systemRecommendation: 'Extend',
    confidenceScore: 98,
    authorityDecision: 'Extend',
    decisionRationale: 'Complete 100% data recovery verified via Merkle root. Interruption lasted under 5 minutes. Adding standardized +312s compensatory time enables fair completion without rescheduling.',
    authorizedOfficial: 'Dr. R. C. Varma (Chairman, Central Examination Authority)',
    authorizedAt: '2026-09-30 02:22:10 IST',
    status: 'Approved & Executed'
  },
  {
    id: 'DEC-SUP-2026-02',
    incidentId: '#ET-1049',
    centreId: 'centre-22',
    centreName: 'Centre 22 - Jaipur Engineering Institute',
    affectedCandidates: 68,
    incidentDurationMinutes: 38.5,
    responseRecoveryPercent: 94.2,
    systemRecommendation: 'Reschedule',
    confidenceScore: 92,
    authorityDecision: 'Reschedule',
    decisionRationale: 'Transformer failure exceeded edge battery endurance. Over 35 minutes outage created cognitive disruption. Automated priority re-scheduling within 48h approved under Zero-Penalty Policy.',
    authorizedOfficial: 'Smt. Gayatri Devi (Controller of Examinations)',
    authorizedAt: '2026-09-30 02:23:45 IST',
    status: 'Approved & Executed'
  }
];

// Requirement 10: Fairness and Consistency During Disruptions
export const sampleFairnessComparisons: FairnessComparisonItem[] = [
  {
    id: 'FAIR-CMP-01',
    incidentGroup: 'Centre 08 WAN Outage Group #A',
    candidateA: {
      name: 'Adarsh Singh',
      roll: 'ET-2026-4418',
      interruptionSeconds: 142,
      compensationGrantedSeconds: 202 // 142 + 60s buffer
    },
    candidateB: {
      name: 'Kavita Rawat',
      roll: 'ET-2026-4419',
      interruptionSeconds: 142,
      compensationGrantedSeconds: 202 // Exactly identical formula
    },
    parityScore: 100,
    policyCompliance: true,
    standardFormula: 'Compensation = Outage Duration (142s) + 60s Stabilization Buffer = 202s'
  },
  {
    id: 'FAIR-CMP-02',
    incidentGroup: 'Centre 14 Power Trip Group #C',
    candidateA: {
      name: 'Priya Sharma',
      roll: 'ET-2026-1092',
      interruptionSeconds: 65,
      compensationGrantedSeconds: 125
    },
    candidateB: {
      name: 'Aman Joshi',
      roll: 'ET-2026-1093',
      interruptionSeconds: 65,
      compensationGrantedSeconds: 125
    },
    parityScore: 100,
    policyCompliance: true,
    standardFormula: 'Compensation = Outage Duration (65s) + 60s Stabilization Buffer = 125s'
  }
];

export const sampleStudentGrievanceTickets: StudentGrievanceTicket[] = [
  {
    ticketId: 'GRV-2026-891',
    candidateName: 'Adarsh Singh',
    rollNumber: 'ET-2026-4418',
    centreName: 'Centre 08 (North Delhi)',
    incidentTime: '02:18 AM IST',
    claimedLossMinutes: 2.5,
    automatedCompensationMinutes: 3.3,
    grievanceReason: 'Candidate requested audit confirmation that Question 14 answer was preserved.',
    status: 'Resolved - Extra Buffer Granted',
    resolvedBy: 'Automated Parity Engine (Verified +202s credited)'
  },
  {
    ticketId: 'GRV-2026-892',
    candidateName: 'Harsh Vardhan',
    rollNumber: 'ET-2026-5510',
    centreName: 'Centre 08 (North Delhi)',
    incidentTime: '02:19 AM IST',
    claimedLossMinutes: 1.0,
    automatedCompensationMinutes: 2.0,
    grievanceReason: 'Question palette showed offline warning during failover.',
    status: 'Resolved - Extra Buffer Granted',
    resolvedBy: 'Chief Proctor Office'
  }
];

// Requirement 11: Post-Examination Audit Trail and Evidence-Based Reporting
export const samplePostExamAuditReport: PostExamAuditReport = {
  reportId: 'AUD-REP-2026-ET-FINAL',
  examId: 'PAPER-ENG-304-2026',
  totalCandidates: 14820,
  totalCentres: 38,
  reconciliationRate: 100.0,
  totalDisruptionsLogged: 1,
  averageMTTD: '1.2s',
  averageMTTR: '48.0s',
  dataLossRate: '0.00%',
  executiveClosureStatus: 'Formally Certified & Sealed',
  generatedAt: '2026-09-30 02:24:00 IST',
  merkleArchiveRoot: '0x3f9a882e4b109e4d5881a4b9c1042ef3a992bc104fa28912ef3841097cb1012a'
};
