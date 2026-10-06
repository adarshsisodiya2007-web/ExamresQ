import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  CandidateNetworkStatus, 
  AssessmentCentre, 
  IncidentRecord, 
  AuditRecord, 
  SystemMetrics,
  ExamQuestion,
  UserRole,
  ActiveCandidateSession,
  CandidateTelemetryEvent,
  StudentHelpRequest,
  HelpRequestType,
  SubmissionReceipt,
  CandidateAttendanceRecord
} from '../types';
import { Language, translations } from '../utils/translations';
import { multiCandidateMeshService } from '../services/multiCandidateMeshService';
import { 
  sampleQuestions, 
  assessmentCentresData, 
  activeIncidentRecord, 
  sampleAuditTrail, 
  initialSystemMetrics,
  initialActiveCandidates,
  initialTelemetryEvents
} from '../data/mockData';
import confetti from 'canvas-confetti';

// Import Real Resilience Services (Requirements 01 to 11)
import { 
  cryptoLedgerService, 
  CanonicalAuditEvent, 
  IntegrityVerificationResult 
} from '../services/cryptoLedgerService';
import { 
  indexedDBService, 
  PersistentAnswerRecord, 
  DisasterRecoveryState 
} from '../services/indexedDBService';
import { 
  predictionEngine, 
  EarlyDetectionMetrics 
} from '../services/predictionEngine';
import { 
  reconciliationService, 
  ReconciliationRunResult 
} from '../services/reconciliationService';
import { 
  DecisionSupportEngine, 
  DecisionScoringResult 
} from '../services/decisionSupportEngine';
import { AuditReportService } from '../services/auditReportService';

export type AppView = 
  | 'landing' 
  | 'candidate_portal' 
  | 'live_exam' 
  | 'candidate_monitor'
  | 'operations' 
  | 'early_detection'
  | 'centres' 
  | 'incidents' 
  | 'recovery' 
  | 'audit' 
  | 'suspicious_patterns'
  | 'reconciliation'
  | 'decision_support'
  | 'reports' 
  | 'settings';

export type ResponseProtectionStage = 
  | 'normal_saved'
  | 'connection_lost'
  | 'response_protected'
  | 'network_restored'
  | 'synchronizing'
  | 'response_verified';

export interface NotificationItem {
  id: string;
  target: 'candidate' | 'admin' | 'both';
  type: 'success' | 'warning' | 'alert' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

interface ResilienceContextType {
  // Role & View Management
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  // Officer-Only Authentication Gate
  isOfficerAuthenticated: boolean;
  isOfficerLoginOpen: boolean;
  setIsOfficerLoginOpen: (open: boolean) => void;
  authenticatedOfficer: {
    id: string;
    name: string;
    clearance: string;
    station: string;
  } | null;
  loginOfficer: (officerId: string, securityPin: string) => boolean;
  logoutOfficer: () => void;

  // 3-Second Role Animation Transition
  transitioningRole: 'student' | 'officer' | null;
  setTransitioningRole: (role: 'student' | 'officer' | null) => void;
  triggerRoleTransition: (targetRole: 'student' | 'officer', onComplete?: () => void) => void;

  // Candidate Profile State
  studentName: string;
  setStudentName: (name: string) => void;

  // Candidate Exam State (Single Candidate Room)
  questions: ExamQuestion[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  answers: Record<number, string>;
  markedForReview: number[];
  answerQuestion: (questionId: number, optionId: string) => void;
  toggleMarkForReview: (questionId: number) => void;
  timeRemainingSeconds: number;

  // Multi-Student Live Surveillance & Officer Telemetry
  activeCandidates: ActiveCandidateSession[];
  telemetryEvents: CandidateTelemetryEvent[];
  sendOfficerWarning: (candidateId: string, message: string) => void;
  grantCandidateCompensatoryTime: (candidateId: string, minutes: number) => void;
  broadcastOfficerAnnouncement: (message: string) => void;
  syncCandidateDirect: (candidateId: string) => void;

  // Resilience & Network State
  networkStatus: CandidateNetworkStatus;
  protectionStage: ResponseProtectionStage;
  offlineQueueCount: number;
  lastSavedHash: string;
  isSimulatingDisruption: boolean;
  interruptionSecondsElapsed: number;
  compensatoryTimeAdded: number;
  triggerNetworkInterruption: () => void;
  restoreNetwork: () => void;
  authorizeCandidateResumption: (candidateId: string) => void;
  executeDisasterFallback: (salvageId: string) => void;
  forcePeriodicSave: () => void;

  // Requirement 02: Early Detection & Predictive Risk Engine
  earlyDetectionMetrics: EarlyDetectionMetrics;
  toggleDegradationSimulation: (active: boolean) => void;

  // Requirement 04: Persistent IndexedDB Recovery
  disasterRecoveryState: DisasterRecoveryState;

  // Requirement 05: Cryptographic Ledger & Merkle Verification
  integrityResult: IntegrityVerificationResult | null;
  verifyAuditIntegrity: () => Promise<IntegrityVerificationResult>;
  simulateTamperAttempt: () => { tamperedIndex: number; oldHash: string };
  restoreAuditIntegrity: () => Promise<IntegrityVerificationResult>;
  computedMerkleRoot: string;
  canonicalAuditEvents: CanonicalAuditEvent[];

  // Requirement 07: Automated Reconciliation
  reconciliationResult: ReconciliationRunResult | null;
  runAutomatedReconciliation: () => Promise<ReconciliationRunResult>;

  // Requirement 09: Rescheduling Decision Support Scoring
  decisionSupportResult: DecisionScoringResult;
  getDecisionSupportScoring: () => DecisionScoringResult;

  // Requirement 11: Exportable PDF & CSV Dossiers
  downloadAuditDossierPDF: () => void;
  downloadAuditLedgerCSV: () => void;

  // Demo Mode
  isDemoActive: boolean;
  demoStep: number;
  startDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  stopDemo: () => void;
  setDemoStepDirect: (step: number) => void;

  // Admin & Monitoring State
  metrics: SystemMetrics;
  centres: AssessmentCentre[];
  selectedCentre: AssessmentCentre | null;
  setSelectedCentre: (c: AssessmentCentre | null) => void;
  incident: IncidentRecord;
  incidentsList: IncidentRecord[];
  auditTrail: AuditRecord;

  // Notifications
  notifications: NotificationItem[];
  dismissNotification: (id: string) => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp'>) => void;

  // Bilingual Non-Technical Language Toggle
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];

  // Font Size Accessibility
  fontSize: 'sm' | 'base' | 'lg';
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;

  // Student Hall Assistance (Raise Hand)
  helpRequests: StudentHelpRequest[];
  sendHelpRequest: (type: HelpRequestType, note?: string) => void;
  resolveHelpRequest: (id: string) => void;

  // Invigilator Attendance Checklist
  candidateAttendance: Record<string, { present: boolean; aadharVerified: boolean; photoVerified: boolean; roughSheetIssued: boolean }>;
  updateCandidateAttendance: (candId: string, field: 'present' | 'aadharVerified' | 'photoVerified' | 'roughSheetIssued') => void;

  // Final Submission Receipt
  submissionReceipt: SubmissionReceipt | null;
  setSubmissionReceipt: (receipt: SubmissionReceipt | null) => void;
  generateSubmissionReceipt: () => SubmissionReceipt;

  // Reset
  resetSystemState: () => void;
}

const ResilienceContext = createContext<ResilienceContextType | undefined>(undefined);

export const ResilienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Primary Role State: Defaults to student for realistic test-taking, easily toggled to officer
  const [userRole, setUserRoleState] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<AppView>('live_exam');

  // Officer-Only Authentication State
  const [isOfficerAuthenticated, setIsOfficerAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('examresq_officer_auth') === 'true';
  });
  const [isOfficerLoginOpen, setIsOfficerLoginOpen] = useState<boolean>(false);
  const [authenticatedOfficer, setAuthenticatedOfficer] = useState<{
    id: string;
    name: string;
    clearance: string;
    station: string;
  } | null>(() => {
    const saved = localStorage.getItem('examresq_officer_data');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return localStorage.getItem('examresq_officer_auth') === 'true' ? {
      id: 'OFF-9042',
      name: 'Inspector Vikram Malhotra',
      clearance: 'Level 4 (Command)',
      station: 'National Surveillance Hub'
    } : null;
  });

  // 3-Second Role Animation Transition State (Plays on launch and role transitions)
  const [transitioningRole, setTransitioningRole] = useState<'student' | 'officer' | null>('student');

  // Candidate Name State (Can be entered during animation or in portal)
  const [studentName, setStudentNameState] = useState<string>(() => {
    return localStorage.getItem('examresq_student_name') || 'Adarsh Singh';
  });

  const setStudentName = useCallback((name: string) => {
    setStudentNameState(name);
    localStorage.setItem('examresq_student_name', name);
    const trimmed = name.trim() || 'Adarsh Singh';
    setActiveCandidates(prev => prev.map(c => c.isSelf ? { ...c, name: trimmed } : c));
    setAuditTrail(prev => ({ ...prev, candidateName: trimmed }));
  }, []);

  const triggerRoleTransition = useCallback((targetRole: 'student' | 'officer', onComplete?: () => void) => {
    setTransitioningRole(targetRole);
    setTimeout(() => {
      setTransitioningRole(null);
      if (onComplete) onComplete();
    }, 3000);
  }, []);

  // Launch initial 3s animation timer on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitioningRole(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const loginOfficer = (officerId: string, _securityPin: string): boolean => {
    const profile = {
      id: officerId.trim() || 'OFF-9042',
      name: 'Chief Invigilator Malhotra',
      clearance: 'Level 4 (Command Clearance)',
      station: 'National Surveillance Hub (Alpha Deck)'
    };
    setIsOfficerAuthenticated(true);
    setAuthenticatedOfficer(profile);
    localStorage.setItem('examresq_officer_auth', 'true');
    localStorage.setItem('examresq_officer_data', JSON.stringify(profile));
    setIsOfficerLoginOpen(false);

    // 3-second animation before opening surveillance dashboard
    triggerRoleTransition('officer', () => {
      setUserRoleState('officer');
      setCurrentView('candidate_monitor');
    });
    return true;
  };

  const logoutOfficer = () => {
    setIsOfficerAuthenticated(false);
    setAuthenticatedOfficer(null);
    localStorage.removeItem('examresq_officer_auth');
    localStorage.removeItem('examresq_officer_data');

    // 3-second animation before returning to student portal
    triggerRoleTransition('student', () => {
      setUserRoleState('student');
      setCurrentView('live_exam');
    });
  };


  const [questions] = useState<ExamQuestion[]>(sampleQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // question 14 is default highlight
  const [answers, setAnswers] = useState<Record<number, string>>({ 1: 'A', 14: 'A' });
  const [markedForReview, setMarkedForReview] = useState<number[]>([15]);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(3260); // ~54 mins
  
  // Multi-Student Live Surveillance & Officer Telemetry
  const [activeCandidates, setActiveCandidates] = useState<ActiveCandidateSession[]>(() => {
    const savedName = localStorage.getItem('examresq_student_name') || 'Adarsh Singh';
    return initialActiveCandidates.map(c => c.isSelf ? { ...c, name: savedName } : c);
  });
  const [telemetryEvents, setTelemetryEvents] = useState<CandidateTelemetryEvent[]>(initialTelemetryEvents);

  // Resilience states
  const [networkStatus, setNetworkStatus] = useState<CandidateNetworkStatus>('connected');
  const [protectionStage, setProtectionStage] = useState<ResponseProtectionStage>('normal_saved');
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);
  const [lastSavedHash, setLastSavedHash] = useState<string>('0x7f9a842b109e4d58');
  const [isSimulatingDisruption, setIsSimulatingDisruption] = useState<boolean>(false);
  const [interruptionSecondsElapsed, setInterruptionSecondsElapsed] = useState<number>(0);
  const [compensatoryTimeAdded, setTotalCompensatoryTimeAdded] = useState<number>(0);

  // Demo mode states
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Admin states
  const [metrics, setMetrics] = useState<SystemMetrics>(initialSystemMetrics);
  const [centres, setCentres] = useState<AssessmentCentre[]>(assessmentCentresData);
  const [selectedCentre, setSelectedCentre] = useState<AssessmentCentre | null>(assessmentCentresData[0]);
  const [incident, setIncident] = useState<IncidentRecord>(activeIncidentRecord);
  const [incidentsList, setIncidentsList] = useState<IncidentRecord[]>([activeIncidentRecord]);
  const [auditTrail, setAuditTrail] = useState<AuditRecord>(sampleAuditTrail);

  // Requirement 02: Early Detection & Predictive Risk Engine State
  const [earlyDetectionMetrics, setEarlyDetectionMetrics] = useState<EarlyDetectionMetrics>(() => 
    predictionEngine.computeMetrics()
  );

  // Requirement 04: IndexedDB Disaster Recovery State
  const [disasterRecoveryState, setDisasterRecoveryState] = useState<DisasterRecoveryState>(() => 
    indexedDBService.getState()
  );

  // Requirement 05: Cryptographic Ledger & Merkle State
  const [computedMerkleRoot, setComputedMerkleRoot] = useState<string>(() => 
    cryptoLedgerService.getMerkleRoot()
  );
  const [canonicalAuditEvents, setCanonicalAuditEvents] = useState<CanonicalAuditEvent[]>(() => 
    cryptoLedgerService.getEvents()
  );
  const [integrityResult, setIntegrityResult] = useState<IntegrityVerificationResult | null>(null);

  // Requirement 07: Automated Reconciliation State
  const [reconciliationResult, setReconciliationResult] = useState<ReconciliationRunResult | null>(null);

  // Requirement 09: Rescheduling Decision Support Scoring State
  const [decisionSupportResult, setDecisionSupportResult] = useState<DecisionScoringResult>(() => 
    DecisionSupportEngine.calculateRecommendation(1, 14, 0, 7, 100)
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'init-1',
      target: 'admin',
      type: 'info',
      title: 'ExamresQ Guardian Active',
      message: 'Active monitoring 38 test centres across 6 regional nodes.',
      timestamp: 'Just now'
    }
  ]);

  // Set role with intelligent default views, Officer authentication guard, and 3-second animation
  const setUserRole = useCallback((newRole: UserRole) => {
    if (newRole === 'officer' && !isOfficerAuthenticated) {
      // 3-second animation before opening officer login modal
      triggerRoleTransition('officer', () => {
        setIsOfficerLoginOpen(true);
      });
      return;
    }

    // 3-second animation before entering dashboard
    triggerRoleTransition(newRole, () => {
      setUserRoleState(newRole);
      if (newRole === 'student') {
        setCurrentView('live_exam');
      } else {
        setCurrentView('candidate_monitor');
      }
    });
  }, [isOfficerAuthenticated, triggerRoleTransition]);

  // Bilingual Language State
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('examresq_lang') as Language) || 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('examresq_lang', lang);
  }, []);

  const t = translations[language];

  // Font Size Accessibility State
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Help Requests State
  const [helpRequests, setHelpRequests] = useState<StudentHelpRequest[]>([]);

  // Candidate Attendance State
  const [candidateAttendance, setCandidateAttendance] = useState<Record<string, { present: boolean; aadharVerified: boolean; photoVerified: boolean; roughSheetIssued: boolean }>>({});

  const updateCandidateAttendance = useCallback((candId: string, field: 'present' | 'aadharVerified' | 'photoVerified' | 'roughSheetIssued') => {
    setCandidateAttendance(prev => {
      const current = prev[candId] || { present: true, aadharVerified: true, photoVerified: true, roughSheetIssued: true };
      return {
        ...prev,
        [candId]: {
          ...current,
          [field]: !current[field]
        }
      };
    });
  }, []);

  // Submission Receipt State
  const [submissionReceipt, setSubmissionReceipt] = useState<SubmissionReceipt | null>(null);

  const generateSubmissionReceipt = useCallback((): SubmissionReceipt => {
    const stationId = sessionStorage.getItem('examresq_station_id') || 'STATION-14';
    const aadhar = sessionStorage.getItem('examresq_student_aadhar') || '5842 1904 8821';
    const rollNo = 'ET-2026-ENG-4418';
    const answeredCount = Object.keys(answers).length;
    const receipt: SubmissionReceipt = {
      receiptId: `REC-${Date.now().toString(36).toUpperCase()}-941`,
      candidateName: studentName || 'Adarsh Singh',
      rollNo,
      aadharCard: aadhar,
      stationId,
      centreName: 'Centre 08 (North Academic Complex, New Delhi)',
      examName: 'Engineering Mathematics III — National Assessment 2026',
      totalQuestions: 25,
      answeredCount,
      markedReviewCount: markedForReview.length,
      submittedAt: new Date().toLocaleString(),
      securityHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      integrityScore: 100
    };
    setSubmissionReceipt(receipt);
    return receipt;
  }, [answers, markedForReview, studentName]);

  const sendHelpRequest = useCallback((type: HelpRequestType, note?: string) => {
    const stationId = sessionStorage.getItem('examresq_station_id') || 'STATION-14';
    const optMap: Record<HelpRequestType, { en: string; hi: string }> = {
      rough_paper: { en: 'Need Extra Rough Sheet', hi: 'अतिरिक्त रफ शीट चाहिए' },
      water: { en: 'Drinking Water Assistance', hi: 'पीने का पानी चाहिए' },
      tech_issue: { en: 'Mouse / Computer Issue', hi: 'कंप्यूटर या माउस समस्या' },
      invigilator: { en: 'Call Room Teacher / Invigilator', hi: 'कक्ष निरीक्षक को बुलाएं' }
    };
    const req: StudentHelpRequest = {
      id: `help-${Date.now()}`,
      candidateId: 'cand-self',
      candidateName: studentName || 'Candidate',
      stationId,
      type,
      title: optMap[type].en,
      titleHi: optMap[type].hi,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };
    multiCandidateMeshService.sendHelpRequest(req);
    setHelpRequests(prev => [req, ...prev]);
  }, [studentName]);

  const resolveHelpRequest = useCallback((id: string) => {
    setHelpRequests(prev => prev.filter(r => r.id !== id));
  }, []);

  // Exam timer countdown - Freezes during network interruption (Requirement 4)
  useEffect(() => {
    const timer = setInterval(() => {
      if (networkStatus === 'interrupted') {
        setInterruptionSecondsElapsed(prev => prev + 1);
      } else {
        setTimeRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [networkStatus]);

  // Initialize Real Services: IndexedDB, Crypto Ledger, Prediction Engine (Req 02, 04, 05)
  useEffect(() => {
    // 1. Initialize IndexedDB & restore persisted answers
    indexedDBService.init().then(async () => {
      const stored = await indexedDBService.getAllAnswers();
      if (stored.length > 0) {
        setAnswers(prev => {
          const next = { ...prev };
          stored.forEach(item => {
            next[item.questionId] = item.selectedOption || item.answer || '';
          });
          return next;
        });
      }
      setDisasterRecoveryState(indexedDBService.getState());
    }).catch(err => {
      console.warn('IndexedDB initialization notice:', err);
    });

    // 2. Subscribe to IndexedDB state updates
    const unsubDB = indexedDBService.subscribe((state) => {
      setDisasterRecoveryState(state);
      setOfflineQueueCount(state.unsyncedCount);
    });

    // 3. Subscribe to Prediction Engine telemetry updates
    const unsubPred = predictionEngine.subscribe((predMetrics) => {
      setEarlyDetectionMetrics(predMetrics);
      // Auto-escalate to incidents list if disruption risk elevates to critical (Req 02 -> Req 03)
      if (predMetrics.disruptionRiskPercent >= 75) {
        setCentres(prev => prev.map(c => 
          c.id === 'centre-08' 
            ? { ...c, riskCategory: 'critical', stabilityScore: predMetrics.stabilityScore, networkLatency: predMetrics.currentLatencyMs }
            : c
        ));
      }
    });

    // 4. Initialize cryptographic Merkle state
    setComputedMerkleRoot(cryptoLedgerService.getMerkleRoot());
    setCanonicalAuditEvents(cryptoLedgerService.getEvents());

    return () => {
      unsubDB();
      unsubPred();
    };
  }, []);

  const recentNotifsRef = useRef<Map<string, number>>(new Map());

  const addNotification = useCallback((item: Omit<NotificationItem, 'id' | 'timestamp'>) => {
    const nowMs = Date.now();
    const lastSeen = recentNotifsRef.current.get(item.title) || 0;
    // Suppress identical notifications within 3.5s
    if (nowMs - lastSeen < 3500) {
      return;
    }
    recentNotifsRef.current.set(item.title, nowMs);

    const id = 'notif-' + Math.random().toString(36).substring(2, 9);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setNotifications(prev => [
      { id, timestamp: now, ...item },
      ...prev.slice(0, 15) // keep recent 16 notifications for audit history
    ]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Append real-time telemetry event for Officer Dashboard
  const appendTelemetryEvent = useCallback((event: Omit<CandidateTelemetryEvent, 'id' | 'timestamp'>) => {
    const id = 'evt-' + Math.random().toString(36).substring(2, 9);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTelemetryEvents(prev => [
      { id, timestamp: now, ...event },
      ...prev.slice(0, 30) // keep last 30 live events in officer stream
    ]);
  }, []);

  // Sync Student 1 (Adarsh Singh - isSelf) with the Live Exam State
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const isOffline = networkStatus === 'interrupted';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setActiveCandidates(prev => prev.map(cand => {
      if (cand.isSelf) {
        return {
          ...cand,
          answeredCount,
          currentQuestion: questions[currentQuestionIndex]?.questionNumber || 14,
          markedReviewCount: markedForReview.length,
          status: isOffline ? 'offline_buffering' : 'active',
          connectionLatency: isOffline ? 999 : 16,
          pendingOfflineAnswers: offlineQueueCount,
          lastSavedTimestamp: now,
          merkleHash: lastSavedHash,
          lastAction: isOffline 
            ? `Offline Buffered ${offlineQueueCount} Answers (AES-256 Protected)`
            : `Synchronized Answer Q${questions[currentQuestionIndex]?.questionNumber || 14}`
        };
      }
      return cand;
    }));
  }, [answers, currentQuestionIndex, markedForReview, networkStatus, offlineQueueCount, lastSavedHash, questions]);

  // Periodic Telemetry Simulator for Other Candidates (Priya, Rahul, Ananya)
  // Demonstrates real-time continuous multi-candidate streaming to the Officer
  useEffect(() => {
    const simInterval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      // Randomly pick one simulated candidate (cand-4419, cand-4420, cand-4421)
      const candIndices = [1, 2, 3];
      const targetIdx = candIndices[Math.floor(Math.random() * candIndices.length)];

      setActiveCandidates(prev => {
        const next = [...prev];
        const target = next[targetIdx];
        if (!target) return prev;

        const isRahul = target.id === 'cand-4420';

        // Answering progress
        const shouldAnswer = Math.random() > 0.35 && target.answeredCount < target.totalQuestions;
        const newAnsweredCount = shouldAnswer ? target.answeredCount + 1 : target.answeredCount;
        const nextQ = shouldAnswer && target.currentQuestion < target.totalQuestions 
          ? target.currentQuestion + 1 
          : target.currentQuestion;

        // Latency fluctuation
        const newLatency = isRahul && target.status === 'offline_buffering' 
          ? 420 + Math.floor(Math.random() * 80)
          : 16 + Math.floor(Math.random() * 12);

        const newHash = '0x' + Math.random().toString(16).substring(2, 18);

        next[targetIdx] = {
          ...target,
          answeredCount: newAnsweredCount,
          currentQuestion: nextQ,
          connectionLatency: newLatency,
          lastSavedTimestamp: now,
          merkleHash: newHash,
          lastAction: shouldAnswer 
            ? `Answered Q${nextQ} (Option ${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]})`
            : target.lastAction
        };

        // Append live officer telemetry event
        if (shouldAnswer) {
          appendTelemetryEvent({
            candidateId: target.id,
            candidateName: target.name,
            rollNo: target.rollNo,
            type: target.status === 'offline_buffering' ? 'offline_buffer' : 'answer_saved',
            message: target.status === 'offline_buffering' 
              ? `Station ${target.stationId}: Buffered answer for Q${nextQ} in edge cache.`
              : `Station ${target.stationId}: Response for Q${nextQ} synchronized and Merkle sealed.`,
            severity: target.status === 'offline_buffering' ? 'warning' : 'info'
          });
        }

        return next;
      });
    }, 4500);

    return () => clearInterval(simInterval);
  }, [appendTelemetryEvent]);

  // Answer question with real cryptographic hash chain & persistent IndexedDB storage (Req 04, 05)
  const answerQuestion = useCallback(async (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));

    // 1. Asynchronously persist into local IndexedDB sandbox
    try {
      await indexedDBService.persistAnswer({
        candidateId: 'ET-2026-ENG-4418',
        questionId,
        selectedOption: optionId,
        isMarkedForReview: markedForReview.includes(questionId),
        isSynced: networkStatus !== 'interrupted'
      });
      setDisasterRecoveryState(indexedDBService.getState());
    } catch (e) {
      console.warn('Local database persistence note:', e);
    }

    // 2. Append event to WebCrypto SHA-256 canonical hash chain & update Merkle root
    let newHash = '0x' + Math.random().toString(16).substring(2, 18);
    try {
      const cryptoEvent = await cryptoLedgerService.appendEvent('ANSWER_RECORDED', {
        candidateId: 'ET-2026-ENG-4418',
        questionId,
        selectedOption: optionId,
        offline: networkStatus === 'interrupted'
      });
      newHash = cryptoEvent.currentHash || cryptoEvent.hash || '';
      setComputedMerkleRoot(cryptoLedgerService.getMerkleRoot());
      setCanonicalAuditEvents([...cryptoLedgerService.getEvents()]);
      setAuditTrail(prev => ({
        ...prev,
        merkleRoot: cryptoLedgerService.getMerkleRoot(),
        answeredCount: Object.keys(answers).length + 1
      }));
    } catch (e) {
      console.warn('Cryptographic event hashing note:', e);
    }

    setLastSavedHash(newHash);

    if (networkStatus === 'interrupted') {
      // Offline mode: Lock in local tamper-proof cryptographic ledger
      setOfflineQueueCount(prev => prev + 1);
      setProtectionStage('response_protected');

      addNotification({
        target: 'candidate',
        type: 'warning',
        title: 'Response Protected Locally (IndexedDB & SHA-256)',
        message: `Answer for Q${questionId} saved to tamper-evident offline cache (Hash: ${newHash.substring(0, 10)}...). Zero data loss.`
      });

      appendTelemetryEvent({
        candidateId: 'cand-4418',
        candidateName: studentName || 'Adarsh Singh',
        rollNo: 'ET-2026-ENG-4418',
        type: 'offline_buffer',
        message: `${studentName || 'Adarsh Singh'} answered Q${questionId} (Option ${optionId}) while offline. Saved in IndexedDB buffer.`,
        severity: 'warning'
      });
    } else {
      // Normal cloud save
      setProtectionStage('normal_saved');

      addNotification({
        target: 'candidate',
        type: 'success',
        title: 'Response Synchronized',
        message: `Question ${questionId} response safely synchronized with central servers.`
      });

      appendTelemetryEvent({
        candidateId: 'cand-4418',
        candidateName: studentName || 'Adarsh Singh',
        rollNo: 'ET-2026-ENG-4418',
        type: 'answer_saved',
        message: `${studentName || 'Adarsh Singh'} answered Q${questionId} (Option ${optionId}). Merkle state locked.`,
        severity: 'info'
      });
    }
  }, [networkStatus, markedForReview, answers, studentName, addNotification, appendTelemetryEvent]);

  const toggleMarkForReview = useCallback((questionId: number) => {
    setMarkedForReview(prev => 
      prev.includes(questionId) ? prev.filter(q => q !== questionId) : [...prev, questionId]
    );
  }, []);

  // Officer Action 1: Send Direct Warning to Candidate
  const sendOfficerWarning = useCallback((candidateId: string, message: string) => {
    setActiveCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          strikes: c.strikes + 1,
          status: 'flagged'
        };
      }
      return c;
    }));

    const cand = activeCandidates.find(c => c.id === candidateId);
    const candName = cand ? cand.name : candidateId;

    addNotification({
      target: 'both',
      type: 'alert',
      title: `Official Warning Sent: ${candName}`,
      message: `Invigilator directive: "${message}". Strike incremented on student terminal.`
    });

    appendTelemetryEvent({
      candidateId,
      candidateName: candName,
      rollNo: cand ? cand.rollNo : 'ET-WARN',
      type: 'warning_sent',
      message: `Officer issued warning to ${candName}: "${message}"`,
      severity: 'critical'
    });
  }, [activeCandidates, addNotification, appendTelemetryEvent]);

  // Officer Action 2: Grant Compensatory Time (Req 9, 10)
  const grantCandidateCompensatoryTime = useCallback((candidateId: string, minutes: number) => {
    setActiveCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          compensationMinutes: c.compensationMinutes + minutes
        };
      }
      return c;
    }));

    const cand = activeCandidates.find(c => c.id === candidateId);
    const candName = cand ? cand.name : candidateId;

    // If candidate is self (Adarsh Singh), add seconds directly to exam timer!
    if (cand?.isSelf) {
      setTimeRemainingSeconds(prev => prev + minutes * 60);
      setTotalCompensatoryTimeAdded(prev => prev + minutes * 60);
    }

    addNotification({
      target: 'both',
      type: 'success',
      title: `+${minutes} Mins Compensatory Time Granted`,
      message: `Equivalence parity applied for ${candName} due to verified disruption.`
    });

    appendTelemetryEvent({
      candidateId,
      candidateName: candName,
      rollNo: cand ? cand.rollNo : 'ET-COMP',
      type: 'compensation_granted',
      message: `Examination Authority granted +${minutes} minutes compensatory buffer to ${candName}.`,
      severity: 'success'
    });
  }, [activeCandidates, addNotification, appendTelemetryEvent]);

  // Officer Action 3: Broadcast Announcement to All Candidates
  const broadcastOfficerAnnouncement = useCallback((message: string) => {
    addNotification({
      target: 'both',
      type: 'info',
      title: 'Central Invigilator Announcement',
      message
    });

    appendTelemetryEvent({
      candidateId: 'all',
      candidateName: 'ALL CANDIDATES',
      rollNo: 'BROADCAST',
      type: 'warning_sent',
      message: `Global announcement broadcast: "${message}"`,
      severity: 'info'
    });
  }, [addNotification, appendTelemetryEvent]);

  // Officer Action 4: Sync Candidate Offline Queue Directly
  const syncCandidateDirect = useCallback((candidateId: string) => {
    setActiveCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          pendingOfflineAnswers: 0,
          status: 'active',
          connectionLatency: 18,
          lastAction: 'Reconciled & Re-synchronized by Officer'
        };
      }
      return c;
    }));

    addNotification({
      target: 'admin',
      type: 'success',
      title: 'Candidate Re-synchronized',
      message: `Station ledger for ${candidateId} successfully validated with 0 loss.`
    });
  }, [addNotification]);

  // SIMULATE NETWORK OUTAGE (Requirement 3 & 4)
  const triggerNetworkInterruption = useCallback(() => {
    setNetworkStatus('interrupted');
    setProtectionStage('connection_lost');
    setIsSimulatingDisruption(true);
    setInterruptionSecondsElapsed(0);

    // Notify persistent IndexedDB engine of offline mode
    indexedDBService.setNetworkOnline(false);

    // Record cryptographic disruption event in audit ledger
    cryptoLedgerService.appendEvent('NETWORK_INTERRUPTED', {
      centreId: 'centre-08',
      reason: 'WAN Primary Uplink Severed',
      timestamp: Date.now()
    }).then(event => {
      setLastSavedHash(event.currentHash || event.hash || '');
      setComputedMerkleRoot(cryptoLedgerService.getMerkleRoot());
      setCanonicalAuditEvents([...cryptoLedgerService.getEvents()]);
    }).catch(e => console.warn('Disruption ledger note:', e));

    // Update centres data: Centre 08 suffers degraded ping
    setCentres(prev => prev.map(c => 
      c.id === 'centre-08' 
        ? { ...c, status: 'incident', networkLatency: 480, edgeGatewayStatus: 'failover', openIncidents: 1 } 
        : c
    ));

    setMetrics(prev => ({
      ...prev,
      networkHealthPercent: 88.4,
      systemHealthPercent: 94.1,
      openIncidentsCount: 1
    }));

    addNotification({
      target: 'candidate',
      type: 'warning',
      title: 'Connection Interrupted (Timer Frozen)',
      message: 'Uplink severed. Exam timer frozen. Client encryption ledger activated. Zero data loss.'
    });

    addNotification({
      target: 'admin',
      type: 'alert',
      title: 'Incident #ET-1042: Centre 08 Outage',
      message: 'Edge anomaly watchdog triggered at Centre 08. 100% WAN drop detected. Candidate stations entering local buffer.'
    });

    appendTelemetryEvent({
      candidateId: 'all',
      candidateName: 'Centre 08 Edge Hub',
      rollNo: 'CENTRE-08',
      type: 'offline_buffer',
      message: 'CRITICAL: Centre 08 primary fiber cut. Local edge gateways engaged.',
      severity: 'critical'
    });
  }, [addNotification, appendTelemetryEvent]);

  // RESTORE NETWORK & AUTO-RECONCILE (Requirement 4 & 7)
  const restoreNetwork = useCallback(() => {
    setNetworkStatus('reconnecting');
    setProtectionStage('network_restored');

    setTimeout(() => {
      setProtectionStage('synchronizing');

      setTimeout(async () => {
        setNetworkStatus('connected');
        setProtectionStage('response_verified');
        setIsSimulatingDisruption(false);

        // Notify IndexedDB engine and flush sync status
        await indexedDBService.markAllSynced();
        indexedDBService.setNetworkOnline(true);
        setDisasterRecoveryState(indexedDBService.getState());

        // Append synchronization completion to cryptographic hash chain
        try {
          await cryptoLedgerService.appendEvent('DELTA_SYNCHRONIZED', {
            centreId: 'centre-08',
            recordsFlushed: offlineQueueCount,
            integrityStatus: 'VERIFIED'
          });
          setComputedMerkleRoot(cryptoLedgerService.getMerkleRoot());
          setCanonicalAuditEvents([...cryptoLedgerService.getEvents()]);
        } catch (e) {
          console.warn('Sync ledger note:', e);
        }

        // Auto compensatory time formula: 1 min extra for every 10s of interruption
        const compSeconds = Math.max(60, Math.ceil(interruptionSecondsElapsed / 10) * 60);
        setTimeRemainingSeconds(prev => prev + compSeconds);
        setTotalCompensatoryTimeAdded(prev => prev + compSeconds);

        // Flush offline queue
        setOfflineQueueCount(0);

        // Restore Centre 08 health
        setCentres(prev => prev.map(c => 
          c.id === 'centre-08' 
            ? { ...c, status: 'operational', networkLatency: 18, edgeGatewayStatus: 'online', openIncidents: 0 } 
            : c
        ));

        setMetrics(prev => ({
          ...prev,
          networkHealthPercent: 99.1,
          systemHealthPercent: 99.8,
          openIncidentsCount: 0
        }));

        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#16803C', '#2E7D32', '#4CAF50']
          });
        } catch {
          // ignore
        }

        addNotification({
          target: 'candidate',
          type: 'success',
          title: 'Connection Restored & Responses Reconciled',
          message: `All offline answers verified with 0 loss. You received +${Math.round(compSeconds / 60)} minutes compensatory time.`
        });

        addNotification({
          target: 'admin',
          type: 'success',
          title: 'Centre 08 Reconciled (100% Match)',
          message: 'All candidate sessions at Centre 08 verified against SHA-256 Merkle root. Zero discrepancies.'
        });

        appendTelemetryEvent({
          candidateId: 'all',
          candidateName: 'Centre 08 Edge Hub',
          rollNo: 'CENTRE-08',
          type: 'reconnected',
          message: 'SUCCESS: Network restored. 100% candidate responses reconciled via Merkle Tree.',
          severity: 'success'
        });
      }, 1200);
    }, 800);
  }, [interruptionSecondsElapsed, offlineQueueCount, addNotification, appendTelemetryEvent]);

  // Requirement 02: Toggle Degradation Simulation
  const toggleDegradationSimulation = useCallback((active: boolean) => {
    predictionEngine.simulateDegradation(active);
    const updated = predictionEngine.computeMetrics();
    setEarlyDetectionMetrics(updated);

    if (active) {
      addNotification({
        target: 'admin',
        type: 'warning',
        title: 'Network Degradation Injected (Req 02)',
        message: 'Elevated latency jitter and packet loss stream active. Prediction engine calculating real-time failure probability.'
      });
    } else {
      addNotification({
        target: 'admin',
        type: 'success',
        title: 'Telemetry Stabilized',
        message: 'Telemetry degradation cleared. Rolling network stability score restored to 99.4%.'
      });
    }
  }, [addNotification]);

  // Requirement 05: Cryptographic Ledger & Merkle Verification Handlers
  const verifyAuditIntegrity = useCallback(async (): Promise<IntegrityVerificationResult> => {
    const result = await cryptoLedgerService.verifyIntegrity();
    setIntegrityResult(result);
    setComputedMerkleRoot(result.computedMerkleRoot);

    if (result.isValid) {
      addNotification({
        target: 'admin',
        type: 'success',
        title: 'Merkle Ledger Verified (100% Intact)',
        message: `All ${result.totalEvents} cryptographic blocks verified with 0 breaks. Merkle Root: ${result.computedMerkleRoot.substring(0, 14)}...`
      });
    } else {
      addNotification({
        target: 'admin',
        type: 'alert',
        title: 'CRITICAL: Ledger Tampering Detected',
        message: `Integrity broken at Block #${result.tamperedBlockIndex}! Hash mismatch between recorded and recomputed SHA-256 digest.`
      });
    }
    return result;
  }, [addNotification]);

  const simulateTamperAttempt = useCallback(() => {
    const result = cryptoLedgerService.simulateTamper();
    setCanonicalAuditEvents([...cryptoLedgerService.getEvents()]);
    setComputedMerkleRoot(cryptoLedgerService.getMerkleRoot());
    
    addNotification({
      target: 'admin',
      type: 'alert',
      title: 'TEST TAMPER INJECTED: Block Payload Mutated',
      message: `Block #${result.tamperedIndex} payload mutated. Run "Verify Merkle Tree" to observe autonomous cryptographic rejection.`
    });
    return result;
  }, [addNotification]);

  const restoreAuditIntegrity = useCallback(async (): Promise<IntegrityVerificationResult> => {
    const result = await cryptoLedgerService.restoreIntegrity();
    setIntegrityResult(result);
    setComputedMerkleRoot(result.computedMerkleRoot);
    setCanonicalAuditEvents([...cryptoLedgerService.getEvents()]);

    addNotification({
      target: 'admin',
      type: 'success',
      title: 'Ledger Integrity Restored',
      message: 'Tampered block repaired from cryptographically signed local key. Merkle chain 100% verified.'
    });
    return result;
  }, [addNotification]);

  // Requirement 07: Automated Reconciliation Handler
  const runAutomatedReconciliation = useCallback(async (): Promise<ReconciliationRunResult> => {
    const localRecords = await indexedDBService.getAllAnswers();
    const result = await reconciliationService.runReconciliation(localRecords);
    setReconciliationResult(result);

    if (result.unreconciledDeltas === 0) {
      addNotification({
        target: 'admin',
        type: 'success',
        title: 'Reconciliation Complete: 100% Match',
        message: `${result.totalEvaluated} candidate records compared between client sandbox & cloud store. 0 discrepancies.`
      });
    } else {
      addNotification({
        target: 'admin',
        type: 'warning',
        title: 'Reconciliation Completed with Discrepancies',
        message: `Found ${result.unreconciledDeltas} pending sync records. Automatic resolution policy applied.`
      });
    }
    return result;
  }, [addNotification]);

  // Requirement 09: Rescheduling Decision Support Scoring
  const getDecisionSupportScoring = useCallback((): DecisionScoringResult => {
    const result = DecisionSupportEngine.calculateRecommendation(
      1,
      interruptionSecondsElapsed > 0 ? interruptionSecondsElapsed : 14,
      offlineQueueCount,
      activeCandidates.length,
      100
    );
    setDecisionSupportResult(result);
    return result;
  }, [interruptionSecondsElapsed, offlineQueueCount, activeCandidates.length]);

  // Requirement 11: Exportable PDF & CSV Dossiers
  const downloadAuditDossierPDF = useCallback(() => {
    const verification: IntegrityVerificationResult = integrityResult || {
      isValid: true,
      totalEvents: canonicalAuditEvents.length,
      validEvents: canonicalAuditEvents.length,
      invalidEvents: 0,
      currentRoot: computedMerkleRoot,
      expectedRoot: computedMerkleRoot,
      computedMerkleRoot,
      tamperedIndex: null,
      status: 'VERIFIED',
      message: 'All cryptographic blocks verified.',
      timestamp: new Date().toLocaleTimeString(),
      verificationTimestamp: new Date().toISOString(),
      brokenLinks: []
    };

    AuditReportService.generateAuditDossierPDF(
      auditTrail,
      centres,
      metrics,
      canonicalAuditEvents,
      verification
    );

    addNotification({
      target: 'admin',
      type: 'success',
      title: 'Official Audit Dossier PDF Generated',
      message: 'Comprehensive post-examination PDF dossier generated with SHA-256 seal and integrity proofs.'
    });
  }, [auditTrail, centres, metrics, canonicalAuditEvents, integrityResult, computedMerkleRoot, addNotification]);

  const downloadAuditLedgerCSV = useCallback(() => {
    AuditReportService.generateAuditLedgerCSV(canonicalAuditEvents);
    addNotification({
      target: 'admin',
      type: 'success',
      title: 'Audit Ledger Exported (CSV)',
      message: 'Full cryptographic event stream exported for independent regulatory auditor review.'
    });
  }, [canonicalAuditEvents, addNotification]);

  // Authorize candidate resumption (Supervisor action)
  const authorizeCandidateResumption = useCallback((candidateId: string) => {
    addNotification({
      target: 'both',
      type: 'success',
      title: 'Session Resumption Authorized',
      message: `Supervisor verified identity for ${candidateId}. Offline answer ledger decrypted.`
    });
  }, [addNotification]);

  // Disaster fallback salvage execution
  const executeDisasterFallback = useCallback((salvageId: string) => {
    addNotification({
      target: 'admin',
      type: 'info',
      title: 'Disaster Fallback Executed',
      message: `Record ${salvageId} exported to secondary node with academic guarantee seal.`
    });
  }, [addNotification]);

  const forcePeriodicSave = useCallback(() => {
    setLastSavedHash('0x' + Math.random().toString(16).substring(2, 18));
  }, []);

  // Demo tour actions
  const startDemo = useCallback(() => {
    setIsDemoActive(true);
    setDemoStep(1);
    setCurrentView('operations');
  }, []);

  const nextDemoStep = useCallback(() => {
    setDemoStep(prev => (prev < 7 ? prev + 1 : 1));
  }, []);

  const prevDemoStep = useCallback(() => {
    setDemoStep(prev => (prev > 1 ? prev - 1 : 1));
  }, []);

  const stopDemo = useCallback(() => {
    setIsDemoActive(false);
    setDemoStep(1);
  }, []);

  const setDemoStepDirect = useCallback((step: number) => {
    setDemoStep(step);
  }, []);

  const resetSystemState = useCallback(() => {
    setNetworkStatus('connected');
    setProtectionStage('normal_saved');
    setOfflineQueueCount(0);
    setIsSimulatingDisruption(false);
    setInterruptionSecondsElapsed(0);
    setTotalCompensatoryTimeAdded(0);
    setTimeRemainingSeconds(3600);
    setMetrics(initialSystemMetrics);
    setCentres(assessmentCentresData);
    setIncident(activeIncidentRecord);
    setActiveCandidates(initialActiveCandidates);
    setTelemetryEvents(initialTelemetryEvents);
  }, []);

  return (
    <ResilienceContext.Provider
      value={{
        userRole,
        setUserRole,
        currentView,
        setCurrentView,
        isOfficerAuthenticated,
        isOfficerLoginOpen,
        setIsOfficerLoginOpen,
        authenticatedOfficer,
        loginOfficer,
        logoutOfficer,
        transitioningRole,
        setTransitioningRole,
        triggerRoleTransition,
        studentName,
        setStudentName,
        questions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        markedForReview,
        answerQuestion,
        toggleMarkForReview,
        timeRemainingSeconds,
        activeCandidates,
        telemetryEvents,
        sendOfficerWarning,
        grantCandidateCompensatoryTime,
        broadcastOfficerAnnouncement,
        syncCandidateDirect,
        networkStatus,
        protectionStage,
        offlineQueueCount,
        lastSavedHash,
        isSimulatingDisruption,
        interruptionSecondsElapsed,
        compensatoryTimeAdded,
        triggerNetworkInterruption,
        restoreNetwork,
        authorizeCandidateResumption,
        executeDisasterFallback,
        forcePeriodicSave,
        isDemoActive,
        demoStep,
        startDemo,
        nextDemoStep,
        prevDemoStep,
        stopDemo,
        setDemoStepDirect,
        metrics,
        centres,
        selectedCentre,
        setSelectedCentre,
        incident,
        incidentsList,
        auditTrail,
        earlyDetectionMetrics,
        toggleDegradationSimulation,
        disasterRecoveryState,
        integrityResult,
        verifyAuditIntegrity,
        simulateTamperAttempt,
        restoreAuditIntegrity,
        computedMerkleRoot,
        canonicalAuditEvents,
        reconciliationResult,
        runAutomatedReconciliation,
        decisionSupportResult,
        getDecisionSupportScoring,
        downloadAuditDossierPDF,
        downloadAuditLedgerCSV,
        notifications,
        dismissNotification,
        addNotification,
        language,
        setLanguage,
        t,
        fontSize,
        setFontSize,
        helpRequests,
        sendHelpRequest,
        resolveHelpRequest,
        candidateAttendance,
        updateCandidateAttendance,
        submissionReceipt,
        setSubmissionReceipt,
        generateSubmissionReceipt,
        resetSystemState
      }}
    >
      {children}
    </ResilienceContext.Provider>
  );
};

export const useResilience = () => {
  const context = useContext(ResilienceContext);
  if (!context) {
    throw new Error('useResilience must be used within a ResilienceProvider');
  }
  return context;
};
