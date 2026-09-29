import React, { useEffect, useState } from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { 
  X, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  FileCheck2,
  ExternalLink
} from 'lucide-react';

interface StepInfo {
  step: number;
  title: string;
  subtitle: string;
  targetView: AppView;
  statusBadge: string;
  icon: React.ReactNode;
  description: string;
  technicalMechanism: string;
  outcome: string;
}

export const DemoModal: React.FC = () => {
  const { 
    isDemoActive, 
    demoStep, 
    stopDemo, 
    nextDemoStep, 
    prevDemoStep, 
    setDemoStepDirect,
    setCurrentView 
  } = useResilience();

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const steps: StepInfo[] = [
    {
      step: 1,
      title: "1. Normal Operation",
      subtitle: "High-throughput cloud exam session in progress",
      targetView: "live_exam",
      statusBadge: "Operational",
      icon: <Wifi className="w-6 h-6 text-[#16803C]" />,
      description: "Candidate answers Question 14 (Engineering Mathematics III). Responses are streamed with 16ms latency to the secure assessment cluster.",
      technicalMechanism: "Active WebSocket heartbeat every 500ms + bidirectional TLS 1.3 telemetry.",
      outcome: "Responses verified and saved instantaneously in the central database."
    },
    {
      step: 2,
      title: "2. Network Failure",
      subtitle: "Uplink fiber cut & carrier packet loss simulated",
      targetView: "operations",
      statusBadge: "Degraded",
      icon: <WifiOff className="w-6 h-6 text-[#C62828]" />,
      description: "Centre 08 WAN backhaul drops. Zero packets can reach the cloud origin server.",
      technicalMechanism: "Sudden connection breakdown simulates ISP outage, campus switch reset, or local power blip.",
      outcome: "Network status flips to Interrupted; local client watchdog activates immediately."
    },
    {
      step: 3,
      title: "3. Incident Detection",
      subtitle: "Automated anomaly watchdog flags disruption in 1.2s",
      targetView: "incidents",
      statusBadge: "Detecting",
      icon: <AlertTriangle className="w-6 h-6 text-[#C77A00]" />,
      description: "EvalTrust edge detection daemon flags 7 candidate sessions at Centre 08 within 1.2 seconds—without needing manual complaints.",
      technicalMechanism: "Threshold algorithm monitors missed keep-alives and TCP socket state transitions.",
      outcome: "Incident #ET-1042 generated automatically with incident level 'Medium'."
    },
    {
      step: 4,
      title: "4. Response Protection",
      subtitle: "Tamper-proof local ledger locks answers on device",
      targetView: "live_exam",
      statusBadge: "Protected",
      icon: <ShieldAlert className="w-6 h-6 text-[#C62828]" />,
      description: "Candidate continues answering without panic. The UI calmly notifies: 'Connection interrupted. Your response is protected.'",
      technicalMechanism: "Encrypted IndexedDB sandbox + SHA-256 local state seal prevents any answer loss or client tampering.",
      outcome: "Zero data loss. Candidate timer remains safe with no test interruption."
    },
    {
      step: 5,
      title: "5. Recovery Initiated",
      subtitle: "Edge gateway failover & link re-establishment",
      targetView: "recovery",
      statusBadge: "Recovering",
      icon: <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />,
      description: "Centre 08 Edge Gateway routes through secondary cellular/mesh backhaul. Keep-alive pings stabilize at 38ms.",
      technicalMechanism: "Automatic multi-WAN gateway switchover and mutual cryptographic TLS re-handshake.",
      outcome: "Candidate workstation re-establishes authenticated connection with server."
    },
    {
      step: 6,
      title: "6. Delta Synchronization",
      subtitle: "Encrypted delta payload transmitted and reconciled",
      targetView: "recovery",
      statusBadge: "Synchronizing",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      description: "Offline buffered answers are streamed in a sequence-verified delta queue. Server acknowledges every question packet.",
      technicalMechanism: "Idempotent packet reconciliation with collision-free vector clocks.",
      outcome: "7 candidate sessions reconciled with 100% data integrity."
    },
    {
      step: 7,
      title: "7. Audit & Trust Verification",
      subtitle: "Immutable cryptographic state seal committed to audit log",
      targetView: "audit",
      statusBadge: "Verified",
      icon: <FileCheck2 className="w-6 h-6 text-[#16803C]" />,
      description: "Complete chronological timeline of the disruption is committed to the transparent audit log for post-exam verification.",
      technicalMechanism: "Merkle root calculation links pre-outage and post-recovery answers into an unforgeable certificate.",
      outcome: "Full trust established. Institutional proof ready for auditors, candidates, and exam boards."
    }
  ];

  const currentStepInfo = steps[demoStep - 1];

  // Auto-play timer
  useEffect(() => {
    if (!isDemoActive || !isPlaying) return;

    const timer = setInterval(() => {
      nextDemoStep();
    }, 4500);

    return () => clearInterval(timer);
  }, [isDemoActive, isPlaying, nextDemoStep]);

  if (!isDemoActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#171717] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#C62828] animate-ping" />
            <div>
              <h2 className="text-base font-bold tracking-tight">EVALTRUST Live Resilience Demonstration</h2>
              <p className="text-xs text-gray-400">Interactive 7-Step Hackathon Walkthrough</p>
            </div>
          </div>
          <button
            onClick={stopDemo}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
            {steps.map((s) => {
              const isCurrent = s.step === demoStep;
              const isPast = s.step < demoStep;
              return (
                <button
                  key={s.step}
                  onClick={() => setDemoStepDirect(s.step)}
                  className={`flex-1 min-w-[70px] text-center py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#C62828] text-white shadow-xs'
                      : isPast
                      ? 'bg-emerald-100 text-[#16803C]'
                      : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="block text-[10px] uppercase font-mono opacity-80">Step {s.step}</span>
                  <span className="truncate block font-medium">
                    {s.step === 1 ? 'Normal' : s.step === 2 ? 'Outage' : s.step === 3 ? 'Detect' : s.step === 4 ? 'Protect' : s.step === 5 ? 'Recover' : s.step === 6 ? 'Sync' : 'Audit'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl border border-gray-200 bg-[#F8F8F6]">
            <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
              {currentStepInfo.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#C62828]/10 text-[#C62828]">
                  {currentStepInfo.statusBadge}
                </span>
                <span className="text-xs text-gray-500 font-mono">Stage {demoStep} of 7</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-1">{currentStepInfo.title}</h3>
              <p className="text-xs font-medium text-gray-600">{currentStepInfo.subtitle}</p>
            </div>

            <button
              onClick={() => {
                setCurrentView(currentStepInfo.targetView);
                stopDemo();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <span>View in {currentStepInfo.targetView.replace('_', ' ')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          {/* Description & Technical Mechanism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C62828]" />
                What Happens to the Candidate
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">{currentStepInfo.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16803C]" />
                Under the Hood (EVALTRUST Architecture)
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed font-mono text-[11px]">{currentStepInfo.technicalMechanism}</p>
            </div>
          </div>

          {/* Outcome Alert */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16803C]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <span className="font-bold">Resilience Outcome: </span>
              <span className="font-medium text-emerald-900">{currentStepInfo.outcome}</span>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#C62828]" />}
              <span>{isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}</span>
            </button>
            <span className="text-[11px] text-gray-400 hidden sm:inline">4.5s per step</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevDemoStep}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              onClick={nextDemoStep}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-xs transition-colors cursor-pointer"
            >
              <span>{demoStep === 7 ? 'Restart Tour' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
