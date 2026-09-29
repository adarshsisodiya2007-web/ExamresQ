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
  const { setCurrentView } = useResilience();
  const [subTab, setSubTab] = useState<'dashboard' | 'my_exams' | 'results' | 'profile'>('dashboard');

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Candidate Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-[#C62828]/25">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-gray-900">Adarsh Singh</h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Biometrics Verified
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Roll: <span className="font-mono text-gray-800 font-semibold">ET-2026-ENG-4418</span> • Assigned Centre: Centre 08 (North Academic Complex)
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200 self-start sm:self-auto">
            <button
              onClick={() => setSubTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'dashboard' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setSubTab('my_exams')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'my_exams' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Exams
            </button>
            <button
              onClick={() => setSubTab('results')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'results' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Results & Audit
            </button>
            <button
              onClick={() => setSubTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'profile' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
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
            <div className="p-6 rounded-2xl bg-white border-2 border-[#C62828] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C62828] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Live Assessment Available
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C62828]">Session 1 • Active Now</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Engineering Mathematics III
                  </h2>
                  <p className="text-xs text-gray-600 max-w-xl">
                    National Higher Technical Assessment 2026. Equipped with EvalTrust Sub-Second Resilience Protocol.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> 60 Minutes</span>
                    <span className="flex items-center gap-1.5"><FileSpreadsheet className="w-4 h-4 text-gray-400" /> 40 Questions</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#16803C]" /> Offline Buffer Reserved</span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    onClick={() => setCurrentView('live_exam')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-md shadow-[#C62828]/25 transition-all cursor-pointer"
                  >
                    <span>Launch Live Examination</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] text-gray-500 text-center font-mono">Workstation ID: WS-08-41</span>
                </div>
              </div>
            </div>

            {/* Candidate Resilience Guarantee Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-[#16803C]">
                  <HardDrive className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Zero Lost Clicks</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Every answer you click is committed locally to an encrypted device ledger before sending. Even if the network drops, your work is 100% safe.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-[#C62828]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Fair Timer Protection</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If an official centre disruption exceeds 15 seconds, the central watchdog records the exact millisecond pause and compensates automatically.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Verifiable Submission</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Upon finishing, you receive an immutable cryptographic receipt (SHA-256 Merkle hash) proving your exact submission timestamp.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY EXAMS */}
        {subTab === 'my_exams' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 animate-in fade-in">
            <h2 className="text-base font-bold text-gray-900">Registered Examinations</h2>
            <div className="divide-y divide-gray-100">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-[#16803C] font-bold">
                    IN PROGRESS
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mt-1">Engineering Mathematics III (ENG-304)</h3>
                  <p className="text-xs text-gray-500">Scheduled: Today, 10:00 AM - 11:00 AM • Centre 08</p>
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
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-bold">
                    SCHEDULED
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mt-1">Advanced Distributed Systems (CS-502)</h3>
                  <p className="text-xs text-gray-500">Scheduled: Tomorrow, 02:00 PM - 04:00 PM • Centre 08</p>
                </div>
                <span className="text-xs font-semibold text-gray-400">Opens in 26h</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESULTS & AUDIT */}
        {subTab === 'results' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Completed Assessments & Cryptographic Proofs</h2>
              <button
                onClick={() => setCurrentView('audit')}
                className="text-xs font-bold text-[#C62828] hover:underline cursor-pointer"
              >
                Inspect Live Merkle Audit Explorer →
              </button>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-[#F8F8F6] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-900">Session SES-2026-ET-9941</span>
                  <p className="text-xs text-gray-500">Engineering Mathematics III</p>
                </div>
                <span className="text-xs font-bold text-[#16803C] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 100% Cryptographically Verified
                </span>
              </div>
              <div className="p-2.5 rounded bg-white border border-gray-200 font-mono text-[11px] text-gray-700 break-all">
                Root Hash: 0x7f9a842b109e4d58a123fec998144001bc9941
              </div>
              <p className="text-[11px] text-gray-500">
                1 interruption event detected and healed with 0 lost responses. Audited by National Testing Board.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {subTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 animate-in fade-in">
            <h2 className="text-base font-bold text-gray-900">Candidate Security Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
                <span className="text-gray-500 block">Candidate Full Name</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">Adarsh Singh</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
                <span className="text-gray-500 block">National Candidate Roll</span>
                <span className="font-bold text-gray-900 text-sm font-mono mt-0.5 block">ET-2026-ENG-4418</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
                <span className="text-gray-500 block">Assigned Assessment Centre</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">Centre 08 — North Academic Complex</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
                <span className="text-gray-500 block">Cryptographic Key Pair Status</span>
                <span className="font-bold text-[#16803C] text-sm mt-0.5 block">Ed25519 Session Token Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
