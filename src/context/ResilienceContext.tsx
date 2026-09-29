import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  CandidateNetworkStatus, 
  AssessmentCentre, 
  IncidentRecord, 
  AuditRecord, 
  SystemMetrics,
  ExamQuestion 
} from '../types';
import { 
  sampleQuestions, 
  assessmentCentresData, 
  activeIncidentRecord, 
  sampleAuditTrail, 
  initialSystemMetrics 
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type AppView = 
  | 'landing' 
  | 'candidate_portal' 
  | 'live_exam' 
  | 'operations' 
  | 'early_detection'
  | 'centres' 
  | 'incidents' 
  | 'recovery' 
  | 'audit' 
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
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  // Candidate Exam State
  questions: ExamQuestion[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  answers: Record<number, string>;
  markedForReview: number[];
  answerQuestion: (questionId: number, optionId: string) => void;
  toggleMarkForReview: (questionId: number) => void;
  timeRemainingSeconds: number;
  // Resilience & Network State
  networkStatus: CandidateNetworkStatus;
  protectionStage: ResponseProtectionStage;
  offlineQueueCount: number;
  lastSavedHash: string;
  isSimulatingDisruption: boolean;
  triggerNetworkInterruption: () => void;
  restoreNetwork: () => void;
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
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [questions] = useState<ExamQuestion[]>(sampleQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // question 14 is default highlight
  const [answers, setAnswers] = useState<Record<number, string>>({ 1: 'A', 14: 'A' });
  const [markedForReview, setMarkedForReview] = useState<number[]>([15]);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(3260); // ~54 mins
  
  // Resilience states
  const [networkStatus, setNetworkStatus] = useState<CandidateNetworkStatus>('connected');
  const [protectionStage, setProtectionStage] = useState<ResponseProtectionStage>('normal_saved');
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);
  const [lastSavedHash, setLastSavedHash] = useState<string>('0x7f9a842b109e4d58');
  const [isSimulatingDisruption, setIsSimulatingDisruption] = useState<boolean>(false);

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
      title: 'EVALTRUST Guardian Active',
      message: 'Active monitoring 38 test centres across 6 regional nodes.',
      timestamp: 'Just now'
    }
  ]);

  // Exam timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
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
    } else {
      // Normal cloud save
      setProtectionStage('normal_saved');
      addNotification({
        target: 'candidate',
        type: 'success',
        title: 'Response Saved',
        message: `Question ${questionId} response safely synchronized with central servers.`
      });
    }
  }, [networkStatus, addNotification]);

  const toggleMarkForReview = useCallback((questionId: number) => {
    setMarkedForReview(prev => 
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  }, []);

  // Manual Trigger: Network Interruption
  const triggerNetworkInterruption = useCallback(() => {
    setIsSimulatingDisruption(true);
    setNetworkStatus('interrupted');
    setProtectionStage('connection_lost');
    setOfflineQueueCount(1);

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
      title: 'Connection Interrupted',
      message: 'Your response is protected. EvalTrust offline resilience layer is active.'
    });

    addNotification({
      target: 'admin',
      type: 'alert',
      title: 'Centre 08 Network Degradation',
      message: 'Packet drop detected on WAN Gateway A. Failover protocols initiated.'
    });

    setTimeout(() => {
      setProtectionStage('response_protected');
    }, 1200);
  }, [addNotification]);

  // Manual Trigger: Network Restore & Delta Sync
  const restoreNetwork = useCallback(() => {
    setProtectionStage('network_restored');
    setNetworkStatus('reconnecting');

    addNotification({
      target: 'candidate',
      type: 'info',
      title: 'Connection Restored',
      message: 'Restoring handshake with central cluster...'
    });

    setTimeout(() => {
      setProtectionStage('synchronizing');
      
      setTimeout(() => {
        setProtectionStage('response_verified');
        setNetworkStatus('connected');
        setIsSimulatingDisruption(false);
        setOfflineQueueCount(0);

        // Update centres
        setCentres(prev => prev.map(c => 
          c.id === 'centre-08' 
            ? { ...c, status: 'operational', networkLatency: 28, edgeGatewayStatus: 'online', openIncidents: 0, lastSync: 'Just now' } 
            : c
        ));

        setMetrics(prev => ({
          ...prev,
          networkHealthPercent: 99.2,
          systemHealthPercent: 99.8,
          openIncidentsCount: 0
        }));

        addNotification({
          target: 'candidate',
          type: 'success',
          title: 'Responses Synchronized',
          message: 'All buffered responses validated and verified with 0% data loss.'
        });

        addNotification({
          target: 'admin',
          type: 'success',
          title: 'Centre 08 Fully Recovered',
          message: '7 candidate delta packages reconciled. Central audit log sealed.'
        });

        // Small celebration confetti
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#C62828', '#16803C', '#E53935']
          });
        } catch {
          // ignore
        }

        setTimeout(() => {
          setProtectionStage('normal_saved');
        }, 3500);
      }, 1800);
    }, 1200);
  }, [addNotification]);

  // Reset entire system to initial state
  const resetSystemState = useCallback(() => {
    setNetworkStatus('connected');
    setProtectionStage('normal_saved');
    setOfflineQueueCount(0);
    setIsSimulatingDisruption(false);
    setIsDemoActive(false);
    setDemoStep(1);
    setCentres(assessmentCentresData);
    setMetrics(initialSystemMetrics);
    setIncident(activeIncidentRecord);
    setAuditTrail(sampleAuditTrail);
  }, []);

  // Resilience Demo steps controller
  const startDemo = useCallback(() => {
    setIsDemoActive(true);
    setDemoStep(1);
    resetSystemState();
    setIsDemoActive(true);
  }, [resetSystemState]);

  const stopDemo = useCallback(() => {
    setIsDemoActive(false);
  }, []);

  const setDemoStepDirect = useCallback((step: number) => {
    setDemoStep(step);
    if (step === 1) {
      // Normal Operation
      setNetworkStatus('connected');
      setProtectionStage('normal_saved');
      setIsSimulatingDisruption(false);
      setOfflineQueueCount(0);
    } else if (step === 2) {
      // Network Failure
      setIsSimulatingDisruption(true);
      setNetworkStatus('interrupted');
      setProtectionStage('connection_lost');
    } else if (step === 3) {
      // Incident Detection
      setNetworkStatus('interrupted');
      setProtectionStage('connection_lost');
      addNotification({
        target: 'admin',
        type: 'alert',
        title: 'Watchdog Alert: Centre 08 Drop',
        message: 'Mean Time to Detect: 1.2s. 7 active sessions safeguarded.'
      });
    } else if (step === 4) {
      // Response Protection
      setNetworkStatus('interrupted');
      setProtectionStage('response_protected');
      setOfflineQueueCount(2);
      addNotification({
        target: 'candidate',
        type: 'warning',
        title: 'Local Cryptographic Ledger Engaged',
        message: 'Candidate offline responses encrypted with zero loss.'
      });
    } else if (step === 5) {
      // Recovery Initiated
      setProtectionStage('network_restored');
      setNetworkStatus('reconnecting');
    } else if (step === 6) {
      // Synchronization
      setProtectionStage('synchronizing');
      setOfflineQueueCount(1);
    } else if (step === 7) {
      // Audit Verification
      setProtectionStage('response_verified');
      setNetworkStatus('connected');
      setOfflineQueueCount(0);
      setIsSimulatingDisruption(false);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C62828', '#16803C', '#E53935']
        });
      } catch {
        // ignore
      }
    }
  }, [addNotification]);

  const nextDemoStep = useCallback(() => {
    setDemoStep(prev => {
      const next = prev < 7 ? prev + 1 : 1;
      setDemoStepDirect(next);
      return next;
    });
  }, [setDemoStepDirect]);

  const prevDemoStep = useCallback(() => {
    setDemoStep(prev => {
      const prevStep = prev > 1 ? prev - 1 : 7;
      setDemoStepDirect(prevStep);
      return prevStep;
    });
  }, [setDemoStepDirect]);

  return (
    <ResilienceContext.Provider
      value={{
        currentView,
        setCurrentView,
        questions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        markedForReview,
        answerQuestion,
        toggleMarkForReview,
        timeRemainingSeconds,
        networkStatus,
        protectionStage,
        offlineQueueCount,
        lastSavedHash,
        isSimulatingDisruption,
        triggerNetworkInterruption,
        restoreNetwork,
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
