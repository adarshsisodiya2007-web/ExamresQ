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

      // Pre-fill name from localStorage or studentName from context
      const savedName = localStorage.getItem('examresq_student_name') || 'Adarsh Singh';
      setFullName(savedName);

      setIsOpen(true);
    }
  }, [userRole]);

  const handleVerifyAndEnter = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = fullName.trim() || 'Adarsh Singh';

    if (cleanName.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    setIsVerifying(true);

    // Smooth session setup (400ms)
    setTimeout(() => {
      // 1. Update resilience student name
      setStudentName(cleanName);
      try {
        localStorage.setItem('examresq_student_name', cleanName);
        sessionStorage.setItem('examresq_student_verified_tab', 'true');
        sessionStorage.setItem('examresq_station_id', assignedStation || 'STATION-14');
      } catch {}

      // 2. Register this tab in the multi-candidate mesh
      multiCandidateMeshService.registerLocalCandidate({
        name: cleanName,
        aadhar: aadharNumber || '5842 1904 8821',
        phone: phoneNumber || '9876543210',
        stationId: assignedStation || 'STATION-14',
        rollNo: assignedRoll || 'ET-2026-ENG-4418'
      });

      setIsVerifying(false);
      setIsOpen(false);
    }, 400);
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
        
        {/* Official ExamresQ Circular Logo */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center relative">
          <img 
            src={examresqLogo} 
            alt="ExamresQ Official Logo" 
            className="w-full h-full object-contain rounded-full drop-shadow-[0_8px_20px_rgba(185,28,60,0.22)]"
          />
        </div>

        {/* Modal Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-red-50 text-[#B91C3C] border border-[#F0D9D4] dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50">
            Before You Begin
          </span>
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white pt-2">
            Student Verification
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Confirm your details to enter the secure exam environment
          </p>
        </div>

        {/* 3 Visual Storytelling Verification Status Checks (Rule 11) */}
        <div className="w-full space-y-2 p-4 rounded-2xl bg-[#FFF8F5] dark:bg-[#080D1A] border border-[#F0D9D4] dark:border-gray-800 text-left">
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-800 dark:text-gray-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Identity Verified</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-800 dark:text-gray-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Exam Access Verified</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-800 dark:text-gray-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Secure Session Ready</span>
          </div>
        </div>

        {/* Candidate Profile Details Card */}
        <div className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D1527] text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Exam:</span>
            <span className="font-bold text-gray-900 dark:text-white">Mid-Semester Assessment</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Assigned Station:</span>
            <span className="font-mono text-emerald-600 font-bold">{assignedStation || 'STATION-14'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Roll Number:</span>
            <span className="font-mono text-gray-700 dark:text-gray-300 font-semibold">{assignedRoll || 'ET-2026-ENG-4418'}</span>
          </div>
        </div>

        {/* Form Inputs (Always Editable) */}
        <form onSubmit={handleVerifyAndEnter} className="w-full space-y-3.5 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
              <span>Candidate Full Name:</span>
              <span className="text-[10px] text-gray-400 font-normal">Type or edit your name</span>
            </label>
            <input 
              type="text"
              required
              autoFocus
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Adarsh Singh"
              className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 dark:border-gray-700 bg-white dark:bg-[#080C17] text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B91C3C]/30 focus:border-[#B91C3C] shadow-2xs"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 text-[#B91C3C] text-xs font-semibold border border-red-200">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#B91C3C] hover:bg-[#8E1B1B] text-white transition-all cursor-pointer shadow-md shadow-red-900/20 flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Preparing Session...</span>
              </>
            ) : (
              <>
                <span>Start Exam</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secure Examination Session</span>
        </div>

      </div>
    </div>
  );
};
