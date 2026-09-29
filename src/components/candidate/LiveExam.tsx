import React, { useState, useEffect, useCallback } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { ResponseProtectionWidget } from './ResponseProtectionWidget';
import { AIProctoringHUD } from './AIProctoringHUD';
import { 
  Clock, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  AlertTriangle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Send, 
  Info,
  HelpCircle,
  Menu,
  X,
  FileCheck,
  ShieldAlert,
  Lock,
  Maximize,
  Minimize,
  AlertOctagon,
  RotateCcw,
  ExternalLink,
  MessageSquare,
  Radio,
  Volume2
} from 'lucide-react';
import { sampleCandidateBroadcastHistory } from '../../data/governanceSecurityData';

export const LiveExam: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    answers, 
    markedForReview, 
    answerQuestion, 
    toggleMarkForReview, 
    timeRemainingSeconds, 
    networkStatus,
    triggerNetworkInterruption,
    restoreNetwork,
    setCurrentView,
    addNotification
  } = useResilience();

  const [paletteMobileOpen, setPaletteMobileOpen] = useState(false);
  
  // Anti-Cheating & Lockdown Security States
  const [strikeCount, setStrikeCount] = useState<number>(0);
  const [isTerminated, setIsTerminated] = useState<boolean>(false);
  const [terminationReason, setTerminationReason] = useState<string>('');
  const [terminationTime, setTerminationTime] = useState<string>('');
  const [warningBanner, setWarningBanner] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [communicationHistoryOpen, setCommunicationHistoryOpen] = useState<boolean>(false);

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestionIndex] || questions[1];
  const selectedOption = answers[currentQ.id];
  const isMarked = markedForReview.includes(currentQ.id);

  // Terminate Exam for Malpractice
  const triggerExamTermination = useCallback((reason: string) => {
    const now = new Date().toLocaleTimeString();
    setIsTerminated(true);
    setTerminationReason(reason);
    setTerminationTime(now);

    addNotification({
      target: 'candidate',
      type: 'alert',
      title: 'EXAM TERMINATED: Malpractice Flagged',
      message: `Exam paper suspended immediately. Reason: ${reason}`
    });

    addNotification({
      target: 'admin',
      type: 'alert',
      title: 'CANDIDATE DISQUALIFIED: ET-2026-ENG-4418',
      message: `Workstation WS-08-41 locked down due to critical integrity breach: ${reason}`
    });
  }, [addNotification]);

  // Handle Cheating Strike
  const handleSecurityStrike = useCallback((reason: string, isSevere: boolean = false) => {
    if (isTerminated) return;

    if (isSevere) {
      triggerExamTermination(reason);
      return;
    }

    setStrikeCount(prev => {
      const newStrikes = prev + 1;
      if (newStrikes >= 3) {
        triggerExamTermination(`Exceeded maximum security tolerance (3 strikes recorded). Last violation: ${reason}`);
      } else {
        setWarningBanner({
          show: true,
          message: `WARNING (Strike ${newStrikes}/3): ${reason}. Exam will terminate if 3 strikes are reached!`
        });

        addNotification({
          target: 'candidate',
          type: 'warning',
          title: `Security Strike #${newStrikes} Logged`,
          message: reason
        });

        setTimeout(() => {
          setWarningBanner({ show: false, message: '' });
        }, 5000);
      }
      return newStrikes;
    });
  }, [isTerminated, triggerExamTermination, addNotification]);

  // Anti-Screenshot, Anti-DevTools & Anti-Copy Keyboard and Mouse Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        handleSecurityStrike('Screen capture / PrintScreen attempt blocked');
        return;
      }

      // Block F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        handleSecurityStrike('Developer Console / F12 inspection attempt blocked');
        return;
      }

      // Block Ctrl+Shift+I / J / C (DevTools shortcuts)
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
        e.preventDefault();
        handleSecurityStrike('DevTools shortcut inspection attempt blocked', true);
        return;
      }

      // Block Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        handleSecurityStrike('Source code inspection shortcut blocked');
        return;
      }

      // Block Ctrl+P (Print to PDF)
      if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        handleSecurityStrike('Print page shortcut blocked');
        return;
      }

      // Block Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleSecurityStrike('Save page shortcut blocked');
        return;
      }

      // Block Alt+Tab or Windows key attempts
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        handleSecurityStrike('Application switching (Alt+Tab) blocked');
        return;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      handleSecurityStrike('Right-click context menu inspection blocked');
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      handleSecurityStrike('Content copy attempt blocked');
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      handleSecurityStrike('Content cut attempt blocked');
    };

    // Tab Switch / Visibility Change Listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleSecurityStrike('Candidate navigated away from examination tab (Visibility loss)', false);
      }
    };

    // Window Blur (Clicking outside browser or on secondary display)
    const handleWindowBlur = () => {
      handleSecurityStrike('Workstation window lost focus (Secondary application click detected)');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCut);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [handleSecurityStrike]);

  // Fullscreen Container Mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetExamSecurity = () => {
    setIsTerminated(false);
    setStrikeCount(0);
    setTerminationReason('');
  };

  // Mock total questions (40 items for palette)
  const totalQuestionsList = Array.from({ length: 40 }, (_, i) => i + 1);

  // =========================================================================
  // CRITICAL: FULL LOCKDOWN & TERMINATION SCREEN ("Paper vahi band ho jaaye")
  // =========================================================================
  if (isTerminated) {
    return (
      <div className="min-h-screen bg-[#110507] text-white flex items-center justify-center p-4 sm:p-6 animate-in fade-in select-none">
        <div className="max-w-2xl w-full bg-[#1F0A0E] border-2 border-[#C62828] rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
          {/* Ambient Red Alert Glow */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#C62828]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#C62828]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Alert Crest */}
          <div className="w-20 h-20 rounded-2xl bg-[#C62828] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#C62828]/40 animate-bounce">
            <AlertOctagon className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E53935] px-3 py-1 rounded-full bg-red-950/80 border border-red-800">
              CRITICAL INTEGRITY BREACH • CODE #MAL-4418
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
              EXAMINATION TERMINATED DUE TO CHEATING VIOLATION
            </h1>
            <p className="text-sm text-red-200/90 font-medium max-w-lg mx-auto leading-relaxed">
              Aapki pariksha ko aniyamitta (cheating / malpractice policy violation) ki wajah se turant band (terminate) kar diya gaya hai.
            </p>
          </div>

          {/* Forensic Incident Snapshot */}
          <div className="p-4 rounded-2xl bg-black/60 border border-red-900/60 text-left space-y-2 font-mono text-xs">
            <div className="flex justify-between border-b border-red-900/40 pb-1.5 text-gray-400">
              <span>Candidate Roll:</span>
              <span className="text-white font-bold">ET-2026-ENG-4418</span>
            </div>
            <div className="flex justify-between border-b border-red-900/40 pb-1.5 text-gray-400">
              <span>Terminal Workstation:</span>
              <span className="text-white">WS-08-41 (Centre 08)</span>
            </div>
            <div className="flex justify-between border-b border-red-900/40 pb-1.5 text-gray-400">
              <span>Lockdown Timestamp:</span>
              <span className="text-white">{terminationTime}</span>
            </div>
            <div className="flex justify-between border-b border-red-900/40 pb-1.5 text-gray-400">
              <span>Security Striking:</span>
              <span className="text-[#E53935] font-bold">3 Strikes / Severe Breach</span>
            </div>
            <div className="pt-1 text-red-300 font-sans">
              <strong>Violation Trigger:</strong> {terminationReason}
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
            All candidate actions, camera frames, and network packets have been cryptographically committed into the central judicial audit record.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('audit')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-lg transition-colors cursor-pointer"
            >
              View Cryptographic Incident Proof
            </button>

            <button
              onClick={resetExamSecurity}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-gray-200 border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Container (Judge Simulator Mode)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // NORMAL ACTIVE EXAMINATION ROOM (WITH ANTI-SCREENSHOT & ANTI-CHEATING LOCK)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8F8F6] dark:bg-[#0A0B0E] flex flex-col transition-colors duration-300 relative select-none">
      {/* Background Anti-Leak Dynamic Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] dark:opacity-[0.05] overflow-hidden flex flex-wrap gap-24 p-8 transform -rotate-12 select-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="text-xs font-mono font-black text-gray-900 dark:text-white whitespace-nowrap">
            ET-2026-ENG-4418 • ADARSH SINGH • 192.168.108.41 • CONFIDENTIAL ASSESSMENT
          </div>
        ))}
      </div>

      {/* Floating Warning Banner when Violation Occurs */}
      {warningBanner.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4 animate-in slide-in-from-top duration-300">
          <div className="bg-[#C62828] text-white p-3.5 rounded-2xl shadow-2xl border-2 border-red-400 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-300 shrink-0 animate-bounce" />
            <div className="text-xs">
              <span className="font-black block uppercase tracking-wide">Security Integrity Warning</span>
              <p className="mt-0.5 leading-snug">{warningBanner.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* EXAM HEADER */}
      <header className="bg-white/90 dark:bg-[#13151D]/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-16 z-30 shadow-xs relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Exam Subject & Roll */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-[#C62828] border border-red-200 dark:border-red-900/60 font-mono">
                  PAPER: ENG-304
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono hidden sm:inline">Roll: ET-2026-4418</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                  strikeCount === 0 
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-[#16803C] border-emerald-200 dark:border-emerald-800' 
                    : 'bg-red-50 dark:bg-red-950/60 text-[#C62828] border-red-200 dark:border-red-800 animate-pulse'
                }`}>
                  Strikes: {strikeCount} / 3
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">
                Engineering Mathematics III
              </h1>
            </div>

            {/* Dynamic Connection Status Notification Bar */}
            <div className="flex items-center gap-3">
              {networkStatus === 'connected' && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#16803C] border border-emerald-200 dark:border-emerald-800 text-xs font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#16803C]" />
                  <span>● Connected</span>
                </div>
              )}

              {networkStatus === 'interrupted' && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-[#C77A00] border border-amber-300 dark:border-amber-700 text-xs font-bold animate-pulse shadow-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#C77A00]" />
                  <span>⚠ Connection interrupted. Your response is protected.</span>
                </div>
              )}

              {networkStatus === 'reconnecting' && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  <span>✓ Connection restored. Reconciling...</span>
                </div>
              )}

              {/* Fullscreen Secure Mode Toggle */}
              <button
                onClick={toggleFullscreen}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                title="Toggle Fullscreen Lockdown Container"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Lock'}</span>
              </button>

              {/* Timer Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-900 dark:bg-[#1C202C] text-white font-mono text-xs font-black shadow-md border border-gray-700">
                <Clock className="w-3.5 h-3.5 text-[#E53935]" />
                <span className="tracking-wider">{formatTime(timeRemainingSeconds)}</span>
              </div>

              {/* Mobile Palette Button */}
              <button
                onClick={() => setPaletteMobileOpen(!paletteMobileOpen)}
                className="lg:hidden p-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle Question Palette"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Resilient Simulation Bar inside Exam */}
          <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
              <span className="hidden sm:inline">ExamresQ Active Protection Daemon</span>
              <span>•</span>
              <span className="text-[#C62828] font-bold">Anti-Cheating & Outage Controls:</span>
            </div>

            <div className="flex items-center gap-2">
              {networkStatus === 'connected' ? (
                <button
                  onClick={triggerNetworkInterruption}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer"
                >
                  ⚡ Simulate Disconnection
                </button>
              ) : (
                <button
                  onClick={restoreNetwork}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                >
                  ✓ Restore Connection & Sync
                </button>
              )}

              {/* Immediate Disqualification Simulation for Judge */}
              <button
                onClick={() => triggerExamTermination('Multiple faces & secondary device detected by AI integrity classifier.')}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-900 hover:bg-black text-red-400 border border-red-900/50 transition-colors cursor-pointer"
                title="Test how paper immediately terminates upon severe malpractice"
              >
                🚨 Test Malpractice Lockout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN EXAM WORKSPACE */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: QUESTION WORKSPACE (8 cols) */}
          <div className="lg:col-span-8 space-y-5">

            {/* REQUIREMENT 8: CANDIDATE COMMUNICATION & REAL-TIME STATUS BANNER */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              networkStatus === 'interrupted' 
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200' 
                : networkStatus === 'reconnecting'
                ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200'
                : 'bg-white dark:bg-[#13151D] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    networkStatus === 'interrupted' ? 'bg-amber-100 dark:bg-amber-900/60 text-[#C77A00]' :
                    networkStatus === 'reconnecting' ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 animate-spin' :
                    'bg-emerald-50 dark:bg-emerald-950/50 text-[#16803C]'
                  }`}>
                    {networkStatus === 'interrupted' ? <AlertTriangle className="w-4 h-4" /> :
                     networkStatus === 'reconnecting' ? <RotateCcw className="w-4 h-4" /> :
                     <Radio className="w-4 h-4 animate-pulse" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 dark:bg-white/10">
                        Requirement 8: Candidate Advisory
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        networkStatus === 'interrupted' ? 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100' :
                        networkStatus === 'reconnecting' ? 'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100' :
                        'bg-emerald-100 dark:bg-emerald-900 text-[#16803C] dark:text-emerald-200'
                      }`}>
                        Status: {networkStatus.toUpperCase()} • {networkStatus === 'interrupted' ? 'EXAM PAUSED (TIMER FROZEN)' : 'EXAM CONTINUING'}
                      </span>
                    </div>

                    <p className="text-xs mt-1 font-medium leading-relaxed">
                      {networkStatus === 'interrupted' && (
                        <span>
                          <strong>Please remain seated and calm.</strong> Your session has been interrupted, and your saved responses are safely encrypted locally. The central authority is checking your records and establishing secondary link.
                        </span>
                      )}
                      {networkStatus === 'reconnecting' && (
                        <span>
                          <strong>Secondary route connected.</strong> Reconciling candidate buffered responses with the central cluster before resuming your test paper.
                        </span>
                      )}
                      {networkStatus === 'connected' && (
                        <span>
                          <strong>Active session operational.</strong> Periodic auto-save heartbeat commits answers every 3 seconds with zero interruption.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => setCommunicationHistoryOpen(true)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
                    title="View candidate communication history"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Advisory History (4)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-[#13151D] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-7 shadow-xs relative">
              {/* Security Shield Watermark Pill */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-gray-900 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-800">
                <Lock className="w-3 h-3 text-[#16803C]" />
                <span>Anti-Copy Protected</span>
              </div>

              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Question {currentQ.questionNumber} of {currentQ.totalQuestions}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                    Single Choice (+4, -1)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedOption ? (
                    <span className="text-xs font-bold text-[#16803C] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Answered
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-500">
                      Not Answered
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-relaxed">
                {currentQ.text}
              </div>

              {/* Code / Equation Snippet if any */}
              {currentQ.codeSnippet && (
                <div className="mt-4 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {currentQ.codeSnippet}
                </div>
              )}

              {/* Options List */}
              <div className="mt-6 space-y-3">
                {currentQ.options.map((option) => {
                  const isChecked = selectedOption === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => answerQuestion(currentQ.id, option.id)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#C62828] bg-red-50/40 dark:bg-red-950/30 text-gray-900 dark:text-white ring-1 ring-[#C62828]/30 shadow-xs'
                          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181B26] hover:bg-gray-50 dark:hover:bg-gray-850 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isChecked ? 'border-[#C62828] bg-[#C62828] text-white' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
                        }`}>
                          {isChecked && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="flex-1 text-xs sm:text-sm font-medium">
                        <span className="font-bold mr-2 text-gray-900 dark:text-white">{option.id}.</span>
                        <span>{option.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons: [Previous] [Mark for Review] [Save & Next] */}
              <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMarkForReview(currentQ.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      isMarked
                        ? 'border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dedicated Response Protection Component */}
            <ResponseProtectionWidget />
          </div>

          {/* RIGHT: AI PROCTORING & QUESTION PALETTE (4 cols) */}
          <div className={`lg:col-span-4 space-y-5 ${paletteMobileOpen ? 'block' : 'hidden lg:block'}`}>
            {/* AI-Powered Proctoring & Live WebCam */}
            <AIProctoringHUD onCheatingViolation={handleSecurityStrike} />

            {/* Question Palette */}
            <div className="bg-white dark:bg-[#13151D] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Question Palette (40 Questions)
                </h3>
                <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  {Object.keys(answers).length} Answered
                </span>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 dark:text-gray-400 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#16803C]" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-purple-600" />
                  <span>Marked Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-red-100 dark:bg-red-950 border border-[#C62828]" />
                  <span>Current Question</span>
                </div>
              </div>

              {/* Question Grid Numbers 1 to 40 */}
              <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2">
                {totalQuestionsList.map((qNum) => {
                  const isCurrent = currentQ.questionNumber === qNum;
                  const isAnswered = !!answers[qNum];
                  const isReview = markedForReview.includes(qNum);

                  let bgStyle = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 border border-transparent';
                  if (isCurrent) {
                    bgStyle = 'bg-red-50 dark:bg-red-950 text-[#C62828] border-2 border-[#C62828] font-bold shadow-xs';
                  } else if (isReview) {
                    bgStyle = 'bg-purple-600 text-white font-bold';
                  } else if (isAnswered) {
                    bgStyle = 'bg-[#16803C] text-white font-bold';
                  }

                  return (
                    <button
                      key={qNum}
                      onClick={() => {
                        const foundIdx = questions.findIndex(q => q.questionNumber === qNum);
                        if (foundIdx !== -1) {
                          setCurrentQuestionIndex(foundIdx);
                        } else {
                          setCurrentQuestionIndex(1);
                        }
                      }}
                      className={`h-9 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${bgStyle}`}
                    >
                      {qNum}
                    </button>
                  );
                })}
              </div>

              {/* Submit Final Assessment */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <button
                  onClick={() => setCurrentView('audit')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <FileCheck className="w-4 h-4 text-[#16803C]" />
                  <span>Submit Exam & View Audit Proof</span>
                </button>
                <p className="text-[10px] text-gray-500 text-center">
                  Protected by ExamresQ Immutable SHA-256 State Ledger.
                </p>
              </div>
            </div>

            {/* Anti-Cheating Policy Callout */}
            <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs space-y-1.5">
              <span className="font-bold text-[#C62828] block flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Zero-Tolerance Anti-Cheating Lock
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                Tab switches, window deviations, secondary faces, and screen captures are tracked live. 3 violations or face absence results in immediate paper termination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REQUIREMENT 8: CANDIDATE COMMUNICATION HISTORY MODAL */}
      {communicationHistoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#13151D] text-gray-900 dark:text-white rounded-3xl max-w-lg w-full border border-gray-200 dark:border-gray-800 shadow-2xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Candidate Advisory & Status History</h3>
                  <p className="text-xs text-gray-500 font-mono">Requirement 8 Chronological Broadcast Log</p>
                </div>
              </div>

              <button 
                onClick={() => setCommunicationHistoryOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {sampleCandidateBroadcastHistory.map((msg) => (
                <div 
                  key={msg.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-[#1A1E2B] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        msg.sessionState === 'Interrupted' ? 'bg-[#C62828]' :
                        msg.sessionState === 'Recovering' ? 'bg-blue-600 animate-spin' :
                        'bg-[#16803C]'
                      }`} />
                      {msg.title}
                    </span>
                    <span className="font-mono text-gray-500 text-[11px]">{msg.timestamp}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                    {msg.instruction}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 font-mono">
                    <span>Channel: {msg.deliveryChannel}</span>
                    <span className="text-[#16803C] font-bold">✓ Delivered & Displayed</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setCommunicationHistoryOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-black cursor-pointer"
              >
                Close Advisory Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
