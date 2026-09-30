import React, { useState, useEffect } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { useTheme } from '../../context/ThemeContext';
import examresqLogo from '../../assets/examresq-logo.png';
import { multiCandidateMeshService } from '../../services/multiCandidateMeshService';
import { 
  ShieldCheck, 
  User, 
  CreditCard, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const CandidateVerificationModal: React.FC = () => {
  const { userRole, setStudentName } = useResilience();
  const { isDark } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [assignedStation, setAssignedStation] = useState('');
  const [assignedRoll, setAssignedRoll] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Check on mount and role changes if this tab has verified its candidate identity
  useEffect(() => {
    if (userRole !== 'student') {
      setIsOpen(false);
      return;
    }

    const verified = sessionStorage.getItem('examresq_student_verified_tab');
    if (!verified) {
      // Pick or generate unique station & roll number for this tab
      const randomStationNum = Math.floor(14 + Math.random() * 25);
      const station = `STATION-${randomStationNum}`;
      const roll = `ET-2026-ENG-${Math.floor(4418 + Math.random() * 80)}`;
      setAssignedStation(station);
      setAssignedRoll(roll);

      // Pre-fill name from localStorage if exists
      const savedName = localStorage.getItem('examresq_student_name') || '';
      if (savedName) setFullName(savedName);

      setIsOpen(true);
    }
  }, [userRole]);

  // Aadhaar auto-formatter (XXXX XXXX XXXX)
  const handleAadharChange = (val: string) => {
    const rawDigits = val.replace(/\D/g, '').slice(0, 12);
    const parts = rawDigits.match(/.{1,4}/g);
    setAadharNumber(parts ? parts.join(' ') : rawDigits);
  };

  // Phone auto-formatter (10 digits)
  const handlePhoneChange = (val: string) => {
    const rawDigits = val.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(rawDigits);
  };

  const handleVerifyAndEnter = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = fullName.trim();
    const rawAadhar = aadharNumber.replace(/\s/g, '');
    const cleanPhone = phoneNumber.trim();

    if (cleanName.length < 3) {
      setErrorMsg('Please enter your full official name (min 3 characters).');
      return;
    }

    if (rawAadhar.length !== 12) {
      setErrorMsg('Aadhaar Card number must be exactly 12 numeric digits.');
      return;
    }

    if (cleanPhone.length !== 10) {
      setErrorMsg('Mobile number must be a valid 10-digit number.');
      return;
    }

    setIsVerifying(true);

    // Simulate cryptographic verification & ledger registration (600ms)
    setTimeout(() => {
      // 1. Update resilience student name
      setStudentName(cleanName);

      // 2. Mark this tab as verified
      try {
        sessionStorage.setItem('examresq_student_verified_tab', 'true');
        sessionStorage.setItem('examresq_student_aadhar', aadharNumber);
        sessionStorage.setItem('examresq_student_phone', phoneNumber);
        sessionStorage.setItem('examresq_station_id', assignedStation);
      } catch {}

      // 3. Register this tab in the multi-candidate mesh
      multiCandidateMeshService.registerLocalCandidate({
        name: cleanName,
        aadhar: aadharNumber,
        phone: phoneNumber,
        stationId: assignedStation,
        rollNo: assignedRoll
      });

      setIsVerifying(false);
      setIsOpen(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className={`
      fixed inset-0 z-[999999] flex items-center justify-center p-4 backdrop-blur-xl transition-all duration-300 animate-in fade-in select-none
      ${isDark ? 'bg-[#05070D]/95 text-white' : 'bg-white/95 text-[#111827]'}
    `}>
      {/* Background ambient light */}
      <div className={`
        absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none
        ${isDark ? 'bg-emerald-500' : 'bg-[#C62828]'}
      `} />

      <div className={`
        relative w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl flex flex-col items-center text-center space-y-5 transition-colors duration-300
        ${isDark 
          ? 'bg-[#0A0E1A]/95 border-[#1E293B] shadow-[0_0_50px_rgba(2,132,199,0.2)]' 
          : 'bg-white border-red-200 shadow-[0_20px_60px_rgba(198,40,40,0.15)]'}
      `}>
        
        {/* Official ExamresQ Logo */}
        <div className={`
          w-20 h-20 rounded-2xl p-2 border shadow-lg flex items-center justify-center
          ${isDark ? 'bg-[#080B14] border-slate-800' : 'bg-red-50/50 border-red-100'}
        `}>
          <img 
            src={examresqLogo} 
            alt="ExamresQ Official Logo" 
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className={`
              text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border
              ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-50 text-[#C62828] border-red-200'}
            `}>
              Mandatory Enrolment Gateway
            </span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
            Candidate Identity Verification
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
            Please authenticate your candidate credentials before opening the secure examination workstation.
          </p>
        </div>

        {/* Assigned Terminal Preview Badge */}
        <div className={`
          w-full px-3.5 py-2 rounded-xl border flex items-center justify-between font-mono text-[11px]
          ${isDark ? 'bg-[#060911] border-slate-800 text-slate-300' : 'bg-red-50/40 border-red-100 text-gray-700'}
        `}>
          <span className="flex items-center gap-1.5 font-bold text-[#C62828] dark:text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Assigned: {assignedStation}</span>
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">
            Roll: {assignedRoll}
          </span>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleVerifyAndEnter} className="w-full space-y-3.5 text-left">
          
          {/* 1. Full Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold font-mono text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C62828] dark:text-emerald-400" />
              <span>Full Name (As per Admit Card):</span>
            </label>
            <input 
              type="text"
              required
              autoFocus
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Adarsh Singh"
              className={`
                w-full px-3.5 py-2 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-[#C62828]
                ${isDark 
                  ? 'bg-[#080C17] border-slate-700 text-white placeholder-gray-500' 
                  : 'bg-white border-red-200 text-gray-900 placeholder-gray-400'}
              `}
            />
          </div>

          {/* 2. Aadhaar Card Number */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold font-mono text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#C62828] dark:text-emerald-400" />
              <span>Aadhaar Card Number (12 Digits):</span>
            </label>
            <input 
              type="text"
              required
              maxLength={14}
              value={aadharNumber}
              onChange={(e) => handleAadharChange(e.target.value)}
              placeholder="5842 1904 8821"
              className={`
                w-full px-3.5 py-2 rounded-xl border text-xs font-mono font-bold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-[#C62828]
                ${isDark 
                  ? 'bg-[#080C17] border-slate-700 text-white placeholder-gray-500' 
                  : 'bg-white border-red-200 text-gray-900 placeholder-gray-400'}
              `}
            />
          </div>

          {/* 3. Phone Number */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold font-mono text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C62828] dark:text-emerald-400" />
              <span>Mobile Phone Number (10 Digits):</span>
            </label>
            <div className="relative flex items-center">
              <span className={`
                absolute left-3 font-mono font-bold text-xs pointer-events-none
                ${isDark ? 'text-gray-500' : 'text-gray-400'}
              `}>
                +91
              </span>
              <input 
                type="tel"
                required
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="98765 43210"
                className={`
                  w-full pl-11 pr-3.5 py-2 rounded-xl border text-xs font-mono font-bold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-[#C62828]
                  ${isDark 
                    ? 'bg-[#080C17] border-slate-700 text-white placeholder-gray-500' 
                    : 'bg-white border-red-200 text-gray-900 placeholder-gray-400'}
                `}
              />
            </div>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-center gap-2 text-[11px] text-red-600 dark:text-red-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className={`
              w-full py-2.5 rounded-xl text-xs font-black tracking-wide uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2
              ${isDark 
                ? 'bg-emerald-500 text-black hover:bg-emerald-400' 
                : 'bg-[#C62828] text-white hover:bg-[#8E1B1B]'}
            `}
          >
            {isVerifying ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Arming Terminal Station...</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Verify Biometrics & Enter Exam Terminal →</span>
              </>
            )}
          </button>
        </form>

        {/* Security Seal Note */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>AES-256 Hardware Encrypted Station Ledger</span>
        </div>

      </div>
    </div>
  );
};
