export type SystemHealthStatus = 'healthy' | 'degraded' | 'critical' | 'recovering';

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

