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
    totalQuestions: 40,
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
    totalQuestions: 40,
    text: "Given the matrix A = [[2, 1], [1, 2]], determine the eigenvalues and corresponding eigenvectors for the linear transformation system.",
    codeSnippet: "Eigenvalues equation: det(A - λI) = 0\n(2 - λ)² - 1 = 0 => λ² - 4λ + 3 = 0",
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
    totalQuestions: 40,
    text: "Compute the divergence of the vector field F(x, y, z) = (x²y)i + (y²z)j + (z²x)k at the evaluation point P(1, 2, 3).",
    options: [
      { id: "A", text: "div F = 16" },
      { id: "B", text: "div F = 22" },
      { id: "C", text: "div F = 18" },
      { id: "D", text: "div F = 28" }
    ]
  },
  {
    id: 16,
    subject: "Engineering Mathematics III",
    questionNumber: 16,
    totalQuestions: 40,
    text: "Evaluate the contour integral ∮_C (z² + 1)/(z² - 1) dz where C is the circle |z - 1| = 1 oriented counter-clockwise.",
    options: [
      { id: "A", text: "2πi" },
      { id: "B", text: "4πi" },
      { id: "C", text: "0" },
      { id: "D", text: "-2πi" }
    ]
  },
  {
    id: 17,
    subject: "Engineering Mathematics III",
    questionNumber: 17,
    totalQuestions: 40,
    text: "Which of the following Fourier series properties guarantees uniform convergence for continuous periodic functions?",
    options: [
      { id: "A", text: "Dirichlet Conditions with piecewise smooth derivative" },
      { id: "B", text: "Parseval's Identity only" },
      { id: "C", text: "Gibbs Phenomenon threshold" },
      { id: "D", text: "Bessel's inequality" }
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
  },
  {
    id: "centre-22",
    name: "Centre 22 — National Technology Campus",
    city: "Hyderabad",
    region: "South Zone",
    status: "operational",
    totalCandidates: 410,
    activeCandidates: 408,
    networkLatency: 16,
    healthScore: 99.5,
    openIncidents: 0,
    lastSync: "10:43:04",
    ipRange: "192.168.122.0/24",
    edgeGatewayStatus: "online"
  },
  {
    id: "centre-31",
    name: "Centre 31 — Eastern Engineering Academy",
    city: "Kolkata",
    region: "East Zone",
    status: "operational",
    totalCandidates: 195,
    activeCandidates: 194,
    networkLatency: 22,
    healthScore: 98.9,
    openIncidents: 0,
    lastSync: "10:42:49",
    ipRange: "192.168.131.0/24",
    edgeGatewayStatus: "online"
  },
  {
    id: "centre-19",
    name: "Centre 19 — Central Apex Test Centre",
    city: "Bhopal",
    region: "Central Zone",
    status: "operational",
    totalCandidates: 220,
    activeCandidates: 217,
    networkLatency: 20,
    healthScore: 98.4,
    openIncidents: 0,
    lastSync: "10:42:55",
    ipRange: "192.168.119.0/24",
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
  candidateName: "Adarsh Singh",
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
      description: "Biometric and workstation environment check passed; secure container initialized",
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
      description: "Centre 08 WAN Uplink lost carrier signal; keep-alive ping failed",
      hashSignature: "0x892a...f412",
      status: "alert"
    },
    {
      timestamp: "10:42:05",
      eventType: "RESPONSE_PROTECTED",
      description: "Question 14 saved into local encrypted cryptographic ledger; signature secured",
      hashSignature: "0x7f9a...842b",
      status: "warning"
    },
    {
      timestamp: "10:43:10",
      eventType: "FAILOVER_ENGAGED",
      description: "Edge resilience daemon switched to secondary local mesh route",
      hashSignature: "0x11ab...679c",
      status: "info"
    },
    {
      timestamp: "10:44:02",
      eventType: "NETWORK_RESTORED",
      description: "Central connection restored; handshake re-authenticated via TLS 1.3 session ticket",
      hashSignature: "0x44dd...ee19",
      status: "info"
    },
    {
      timestamp: "10:44:18",
      eventType: "DELTA_SYNCED",
      description: "Offline buffered delta queue (1 question state) transmitted and validated with 0 loss",
      hashSignature: "0x9814...4001",
      status: "success"
    },
    {
      timestamp: "10:44:22",
      eventType: "AUDIT_VERIFIED",
      description: "Merkle tree integrity check passed. 100% mathematical consistency confirmed.",
      hashSignature: "0xbc99...41aa",
      status: "success"
    }
  ]
};

export const initialActiveCandidates: import('../types').ActiveCandidateSession[] = [
  {
    id: 'cand-4418',
    rollNo: 'ET-2026-ENG-4418',
    name: 'Adarsh Singh',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    stationId: 'STATION-14',
    centreId: 'centre-08',
    centreName: 'Centre 08 (North Academic Complex)',
    currentQuestion: 14,
    totalQuestions: 40,
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
    lastAction: 'Saved Q14 Option A (Synchronized)',
    merkleHash: '0x7f9a842b109e4d58',
    deviceInfo: 'Terminal 14 • Chrome 124 • Linux EdgeOS',
    isSelf: true
  },
  {
    id: 'cand-4419',
    rollNo: 'ET-2026-ENG-4419',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    stationId: 'STATION-15',
    centreId: 'centre-08',
    centreName: 'Centre 08 (North Academic Complex)',
    currentQuestion: 22,
    totalQuestions: 40,
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
    lastAction: 'Saved Q21 Option C (Synchronized)',
    merkleHash: '0x3a4b912c4488de10',
    deviceInfo: 'Terminal 15 • Chrome 124 • Linux EdgeOS',
    isSelf: false
  },
  {
    id: 'cand-4420',
    rollNo: 'ET-2026-ENG-4420',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    stationId: 'STATION-16',
    centreId: 'centre-08',
    centreName: 'Centre 08 (North Academic Complex)',
    currentQuestion: 18,
    totalQuestions: 40,
    answeredCount: 16,
    markedReviewCount: 3,
    status: 'offline_buffering',
    connectionLatency: 480,
    strikes: 1,
    faceStatus: 'looking_away',
    lastSavedTimestamp: '10:43:55',
    lastSyncedTimestamp: '10:42:01',
    pendingOfflineAnswers: 2,
    compensationMinutes: 2,
    ipAddress: '192.168.8.116',
    lastAction: 'Offline Buffered Q16 (AES-256 Protected)',
    merkleHash: '0x918c5e21908bf112',
    deviceInfo: 'Terminal 16 • Chrome 124 • Linux EdgeOS',
    isSelf: false
  },
  {
    id: 'cand-4421',
    rollNo: 'ET-2026-ENG-4421',
    name: 'Ananya Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stationId: 'STATION-17',
    centreId: 'centre-08',
    centreName: 'Centre 08 (North Academic Complex)',
    currentQuestion: 31,
    totalQuestions: 40,
    answeredCount: 30,
    markedReviewCount: 0,
    status: 'active',
    connectionLatency: 22,
    strikes: 0,
    faceStatus: 'verified',
    lastSavedTimestamp: '10:44:19',
    lastSyncedTimestamp: '10:44:19',
    pendingOfflineAnswers: 0,
    compensationMinutes: 0,
    ipAddress: '192.168.8.117',
    lastAction: 'Saved Q30 Option B (Synchronized)',
    merkleHash: '0xbc881944e001ac99',
    deviceInfo: 'Terminal 17 • Chrome 124 • Linux EdgeOS',
    isSelf: false
  }
];

export const initialTelemetryEvents: import('../types').CandidateTelemetryEvent[] = [
  {
    id: 'evt-1',
    candidateId: 'cand-4418',
    candidateName: 'Adarsh Singh',
    rollNo: 'ET-2026-ENG-4418',
    timestamp: '10:44:12',
    type: 'answer_saved',
    message: 'Submitted Option A for Question 14; State locked in AES-256 buffer.',
    severity: 'info'
  },
  {
    id: 'evt-2',
    candidateId: 'cand-4420',
    candidateName: 'Rahul Verma',
    rollNo: 'ET-2026-ENG-4420',
    timestamp: '10:43:55',
    type: 'offline_buffer',
    message: 'Uplink dropped at Station 16. Response encrypted in local IndexedDB.',
    severity: 'warning'
  },
  {
    id: 'evt-3',
    candidateId: 'cand-4420',
    candidateName: 'Rahul Verma',
    rollNo: 'ET-2026-ENG-4420',
    timestamp: '10:43:10',
    type: 'strike_issued',
    message: 'Gaze deviation detected for 6.2s. Strike 1/3 issued by Proctor AI.',
    severity: 'critical'
  },
  {
    id: 'evt-4',
    candidateId: 'cand-4419',
    candidateName: 'Priya Sharma',
    rollNo: 'ET-2026-ENG-4419',
    timestamp: '10:44:05',
    type: 'answer_saved',
    message: 'Submitted Option C for Question 21; Merkle block sealed.',
    severity: 'success'
  }
];

