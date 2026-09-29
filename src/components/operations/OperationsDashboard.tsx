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
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Operations Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-mono">
                ExamresQ Institutional Operations Room
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              National Examination Operations Center
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Live observability, sub-second failure detection & automated resilience governance
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulate Outage</span>
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Restore Network</span>
              </button>
            )}

            <button
              onClick={startDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer shadow-xs"
            >
              <PlayCircle className="w-3.5 h-3.5 text-[#E53935]" />
              <span>Run Resilience Demo</span>
            </button>
          </div>
        </div>

        {/* 1. TOP METRICS ROW (Per Requirement 7) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold">Active Candidates</span>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-black text-gray-900 font-mono">
              {metrics.activeCandidates.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#16803C] font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 100% Retained
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold">Active Centres</span>
              <Building2 className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-black text-gray-900 font-mono">
              {metrics.onlineCentres} / {metrics.totalCentres}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              38 Connected
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold">System Health</span>
              <Activity className="w-4 h-4 text-[#16803C]" />
            </div>
            <div className="text-2xl font-black text-[#16803C] font-mono">
              {metrics.systemHealthPercent}%
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              Zero Response Loss
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold">Network Health</span>
              <Wifi className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-black text-gray-900 font-mono">
              {metrics.networkHealthPercent}%
            </div>
            <div className={`text-[11px] font-semibold mt-1 ${
              networkStatus === 'connected' ? 'text-[#16803C]' : 'text-[#C62828]'
            }`}>
              {networkStatus === 'connected' ? '● Stable 18ms' : '⚠ Failover Active'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold">Open Incidents</span>
              <AlertOctagon className="w-4 h-4 text-[#C62828]" />
            </div>
            <div className={`text-2xl font-black font-mono ${
              metrics.openIncidentsCount > 0 ? 'text-[#C62828]' : 'text-gray-900'
            }`}>
              {metrics.openIncidentsCount} {metrics.openIncidentsCount > 0 ? 'Active' : 'None'}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              {metrics.openIncidentsCount > 0 ? '#ET-1042 (Healed)' : 'All Green'}
            </div>
          </div>
        </div>

        {/* 2. LIVE ASSESSMENTS & SYSTEM HEALTH SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LIVE ASSESSMENTS (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Live Assessments in Progress
                </h3>
                <p className="text-xs text-gray-500">Continuous telemetry monitoring active session slots</p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] font-semibold">
                1 Session Active
              </span>
            </div>

            <div className="space-y-3">
              {/* Active Exam Card */}
              <div className="p-4 rounded-xl border border-gray-200 bg-[#F8F8F6] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#C62828] border border-red-200">
                      PAPER ENG-304
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 mt-1">Engineering Mathematics III</h4>
                  </div>
                  <span className="text-xs font-semibold text-[#16803C] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
                    14,820 Candidates Seated
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded bg-white border border-gray-200 text-center">
                    <span className="text-gray-400 block text-[10px]">Time Elapsed</span>
                    <span className="font-bold text-gray-900 font-mono">24m / 60m</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-gray-200 text-center">
                    <span className="text-gray-400 block text-[10px]">Buffered Deltas</span>
                    <span className="font-bold text-gray-900 font-mono">0 Pending</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-gray-200 text-center">
                    <span className="text-gray-400 block text-[10px]">Sync Accuracy</span>
                    <span className="font-bold text-[#16803C] font-mono">100.00%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <span>Centres assigned: 38/38</span>
                  <button
                    onClick={() => setCurrentView('live_exam')}
                    className="font-bold text-[#C62828] hover:text-[#8E1B1B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Candidate View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Upcoming Exam */}
              <div className="p-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-bold">
                    UPCOMING 14:00
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 mt-1">CS-502: Distributed Systems</h4>
                </div>
                <span className="text-xs text-gray-500">Provisioned for 18,200 seats</span>
              </div>
            </div>
          </div>

          {/* SYSTEM HEALTH DETAILED STATUS (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Assessment System Health
                </h3>
                <p className="text-xs text-gray-500">Overall index: 99.4% Operational</p>
              </div>
              <span className="text-xs font-bold font-mono text-[#16803C]">
                ✓ VERIFIED
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">Platform Reliability</span>
                  <span className="font-mono font-bold text-gray-900">99.98%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#16803C] h-full rounded-full" style={{ width: '99.98%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">Mesh Network Connectivity</span>
                  <span className="font-mono font-bold text-gray-900">98.70%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '98.7%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">Response Loss Tolerance</span>
                  <span className="font-mono font-bold text-[#16803C]">0.00% Lost</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#16803C] h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">Failover Recovery Speed</span>
                  <span className="font-mono font-bold text-gray-900">48s MTTR</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">Cryptographic Audit Sealing</span>
                  <span className="font-mono font-bold text-[#16803C]">100% Sealed</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#16803C] h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CENTRE TOPOLOGY MAP (Per Requirement 7) */}
        <CentreMap />

        {/* 4. LIVE ACTIVITY STREAM (Per Requirement 7) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Live Activity & Watchdog Stream
              </h3>
              <p className="text-xs text-gray-500">Chronological telemetry events across all regional centres</p>
            </div>
            <span className="text-[11px] font-mono text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Real-time UDP Log
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {activityFeed.map((item, index) => (
              <div key={index} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-gray-400 text-[11px] shrink-0">{item.time}</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] shrink-0">
                    {item.centre}
                  </span>
                  <span className="text-gray-800">{item.text}</span>
                </div>
                <span className={`text-[10px] font-semibold shrink-0 uppercase ${
                  item.type === 'alert' ? 'text-[#C62828]' : item.type === 'warning' ? 'text-[#C77A00]' : 'text-[#16803C]'
                }`}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
