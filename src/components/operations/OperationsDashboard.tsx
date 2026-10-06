import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { CentreMap } from './CentreMap';
import { 
  Users, 
  Building2, 
  Activity, 
  Wifi, 
  AlertOctagon, 
  ShieldCheck, 
  PlayCircle, 
  WifiOff, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Server
} from 'lucide-react';

export const OperationsDashboard: React.FC = () => {
  const { 
    metrics, 
    networkStatus, 
    triggerNetworkInterruption, 
    restoreNetwork, 
    startDemo, 
    setCurrentView 
  } = useResilience();

  const activityFeed = [
    {
      time: "10:44:18",
      centre: "Centre 08",
      text: "7 buffered candidate responses synchronized via secondary backhaul. 0% loss.",
      type: "success"
    },
    {
      time: "10:43:10",
      centre: "Centre 08",
      text: "Edge Gateway B auto-switched to backup microwave link. Latency 38ms.",
      type: "info"
    },
    {
      time: "10:42:05",
      centre: "Centre 08",
      text: "Local cryptographic IndexedDB ledger locked for candidate session WS-08-41.",
      type: "warning"
    },
    {
      time: "10:42:01",
      centre: "Centre 08",
      text: "Carrier uplink drop detected on ISP-A WAN fiber. Automated watchdog engaged.",
      type: "alert"
    },
    {
      time: "10:41:50",
      centre: "Centre 01",
      text: "Heartbeat sync acknowledged for 318 active candidate workstations. 14ms ping.",
      type: "info"
    },
    {
      time: "10:40:00",
      centre: "National Mesh",
      text: "Scheduled Merkle state tree batch checkpoint committed with SHA-256.",
      type: "info"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F5] dark:bg-[#070B14] py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header - Simple & Clean */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D1527] p-6 rounded-2xl border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#B91C3C] dark:text-[#38BDF8]">
                Central Control
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              Assessment Dashboard
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Real-time overview of active assessments and student safety
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#B91C3C] hover:bg-[#8E1B1B] text-white transition-all cursor-pointer shadow-xs"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulate Outage</span>
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer shadow-xs animate-pulse"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Restore Network</span>
              </button>
            )}

            <button
              onClick={() => setCurrentView('candidate_monitor')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#181B26] border border-[#E2C2BB] dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-50 transition-all cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-[#B91C3C]" />
              <span>Live Monitor</span>
            </button>
          </div>
        </div>

        {/* 1. KEY STATISTICS (Exactly 4 Cards per Rule 7) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Active Exams</span>
            <div className="text-3xl font-black text-gray-900 dark:text-white font-mono mt-1">
              03
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
              ● All in progress
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Students Seated</span>
            <div className="text-3xl font-black text-gray-900 dark:text-white font-mono mt-1">
              128
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 block">
              Across 3 test halls
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Completed</span>
            <div className="text-3xl font-black text-gray-900 dark:text-white font-mono mt-1">
              82%
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
              ✓ Zero lost responses
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Attention Required</span>
            <div className="text-3xl font-black text-[#B91C3C] font-mono mt-1">
              02
            </div>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1 block">
              Review flagged items
            </span>
          </div>
        </div>

        {/* 2. ATTENTION REQUIRED BANNER (Rule 13 - Plain Language) */}
        <div className="p-4 rounded-2xl bg-[#FDEBE8] dark:bg-red-950/30 border border-[#E2C2BB] dark:border-red-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#B91C3C] text-white flex items-center justify-center shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Attention Required
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Unusual activity detected • <strong>Kabir Singh (Station 16)</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('suspicious_patterns')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#B91C3C] hover:bg-[#8E1B1B] text-white cursor-pointer shadow-xs self-start sm:self-auto"
          >
            Review Alert
          </button>
        </div>

        {/* 3. ACTIVE EXAMS (Exactly 3 cards per Rule 4 & 7) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Active Assessments (3)
            </h2>
            <span className="text-xs text-gray-500 font-mono">Real-time status</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Exam 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                  <span className="text-xs font-mono text-gray-500">42 Students</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2">
                  Mid-Semester Assessment
                </h3>
                <p className="text-xs text-gray-500 mt-1">Engineering Mathematics III</p>
              </div>
              <button
                onClick={() => setCurrentView('candidate_monitor')}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#B91C3C] hover:bg-[#8E1B1B] text-white transition-all cursor-pointer text-center"
              >
                Monitor
              </button>
            </div>

            {/* Exam 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                  <span className="text-xs font-mono text-gray-500">54 Students</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2">
                  Computer Systems & Logic
                </h3>
                <p className="text-xs text-gray-500 mt-1">Algorithms & Structures</p>
              </div>
              <button
                onClick={() => setCurrentView('candidate_monitor')}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-[#181B26] border border-[#E2C2BB] dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 transition-all cursor-pointer text-center"
              >
                Monitor
              </button>
            </div>

            {/* Exam 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Final Phase
                  </span>
                  <span className="text-xs font-mono text-gray-500">32 Students</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2">
                  Applied Physics Core
                </h3>
                <p className="text-xs text-gray-500 mt-1">Mechanics & Thermodynamics</p>
              </div>
              <button
                onClick={() => setCurrentView('candidate_monitor')}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-[#181B26] border border-[#E2C2BB] dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 transition-all cursor-pointer text-center"
              >
                Monitor
              </button>
            </div>
          </div>
        </div>

        {/* 4. LIVE ACTIVITY (Strict limit: 3 entries per Rule 4) */}
        <div className="bg-white dark:bg-[#0D1527] rounded-2xl border border-[#F0D9D4] dark:border-[#1E2A42] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F0D9D4] dark:border-gray-800 pb-2.5">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Live Activity (3 Recent)
            </h3>
            <span className="text-[11px] font-mono text-gray-400">Auto-updating</span>
          </div>

          <div className="divide-y divide-[#F0D9D4] dark:divide-gray-800/60">
            <div className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Aarav Sharma</span>
                <span className="text-gray-500">submitted response safely</span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">Just now</span>
            </div>

            <div className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Riya Patel</span>
                <span className="text-gray-500">progressing normally</span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">1m ago</span>
            </div>

            <div className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Kabir Singh</span>
                <span className="text-amber-700 dark:text-amber-400 font-medium">unusual activity flagged</span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">2m ago</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
