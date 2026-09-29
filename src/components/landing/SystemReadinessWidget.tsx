import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Wifi, 
  Building2, 
  Users, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Bell,
  HardDrive
} from 'lucide-react';
import { useResilience } from '../../context/ResilienceContext';

export const SystemReadinessWidget: React.FC = () => {
  const { 
    networkStatus, 
    triggerNetworkInterruption, 
    restoreNetwork, 
    setCurrentView 
  } = useResilience();

  const [activeTab, setActiveTab] = useState<'prevention' | 'detection' | 'response'>('prevention');

  return (
    <section className="py-12 border-t border-gray-200 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              Live Resilience Telemetry
            </span>
            <h2 className="text-2xl font-extrabold text-[#171717] mt-2">
              Proactive Health, Detection & Automated Response
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Explore how ExamresQ continuously validates readiness and acts in sub-second timelines.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200">
            <button
              onClick={() => setActiveTab('prevention')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'prevention' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              1. Prevention
            </button>
            <button
              onClick={() => setActiveTab('detection')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'detection' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              2. Detection
            </button>
            <button
              onClick={() => setActiveTab('response')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'response' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              3. Response
            </button>
          </div>
        </div>

        {/* Tab 1: PREVENTION */}
        {activeTab === 'prevention' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
            {/* System Readiness Card */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-200 bg-[#F8F8F6] space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-[#C62828]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    System Readiness Pre-Assessment Audit
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-[#16803C] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> All Checks Passed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C]" />
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Server Cluster</span>
                      <span className="text-[11px] text-gray-500">Triple-zone active replication</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#16803C]">Healthy (99.99%)</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C]" />
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Network Health</span>
                      <span className="text-[11px] text-gray-500">18ms average latency</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#16803C]">Healthy</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C]" />
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Centres Online</span>
                      <span className="text-[11px] text-gray-500">All edge daemons synchronized</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#16803C]">38 / 38 Operational</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C]" />
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Assessment Capacity</span>
                      <span className="text-[11px] text-gray-500">Provisioned for 50,000 users</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#16803C]">Ready & Armed</span>
                </div>
              </div>

              {/* Overall status banner */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#16803C]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">Overall Assessment Status</span>
                    <span className="text-xs text-emerald-800">Ready for National Assessment 2026 Session 1</span>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentView('operations')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 hover:text-black cursor-pointer"
                >
                  <span>Open Operations Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Side Explainer */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-[#C62828] font-bold uppercase">Principle 01: Prevention</span>
                <h4 className="text-base font-bold text-gray-900 mt-1">Pre-empt Failures Before Start</h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Traditional exam platforms assume clean network conditions. ExamresQ runs automatic pre-flight integrity probes across edge devices, cryptographic keys, and local disk allocations before candidates are admitted.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Pre-flight probes passed:</span>
                  <span className="font-mono font-bold text-gray-900">4,812 / 4,812</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Edge buffer reserved:</span>
                  <span className="font-mono font-bold text-gray-900">100% Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: DETECTION */}
        {activeTab === 'detection' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
            <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-200 bg-[#F8F8F6] space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-[#C62828]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Live Telemetry & Anomaly Detection Watchdog
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                  Heartbeat: 500ms
                </span>
              </div>

              {/* 4 Live System Status metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-center">
                  <span className="text-xs text-gray-500 block">Active Candidates</span>
                  <span className="text-xl font-bold font-mono text-gray-900 mt-1 block">842</span>
                  <span className="text-[10px] text-emerald-600 font-medium">● 100% Online</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-center">
                  <span className="text-xs text-gray-500 block">Centres Online</span>
                  <span className="text-xl font-bold font-mono text-gray-900 mt-1 block">38</span>
                  <span className="text-[10px] text-emerald-600 font-medium">● All Active</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-center">
                  <span className="text-xs text-gray-500 block">Critical Incidents</span>
                  <span className={`text-xl font-bold font-mono mt-1 block ${
                    networkStatus === 'connected' ? 'text-gray-900' : 'text-[#C62828]'
                  }`}>
                    {networkStatus === 'connected' ? '0' : '1'}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">Auto-Protected</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-center">
                  <span className="text-xs text-gray-500 block">Network Health</span>
                  <span className="text-xl font-bold font-mono text-[#16803C] mt-1 block">
                    {networkStatus === 'connected' ? '98.4%' : '88.2%'}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">Telemetry sync</span>
                </div>
              </div>

              {/* Dynamic Incident Transition Box */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                networkStatus === 'interrupted' 
                  ? 'bg-red-50 border-[#C62828]/40 shadow-xs' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      networkStatus === 'interrupted' ? 'bg-[#C62828] text-white animate-pulse' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {networkStatus === 'interrupted' ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        {networkStatus === 'interrupted' ? 'Centre 08 Network Degradation Detected' : 'Centre 08 — North Academic Complex'}
                      </span>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {networkStatus === 'interrupted'
                          ? '100% WAN packet loss detected at 10:42:01. Client-side resilience immediately activated.'
                          : 'Operational status normal. Latency 42ms. Zero packet drop on primary uplink.'}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {networkStatus === 'connected' ? (
                      <button
                        onClick={triggerNetworkInterruption}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer"
                      >
                        Simulate Outage
                      </button>
                    ) : (
                      <button
                        onClick={restoreNetwork}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#16803C] text-white transition-colors cursor-pointer"
                      >
                        Restore & Reconcile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-white flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-[#C77A00] font-bold uppercase">Principle 02: Detection</span>
                <h4 className="text-base font-bold text-gray-900 mt-1">1.2 Second Detection Latency</h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Instead of waiting for candidates to complain about frozen screens, ExamresQ algorithms evaluate missed TCP ACK pulses, socket disruptions, and carrier signals continuously.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 font-mono">
                <code>{`// Watchdog Telemetry Signal`}</code><br />
                <code>{`ping_loss_ratio: 0.00`}</code><br />
                <code>{`mttd_threshold: 1500ms`}</code><br />
                <code>{`active_carrier: Primary_Fiber`}</code>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: RESPONSE */}
        {activeTab === 'response' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
            <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-200 bg-[#F8F8F6] space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C62828]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Automated Multi-Stage Response Timeline
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-100 text-[#C62828] font-bold">
                  Zero Data Loss
                </span>
              </div>

              {/* Animated Response Timeline */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C62828]/30">
                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#C62828] ring-4 ring-white" />
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">1. Problem Detected</span>
                      <span className="text-[10px] font-mono text-gray-400">T+0.0s (10:42:01)</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Uplink drop flagged across Centre 08 subnet.</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#C62828] ring-4 ring-white" />
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">2. Candidate Reassured & Notified</span>
                      <span className="text-[10px] font-mono text-gray-400">T+0.2s (10:42:02)</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Calm notification displayed: "Connection interrupted. Your response is protected."</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#C62828] ring-4 ring-white" />
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">3. Response Protection Activated</span>
                      <span className="text-[10px] font-mono text-gray-400">T+0.3s (10:42:02)</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Local encrypted IndexedDB ledger locks Question 14 answer with SHA-256 seal.</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#16803C] ring-4 ring-white" />
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">4. Incident Formally Recorded</span>
                      <span className="text-[10px] font-mono text-gray-400">T+0.6s (10:42:03)</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Incident #ET-1042 entered into central immutable governance ledger.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-white flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-[#C62828] font-bold uppercase">Principle 03: Response</span>
                <h4 className="text-base font-bold text-gray-900 mt-1">Candidate-First Resilient Experience</h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  In high-stakes exams, candidate panic is the biggest enemy. ExamresQ never shows blank error screens or destructive reload loops. The candidate can continue answering with guaranteed local protection.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('live_exam')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C62828] hover:bg-[#8E1B1B] text-white text-xs font-bold shadow-xs transition-colors text-center cursor-pointer"
              >
                Experience Live Exam Interface
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
