import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  backupTiersData, 
  sampleControlledResumeQueue, 
  sampleDisasterFallbackRecords, 
  periodicSaveHeartbeatHistory 
} from '../../data/disasterRecoveryData';
import { ControlledResumeRecord, DisasterFallbackRecord } from '../../types';
import { 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Layers, 
  Database, 
  Wifi, 
  WifiOff,
  ArrowRight,
  TrendingUp,
  Cpu,
  Lock,
  FileCheck2,
  Clock,
  HardDrive,
  Server,
  Cloud,
  Archive,
  UserCheck,
  AlertOctagon,
  FileText,
  Sparkles,
  Calendar,
  Check,
  X,
  Award,
  Zap,
  Radio,
  ExternalLink
} from 'lucide-react';

export const RecoveryCenter: React.FC = () => {
  const { 
    protectionStage, 
    networkStatus, 
    restoreNetwork, 
    triggerNetworkInterruption,
    offlineQueueCount,
    lastSavedHash,
    interruptionSecondsElapsed,
    compensatoryTimeAdded,
    timeRemainingSeconds,
    authorizeCandidateResumption,
    executeDisasterFallback,
    forcePeriodicSave,
    disasterRecoveryState,
    setCurrentView 
  } = useResilience();

  // Active navigation tab among the 5 mandated Requirement 4 sections
  const [activeTab, setActiveTab] = useState<'save' | 'recovery' | 'tiers' | 'resume' | 'fallback'>('save');

  // Step selector for the 6-Phase resilience lifecycle
  const [activeStepTab, setActiveStepTab] = useState<number>(4);

  // Controlled Resumption Interactive Modal
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [selectedResumeCandidate, setSelectedResumeCandidate] = useState<ControlledResumeRecord | null>(sampleControlledResumeQueue[0]);

  // Disaster Fallback Certificate Modal
  const [certificateModalOpen, setCertificateModalOpen] = useState<boolean>(false);
  const [selectedSalvageRecord, setSelectedSalvageRecord] = useState<DisasterFallbackRecord | null>(sampleDisasterFallbackRecords[0]);

  // Resumed candidates state tracking
  const [resumedQueue, setResumedQueue] = useState<ControlledResumeRecord[]>(sampleControlledResumeQueue);

  // 6-Phase Lifecycle Definition
  const recoverySteps = [
    {
      id: 1,
      title: "NORMAL",
      sub: "Active Session & Sync",
      desc: "Cloud sync is operational. Workstation pings 16ms. Responses periodically committed with SHA-256 seal.",
      icon: <Wifi className="w-5 h-5 text-[#16803C]" />
    },
    {
      id: 2,
      title: "FAILURE",
      sub: "Carrier Cut Detected",
      desc: "Uplink packet loss triggers autonomous disruption flag within 1.2s. Exam timer freezes immediately.",
      icon: <AlertTriangle className="w-5 h-5 text-[#C62828]" />
    },
    {
      id: 3,
      title: "PROTECTION",
      sub: "Client Sandbox Locked",
      desc: "Candidate responses lock in encrypted local IndexedDB sandbox with AES-256 GCM cryptographic seal.",
      icon: <Lock className="w-5 h-5 text-[#C62828]" />
    },
    {
      id: 4,
      title: "RECOVERY",
      sub: "Secondary Link Engaged",
      desc: "Microwave/fiber failover route re-establishes authenticated session tunnel with on-premises Edge Gateway.",
      icon: <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
    },
    {
      id: 5,
      title: "SYNCHRONIZATION",
      sub: "Delta Queue Reconciled",
      desc: "Idempotent delta packets stream to central authority. Duplicate vectors reconciled without student collision.",
      icon: <Database className="w-5 h-5 text-purple-600" />
    },
    {
      id: 6,
      title: "VERIFICATION",
      sub: "Merkle Root Sealed",
      desc: "100% cryptographic integrity verified. Exam resumes at exact question with automated time compensation.",
      icon: <CheckCircle2 className="w-5 h-5 text-[#16803C]" />
    }
  ];

  // Handle Proctor Resume Approval
  const handleApproveResumption = (candidate: ControlledResumeRecord) => {
    authorizeCandidateResumption(candidate.candidateId);
    setResumedQueue(prev => prev.map(c => 
      c.candidateId === candidate.candidateId 
        ? { ...c, status: 'resumed', compensatoryTimeSeconds: candidate.compensatoryTimeSeconds } 
        : c
    ));
    setResumeModalOpen(false);
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}m ${remaining}s`;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOP COMMAND HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                Disaster Recovery
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                Zero-Loss
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1.5 tracking-tight">
              Disaster Recovery
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-3xl">
              Periodic auto-saving, multi-tier data redundancy, and session resumption.
            </p>
          </div>

          {/* Quick Simulation & Testing Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={forcePeriodicSave}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer border border-gray-300 flex items-center gap-1.5"
              title="Trigger immediate client heartbeat response save"
            >
              <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Force Auto-Save</span>
            </button>

            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulate Outage</span>
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5 animate-pulse"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Restore Network</span>
              </button>
            )}

            <button
              onClick={() => {
                setSelectedResumeCandidate(resumedQueue[0]);
                setResumeModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Controlled Resume</span>
            </button>
          </div>
        </div>

        {/* Resilience Overview Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-red-950 via-[#1F1414] to-gray-900 border border-red-900/60 p-5 sm:p-6 text-white shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-400" />
                  Session Continuity
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-100">
                Continuous Client-Side Cryptographic Hashing
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                Auto-freezing timers, automatic compensatory credits, and verified instant re-entry at the exact saved question.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => {
                  if (networkStatus === 'connected') {
                    triggerNetworkInterruption();
                  } else {
                    restoreNetwork();
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>{networkStatus === 'connected' ? 'Test Outage' : 'Complete Recovery'}</span>
              </button>

              <button
                onClick={() => setCurrentView('live_exam')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20 flex items-center gap-1.5"
              >
                <span>Candidate View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5-TAB NAVIGATION FOR REQUIREMENT 4 PILLARS */}
        <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
            <button
              onClick={() => setActiveTab('save')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'save'
                  ? 'bg-[#C62828] text-white shadow-xs'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>1. Periodic Auto-Save</span>
            </button>

            <button
              onClick={() => setActiveTab('recovery')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'recovery'
                  ? 'bg-[#C62828] text-white shadow-xs'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>2. Recovery Lifecycle</span>
            </button>

            <button
              onClick={() => setActiveTab('tiers')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'tiers'
                  ? 'bg-[#C62828] text-white shadow-xs'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3. Multi-Tier Backups</span>
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'resume'
                  ? 'bg-[#C62828] text-white shadow-xs'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>4. Controlled Resume</span>
            </button>

            <button
              onClick={() => setActiveTab('fallback')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'fallback'
                  ? 'bg-[#C62828] text-white shadow-xs'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>5. Catastrophic Fallback</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PERIODIC SAVING OF CANDIDATE RESPONSES */}
        {activeTab === 'save' && (
          <div className="space-y-6">
            {/* Real-Time Auto-Save Heartbeat & Status Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-gray-500">Auto-Save Heartbeat</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-ping" />
                </div>
                <div className="text-2xl font-black text-gray-900 font-mono">Every 3.0s</div>
                <p className="text-xs text-gray-500">
                  Continuous background ledger commits every keystroke & radio selection with zero UI freeze.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-gray-500">Local Sandbox Encryption</span>
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-gray-900 font-mono">AES-256 GCM</div>
                <p className="text-xs text-gray-500">
                  Client storage sandbox backed by WebCrypto IndexedDB. Tamper-proof even if browser crashes.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-gray-500">Cryptographic Seal</span>
                  <ShieldCheck className="w-4 h-4 text-[#16803C]" />
                </div>
                <div className="text-lg font-black text-gray-900 font-mono truncate">{lastSavedHash}</div>
                <p className="text-xs text-gray-500">
                  Continuous SHA-256 digest linked to central Merkle tree for immediate zero-collision verification.
                </p>
              </div>
            </div>

            {/* Live IndexedDB Engine Status Callout */}
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-300">Browser-Native Disaster Recovery Sandbox:</span>
                    <span className="font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded text-[10px] border border-emerald-800 font-bold">
                      {disasterRecoveryState.storageEngine}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    Persistent database active. Answers committed to encrypted object stores with SHA-256 seal.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                <div className="px-2.5 py-1 rounded bg-black/30 border border-gray-700 text-gray-300">
                  Persisted: <strong className="text-white">{disasterRecoveryState.totalPersisted}</strong>
                </div>
                <div className="px-2.5 py-1 rounded bg-black/30 border border-gray-700 text-gray-300">
                  Unsynced: <strong className={disasterRecoveryState.unsyncedCount > 0 ? "text-amber-400" : "text-emerald-400"}>{disasterRecoveryState.unsyncedCount}</strong>
                </div>
                <div className="px-2.5 py-1 rounded bg-emerald-900/40 border border-emerald-700 text-emerald-300">
                  {disasterRecoveryState.isOnline ? "● ONLINE" : "● BUFFERING"}
                </div>
              </div>
            </div>

            {/* Periodic Save Heartbeat History Ledger */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    Periodic Candidate Response Ledger (Client & Cloud Sync Stream)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Live proof of continuous periodic saving conforming to Requirement 4.1
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    IndexedDB + Cloud Mirror Active
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 uppercase text-[11px]">
                      <th className="py-2.5 px-3">Packet Seq</th>
                      <th className="py-2.5 px-3">Heartbeat Timestamp</th>
                      <th className="py-2.5 px-3">Question & Choice</th>
                      <th className="py-2.5 px-3">SHA-256 Tamper Seal</th>
                      <th className="py-2.5 px-3">Encrypted Size</th>
                      <th className="py-2.5 px-3">Target Storage</th>
                      <th className="py-2.5 px-3">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    {periodicSaveHeartbeatHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-gray-900">{item.packetSeq}</td>
                        <td className="py-3 px-3 text-gray-600 font-sans">{item.timestamp}</td>
                        <td className="py-3 px-3 font-sans font-bold text-gray-900">{item.question} ({item.chosenOption})</td>
                        <td className="py-3 px-3 text-gray-500 truncate max-w-[150px]">{item.sha256Seal}</td>
                        <td className="py-3 px-3 text-gray-600">{item.encryptedBytes}</td>
                        <td className="py-3 px-3 font-sans text-gray-600 text-[11px]">{item.storageTarget}</td>
                        <td className="py-3 px-3 font-sans font-bold text-[#16803C]">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px]">
                            <Check className="w-3 h-3" />
                            {item.verification}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RECOVERY PROCESS FOR INTERRUPTED SESSIONS */}
        {activeTab === 'recovery' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                Requirement 4.2: Interrupted Session Recovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                The 6-Phase Resilience Lifecycle
              </h2>
              <p className="text-xs text-gray-500">
                Interactive state machine illustrating how ExamResQ handles network cuts, power drops, and ISP degradation with 0% data loss.
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
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-800">
                        Phase {selectedStepData.id} of 6
                      </span>
                      <span className="text-xs font-bold text-[#C62828]">{selectedStepData.title}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedStepData.sub}</h3>
                    <p className="text-xs text-gray-600 max-w-2xl leading-relaxed">{selectedStepData.desc}</p>
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
                <p className="text-[11px] text-gray-500">Autonomous packet loss & heartbeat threshold</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white text-center space-y-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Recovery Time (MTTR)</span>
                <div className="text-3xl font-black text-gray-900 font-mono">48s</div>
                <p className="text-[11px] text-gray-500">Automated secondary route failover & delta reconcile</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white text-center space-y-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Data Loss Rate</span>
                <div className="text-3xl font-black text-[#16803C] font-mono">0.00%</div>
                <p className="text-[11px] text-gray-500">Mathematical guarantee backed by SHA-256 seal</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MULTI-TIER BACKUP ARRANGEMENTS */}
        {activeTab === 'tiers' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-blue-600">Requirement 4.3</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-bold text-gray-700">Multi-Tier Data Redundancy</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Examination Data Backup Architecture
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl">
                4-tier failover topology ensuring examination answers survive workstation death, local area network blackout, cloud region disaster, and malicious alteration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {backupTiersData.map((tier) => (
                <div 
                  key={tier.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4 hover:border-gray-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#C62828]">
                        {tier.layer === 'Tier 1' && <HardDrive className="w-5 h-5" />}
                        {tier.layer === 'Tier 2' && <Server className="w-5 h-5" />}
                        {tier.layer === 'Tier 3' && <Cloud className="w-5 h-5" />}
                        {tier.layer === 'Tier 4' && <Archive className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {tier.layer}
                        </span>
                        <h3 className="text-base font-black text-gray-900 mt-1">{tier.name}</h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      OPERATIONAL
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 font-mono uppercase block">Storage Technology</span>
                      <span className="font-bold text-gray-800 font-mono text-[11px]">{tier.storageTech}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-mono uppercase block">Sync Latency</span>
                      <span className="font-bold text-[#16803C] font-mono text-[11px]">{tier.syncLatency}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-mono uppercase block">Redundancy / HA</span>
                      <span className="font-bold text-gray-800 text-[11px]">{tier.redundancyLevel}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-mono uppercase block">Encryption Standard</span>
                      <span className="font-bold text-gray-800 font-mono text-[11px]">{tier.encryption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTROLLED PROCEDURE TO RESUME AN EXAMINATION */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-blue-600">Requirement 4.4</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-bold text-gray-700">Controlled Resumption Standard Operating Procedure</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Controlled Examination Resumption & Time Compensation
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl">
                Candidates reconnecting after an outage resume at the exact question and choice with proctor authorization and fully automated compensatory time.
              </p>
            </div>

            {/* 3 Step SOP Workflow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Step 01
                </span>
                <h4 className="text-sm font-bold text-gray-900">Proctor Re-Authorization</h4>
                <p className="text-xs text-gray-500">
                  Proctor verifies physical workstation identity and issues one-time digital clearance token (PRC-AUTH).
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Step 02
                </span>
                <h4 className="text-sm font-bold text-gray-900">Exact Question State Restoration</h4>
                <p className="text-xs text-gray-500">
                  Candidate resumes exactly where they left off (e.g. Question 14, Option A selected, review flags intact).
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Step 03
                </span>
                <h4 className="text-sm font-bold text-gray-900">Automated Time Compensation</h4>
                <p className="text-xs text-gray-500">
                  Timer automatically credits the entire outage duration + 60-second stabilization buffer. Candidate loses 0 seconds.
                </p>
              </div>
            </div>

            {/* Controlled Resumption Candidate Queue */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    Active Controlled Resumption Queue
                  </h3>
                  <p className="text-xs text-gray-500">
                    Real-time candidates awaiting or undergoing controlled resumption
                  </p>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded bg-blue-50 text-blue-700 font-bold">
                  {resumedQueue.filter(c => c.status === 'resumed').length} / {resumedQueue.length} Sessions Resumed
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 uppercase text-[11px]">
                      <th className="py-2.5 px-3">Candidate / Roll</th>
                      <th className="py-2.5 px-3">Last Saved State</th>
                      <th className="py-2.5 px-3">Outage Duration</th>
                      <th className="py-2.5 px-3">Compensatory Credit</th>
                      <th className="py-2.5 px-3">Proctor Authorization</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    {resumedQueue.map((item) => (
                      <tr key={item.candidateId} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-bold text-gray-900 font-sans block">{item.candidateName}</span>
                          <span className="text-gray-500 text-[11px]">{item.rollNumber}</span>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <span className="font-bold text-[#C62828]">Q{item.lastQuestionIndex}</span>
                          <span className="text-gray-500 text-[11px] block">{item.lastSavedOption}</span>
                        </td>
                        <td className="py-3 px-3 text-gray-700 font-sans">{item.interruptionDurationSeconds} seconds</td>
                        <td className="py-3 px-3 text-[#16803C] font-bold font-sans">
                          +{item.compensatoryTimeSeconds}s (+60s buffer)
                        </td>
                        <td className="py-3 px-3 text-gray-600 text-[11px]">
                          <span className="font-bold text-gray-800 block">{item.proctorToken}</span>
                          <span className="text-gray-500 font-sans">{item.proctorName}</span>
                        </td>
                        <td className="py-3 px-3">
                          {item.status === 'resumed' ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 text-[10px] font-bold font-sans flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" /> Resumed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold font-sans flex items-center gap-1 w-fit">
                              <Clock className="w-3 h-3" /> Awaiting Authorization
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedResumeCandidate(item);
                              setResumeModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer"
                          >
                            Inspect & Authorize
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FALLBACK PLAN WHEN RECOVERY IS NOT POSSIBLE */}
        {activeTab === 'fallback' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-red-600">Requirement 4.5</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-bold text-gray-700">Catastrophic Physical Failure Contingency</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Fallback Protocol & Zero-Penalty Academic Guarantee
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-3xl">
                When physical hardware is destroyed or prolonged power failure occurs, candidate responses are salvaged cryptographically, free priority re-scheduling is booked within 48 hours, and a zero-penalty academic guarantee is issued.
              </p>
            </div>

            {/* 4 Point Institutional Guarantee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-gray-900">1. Session State Salvage</h4>
                <p className="text-xs text-gray-500">
                  Encrypted salvage blob extracted directly from RAM cache or edge gateway storage.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#16803C]">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-gray-900">2. Zero-Penalty Guarantee</h4>
                <p className="text-xs text-gray-500">
                  Institutional certificate legally guarantees candidate will suffer no mark deduction or academic debarment.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-gray-900">3. Priority Re-Scheduling</h4>
                <p className="text-xs text-gray-500">
                  Automated re-booking in candidate's chosen center/slot within 48 hours with fresh randomized question seed.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-gray-900">4. Authority Broadcast</h4>
                <p className="text-xs text-gray-500">
                  Automatic SMS & Email dispatches to student and Central Examination Authority with verified incident seal.
                </p>
              </div>
            </div>

            {/* Disaster Fallback Case Register */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    Disaster Fallback & Salvage Register
                  </h3>
                  <p className="text-xs text-gray-500">
                    Official records of physical workstation failures handled via fallback protocol
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {sampleDisasterFallbackRecords.map((record) => (
                  <div 
                    key={record.salvageId}
                    className="p-5 rounded-xl border border-gray-200 bg-[#F8F8F6] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-100 text-[#C62828]">
                          {record.salvageId}
                        </span>
                        <span className="font-bold text-gray-900 text-sm">{record.candidateName}</span>
                        <span className="text-xs text-gray-500 font-mono">({record.rollNumber})</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-[#16803C] font-bold">
                          ✓ CERTIFICATE ISSUED
                        </span>
                      </div>

                      <p className="text-xs text-gray-700 font-medium">
                        <strong>Reason:</strong> {record.reason}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500 font-mono pt-1">
                        <span>Blob: {record.encryptedBlobHash.substring(0, 16)}...</span>
                        <span>•</span>
                        <span className="text-blue-700 font-semibold">{record.rescheduledSlot}</span>
                      </div>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setSelectedSalvageRecord(record);
                          setCertificateModalOpen(true);
                        }}
                        className="w-full md:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Guarantee Certificate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTROLLED RESUMPTION MODAL */}
        {resumeModalOpen && selectedResumeCandidate && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Controlled Resumption Authorization</h3>
                    <p className="text-xs text-gray-500 font-mono">{selectedResumeCandidate.candidateId}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setResumeModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Candidate Name:</span>
                    <span className="font-bold text-gray-900 font-sans">{selectedResumeCandidate.candidateName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Safely Saved State:</span>
                    <span className="font-bold text-[#C62828]">Question {selectedResumeCandidate.lastQuestionIndex} ({selectedResumeCandidate.lastSavedOption})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Outage Duration:</span>
                    <span className="font-mono text-gray-800">{selectedResumeCandidate.interruptionDurationSeconds} seconds</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                    <span className="text-emerald-700">Compensatory Credit:</span>
                    <span className="text-emerald-700 font-mono">+{selectedResumeCandidate.compensatoryTimeSeconds} seconds (+60s buffer)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Proctor Token: {selectedResumeCandidate.proctorToken}</span>
                  </div>
                  <p className="text-[11px] text-blue-700">
                    Authorized by {selectedResumeCandidate.proctorName}. Resuming ensures zero candidate exam time is lost.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setResumeModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApproveResumption(selectedResumeCandidate)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Resume Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ACADEMIC GUARANTEE CERTIFICATE MODAL */}
        {certificateModalOpen && selectedSalvageRecord && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full border border-gray-200 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#C62828]" />
                  <div>
                    <h3 className="text-base font-black text-gray-900 tracking-tight">Institutional Academic Guarantee</h3>
                    <p className="text-[10px] font-mono text-gray-500">{selectedSalvageRecord.academicGuaranteeCertificateId}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setCertificateModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Canvas */}
              <div className="border-2 border-dashed border-red-200 rounded-2xl p-6 bg-red-50/20 text-center space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C62828] font-black">
                  CENTRAL EXAMINATION DISASTER CONTINGENCY BOARD
                </div>

                <div className="text-lg font-black text-gray-900">
                  Zero-Penalty Academic Protection Certificate
                </div>

                <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                  This certifies that candidate <strong>{selectedSalvageRecord.candidateName}</strong> (Roll: {selectedSalvageRecord.rollNumber}) experienced an unrecoverable hardware fault during <strong>{selectedSalvageRecord.affectedSubject}</strong>.
                </p>

                <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs font-mono space-y-1 text-left">
                  <div className="text-gray-500">Encrypted Salvage Blob SHA-256:</div>
                  <div className="text-[11px] text-gray-900 font-bold break-all">{selectedSalvageRecord.encryptedBlobHash}</div>
                </div>

                <div className="pt-2 text-xs font-bold text-[#16803C] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Re-Scheduling: {selectedSalvageRecord.rescheduledSlot}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 font-mono border-t border-gray-100 pt-4">
                <span>Dispatched: {selectedSalvageRecord.notifiedAt}</span>
                <button
                  onClick={() => setCertificateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white cursor-pointer"
                >
                  Close Certificate
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
