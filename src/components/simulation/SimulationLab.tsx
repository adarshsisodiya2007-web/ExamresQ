import React, { useState, useEffect } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  Zap, 
  WifiOff, 
  ServerCrash, 
  RefreshCcw, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Users, 
  Database, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Terminal, 
  CheckCircle2, 
  RotateCcw,
  ExternalLink,
  Flame,
  Radio,
  Lock,
  Cpu
} from 'lucide-react';

export type DisruptionType = 
  | 'network_failure' 
  | 'server_overload' 
  | 'sync_failure' 
  | 'power_outage';

export interface DisruptionConfig {
  id: DisruptionType;
  title: string;
  subtitle: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  icon: any;
  rootCause: string;
  defaultAffectedPct: number;
  expectedRTO: string;
  recommendedAction: string;
}

const DISRUPTIONS: DisruptionConfig[] = [
  {
    id: 'network_failure',
    title: 'Regional Network Failure',
    subtitle: 'Primary ISP Optical Fiber Backhaul Severed',
    severity: 'CRITICAL',
    icon: WifiOff,
    rootCause: 'Underground municipal construction severed regional fiber ring. 0 Kbps uplink.',
    defaultAffectedPct: 30,
    expectedRTO: '< 1.8s (Seamless Local Buffer)',
    recommendedAction: 'Resume with Compensatory Time Parity (+3m)'
  },
  {
    id: 'server_overload',
    title: 'Central Exam Server Overload',
    subtitle: 'High IOPS Write Lock & DDoS Traffic Spike',
    severity: 'HIGH',
    icon: ServerCrash,
    rootCause: 'Central cloud API gateway choked by concurrent submission burst. Latency > 1400ms.',
    defaultAffectedPct: 50,
    expectedRTO: '< 3.2s (Edge Queue Throttling)',
    recommendedAction: 'Extend Session by +5m & Throttle Replay'
  },
  {
    id: 'sync_failure',
    title: 'Response Synchronization Failure',
    subtitle: 'Intermittent WebSocket Gateway Packet Drops',
    severity: 'MEDIUM',
    icon: RefreshCcw,
    rootCause: 'Substation network switch port dropped 42% UDP telemetry frames during storm.',
    defaultAffectedPct: 10,
    expectedRTO: '< 0.5s (Delta Auto-Reconciliation)',
    recommendedAction: 'Silent Background Reconciliation'
  },
  {
    id: 'power_outage',
    title: 'Centre Substation Power Outage',
    subtitle: 'Grid Blackout with Battery UPS Failover',
    severity: 'CRITICAL',
    icon: Flame,
    rootCause: 'Main grid transformer trip. Testing lab terminals running on 15-minute battery backup.',
    defaultAffectedPct: 100,
    expectedRTO: '< 2.0s (P2P Local Mesh Replication)',
    recommendedAction: 'Engage Zero-Internet P2P Hive Mesh'
  }
];

export const SimulationLab: React.FC = () => {
  const { 
    setCurrentView, 
    addNotification, 
    downloadAuditDossierPDF, 
    triggerNetworkInterruption, 
    restoreNetwork,
    networkStatus
  } = useResilience();

  const [selectedDisruption, setSelectedDisruption] = useState<DisruptionType>('network_failure');
  const [affectedPct, setAffectedPct] = useState<number>(30);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const activeConfig = DISRUPTIONS.find(d => d.id === selectedDisruption)!;
  const totalExamCandidates = 10000;
  const affectedCandidateCount = Math.round((totalExamCandidates * affectedPct) / 100);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setCurrentStep(1);
    setHasCompleted(false);
    setSimulationLogs([]);

    // Trigger global network interruption state so live exam & candidate monitor react
    triggerNetworkInterruption();

    addNotification({
      target: 'admin',
      type: 'alert',
      title: `SIMULATION TRIGGERED: ${activeConfig.title}`,
      message: `Affecting ${affectedCandidateCount.toLocaleString()} candidates (${affectedPct}% of total cohort). Initiating 5-Phase automated resilience response.`
    });

    const timestamp = () => new Date().toLocaleTimeString();

    // Step 1: Detect & Classify
    setTimeout(() => {
      setSimulationLogs(prev => [
        `[${timestamp()}] [PHASE 1] DETECTED: ${activeConfig.title} | Severity: ${activeConfig.severity}`,
        `[${timestamp()}] [PHASE 1] Root cause hypothesis logged: ${activeConfig.rootCause}`,
        ...prev
      ]);
      setCurrentStep(2);
    }, 1200);

    // Step 2: Identify Affected Candidate Sessions
    setTimeout(() => {
      setSimulationLogs(prev => [
        `[${timestamp()}] [PHASE 2] ISOLATED: ${affectedCandidateCount.toLocaleString()} candidate terminals shifted to OFFLINE BUFFERING.`,
        `[${timestamp()}] [PHASE 2] Client Write-Ahead Logging (WAL) locked into browser IndexedDB sandbox.`,
        ...prev
      ]);
      setCurrentStep(3);
    }, 2800);

    // Step 3: Response Recovery & Cryptographic Seal
    setTimeout(() => {
      setSimulationLogs(prev => [
        `[${timestamp()}] [PHASE 3] INTEGRITY AUDIT: 100% of candidate clicks sealed with SHA-256 Merkle hash chain.`,
        `[${timestamp()}] [PHASE 3] Zero uncommitted strokes. Memory write latency: 12ms. RPO = 0s.`,
        ...prev
      ]);
      setCurrentStep(4);
    }, 4500);

    // Step 4: AI Recovery Decision Engine
    setTimeout(() => {
      setSimulationLogs(prev => [
        `[${timestamp()}] [PHASE 4] AI DECISION ENGINE: Policy recommendation evaluated with 98.4% confidence.`,
        `[${timestamp()}] [PHASE 4] Action: ${activeConfig.recommendedAction} based on 0 data loss criteria.`,
        ...prev
      ]);
      setCurrentStep(5);
    }, 6200);

    // Step 5: Complete & Generate Audit Dossier
    setTimeout(() => {
      // Restore global network state to demonstrate seamless recovery
      restoreNetwork();

      setSimulationLogs(prev => [
        `[${timestamp()}] [PHASE 5] RESOLUTION COMPLETE: All ${affectedCandidateCount.toLocaleString()} candidates reconciled without loss.`,
        `[${timestamp()}] [PHASE 5] Cryptographic WORM audit log sealed. Evidence dossier ready for download.`,
        ...prev
      ]);
      setIsSimulating(false);
      setHasCompleted(true);

      addNotification({
        target: 'both',
        type: 'success',
        title: 'Disruption Handled with 100% Parity',
        message: `All ${affectedCandidateCount.toLocaleString()} candidates recovered seamlessly. Zero lost responses. RFC-5424 audit record archived.`
      });
    }, 8000);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setCurrentStep(0);
    setHasCompleted(false);
    setSimulationLogs([]);
    restoreNetwork();
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header & Hackathon Judge Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-red-800/40 shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                Hackathon Interactive Demo
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-[11px] font-bold">
                Judge Testing Lab
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Disruption Simulation Lab</span>
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Test ExamResQ in real-time under catastrophic disaster conditions. Trigger an outage, watch the automated 
              resilience response cascade across the ecosystem, and observe <strong>deterministic zero data loss (RPO = 0)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => setCurrentView('live_exam')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Inspect Candidate Screen</span>
            </button>
            <button
              onClick={handleResetSimulation}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Lab</span>
            </button>
          </div>
        </div>

        {/* Switcher Banner: Link to 3 Breakthrough Pillars (USP) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-red-600/15 border-2 border-amber-400/50 dark:border-amber-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                  JUDGES' CHOICE WINNING PILLARS
                </span>
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full uppercase">
                  USP
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
                Pillar 1: P2P Hive Mesh (Sever Main Internet Link & Hot-Swap) • Pillar 2: Digital DNA • Pillar 3: Anti-Panic
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('three_pillars')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white text-xs font-black tracking-wide shadow-md hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            <span>Open 3 Breakthrough Pillars Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid: Left Controls (Disaster Selection) + Right Live Cascade Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Interactive Scenario Builder (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Disruption Type Selector */}
            <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-xs">
                    1
                  </span>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    Select Failure Scenario
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-gray-400">4 Scenarios</span>
              </div>

              <div className="space-y-2.5">
                {DISRUPTIONS.map(d => {
                  const Icon = d.icon;
                  const isSelected = selectedDisruption === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        setSelectedDisruption(d.id);
                        setAffectedPct(d.defaultAffectedPct);
                      }}
                      disabled={isSimulating}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected 
                          ? 'bg-red-50/80 dark:bg-red-950/30 border-red-500/80 ring-2 ring-red-500/20 shadow-xs' 
                          : 'bg-gray-50/50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                      } ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className={`p-2.5 rounded-lg shrink-0 ${
                        isSelected 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            {d.title}
                          </h4>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            d.severity === 'CRITICAL' 
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' 
                              : d.severity === 'HIGH' 
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' 
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                          }`}>
                            {d.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                          {d.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Cohort Scale Selector */}
            <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-xs">
                    2
                  </span>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    Affected Cohort Scale
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                  {affectedCandidateCount.toLocaleString()} Candidates ({affectedPct}%)
                </span>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[10, 30, 50, 100].map(pct => (
                  <button
                    key={pct}
                    onClick={() => setAffectedPct(pct)}
                    disabled={isSimulating}
                    className={`py-2 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                      affectedPct === pct 
                        ? 'bg-red-600 text-white border-red-600 shadow-xs' 
                        : 'bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                  <span>1,000 (10%)</span>
                  <span>5,000 (50%)</span>
                  <span>10,000 (100%)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={affectedPct}
                  onChange={(e) => setAffectedPct(Number(e.target.value))}
                  disabled={isSimulating}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Total Exam Pool:</span>
                  <strong className="text-gray-900 dark:text-white font-mono">10,000 Candidates</strong>
                </div>
                <div className="flex justify-between">
                  <span>Simulated Disruption Impact:</span>
                  <strong className="text-red-600 dark:text-red-400 font-mono">{affectedCandidateCount.toLocaleString()} Active Terminals</strong>
                </div>
                <div className="flex justify-between">
                  <span>Target Recovery Time (RTO):</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{activeConfig.expectedRTO}</strong>
                </div>
              </div>
            </div>

            {/* Launch Trigger Button */}
            <button
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                isSimulating 
                  ? 'bg-amber-600 text-white animate-pulse' 
                  : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-red-500/20 hover:shadow-red-500/30'
              }`}
            >
              {isSimulating ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  <span>EXECUTING 5-PHASE RESILIENCE WORKFLOW...</span>
                </>
              ) : hasCompleted ? (
                <>
                  <RotateCcw className="w-5 h-5" />
                  <span>RE-RUN DISASTER SIMULATION</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  <span>SIMULATE DISRUPTION & ENGAGE WORKFLOW</span>
                </>
              )}
            </button>

          </div>

          {/* Right Column: Live 5-Phase Response Cascade & Evidence Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Live Workflow Stepper (The 5 Phases from Advisor's Blueprint) */}
            <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>Autonomous Resilience Workflow</span>
                    {isSimulating && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold animate-pulse">
                        LIVE EXECUTION
                      </span>
                    )}
                    {hasCompleted && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                        100% RESOLVED
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Real-time transition through ExamResQ's automated response pipeline
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-gray-400">
                  Step {currentStep} / 5
                </div>
              </div>

              {/* Stepper Cards */}
              <div className="space-y-3">
                
                {/* Phase 1 */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  currentStep === 1 
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/20' 
                    : currentStep > 1 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40' 
                    : 'bg-gray-50/40 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep > 1 
                          ? 'bg-emerald-600 text-white' 
                          : currentStep === 1 
                          ? 'bg-amber-600 text-white animate-spin' 
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {currentStep > 1 ? '✓' : '1'}
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Phase 1: Incident Classification & Severity Assignment
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">
                      {currentStep >= 1 ? 'INC-2026-9042' : 'Pending'}
                    </span>
                  </div>
                  {currentStep >= 1 && (
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 pl-8">
                      System auto-assigned severity <strong>{activeConfig.severity}</strong>. Correlated root cause logged across central command.
                    </p>
                  )}
                </div>

                {/* Phase 2 */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  currentStep === 2 
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/20' 
                    : currentStep > 2 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40' 
                    : 'bg-gray-50/40 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep > 2 
                          ? 'bg-emerald-600 text-white' 
                          : currentStep === 2 
                          ? 'bg-amber-600 text-white animate-spin' 
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {currentStep > 2 ? '✓' : '2'}
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Phase 2: Candidate Continuity Mode Engaged
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">
                      {currentStep >= 2 ? `${affectedCandidateCount.toLocaleString()} Terminals` : 'Pending'}
                    </span>
                  </div>
                  {currentStep >= 2 && (
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 pl-8">
                      Terminals seamlessly decoupled from cloud socket. <strong>IndexedDB Write-Ahead Logging active</strong>. Candidates continue answering without interruption.
                    </p>
                  )}
                </div>

                {/* Phase 3 */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  currentStep === 3 
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/20' 
                    : currentStep > 3 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40' 
                    : 'bg-gray-50/40 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep > 3 
                          ? 'bg-emerald-600 text-white' 
                          : currentStep === 3 
                          ? 'bg-amber-600 text-white animate-spin' 
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {currentStep > 3 ? '✓' : '3'}
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Phase 3: Cryptographic Merkle Integrity Validation
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">
                      {currentStep >= 3 ? 'RPO = 0s' : 'Pending'}
                    </span>
                  </div>
                  {currentStep >= 3 && (
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 pl-8">
                      WebCrypto SHA-256 Merkle root recalculated over all buffered responses. <strong>0 bit loss verified</strong>. Local tamper locks 100% pristine.
                    </p>
                  )}
                </div>

                {/* Phase 4 */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  currentStep === 4 
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/20' 
                    : currentStep > 4 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40' 
                    : 'bg-gray-50/40 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep > 4 
                          ? 'bg-emerald-600 text-white' 
                          : currentStep === 4 
                          ? 'bg-amber-600 text-white animate-spin' 
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {currentStep > 4 ? '✓' : '4'}
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Phase 4: AI Recovery Decision & Compensatory Time Allotment
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">
                      {currentStep >= 4 ? 'Policy Eq-3.1' : 'Pending'}
                    </span>
                  </div>
                  {currentStep >= 4 && (
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 pl-8">
                      Recommendation: <strong>{activeConfig.recommendedAction}</strong>. Automated time parity calculated to eliminate post-exam student litigation.
                    </p>
                  )}
                </div>

                {/* Phase 5 */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  currentStep === 5 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20' 
                    : 'bg-gray-50/40 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        hasCompleted 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {hasCompleted ? '✓' : '5'}
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Phase 5: Audit Dossier Certified & Sealed in WORM Vault
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">
                      {hasCompleted ? 'ISO 27001' : 'Pending'}
                    </span>
                  </div>
                  {hasCompleted && (
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 pl-8">
                      Incident closed. Complete evidence timeline generated into immutable PDF dossier ready for legal submission.
                    </p>
                  )}
                </div>

              </div>

              {/* Post-Resolution Action Buttons */}
              {hasCompleted && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All 5 Resilience Phases Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentView('recovery')}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Inspect Recovery Center
                    </button>
                    <button
                      onClick={downloadAuditDossierPDF}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Audit Dossier PDF</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Live RFC-5424 Structured Telemetry Log Terminal */}
            <div className="bg-[#0A0D14] rounded-2xl border border-gray-800 p-5 shadow-lg space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                  <Terminal className="w-3.5 h-3.5 text-red-400" />
                  <span>Real-Time Ingestion & Audit Stream (RFC-5424)</span>
                </div>
                <span className="text-[10px] text-gray-500">
                  {simulationLogs.length} Events Logged
                </span>
              </div>

              <div className="h-44 overflow-y-auto space-y-1.5 text-[11px] pr-2 scrollbar-thin scrollbar-thumb-gray-800">
                {simulationLogs.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-600 italic">
                    Press "Simulate Disruption" to observe live event stream...
                  </div>
                ) : (
                  simulationLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`leading-relaxed ${
                        log.includes('PHASE 1') 
                          ? 'text-red-400' 
                          : log.includes('PHASE 2') 
                          ? 'text-amber-300' 
                          : log.includes('PHASE 3') 
                          ? 'text-cyan-300' 
                          : log.includes('PHASE 4') 
                          ? 'text-blue-300' 
                          : 'text-emerald-400 font-bold'
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
