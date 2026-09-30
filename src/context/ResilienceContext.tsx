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
  CandidateTelemetryEvent
} from '../types';
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
  auditTrail: AuditRecord;

  // Notifications
  notifications: NotificationItem[];
  dismissNotification: (id: string) => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp'>) => void;

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
    setUserRoleState('officer');
    setCurrentView('candidate_monitor');
    setIsOfficerLoginOpen(false);
    return true;
  };

  const logoutOfficer = () => {
    setIsOfficerAuthenticated(false);
    setAuthenticatedOfficer(null);
    localStorage.removeItem('examresq_officer_auth');
    localStorage.removeItem('examresq_officer_data');
    setUserRoleState('student');
    setCurrentView('live_exam');
  };

  const [questions] = useState<ExamQuestion[]>(sampleQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // question 14 is default highlight
  const [answers, setAnswers] = useState<Record<number, string>>({ 1: 'A', 14: 'A' });
  const [markedForReview, setMarkedForReview] = useState<number[]>([15]);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(3260); // ~54 mins
  
  // Multi-Student Live Surveillance & Officer Telemetry
  const [activeCandidates, setActiveCandidates] = useState<ActiveCandidateSession[]>(initialActiveCandidates);
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
  const [auditTrail, setAuditTrail] = useState<AuditRecord>(sampleAuditTrail);
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

  // Set role with intelligent default views and Officer authentication guard
  const setUserRole = useCallback((newRole: UserRole) => {
    if (newRole === 'officer' && !isOfficerAuthenticated) {
      setIsOfficerLoginOpen(true);
      return;
    }
    setUserRoleState(newRole);
    if (newRole === 'student') {
      setCurrentView('live_exam');
    } else {
      setCurrentView('candidate_monitor');
    }
  }, [isOfficerAuthenticated]);

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

  // Answer question with resilience awareness
  const answerQuestion = useCallback((questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    const newHash = '0x' + Math.random().toString(16).substring(2, 18);
    setLastSavedHash(newHash);

    if (networkStatus === 'interrupted') {
      // Offline mode: Lock in local tamper-proof cryptographic ledger
      setOfflineQueueCount(prev => prev + 1);
      setProtectionStage('response_protected');

      addNotification({
        target: 'candidate',
        type: 'warning',
        title: 'Response Protected Locally',
        message: `Answer for Q${questionId} saved to tamper-evident offline cache (Hash: ${newHash.substring(0, 10)}...). Zero data loss.`
      });

      appendTelemetryEvent({
        candidateId: 'cand-4418',
        candidateName: 'Adarsh Singh',
        rollNo: 'ET-2026-ENG-4418',
        type: 'offline_buffer',
        message: `Adarsh Singh answered Q${questionId} (Option ${optionId}) while offline. Saved in AES-256 buffer.`,
        severity: 'warning'
      });
    } else {
      // Normal cloud save
      setProtectionStage('normal_saved');

      addNotification({
        target: 'candidate',
        type: 'success',
        title: 'Response Saved',
        message: `Question ${questionId} response safely synchronized with central servers.`
      });

      appendTelemetryEvent({
        candidateId: 'cand-4418',
        candidateName: 'Adarsh Singh',
        rollNo: 'ET-2026-ENG-4418',
        type: 'answer_saved',
        message: `Adarsh Singh answered Q${questionId} (Option ${optionId}). Merkle state locked.`,
        severity: 'info'
      });
    }
  }, [networkStatus, addNotification, appendTelemetryEvent]);

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

      setTimeout(() => {
        setNetworkStatus('connected');
        setProtectionStage('response_verified');
        setIsSimulatingDisruption(false);

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
          message: 'All 7 candidate sessions at Centre 08 verified against SHA-256 Merkle root. Zero discrepancies.'
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
  }, [interruptionSecondsElapsed, addNotification, appendTelemetryEvent]);

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
        auditTrail,
        notifications,
        dismissNotification,
        addNotification,
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
