import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  FileSpreadsheet, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Award, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  FileCheck2,
  HardDrive
} from 'lucide-react';

export const CandidatePortal: React.FC = () => {
  const { setCurrentView, studentName } = useResilience();
  const [subTab, setSubTab] = useState<'dashboard' | 'my_exams' | 'results' | 'profile'>('dashboard');

  const initials = studentName
    ? studentName.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AS';

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Candidate Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B0F19] p-6 rounded-2xl border border-red-100 dark:border-gray-800 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-gray-900 dark:text-white">{studentName}</h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#16803C] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Biometrics Verified
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Roll: <span className="font-mono text-gray-800 dark:text-gray-200 font-semibold">ET-2026-ENG-4418</span> • Assigned Centre: Centre 08 (North Academic Complex)
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-1 bg-red-50/60 dark:bg-gray-900 rounded-xl border border-red-100 dark:border-gray-800 self-start sm:self-auto">
            <button
              onClick={() => setSubTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'dashboard' ? 'bg-[#C62828] text-white shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-[#C62828]'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setSubTab('my_exams')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'my_exams' ? 'bg-[#C62828] text-white shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-[#C62828]'
              }`}
            >
              My Exams
            </button>
            <button
              onClick={() => setSubTab('results')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'results' ? 'bg-[#C62828] text-white shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-[#C62828]'
              }`}
            >
              Results & Audit
            </button>
            <button
              onClick={() => setSubTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'profile' ? 'bg-[#C62828] text-white shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-[#C62828]'
              }`}
            >
              Profile
            </button>
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {subTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Active / Current Live Assessment Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D1527] border-2 border-[#C62828] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C62828] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Live Assessment Available
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C62828]">Session 1 • Active Now</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                    Engineering Mathematics III
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-300 max-w-xl">
                    National Higher Technical Assessment 2026.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#C62828]" /> 60 Minutes</span>
                    <span className="flex items-center gap-1.5"><FileSpreadsheet className="w-4 h-4 text-[#C62828]" /> 40 Questions</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#16803C]" /> Offline Buffer Ready</span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    onClick={() => setCurrentView('live_exam')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-md shadow-[#C62828]/25 transition-all cursor-pointer"
                  >
                    <span>Start Exam</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 text-center font-mono">Terminal: WS-08-41</span>
                </div>
              </div>
            </div>

            {/* Candidate Resilience Guarantee Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4.5 rounded-2xl bg-white dark:bg-[#0D1527] border border-red-100 dark:border-gray-800 space-y-1.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#16803C]">
                  <HardDrive className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Protected Responses</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Answers save locally to an encrypted device ledger before synchronization.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-white dark:bg-[#0D1527] border border-red-100 dark:border-gray-800 space-y-1.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-[#C62828]">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Timer Protection</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Network disruptions automatically freeze your clock with fair compensation.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-white dark:bg-[#0D1527] border border-red-100 dark:border-gray-800 space-y-1.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Verified Proof</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Receive an immutable cryptographic receipt upon examination submission.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY EXAMS */}
        {subTab === 'my_exams' && (
          <div className="bg-white dark:bg-[#0D1527] rounded-2xl border border-red-100 dark:border-gray-800 p-6 space-y-4 animate-in fade-in">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Registered Examinations</h2>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/50 text-[#16803C] dark:text-emerald-400 font-bold">
                    IN PROGRESS
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1">Engineering Mathematics III (ENG-304)</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Scheduled: Today, 10:00 AM - 11:00 AM • Centre 08</p>
                </div>
                <button
                  onClick={() => setCurrentView('live_exam')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#8E1B1B] cursor-pointer"
                >
                  Enter Exam Room
                </button>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold">
                    SCHEDULED
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1">Advanced Distributed Systems (CS-502)</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Scheduled: Tomorrow, 02:00 PM - 04:00 PM • Centre 08</p>
                </div>
                <span className="text-xs font-semibold text-gray-400">Opens in 26h</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESULTS & AUDIT */}
        {subTab === 'results' && (
          <div className="bg-white dark:bg-[#0D1527] rounded-2xl border border-red-100 dark:border-gray-800 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Completed Assessments</h2>
              <button
                onClick={() => setCurrentView('reports')}
                className="text-xs font-bold text-[#C62828] hover:underline cursor-pointer"
              >
                View Assessment Overview →
              </button>
            </div>

            <div className="p-4 rounded-xl border border-red-100 dark:border-gray-800 bg-[#FFFBFB] dark:bg-[#080D1A] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Mid-Semester Assessment</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Engineering Mathematics III</p>
                </div>
                <span className="text-xs font-bold text-[#16803C] dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 100% Verified Submissions
                </span>
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-[#111827] border border-red-100 dark:border-gray-800 font-mono text-[11px] text-gray-700 dark:text-gray-300">
                Verification Token: Verified #ET-2026-ENG-4418
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Zero responses lost. Verified by Academic Testing Board.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {subTab === 'profile' && (
          <div className="bg-white dark:bg-[#0D1527] rounded-2xl border border-red-100 dark:border-gray-800 p-6 space-y-4 animate-in fade-in">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Student Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FFFBFB] dark:bg-[#080D1A] border border-red-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 block">Candidate Full Name</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm mt-0.5 block">{studentName}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FFFBFB] dark:bg-[#080D1A] border border-red-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 block">Roll Number</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm font-mono mt-0.5 block">ET-2026-ENG-4418</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FFFBFB] dark:bg-[#080D1A] border border-red-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 block">Assigned Assessment Centre</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm mt-0.5 block">Centre 08 — North Academic Complex</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FFFBFB] dark:bg-[#080D1A] border border-red-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 block">Exam Access Status</span>
                <span className="font-bold text-[#16803C] dark:text-emerald-400 text-sm mt-0.5 block">Secure Verified Session Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
