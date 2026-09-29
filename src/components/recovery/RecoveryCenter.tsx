import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Layers, 
  Database, 
  Wifi, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Lock,
  FileCheck2
} from 'lucide-react';

export const RecoveryCenter: React.FC = () => {
  const { 
    protectionStage, 
    networkStatus, 
    restoreNetwork, 
    triggerNetworkInterruption,
    offlineQueueCount,
    setCurrentView 
  } = useResilience();

  const [activeStepTab, setActiveStepTab] = useState<number>(4);

  const recoverySteps = [
    {
      id: 1,
      title: "NORMAL",
      sub: "Active Session",
      desc: "Cloud sync is operational. Workstation pings 16ms.",
      icon: <Wifi className="w-5 h-5 text-[#16803C]" />
    },
    {
      id: 2,
      title: "FAILURE",
      sub: "Carrier Cut",
      desc: "Uplink packet loss flags disruption in 1.2s.",
      icon: <AlertTriangle className="w-5 h-5 text-[#C62828]" />
    },
    {
      id: 3,
      title: "PROTECTION",
      sub: "Ledger Engaged",
      desc: "Client encrypted sandbox locks answers locally with SHA-256 seal.",
      icon: <Lock className="w-5 h-5 text-[#C62828]" />
    },
    {
      id: 4,
      title: "RECOVERY",
      sub: "Edge Failover",
      desc: "Microwave backup establishes authenticated session tunnel.",
      icon: <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
    },
    {
      id: 5,
      title: "SYNCHRONIZATION",
      sub: "Delta Queue",
      desc: "Idempotent vector packets reconcile buffered answers without conflict.",
      icon: <Database className="w-5 h-5 text-purple-600" />
    },
    {
      id: 6,
      title: "VERIFICATION",
      sub: "Merkle Root Sealed",
      desc: "100% cryptographic integrity verified. Zero data loss achieved.",
      icon: <CheckCircle2 className="w-5 h-5 text-[#16803C]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                Resilience & Self-Healing Core
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Assessment Recovery Center
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Visual proof of continuous assessment continuity, delta synchronization & zero data loss
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
              >
                Trigger Outage Scenario
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs animate-pulse"
              >
                Trigger Recovery & Sync
              </button>
            )}
          </div>
        </div>

        {/* LARGE CENTRAL STATUS VISUALIZATION (Requirement 10) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
              Zero-Loss State Machine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              The 6-Phase Resilience Lifecycle
            </h2>
            <p className="text-xs text-gray-500">
              Interactive timeline showing how EVALTRUST recovers from catastrophic network failure without losing a single candidate response.
            </p>
          </div>

          {/* Large Visual Pipeline */}
          <div className="relative py-4">
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-gray-200 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
              {recoverySteps.map((step) => {
                const isSelected = activeStepTab === step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepTab(step.id)}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[160px] ${
                      isSelected
                        ? 'border-[#C62828] bg-red-50/50 shadow-md ring-2 ring-[#C62828]/20 scale-105'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-gray-400 font-bold block">
                      PHASE 0{step.id}
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-xs my-2">
                      {step.icon}
                    </div>

                    <div>
                      <span className={`text-xs font-black block tracking-tight ${
                        isSelected ? 'text-[#C62828]' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium block mt-0.5">
                        {step.sub}
                      </span>
                    </div>

                    <div className="mt-2">
                      <span className={`w-2 h-2 rounded-full inline-block ${
                        isSelected ? 'bg-[#C62828] animate-ping' : 'bg-gray-300'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Deep Dive Card */}
          {(() => {
            const selectedStepData = recoverySteps.find(s => s.id === activeStepTab) || recoverySteps[0];
            return (
              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-800">
                      Phase {selectedStepData.id} of 6
                    </span>
                    <span className="text-xs font-bold text-[#C62828]">{selectedStepData.title}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedStepData.sub}</h3>
                  <p className="text-xs text-gray-600 max-w-xl">{selectedStepData.desc}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setActiveStepTab(prev => (prev < 6 ? prev + 1 : 1))}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer"
                  >
                    Advance to Next Phase →
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 3 Core Recovery Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="p-4 rounded-xl border border-gray-200 bg-white text-center space-y-1">
              <span className="text-xs text-gray-500 font-semibold uppercase">Detection Time (MTTD)</span>
              <div className="text-3xl font-black text-[#C62828] font-mono">1.2s</div>
              <p className="text-[11px] text-gray-500">Autonomous packet loss threshold</p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-white text-center space-y-1">
              <span className="text-xs text-gray-500 font-semibold uppercase">Recovery Time (MTTR)</span>
              <div className="text-3xl font-black text-gray-900 font-mono">48s</div>
              <p className="text-[11px] text-gray-500">Full failover and delta reconciliation</p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-white text-center space-y-1">
              <span className="text-xs text-gray-500 font-semibold uppercase">Data Loss Rate</span>
              <div className="text-3xl font-black text-[#16803C] font-mono">0.00%</div>
              <p className="text-[11px] text-gray-500">Mathematical guarantee with SHA-256</p>
            </div>
          </div>
        </div>

        {/* Delta Stream Queue Inspector */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Incremental Delta Stream Queue
              </h3>
              <p className="text-xs text-gray-500">Vector clock sequence synchronization table</p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] font-semibold">
              Queue Status: Clear (0 Lag)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-[11px] uppercase">
                  <th className="py-2.5 px-3">Packet ID</th>
                  <th className="py-2.5 px-3">Session</th>
                  <th className="py-2.5 px-3">Question</th>
                  <th className="py-2.5 px-3">Payload Size</th>
                  <th className="py-2.5 px-3">Local Hash</th>
                  <th className="py-2.5 px-3">Reconciliation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono">
                <tr>
                  <td className="py-3 px-3 text-gray-900 font-semibold">#DLT-9841-01</td>
                  <td className="py-3 px-3 text-gray-600">SES-2026-ET-9941</td>
                  <td className="py-3 px-3 text-gray-900 font-sans font-bold">Q14 (Option B)</td>
                  <td className="py-3 px-3 text-gray-600">312 Bytes (AES)</td>
                  <td className="py-3 px-3 text-gray-600">0x7f9a842b...</td>
                  <td className="py-3 px-3 text-[#16803C] font-sans font-semibold">✓ Synchronized & Sealed</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-gray-900 font-semibold">#DLT-9841-02</td>
                  <td className="py-3 px-3 text-gray-600">SES-2026-ET-9942</td>
                  <td className="py-3 px-3 text-gray-900 font-sans font-bold">Q18 (Option C)</td>
                  <td className="py-3 px-3 text-gray-600">284 Bytes (AES)</td>
                  <td className="py-3 px-3 text-gray-600">0x3b14ac91...</td>
                  <td className="py-3 px-3 text-[#16803C] font-sans font-semibold">✓ Synchronized & Sealed</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-gray-900 font-semibold">#DLT-9841-03</td>
                  <td className="py-3 px-3 text-gray-600">SES-2026-ET-9943</td>
                  <td className="py-3 px-3 text-gray-900 font-sans font-bold">Q04 (Option A)</td>
                  <td className="py-3 px-3 text-gray-600">296 Bytes (AES)</td>
                  <td className="py-3 px-3 text-gray-600">0x9910fe22...</td>
                  <td className="py-3 px-3 text-[#16803C] font-sans font-semibold">✓ Synchronized & Sealed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setCurrentView('audit')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C62828] hover:text-[#8E1B1B] cursor-pointer"
            >
              <span>Inspect Cryptographic Audit Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
