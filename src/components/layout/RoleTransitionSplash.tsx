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
  User
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
      }
    }, 50);

    return () => clearInterval(interval);
  }, [transitioningRole]);

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
  const currentStep = steps[currentStepIndex];

  return (
    <div className={`
      fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-xl transition-all duration-300 animate-in fade-in select-none
      ${isDark ? 'bg-[#070B14]/95 text-white' : 'bg-[#F8FAFC]/95 text-[#0F172A]'}
    `}>
      {/* Background ambient glow pulse */}
      <div className={`
        absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000
        ${isStudent 
          ? (isDark ? 'bg-emerald-500' : 'bg-emerald-600') 
          : (isDark ? 'bg-[#0284C7]' : 'bg-[#1E3A8A]')}
      `} />

      <div className={`
        relative w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl flex flex-col items-center text-center space-y-5 overflow-hidden transition-colors duration-300
        ${isDark 
          ? 'bg-[#0B0F19]/90 border-[#1E293B] shadow-[0_0_50px_rgba(2,132,199,0.15)]' 
          : 'bg-white border-[#E2E8F0] shadow-[0_20px_60px_rgba(15,23,42,0.08)]'}
      `}>
        
        {/* Top Progress Track */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
          <div 
            className={`h-full transition-all duration-75 ${
              isStudent ? 'bg-emerald-500' : (isDark ? 'bg-[#38BDF8]' : 'bg-[#1E3A8A]')
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Circular Logo Area with 3-second animated pulse rings */}
        <div className="relative flex items-center justify-center my-1">
          {/* Animated concentric rings */}
          <div className={`
            absolute -inset-4 rounded-full border-2 border-dashed opacity-40 animate-spin
            ${isStudent ? 'border-emerald-500' : (isDark ? 'border-[#38BDF8]' : 'border-[#1E3A8A]')}
          `} style={{ animationDuration: '6s' }} />

          <div className={`
            absolute -inset-8 rounded-full border opacity-20 animate-ping
            ${isStudent ? 'bg-emerald-500/20 border-emerald-500' : (isDark ? 'bg-sky-500/20 border-sky-500' : 'bg-blue-500/20 border-blue-500')}
          `} style={{ animationDuration: '2s' }} />

          {/* Official ExamresQ Logo Image */}
          <div className={`
            w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2 border-2 shadow-xl flex items-center justify-center relative z-10 transition-transform duration-300 hover:scale-105
            ${isDark ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}
          `}>
            <img 
              src={examresqLogo} 
              alt="ExamresQ Official Logo" 
              className="w-full h-full object-contain rounded-full drop-shadow-md"
            />
          </div>

          {/* 3s Countdown badge */}
          <div className={`
            absolute -bottom-1.5 right-1 px-2.5 py-0.5 rounded-full font-mono font-bold text-xs shadow-md border z-20 flex items-center gap-1
            ${isStudent 
              ? 'bg-emerald-500 text-black border-emerald-400' 
              : (isDark ? 'bg-[#38BDF8] text-black border-sky-300' : 'bg-[#1E3A8A] text-white border-blue-900')}
          `}>
            <span>0{remainingSeconds}s</span>
          </div>
        </div>

        {/* Role Title & Mode Indicator */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className={`
              text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border
              ${isStudent 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30' 
                : 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-sky-500/10 dark:text-[#38BDF8] dark:border-sky-500/30'}
            `}>
              {isStudent ? 'Candidate Workspace' : 'Officer Surveillance Hub'}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black tracking-tight text-[#0F172A] dark:text-white">
            {isStudent ? 'Arming Student Examination Terminal' : 'Authorizing Officer Surveillance Console'}
          </h2>
        </div>

        {/* Interactive Student Name Input (User Requested: "jab student dashboard aata hai to mujhe add karna student name at least le") */}
        {isStudent && (
          <div className={`
            w-full p-3 rounded-2xl border text-left space-y-1.5 transition-all
            ${isDark ? 'bg-[#060911] border-[#162033]' : 'bg-slate-50 border-slate-200'}
          `}>
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Candidate Full Name:</span>
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                ● Roll: ET-2026-4418
              </span>
            </div>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Adarsh Singh"
              className={`
                w-full px-3 py-1.5 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500
                ${isDark 
                  ? 'bg-[#0C1222] border-slate-700 text-white placeholder-gray-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'}
              `}
              title="Edit candidate name to customize exam session"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-tight">
              Biometric certificate will be issued to this name across all terminal screens.
            </p>
          </div>
        )}

        {/* Dynamic 3-Step Simulation Status Box */}
        <div className={`
          w-full p-3.5 rounded-2xl border text-left transition-all duration-300
          ${isDark 
            ? 'bg-[#060911] border-[#162033]' 
            : 'bg-slate-50 border-slate-200'}
        `}>
          <div className="flex items-center gap-2.5 mb-1">
            <div className={`
              p-1.5 rounded-lg border shrink-0
              ${isDark ? 'bg-black/40 border-white/10' : 'bg-white border-slate-200'}
            `}>
              {currentStep.icon}
            </div>
            <span className="font-bold text-xs font-mono text-[#0F172A] dark:text-white truncate">
              {currentStep.title}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-gray-400 pl-8 leading-relaxed font-sans">
            {currentStep.subtitle}
          </p>

          {/* Stepper dots */}
          <div className="flex items-center gap-1.5 mt-2.5 pl-8">
            {[0, 1, 2].map((idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex 
                    ? `w-8 ${isStudent ? 'bg-emerald-500' : (isDark ? 'bg-[#38BDF8]' : 'bg-[#1E3A8A]')}` 
                    : idx < currentStepIndex
                    ? `w-3 ${isStudent ? 'bg-emerald-700' : 'bg-blue-700'}`
                    : `w-3 ${isDark ? 'bg-gray-800' : 'bg-slate-300'}`
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Footer Controls */}
        <div className="pt-1 flex items-center justify-between w-full text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>3s Security Handshake</span>
          </span>
          <button
            onClick={() => setTransitioningRole(null)}
            className={`
              px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1
              ${isStudent 
                ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-sm' 
                : 'bg-[#0284C7] text-white hover:bg-sky-500 shadow-sm'}
            `}
          >
            <span>Proceed to Dashboard →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
