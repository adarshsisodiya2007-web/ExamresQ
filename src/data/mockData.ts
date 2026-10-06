import { AssessmentCentre, ExamQuestion, IncidentRecord, AuditRecord, SystemMetrics } from '../types';

export const initialSystemMetrics: SystemMetrics = {
  activeCandidates: 14820,
  totalCentres: 38,
  onlineCentres: 38,
  systemHealthPercent: 99.4,
  networkHealthPercent: 98.7,
  openIncidentsCount: 1,
  dataLossRate: 0.0,
  meanTimeToDetectSeconds: 1.2,
  meanTimeToRecoverSeconds: 48,
};

export const sampleQuestions: ExamQuestion[] = [
  {
    id: 1,
    subject: "Engineering Mathematics III",
    questionNumber: 1,
    totalQuestions: 25,
    text: "Find the Laplace transform of the piecewise function f(t) = e^(3t) * cos(4t) for t >= 0.",
    options: [
      { id: "A", text: "(s - 3) / ((s - 3)² + 16)" },
      { id: "B", text: "(s + 3) / ((s + 3)² + 16)" },
      { id: "C", text: "4 / ((s - 3)² + 16)" },
      { id: "D", text: "(s - 3) / ((s - 3)² - 16)" }
    ],
    selectedOption: "A"
  },
  {
    id: 14,
    subject: "Engineering Mathematics III",
    questionNumber: 14,
    totalQuestions: 25,
    text: "Given matrix A = [[2, 1], [1, 2]], determine the eigenvalues and corresponding eigenvectors for the transformation system.",
    codeSnippet: "Eigenvalues equation: det(A - λI) = 0 => (2 - λ)² - 1 = 0 => λ = 1, 3",
    options: [
      { id: "A", text: "λ₁ = 1, v₁ = [1, -1]ᵀ;  λ₂ = 3, v₂ = [1, 1]ᵀ" },
      { id: "B", text: "λ₁ = 2, v₁ = [1, 0]ᵀ;   λ₂ = 4, v₂ = [0, 1]ᵀ" },
      { id: "C", text: "λ₁ = 3, v₁ = [1, 1]ᵀ;   λ₂ = -1, v₂ = [1, -1]ᵀ" },
      { id: "D", text: "λ₁ = 1, v₁ = [-1, 1]ᵀ;  λ₂ = 2, v₂ = [1, 2]ᵀ" }
    ],
    selectedOption: "A"
  },
  {
    id: 15,
    subject: "Engineering Mathematics III",
    questionNumber: 15,
    totalQuestions: 25,
    text: "Compute the divergence of the vector field F(x, y, z) = (x²y)i + (y²z)j + (z²x)k at the point P(1, 2, 3).",
    options: [
      { id: "A", text: "div F = 16" },
      { id: "B", text: "div F = 22" },
      { id: "C", text: "div F = 18" },
      { id: "D", text: "div F = 28" }
    ]
  }
];

export const assessmentCentresData: AssessmentCentre[] = [
  {
    id: "centre-08",
    name: "Centre 08 — North Academic Complex",
    city: "New Delhi",
    region: "North Zone",
    status: "recovering",
    totalCandidates: 184,
    activeCandidates: 179,
    networkLatency: 42,
    healthScore: 94.2,
    openIncidents: 1,
    lastSync: "10:42:31",
    ipRange: "192.168.108.0/24",
    edgeGatewayStatus: "failover"
  },
  {
    id: "centre-01",
    name: "Centre 01 — Metro Science Institute",
    city: "Bengaluru",
    region: "South Zone",
    status: "operational",
    totalCandidates: 320,
    activeCandidates: 318,
    networkLatency: 14,
    healthScore: 99.8,
    openIncidents: 0,
    lastSync: "10:43:02",
    ipRange: "192.168.101.0/24",
    edgeGatewayStatus: "online"
  },
  {
    id: "centre-14",
    name: "Centre 14 — Western Polytechnic Hall",
    city: "Mumbai",
    region: "West Zone",
    status: "operational",
    totalCandidates: 250,
    activeCandidates: 246,
    networkLatency: 18,
    healthScore: 99.1,
    openIncidents: 0,
    lastSync: "10:42:58",
    ipRange: "192.168.114.0/24",
    edgeGatewayStatus: "online"
  }
];

export const activeIncidentRecord: IncidentRecord = {
  id: "inc-1042",
  code: "#ET-1042",
  title: "Uplink Latency Spike & Secondary Gateway Failover",
  centreId: "centre-08",
  centreName: "Centre 08 — North Academic Complex",
  time: "10:42:11",
  timestamp: new Date(),
  severity: "medium",
  status: "recovering",
  affectedSessions: 7,
  timeline: [
    {
      time: "10:42:01",
      message: "Automated packet-loss detection alert triggered on WAN Gateway A",
      stage: "detection",
      verified: true
    },
    {
      time: "10:42:03",
      message: "Candidate clients received low-latency offline resilience lock notification",
      stage: "response",
      verified: true
    },
    {
      time: "10:42:05",
      message: "Client-side encrypted IndexedDB storage ledger engaged with SHA-256 seal",
      stage: "response",
      verified: true
    },
    {
      time: "10:43:10",
      message: "Secondary Edge Gateway route switch successful; ping stabilized to 38ms",
      stage: "recovery",
      verified: true
    },
    {
      time: "10:44:02",
      message: "Delta synchronization protocol initiated for 7 candidate buffers",
      stage: "sync",
      verified: true
    },
    {
      time: "10:44:18",
      message: "Zero response packet loss confirmed; Merkle root verified on central audit chain",
      stage: "audit",
      verified: true
    }
  ],
  mitigationSteps: [
    "Automatic zero-loss offline buffering enabled on 7 candidate nodes",
    "Switchover traffic from fiber gateway ISP-A to microwave backhaul ISP-B",
    "Re-verify cryptographic timestamp chain for responses submitted during gap",
    "Candidate timer frozen or extended by +120 seconds resilience tolerance"
  ]
};

export const sampleAuditTrail: AuditRecord = {
  sessionId: "SES-2026-ET-9941",
  candidateName: "Aarav Sharma",
  candidateRoll: "ET-2026-ENG-4418",
  centreId: "Centre 08 (Delhi North)",
  examName: "Engineering Mathematics III — National Assessment 2026",
  totalQuestions: 40,
  answeredCount: 28,
  integrityScore: 100,
  merkleRoot: "0x7f9a842b109e4d58a123fec998144001bc9941",
  lastVerificationTime: "10:44:22 UTC",
  events: [
    {
      timestamp: "10:00:00",
      eventType: "EXAM_STARTED",
      description: "Biometric and workstation check passed; secure container initialized",
      hashSignature: "0x3a9f...89e2",
      status: "info"
    },
    {
      timestamp: "10:24:15",
      eventType: "RESPONSE_SAVED",
      description: "Question 13 saved directly to cloud assessment database (latency 16ms)",
      hashSignature: "0x5b18...99a1",
      status: "success"
    },
    {
      timestamp: "10:42:01",
      eventType: "NETWORK_INTERRUPTED",
      description: "Centre 08 WAN Uplink lost carrier; offline failover engaged",
      hashSignature: "0x892a...f412",
      status: "alert"
    },
    {
      timestamp: "10:42:05",
      eventType: "RESPONSE_PROTECTED",
      description: "Question 14 saved into local encrypted ledger; SHA-256 secured",
      hashSignature: "0x7f9a...842b",
      status: "warning"
    },
    {
      timestamp: "10:44:22",
      eventType: "AUDIT_VERIFIED",
      description: "Merkle tree integrity check passed. 100% mathematical consistency.",
      hashSignature: "0xbc99...41aa",
      status: "success"
    }
  ]
};

export const initialActiveCandidates: import('../types').ActiveCandidateSession[] = [
  {
    id: 'cand-4418',
    rollNo: 'ET-2026-ENG-4418',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    stationId: 'STATION-14',
    centreId: 'centre-08',
    centreName: 'Centre 08 (North Academic Complex)',
    currentQuestion: 14,
    totalQuestions: 25,
    answeredCount: 14,
    markedReviewCount: 1,
    status: 'active',
    connectionLatency: 16,
    strikes: 0,
    faceStatus: 'verified',
    lastSavedTimestamp: '10:44:12',
    lastSyncedTimestamp: '10:44:12',
    pendingOfflineAnswers: 0,
    compensationMinutes: 0,
    ipAddress: '192.168.8.114',
    lastAction: 'Saved Q14 Option A (Safe)',
    merkleHash: '0x7f9a842b109e4d58',
    deviceInfo: 'Terminal 14 • Chrome 124 • Linux EdgeOS',
    isSelf: true
  },
  {
    id: 'cand-4419',
    rollNo: 'ET-2026-ENG-4419',
    name: 'Riya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    stationId: 'STATION-15',
    centreId: 'centre-08',
    centreName: 'Centre 08 (North Academic Complex)',
    currentQuestion: 22,
    totalQuestions: 25,
    answeredCount: 21,
    markedReviewCount: 2,
    status: 'active',
    connectionLatency: 18,
    strikes: 0,
    faceStatus: 'verified',
    lastSavedTimestamp: '10:44:05',
    lastSyncedTimestamp: '10:44:05',
    pendingOfflineAnswers: 0,
    compensationMinutes: 0,
    ipAddress: '192.168.8.115',
    lastAction: 'Saved Q21 Option C (Safe)',
    merkleHash: '0x3a4b912c4488de10',
    deviceInfo: 'Terminal 15 • Chrome 124 • Linux EdgeOS',
    isSelf: false
  },
  {
    id: 'cand-4420',
    rollNo: 'ET-2026-ENG-4420',
    name: 'Kabir Singh',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    stationId: 'STATION-16',
    centreId: 'centre-08',
    centreName: 'Centre 08 (North Academic Complex)',
    currentQuestion: 18,
    totalQuestions: 25,
    answeredCount: 16,
    markedReviewCount: 3,
    status: 'flagged',
    connectionLatency: 480,
    strikes: 1,
    faceStatus: 'looking_away',
    lastSavedTimestamp: '10:43:55',
    lastSyncedTimestamp: '10:42:01',
    pendingOfflineAnswers: 2,
    compensationMinutes: 2,
    ipAddress: '192.168.8.116',
    lastAction: 'Unusual activity detected (Needs Review)',
    merkleHash: '0x918c5e21908bf112',
    deviceInfo: 'Terminal 16 • Chrome 124 • Linux EdgeOS',
    isSelf: false
  }
];

export const initialTelemetryEvents: import('../types').CandidateTelemetryEvent[] = [
  {
    id: 'evt-1',
    candidateId: 'cand-4418',
    candidateName: 'Aarav Sharma',
    rollNo: 'ET-2026-ENG-4418',
    timestamp: '10:44:12',
    type: 'answer_saved',
    message: 'Submitted Option A for Question 14. Activity normal.',
    severity: 'info'
  },
  {
    id: 'evt-2',
    candidateId: 'cand-4419',
    candidateName: 'Riya Patel',
    rollNo: 'ET-2026-ENG-4419',
    timestamp: '10:44:05',
    type: 'answer_saved',
    message: 'Submitted Option C for Question 21. Activity normal.',
    severity: 'info'
  },
  {
    id: 'evt-3',
    candidateId: 'cand-4420',
    candidateName: 'Kabir Singh',
    rollNo: 'ET-2026-ENG-4420',
    timestamp: '10:43:10',
    type: 'strike_issued',
    message: 'Unusual activity detected. Review recommended.',
    severity: 'critical'
  }
];

