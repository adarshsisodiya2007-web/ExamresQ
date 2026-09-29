import React, { useState } from 'react';
import { 
  Shield, 
  Radar, 
  ShieldAlert, 
  RotateCcw, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2,
  Server,
  Activity,
  HardDrive
} from 'lucide-react';

interface Pillar {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  detailedPoints: string[];
  metricLabel: string;
  metricValue: string;
  icon: React.ReactNode;
}

export const PillarsSection: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('prevention');

  const pillars: Pillar[] = [
    {
      id: 'prevention',
      name: '1. PREVENTION',
      tagline: 'System Readiness & Proactive Health',
      shortDesc: 'Continuous pre-assessment stress checks across all server clusters, local edge gateways, and workstation network interfaces.',
      detailedPoints: [
        'Automated pre-exam synthetic load benchmarking across all 38 centres',
        'Hardware sandbox verification and browser integrity attestations',
        'Local Edge Gateway redundancy validation before candidates sit'
      ],
      metricLabel: 'Readiness Score',
      metricValue: '100% Verified',
      icon: <Shield className="w-5 h-5 text-[#C62828]" />
    },
    {
      id: 'detection',
      name: '2. DETECTION',
      tagline: 'Sub-Second Anomaly Watchdog',
      shortDesc: 'Automated telemetry engine monitors packet drops, latency jitter, and socket state changes before they disrupt exams.',
      detailedPoints: [
        '500ms bidirectional keep-alive pings between client and edge daemon',
        'Immediate pattern recognition of localized network vs cloud failure',
        'Mean time to detect anomalies under 1.2 seconds across thousands of nodes'
      ],
      metricLabel: 'Mean Time To Detect',
      metricValue: '1.2s MTTD',
      icon: <Radar className="w-5 h-5 text-[#C77A00]" />
    },
    {
      id: 'response',
      name: '3. RESPONSE',
      tagline: 'Immediate Candidate & Data Protection',
      shortDesc: 'Candidate is instantly reassured while responses are sealed in an encrypted, tamper-proof client-side cryptographic ledger.',
      detailedPoints: [
        'Client seamlessly transitions into offline mode without blocking inputs',
        'Local answers encrypted with ephemeral AES-256 session keys & SHA-256 hash',
        'Candidate timer protected and extended automatically if required'
      ],
      metricLabel: 'Data Loss Rate',
      metricValue: '0.00% Lost',
      icon: <ShieldAlert className="w-5 h-5 text-[#C62828]" />
    },
    {
      id: 'recovery',
      name: '4. RECOVERY',
      tagline: 'Seamless Multi-WAN Edge Failover',
      shortDesc: 'Centres automatically switch to backup microwave/cellular backhaul or local edge servers while queueing delta state synchronization.',
      detailedPoints: [
        'Self-healing route selection bypasses faulty primary ISP lines',
        'Idempotent delta-sync queues transfer buffered responses cleanly',
        'Mean time to complete recovery and synchronization is under 48 seconds'
      ],
      metricLabel: 'Mean Time To Recover',
      metricValue: '48s MTTR',
      icon: <RotateCcw className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'trust',
      name: '5. TRUST',
      tagline: 'Cryptographic Audit & Zero-Doubt Verification',
      shortDesc: 'Every single event is mathematically linked into a Merkle audit tree, providing irrefutable proof to candidates, centres, and evaluators.',
      detailedPoints: [
        'Cryptographic audit trail with SHA-256 state seals for every question answer',
        'Tamper-evident incident timeline verifiable by independent exam observers',
        'Candidate receives verifiable digital proof of complete answer submission'
      ],
      metricLabel: 'Audit Integrity',
      metricValue: '100% Cryptographic',
      icon: <FileCheck2 className="w-5 h-5 text-[#16803C]" />
    }
  ];

  const currentPillar = pillars.find(p => p.id === selectedPillarId) || pillars[0];

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#C62828] text-xs font-bold border border-red-200 mb-3">
            <span>The 5 Core Pillars of Resilience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            How EvalTrust Re-architects Assessment Continuity
          </h2>
          <p className="text-sm text-[#666666] mt-2 leading-relaxed">
            Most exam platforms fail when the internet hiccups. EvalTrust is engineered from the ground up to prevent, detect, respond, recover, and prove every millisecond of the exam.
          </p>
        </div>

        {/* Horizontal Journey on Desktop / Vertical Timeline on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          {pillars.map((pillar, idx) => {
            const isSelected = pillar.id === selectedPillarId;

            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 relative cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#C62828] shadow-md ring-2 ring-[#C62828]/10'
                    : 'bg-white/60 hover:bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-red-50' : 'bg-gray-100'
                  }`}>
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">Pillar 0{idx + 1}</span>
                </div>

                <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  isSelected ? 'text-[#C62828]' : 'text-gray-900'
                }`}>
                  {pillar.name}
                </h3>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-snug">
                  {pillar.tagline}
                </p>

                {/* Status Indicator Dot */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 font-medium">{pillar.metricValue}</span>
                  {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[#C62828]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Deep-Dive Detail Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  {currentPillar.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{currentPillar.name}</h3>
                  <p className="text-xs font-medium text-[#C62828]">{currentPillar.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {currentPillar.shortDesc}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800 block">
                  Core Architectural Capabilities:
                </span>
                <ul className="space-y-2">
                  {currentPillar.detailedPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metric Callout Box */}
            <div className="p-6 rounded-xl bg-[#F8F8F6] border border-gray-200 flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {currentPillar.metricLabel}
              </span>
              <div className="text-3xl font-extrabold text-[#C62828] font-mono">
                {currentPillar.metricValue}
              </div>
              <p className="text-[11px] text-gray-600 max-w-xs">
                Guaranteed by EVALTRUST distributed consensus & failover daemon.
              </p>
              <div className="w-full pt-3 mt-2 border-t border-gray-200 flex items-center justify-center gap-3 text-[11px] text-gray-600">
                <span className="flex items-center gap-1"><Server className="w-3.5 h-3.5 text-gray-500" /> Multi-Cloud</span>
                <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5 text-gray-500" /> Local Encrypted DB</span>
                <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-gray-500" /> 18ms Edge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
