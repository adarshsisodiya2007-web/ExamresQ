export type SystemHealthStatus = 'healthy' | 'degraded' | 'critical' | 'recovering';

export type UserRole = 'student' | 'officer';

export interface ActiveCandidateSession {
  id: string;
  rollNo: string;
  name: string;
  avatar: string;
  stationId: string;
  centreId: string;
  centreName: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  markedReviewCount: number;
  status: 'active' | 'offline_buffering' | 'flagged' | 'submitted';
  connectionLatency: number; // ms
  strikes: number;
  faceStatus: 'verified' | 'multiple_faces' | 'no_face' | 'looking_away';
  lastSavedTimestamp: string;
  lastSyncedTimestamp: string;
  pendingOfflineAnswers: number;
  compensationMinutes: number;
  ipAddress: string;
  lastAction: string;
  merkleHash: string;
  deviceInfo: string;
  isSelf?: boolean;
  lastFrameDataUrl?: string;
  aadharCard?: string;
  phoneNumber?: string;
  remoteMediaStream?: any;
  motionScore?: number;
  isMotionAlert?: boolean;
  audioLevel?: number;
  isAudioAlert?: boolean;
  audioAlertReason?: string;
  isTerminated?: boolean;
  terminationReason?: string;
  attendance?: {
    present: boolean;
    aadharVerified: boolean;
    photoVerified: boolean;
    roughSheetIssued: boolean;
  };
}

export type HelpRequestType = 'rough_paper' | 'water' | 'tech_issue' | 'invigilator';

export interface StudentHelpRequest {
  id: string;
  candidateId: string;
  candidateName: string;
  stationId: string;
  type: HelpRequestType;
  requestType?: HelpRequestType;
  title: string;
  titleHi: string;
  timestamp: string;
  status: 'pending' | 'resolved';
}

export interface CandidateAttendanceRecord {
  candidateId: string;
  present: boolean;
  aadharVerified: boolean;
  photoVerified: boolean;
  roughSheetIssued: boolean;
  verificationNotes?: string;
  timestamp?: string;
}

export interface SubmissionReceipt {
  receiptId: string;
  candidateName: string;
  rollNo: string;
  aadharCard: string;
  stationId: string;
  centreName: string;
  examName: string;
  totalQuestions: number;
  answeredCount: number;
  markedReviewCount: number;
  submittedAt: string;
  securityHash: string;
  integrityScore: number;
}

export interface CandidateTelemetryEvent {
  id: string;
  candidateId: string;
  candidateName: string;
  rollNo: string;
  timestamp: string;
  type: 'answer_saved' | 'offline_buffer' | 'strike_issued' | 'tab_switched' | 'reconnected' | 'compensation_granted' | 'warning_sent' | 'motion_detected' | 'help_requested';
  message: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
}

export type DemoStep = 
  | 1 // Normal Operation
  | 2 // Network Failure
  | 3 // Incident Detection
  | 4 // Response Protection
  | 5 // Recovery
  | 6 // Synchronization
  | 7; // Audit Verification

export type CandidateNetworkStatus = 'connected' | 'interrupted' | 'reconnecting' | 'synchronized';

export interface ExamQuestion {
  id: number;
  subject: string;
  questionNumber: number;
  totalQuestions: number;
  text: string;
  codeSnippet?: string;
  options: { id: string; text: string }[];
  selectedOption?: string;
  markedForReview?: boolean;
}

export interface ProtectedResponse {
  questionId: number;
  selectedOption: string;
  timestamp: string;
  localHash: string;
  status: 'saved_cloud' | 'protected_locally' | 'syncing' | 'verified';
  deltaPayloadSize: string;
}

export interface AssessmentCentre {
  id: string;
  name: string;
  city: string;
  region: string;
  status: 'operational' | 'attention' | 'incident' | 'recovering';
  totalCandidates: number;
  activeCandidates: number;
  networkLatency: number; // ms
  healthScore: number; // %
  openIncidents: number;
  lastSync: string;
  ipRange: string;
  edgeGatewayStatus: 'online' | 'degraded' | 'failover';
  // Requirement 2: Early Detection & Predictive Risk Fields
  riskCategory?: 'low' | 'moderate' | 'high' | 'critical';
  stabilityScore?: number; // 0 - 100%
  repeatedDisconnections?: number; // count in last 60 mins
  predictedDisruptionProbability?: number; // % chance of disruption before next session
  packetLossPercent?: number;
  jitterMs?: number;
  observedIndicators?: string[];
  preventiveRecommendations?: string[];
  warningNoticeIssued?: boolean;
}

export type IncidentCategory = 
  | 'Network Failure' 
  | 'Server Failure' 
  | 'Session Interruption' 
  | 'Data Mismatch' 
  | 'Security Alert';

export interface IncidentRecord {
  id: string;
  code: string; // e.g. #ET-1042
  title: string;
  category?: IncidentCategory;
  centreId: string;
  centreName: string;
  time: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detecting' | 'protecting' | 'recovering' | 'synchronized' | 'resolved';
  escalationTarget?: 'Centre Supervisor' | 'Central Examination Authority' | 'Both';
  escalationStatus?: 'dispatched' | 'acknowledged' | 'in_progress' | 'resolved';
  resolutionStage?: 'detected' | 'classified' | 'escalated' | 'mitigating' | 'resolved';
  affectedSessions: number;
  timeline: {
    time: string;
    message: string;
    stage: 'detection' | 'response' | 'recovery' | 'sync' | 'audit';
    verified: boolean;
  }[];
  mitigationSteps: string[];
}

export interface AuditRecord {
  sessionId: string;
  candidateName: string;
  candidateRoll: string;
  centreId: string;
  examName: string;
  totalQuestions: number;
  answeredCount: number;
  integrityScore: number;
  merkleRoot: string;
  lastVerificationTime: string;
  events: {
    timestamp: string;
    eventType: 'EXAM_STARTED' | 'RESPONSE_SAVED' | 'NETWORK_INTERRUPTED' | 'RESPONSE_PROTECTED' | 'FAILOVER_ENGAGED' | 'NETWORK_RESTORED' | 'DELTA_SYNCED' | 'EXAM_SUBMITTED' | 'AUDIT_VERIFIED';
    description: string;
    hashSignature: string;
    status: 'success' | 'warning' | 'alert' | 'info';
  }[];
}

export interface SystemMetrics {
  activeCandidates: number;
  totalCentres: number;
  onlineCentres: number;
  systemHealthPercent: number;
  networkHealthPercent: number;
  openIncidentsCount: number;
  dataLossRate: number; // should be 0.00%
  meanTimeToDetectSeconds: number; // 1.2s
  meanTimeToRecoverSeconds: number; // 48s
}

// Requirement 4: Backup & Disaster Recovery Architecture Types
export interface BackupTierConfig {
  id: string;
  name: string;
  layer: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';
  storageTech: string;
  syncLatency: string;
  redundancyLevel: string;
  capacityUsed: string;
  status: 'operational' | 'syncing' | 'standby' | 'failover';
  encryption: string;
  immutable: boolean;
  description: string;
}

export interface ControlledResumeRecord {
  candidateId: string;
  candidateName: string;
  rollNumber: string;
  lastQuestionIndex: number;
  lastSavedOption: string;
  interruptionDurationSeconds: number;
  compensatoryTimeSeconds: number;
  proctorToken: string;
  proctorName: string;
  integrityVerified: boolean;
  status: 'pending' | 'authorized' | 'resumed' | 'evacuated';
}

export interface DisasterFallbackRecord {
  salvageId: string;
  candidateName: string;
  rollNumber: string;
  affectedSubject: string;
  reason: string;
  encryptedBlobHash: string;
  rescheduledSlot: string;
  academicGuaranteeCertificateId: string;
  notifiedAt: string;
  status: 'evacuated' | 'rebooked' | 'certified';
}

// Requirement 5: Secure & Tamper-Evident Storage
export interface AuditAccessRecord {
  id: string;
  accessorName: string;
  role: 'Central Auditor' | 'Chief Invigilator' | 'Security Officer' | 'Read-Only Inspector';
  action: 'INSPECT_LEDGER' | 'VERIFY_HASH' | 'EXPORT_CERTIFICATE' | 'ATTEMPT_EDIT_REJECTED' | 'PAYLOAD_MUTATED_TEST' | 'HASH_CHAIN_RESTORED' | string;
  targetCandidate: string;
  timestamp: string;
  ipAddress: string;
  authLevel: string;
  outcome: 'PERMITTED_READ_ONLY' | 'TAMPER_PREVENTED' | 'AUTHENTICATED' | 'MUTATION_RECORDED' | 'RECOVERED_100%' | string;
}

// Requirement 6: Intelligent Identification of Suspicious Patterns
export interface SuspiciousPatternAlert {
  id: string;
  candidateId: string;
  candidateName: string;
  rollNumber: string;
  centreId: string;
  category: 'Unusual Keystroke Cadence' | 'Speed Anomaly (<2s/answer)' | 'Rapid IP Hop' | 'Repeated Abnormal Login' | 'Concurrent Session Breach';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  flaggedAt: string;
  confidenceScore: number; // 0 - 100%
  evidenceDetails: string[];
  status: 'Flagged for Review' | 'Under Investigation' | 'Cleared (Legitimate)' | 'Sanction Recommended';
  reviewedBy?: string;
  reviewRemarks?: string;
}

// Requirement 7: Automated Reconciliation and Validation
export interface ReconciliationRecord {
  id: string;
  candidateId: string;
  candidateName: string;
  rollNumber: string;
  examId: string;
  savedResponsesCount: number;
  finalSubmittedCount: number;
  unreconciledDeltas: number;
  discrepancyType: 'None (Exact Match)' | 'Missing Answer' | 'Option Conflict' | 'Timestamp Mismatch';
  details: string;
  merkleSealMatch: boolean;
  status: 'Verified Reconciled' | 'Discrepancy Pending Review' | 'Manually Overridden';
}

// Requirement 8: Candidate Communication and Real-Time Status
export interface CandidateCommunicationMessage {
  id: string;
  timestamp: string;
  sessionState: 'Connected' | 'Interrupted' | 'Recovering' | 'Resumed';
  title: string;
  instruction: string;
  isPaused: boolean;
  deliveryChannel: 'On-Screen Banner' | 'Auditory Prompt' | 'SMS Backup';
  acknowledged: boolean;
}

// Requirement 9: Decision Support for Rescheduling or Re-Conducting Exams
export interface DecisionSupportRecord {
  id: string;
  incidentId: string;
  centreId: string;
  centreName: string;
  affectedCandidates: number;
  incidentDurationMinutes: number;
  responseRecoveryPercent: number;
  systemRecommendation: 'Resume' | 'Extend' | 'Pause' | 'Reschedule' | 'Re-Conduct';
  confidenceScore: number;
  authorityDecision?: 'Resume' | 'Extend' | 'Pause' | 'Reschedule' | 'Re-Conduct';
  decisionRationale?: string;
  authorizedOfficial?: string;
  authorizedAt?: string;
  status: 'Pending Authority Decision' | 'Approved & Executed' | 'Overridden';
}

// Requirement 10: Fairness and Consistency During Disruptions
export interface FairnessComparisonItem {
  id: string;
  incidentGroup: string;
  candidateA: {
    name: string;
    roll: string;
    interruptionSeconds: number;
    compensationGrantedSeconds: number;
  };
  candidateB: {
    name: string;
    roll: string;
    interruptionSeconds: number;
    compensationGrantedSeconds: number;
  };
  parityScore: number; // 100% means equal treatment
  policyCompliance: boolean;
  standardFormula: string;
}

export interface StudentGrievanceTicket {
  ticketId: string;
  candidateName: string;
  rollNumber: string;
  centreName: string;
  incidentTime: string;
  claimedLossMinutes: number;
  automatedCompensationMinutes: number;
  grievanceReason: string;
  status: 'Submitted' | 'Under Official Review' | 'Resolved - Extra Buffer Granted' | 'Dismissed with Evidence';
  resolvedBy?: string;
}

// Requirement 11: Post-Examination Audit Trail and Evidence-Based Reporting
export interface PostExamAuditReport {
  reportId: string;
  examId: string;
  totalCandidates: number;
  totalCentres: number;
  reconciliationRate: number; // 100%
  totalDisruptionsLogged: number;
  averageMTTD: string;
  averageMTTR: string;
  dataLossRate: string; // 0.00%
  executiveClosureStatus: 'Formally Certified & Sealed' | 'In Audit Review';
  generatedAt: string;
  merkleArchiveRoot: string;
}

export type LuxuryThemeId = 'imperial_crimson' | 'obsidian_noir' | 'swiss_platinum' | 'sovereign_gold';

export interface LuxuryTheme {
  id: LuxuryThemeId;
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  bg: string;
  cardBg: string;
  text: string;
  isDark: boolean;
  accentBadge: string;
  description: string;
  swatchGradient: string;
}

