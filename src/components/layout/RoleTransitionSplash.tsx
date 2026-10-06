import React, { useState, useEffect } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { useTheme } from '../../context/ThemeContext';
import examresqLogo from '../../assets/examresq-logo.png';
import { 
  ShieldCheck, 
  Radio, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Cpu,
  User,
  X
} from 'lucide-react';

export const RoleTransitionSplash: React.FC = () => {
  const { transitioningRole, setTransitioningRole, studentName, setStudentName } = useResilience();
  const { isDark } = useTheme();

  const [progress, setProgress] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(3);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!transitioningRole) {
      setProgress(0);
      setRemainingSeconds(3);
      setCurrentStepIndex(0);
      return;
    }

    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    const fallbackTimeout = setTimeout(() => {
      setTransitioningRole(null);
    }, 3200);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      const secs = Math.max(1, 3 - Math.floor(elapsed / 1000));
      setRemainingSeconds(secs);

      if (elapsed < 1000) {
        setCurrentStepIndex(0);
      } else if (elapsed < 2000) {
        setCurrentStepIndex(1);
      } else {
        setCurrentStepIndex(2);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        clearTimeout(fallbackTimeout);
        setTransitioningRole(null);
      }
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, [transitioningRole, setTransitioningRole]);

  if (!transitioningRole) return null;

  const isStudent = transitioningRole === 'student';

  const studentSteps = [
    {
      title: `Step 1/3: Arming Cryptographic Sandbox for ${studentName || 'Candidate'}`,
      subtitle: "WebCrypto AES-256 & SHA-256 local ledger initialized",
      icon: <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: "Step 2/3: Securing Offline Buffer",
      subtitle: "IndexedDB zero-loss failover storage armed on local workstation",
      icon: <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: `Step 3/3: Terminal Armed for ${studentName || 'Candidate'}`,
      subtitle: `Station linked • Entering Student Examination Terminal as ${studentName || 'Candidate'}...`,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  const officerSteps = [
    {
      title: "Step 1/3: Establishing Command Mesh",
      subtitle: "Authenticating Level-4 Surveillance Protocol & Token",
      icon: <Radio className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
    },
    {
      title: "Step 2/3: Polling Telemetry Watchdogs",
      subtitle: "1.2s sub-second failure monitoring synced across 3 centres",
      icon: <Activity className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
    },
    {
      title: "Step 3/3: Clearance Verified",
      subtitle: "Surveillance console unlocked • Decrypting live stream...",
      icon: <ShieldCheck className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
    }
  ];

  const steps = isStudent ? studentSteps : officerSteps;
  const currentStep = steps[currentStepIndex] || steps[0];

  return (
    <div className={`
      fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-xl transition-all duration-300 animate-in fade-in select-none
      ${isDark ? 'bg-[#070B14]/95 text-white' : 'bg-white/95 text-[#111827]'}
    `}>
      {/* Background ambient glow pulse */}
      <div className={`
        absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-1000
        ${isStudent 
          ? (isDark ? 'bg-emerald-500' : 'bg-[#C62828]') 
          : (isDark ? 'bg-[#0284C7]' : 'bg-[#C62828]')}
      `} />

      <div className={`
        relative w-full max-w-lg sm:max-w-xl p-6 sm:p-9 rounded-3xl border shadow-2xl flex flex-col items-center text-center space-y-6 overflow-hidden transition-colors duration-300
        ${isDark 
          ? 'bg-[#0B0F19]/95 border-[#1E293B] shadow-[0_0_60px_rgba(2,132,199,0.2)]' 
          : 'bg-white border-red-200 shadow-[0_25px_70px_rgba(198,40,40,0.18)]'}
      `}>
        {/* Top-right quick dismiss button */}
        <button
          onClick={() => setTransitioningRole(null)}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-30"
          title="Dismiss splash"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Top Progress Track */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isDark ? 'bg-white/5' : 'bg-red-50'}`}>
          <div 
            className={`h-full transition-all duration-75 ${
              isStudent ? (isDark ? 'bg-emerald-500' : 'bg-[#C62828]') : (isDark ? 'bg-[#38BDF8]' : 'bg-[#C62828]')
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Large Zoomed-In Logo Area with 3-second animated pulse rings & progressive zoom */}
        <div className="relative flex items-center justify-center my-3 sm:my-4">
          {/* Animated concentric outer rings - Enlarged */}
          <div className={`
            absolute -inset-6 sm:-inset-10 rounded-full border-2 border-dashed opacity-40 animate-spin
            ${isStudent ? (isDark ? 'border-emerald-500' : 'border-[#C62828]') : (isDark ? 'border-[#38BDF8]' : 'border-[#C62828]')}
          `} style={{ animationDuration: '6s' }} />

          <div className={`
            absolute -inset-10 sm:-inset-16 rounded-full border opacity-20 animate-ping
            ${isStudent 
              ? (isDark ? 'bg-emerald-500/20 border-emerald-500' : 'bg-red-500/20 border-red-500') 
              : (isDark ? 'bg-sky-500/20 border-sky-500' : 'bg-red-500/20 border-red-500')}
          `} style={{ animationDuration: '2.4s' }} />

          {/* Official ExamresQ Logo Image with Progressive Cinematic Zoom (Circular Emblem) */}
          <div 
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full flex items-center justify-center relative z-10 transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${1.02 + (progress / 100) * 0.14})`
            }}
          >
            <img 
              src={examresqLogo} 
              alt="ExamresQ Official Logo" 
              className="w-full h-full object-contain rounded-full drop-shadow-[0_16px_36px_rgba(198,40,40,0.28)] dark:drop-shadow-[0_16px_36px_rgba(2,132,199,0.35)] transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* 3s Countdown badge */}
          <div className={`
            absolute -bottom-3 sm:-bottom-4 px-3 sm:px-4 py-1 rounded-full font-mono font-bold text-xs sm:text-sm shadow-xl border-2 z-20 flex items-center gap-1.5
            ${isStudent 
              ? (isDark ? 'bg-emerald-500 text-black border-emerald-300' : 'bg-[#C62828] text-white border-red-200')
              : (isDark ? 'bg-[#38BDF8] text-black border-sky-300' : 'bg-[#C62828] text-white border-red-200')}
          `}>
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            <span>0{remainingSeconds}s</span>
          </div>
        </div>

        {/* Role Title & Mode Indicator */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className={`
              text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border
              ${isStudent 
                ? (isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-50 text-[#C62828] border-red-200') 
                : (isDark ? 'bg-sky-500/10 text-[#38BDF8] border-sky-500/30' : 'bg-red-50 text-[#C62828] border-red-200')}
            `}>
              {isStudent ? 'Candidate Workspace' : 'Officer Surveillance Hub'}
            </span>
            <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400 uppercase font-bold">
              {isDark ? 'Dark Mode' : 'Red & White Light'}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black tracking-tight text-[#111827] dark:text-white">
            {isStudent ? 'Arming Student Examination Terminal' : 'Authorizing Officer Surveillance Console'}
          </h2>
        </div>

        {/* Interactive Student Name Input (User Requested: "jab student dashboard aata hai to mujhe add karna student name at least le") */}
        {isStudent && (
          <div className={`
            w-full p-3 rounded-2xl border text-left space-y-1.5 transition-all
            ${isDark ? 'bg-[#060911] border-[#162033]' : 'bg-red-50/30 border-red-100'}
          `}>
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-gray-800 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C62828] dark:text-emerald-400" />
                <span>Candidate Full Name:</span>
              </span>
              <span className="text-[10px] text-[#C62828] dark:text-emerald-400 font-mono font-bold">
                ● Roll: ET-2026-4418
              </span>
            </div>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Adarsh Singh"
              className={`
                w-full px-3 py-1.5 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-[#C62828]
                ${isDark 
                  ? 'bg-[#0C1222] border-slate-700 text-white placeholder-gray-500' 
                  : 'bg-white border-red-200 text-gray-900 placeholder-gray-400'}
              `}
              title="Edit candidate name to customize exam session"
            />
            <p className="text-[10px] text-gray-500 dark:text-slate-400 font-mono leading-tight">
              Biometric certificate will be issued to this name across all terminal screens.
            </p>
          </div>
        )}

        {/* Dynamic 3-Step Simulation Status Box */}
        <div className={`
          w-full p-3.5 rounded-2xl border text-left transition-all duration-300
          ${isDark 
            ? 'bg-[#060911] border-[#162033]' 
            : 'bg-red-50/30 border-red-100'}
        `}>
          <div className="flex items-center gap-2.5 mb-1">
            <div className={`
              p-1.5 rounded-lg border shrink-0
              ${isDark ? 'bg-black/40 border-white/10' : 'bg-white border-red-100 shadow-2xs'}
            `}>
              {currentStep.icon}
            </div>
            <span className="font-bold text-xs font-mono text-[#111827] dark:text-white truncate">
              {currentStep.title}
            </span>
          </div>
          <p className="text-[11px] text-gray-600 dark:text-gray-400 pl-8 leading-relaxed font-sans">
            {currentStep.subtitle}
          </p>

          {/* Stepper dots */}
          <div className="flex items-center gap-1.5 mt-2.5 pl-8">
            {[0, 1, 2].map((idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex 
                    ? `w-8 ${isStudent ? (isDark ? 'bg-emerald-500' : 'bg-[#C62828]') : (isDark ? 'bg-[#38BDF8]' : 'bg-[#C62828]')}` 
                    : idx < currentStepIndex
                    ? `w-3 ${isStudent ? (isDark ? 'bg-emerald-700' : 'bg-red-700') : (isDark ? 'bg-blue-700' : 'bg-red-700')}`
                    : `w-3 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Footer Controls */}
        <div className="pt-1 flex items-center justify-between w-full text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-slate-400 font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>3s Security Handshake</span>
          </span>
          <button
            onClick={() => setTransitioningRole(null)}
            className={`
              px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm
              ${isStudent 
                ? (isDark ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-[#C62828] text-white hover:bg-[#8E1B1B]') 
                : (isDark ? 'bg-[#0284C7] text-white hover:bg-sky-500' : 'bg-[#C62828] text-white hover:bg-[#8E1B1B]')}
            `}
          >
            <span>Proceed to Dashboard →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
