import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  AlertOctagon, 
  Clock, 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw, 
  Radio, 
  FileSpreadsheet, 
  ShieldAlert,
  ArrowRight,
  Wifi,
  WifiOff
} from 'lucide-react';

export const IncidentCenter: React.FC = () => {
  const { 
    incident, 
    networkStatus, 
    triggerNetworkInterruption, 
    restoreNetwork, 
    setCurrentView 
  } = useResilience();

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C62828]">
                Automated Incident Resolution Engine
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Active Incident Management
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Real-time anomaly identification, candidate safeguard logs, and failover timeline
            </p>
          </div>

          <div className="flex items-center gap-2">
            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulate Uplink Outage</span>
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs animate-pulse"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Execute Complete Recovery & Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* Incident Detail Primary Card (Requirement 9) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Top Info Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black font-mono px-3 py-1 rounded-lg bg-red-100 text-[#C62828]">
                  {incident.code}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {incident.severity.toUpperCase()} SEVERITY
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  networkStatus === 'connected'
                    ? 'bg-emerald-50 text-[#16803C] border-emerald-200'
                    : 'bg-red-50 text-[#C62828] border-red-200 animate-pulse'
                }`}>
                  {networkStatus === 'connected' ? 'RESOLVED & SYNCED' : 'RECOVERING'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                {incident.title}
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
                <span className="text-gray-400 block text-[10px]">INCIDENT TIME</span>
                <span className="font-bold text-gray-900">{incident.time}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
                <span className="text-gray-400 block text-[10px]">AFFECTED SESSIONS</span>
                <span className="font-bold text-[#C62828] font-mono text-base">{incident.affectedSessions}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
                <span className="text-gray-400 block text-[10px]">DATA LOSS RATE</span>
                <span className="font-bold text-[#16803C] font-mono text-base">0.00%</span>
              </div>
            </div>
          </div>

          {/* Details & Location Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F8F8F6] border border-gray-200">
              <span className="text-[11px] text-gray-500 block uppercase font-medium">Affected Centre</span>
              <span className="font-bold text-gray-900 text-sm mt-0.5 block">{incident.centreName}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F8F6] border border-gray-200">
              <span className="text-[11px] text-gray-500 block uppercase font-medium">Detection Latency</span>
              <span className="font-bold text-gray-900 text-sm mt-0.5 font-mono block">1.2 Seconds (Sub-second Watchdog)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F8F6] border border-gray-200">
              <span className="text-[11px] text-gray-500 block uppercase font-medium">Active Mitigation</span>
              <span className="font-bold text-[#16803C] text-sm mt-0.5 block">Client Offline Ledger + Multi-WAN Failover</span>
            </div>
          </div>

          {/* Incident Timeline (Animated Per Requirement 9) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C62828]" />
                Incident Resolution Timeline (T+ Seconds)
              </h3>
              <span className="text-[11px] font-mono text-gray-500">6 Stages Logged</span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {incident.timeline.map((event, idx) => (
                <div key={idx} className="relative group">
                  <span className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full ring-4 ring-white ${
                    event.stage === 'detection' ? 'bg-[#C62828]' :
                    event.stage === 'response' ? 'bg-[#C77A00]' :
                    event.stage === 'recovery' ? 'bg-blue-600' :
                    event.stage === 'sync' ? 'bg-purple-600' : 'bg-[#16803C]'
                  }`} />

                  <div className="p-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-900">{event.message}</span>
                      <span className="font-mono text-gray-500 text-[11px]">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-gray-100 text-gray-600 uppercase font-semibold">
                        Stage: {event.stage}
                      </span>
                      <span className="text-[10px] text-[#16803C] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Audit Verified
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mitigation Actions Checkpoints */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Active Mitigation Directives Executed by Ecosystem
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {incident.mitigationSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5 text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation to Recovery Center */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setCurrentView('recovery')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gray-900 hover:bg-black text-white transition-colors cursor-pointer shadow-xs"
            >
              <span>Inspect Central Recovery & Sync Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
