import React, { useState, useEffect } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  ShieldAlert, 
  Heart, 
  RotateCcw, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Cpu, 
  Activity, 
  Copy, 
  Check, 
  QrCode, 
  Clock, 
  HelpCircle, 
  Flame, 
  ArrowRight,
  ExternalLink,
  Zap,
  Users
} from 'lucide-react';

export const ThreePillarsDemo: React.FC = () => {
  const { 
    setCurrentView, 
    addNotification, 
    downloadAuditDossierPDF,
    studentName
  } = useResilience();

  const [activePillarTab, setActivePillarTab] = useState<'mesh' | 'dna' | 'empathy'>('mesh');

  // ==========================================
  // PILLAR 1: MESH & HOT-SWAP DEMO STATE
  // ==========================================
  const [isWanSevered, setIsWanSevered] = useState<boolean>(false);
  const [crashedPcId, setCrashedPcId] = useState<number | null>(null);
  const [hotSwappedPcId, setHotSwappedPcId] = useState<number | null>(null);
  const [isHotSwapping, setIsHotSwapping] = useState<boolean>(false);

  // Terminals: 8 PCs in the hall
  const [terminals, setTerminals] = useState([
    { id: 1, name: 'WS-01', candidate: 'Rohan Sharma', status: 'online', answers: 38 },
    { id: 2, name: 'WS-02', candidate: 'Priya Verma', status: 'online', answers: 42 },
    { id: 3, name: 'WS-03', candidate: 'Amit Patel', status: 'online', answers: 35 },
    { id: 4, name: 'WS-04', candidate: `${studentName} (Self)`, status: 'online', answers: 40 },
    { id: 5, name: 'WS-05', candidate: 'Neha Gupta', status: 'online', answers: 39 },
    { id: 6, name: 'WS-06', candidate: 'Karan Singh', status: 'online', answers: 41 },
    { id: 7, name: 'WS-07', candidate: 'Ananya Roy', status: 'online', answers: 36 },
    { id: 8, name: 'WS-08', candidate: 'VACANT HOT-SWAP', status: 'vacant', answers: 0 },
  ]);

  const handleSeverWan = () => {
    setIsWanSevered(true);
    addNotification({
      target: 'both',
      type: 'warning',
      title: 'WAN FIBER CUT SIMULATED',
      message: 'Internet cable severed! All 8 terminals seamlessly switched to Air-Gapped Local P2P Mesh.'
    });
  };

  const handleCrashPc = (id: number) => {
    setCrashedPcId(id);
    setTerminals(prev => prev.map(t => t.id === id ? { ...t, status: 'crashed' } : t));
    addNotification({
      target: 'admin',
      type: 'alert',
      title: `TERMINAL ${terminals.find(t=>t.id===id)?.name} POWER OUTAGE`,
      message: `Workstation crashed! Session state preserved across peers WS-03 & WS-05.`
    });
  };

  const handleHotSwap = () => {
    if (!crashedPcId) return;
    setIsHotSwapping(true);
    setTimeout(() => {
      setHotSwappedPcId(8);
      setTerminals(prev => prev.map(t => {
        if (t.id === 8) {
          return { ...t, candidate: `${studentName} (Resumed)`, status: 'restored', answers: 40 };
        }
        return t;
      }));
      setIsHotSwapping(false);
      addNotification({
        target: 'both',
        type: 'success',
        title: '3-SECOND TERMINAL HOT-SWAP COMPLETE',
        message: 'State rehydrated from neighboring peers in 1.8s. 0 lost questions (RPO = 0s).'
      });
    }, 1800);
  };

  const handleResetMesh = () => {
    setIsWanSevered(false);
    setCrashedPcId(null);
    setHotSwappedPcId(null);
    setIsHotSwapping(false);
    setTerminals([
      { id: 1, name: 'WS-01', candidate: 'Rohan Sharma', status: 'online', answers: 38 },
      { id: 2, name: 'WS-02', candidate: 'Priya Verma', status: 'online', answers: 42 },
      { id: 3, name: 'WS-03', candidate: 'Amit Patel', status: 'online', answers: 35 },
      { id: 4, name: 'WS-04', candidate: `${studentName} (Self)`, status: 'online', answers: 40 },
      { id: 5, name: 'WS-05', candidate: 'Neha Gupta', status: 'online', answers: 39 },
      { id: 6, name: 'WS-06', candidate: 'Karan Singh', status: 'online', answers: 41 },
      { id: 7, name: 'WS-07', candidate: 'Ananya Roy', status: 'online', answers: 36 },
      { id: 8, name: 'WS-08', candidate: 'VACANT HOT-SWAP', status: 'vacant', answers: 0 },
    ]);
  };

  // ==========================================
  // PILLAR 2: DIGITAL DNA & ANTI-TAMPER STATE
  // ==========================================
  const [isDnaTampered, setIsDnaTampered] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const originalBlocks = [
    { seq: 1, q: 'Q1 (Math)', opt: 'B', time: '10:02:14', hash: '0x8f4c2e1b9a7d3f0e5c6a8b1d4e7f2a0c' },
    { seq: 2, q: 'Q2 (Physics)', opt: 'A', time: '10:05:42', hash: '0x1b7d5f0e8f4c2a0c6e8b0d2f3c4e6b8d' },
    { seq: 3, q: 'Q3 (Chem)', opt: isDnaTampered ? 'C [TAMPERED]' : 'D', time: isDnaTampered ? '15:42:00 [EVENING EDIT]' : '10:09:18', hash: isDnaTampered ? '0xBAD_HASH_MUTATED_00000000000000' : '0x3c914e7f8a7d0e5c1a2c4e6b8d0f2a4c' },
    { seq: 4, q: 'Q4 (Biology)', opt: 'C', time: '10:14:05', hash: '0x4b772a0c3b5d7e9f1a2c4e6b8d0f2a4c' },
  ];

  const handleTamperDna = () => {
    setIsDnaTampered(true);
    addNotification({
      target: 'admin',
      type: 'alert',
      title: '🚨 CRITICAL CORRUPTION ALERT: Merkle Hash Broken',
      message: 'Unauthorized database alteration detected on Question #3! Mathematical signature invalidated.'
    });
  };

  const handleRestoreDna = () => {
    setIsDnaTampered(false);
    addNotification({
      target: 'admin',
      type: 'success',
      title: 'Ledger Restored to Pristine Truth',
      message: 'Cryptographic Merkle tree 100% verified against candidate signed key.'
    });
  };

  // ==========================================
  // PILLAR 3: EMPATHY & BREATHING BUFFER STATE
  // ==========================================
  const [isEmpathyOutage, setIsEmpathyOutage] = useState<boolean>(false);
  const [showBreathingModal, setShowBreathingModal] = useState<boolean>(false);
  const [breathingSecondsLeft, setBreathingSecondsLeft] = useState<number>(60);
  const [silentSosSent, setSilentSosSent] = useState<boolean>(false);

  const handleSimulateEmpathyOutage = () => {
    setIsEmpathyOutage(true);
    addNotification({
      target: 'both',
      type: 'warning',
      title: 'Terminal Interruption (134s Lag)',
      message: 'Screen lag of 2 minutes 14 seconds detected. Engaging Anti-Panic Guardian...'
    });

    setTimeout(() => {
      setIsEmpathyOutage(false);
      setShowBreathingModal(true);
      setBreathingSecondsLeft(60);
    }, 2000);
  };

  useEffect(() => {
    let interval: any;
    if (showBreathingModal && breathingSecondsLeft > 0) {
      interval = setInterval(() => {
        setBreathingSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showBreathingModal, breathingSecondsLeft]);

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-red-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                The Holy Trinity of ExamResQ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-[11px] font-bold">
                Interactive Breakthrough Demos
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              The 3 Game-Changing Pillars
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Three revolutionary, unprecedented innovations that solve the core crises of Indian competitive exams: 
              <strong> (1) Physical Infrastructure Resilience</strong>, <strong>(2) Anti-Corruption Trust</strong>, and <strong>(3) Human Empathy & Legal Justice</strong>.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
            <button
              onClick={() => setCurrentView('simulation_lab')}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Open Disruption Simulation Lab</span>
            </button>
            <button
              onClick={downloadAuditDossierPDF}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Download Pitch Deck PDF</span>
            </button>
          </div>
        </div>

        {/* 3 Pillar Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Tab 1 */}
          <button
            onClick={() => setActivePillarTab('mesh')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activePillarTab === 'mesh'
                ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                : 'bg-white dark:bg-[#0D121F] border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm">
                  01
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-bold">
                  INFRASTRUCTURE
                </span>
              </div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white">
                The Self-Healing Hive Mesh
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Zero-Server, Zero-Internet exam hall. Neighboring PCs peer-replicate. 3-second terminal hot-swap.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>Launch Live Mesh Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Tab 2 */}
          <button
            onClick={() => setActivePillarTab('dna')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activePillarTab === 'dna'
                ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20 shadow-md'
                : 'bg-white dark:bg-[#0D121F] border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-sm">
                  02
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-[10px] font-mono font-bold">
                  ANTI-CORRUPTION
                </span>
              </div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white">
                The Digital DNA Truth Seal
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Sequential Merkle time-lock. Prevents post-exam database tampering. Candidate truth hash receipt.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <span>Launch Anti-Tamper Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Tab 3 */}
          <button
            onClick={() => setActivePillarTab('empathy')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activePillarTab === 'empathy'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                : 'bg-white dark:bg-[#0D121F] border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                  03
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold">
                  STUDENT JUSTICE
                </span>
              </div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white">
                The Anti-Panic Co-Pilot
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                60-second breathing buffer. Silent digital SOS. Exact millisecond time parity (NEET grace-marks killer).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>Launch Empathy Shield Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE DEMO 1: P2P HIVE MESH & TERMINAL HOT-SWAP */}
        {/* ======================================================== */}
        {activePillarTab === 'mesh' && (
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-bold">
                    PILLAR 01 INTERACTIVE SANDBOX
                  </span>
                  <span className="text-xs text-gray-400">Exam Hall Alpha-Deck (8 Terminals)</span>
                </div>
                <h2 className="text-lg font-black text-gray-900 dark:text-white mt-1">
                  Air-Gapped P2P Mesh & 3-Second Hot-Swap Simulator
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {!isWanSevered ? (
                  <button
                    onClick={handleSeverWan}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105"
                  >
                    <WifiOff className="w-4 h-4" />
                    <span>Sever Main Internet Link</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetMesh}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restore Main Internet Link</span>
                  </button>
                )}
                <button
                  onClick={() => handleCrashPc(4)}
                  disabled={crashedPcId === 4}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Crash Terminal WS-04</span>
                </button>
                {crashedPcId === 4 && hotSwappedPcId !== 8 && (
                  <button
                    onClick={handleHotSwap}
                    disabled={isHotSwapping}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md animate-bounce"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isHotSwapping ? 'REHYDRATING (1.8s)...' : 'Hot-Swap to Vacant WS-08'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mesh Status Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
              isWanSevered 
                ? 'bg-blue-950/40 border-blue-600 text-blue-200' 
                : 'bg-emerald-950/30 border-emerald-600 text-emerald-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full animate-ping ${isWanSevered ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                <div className="text-xs">
                  <strong>Network Topology:</strong> {isWanSevered ? 'Zero-Internet Air-Gapped Local WebRTC Mesh Active' : 'Normal Cloud WebSocket Socket Uplink'}
                  <p className="text-[11px] opacity-80 mt-0.5">
                    {isWanSevered 
                      ? 'Even with 0 Kbps internet to outside world, terminals cross-replicate encrypted state locally.' 
                      : 'All candidate clicks committed locally before upstream dispatch.'}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-black/40 border border-white/10 shrink-0">
                Peer Links: 7 Active
              </span>
            </div>

            {/* The 8 Terminals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {terminals.map(t => {
                const isCrashed = t.status === 'crashed';
                const isRestored = t.status === 'restored';
                const isVacant = t.status === 'vacant';
                return (
                  <div
                    key={t.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isCrashed
                        ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/30'
                        : isRestored
                        ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg'
                        : isVacant
                        ? 'bg-gray-50/50 dark:bg-gray-900/20 border-dashed border-gray-300 dark:border-gray-700'
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-black text-xs text-gray-900 dark:text-white">
                          {t.name}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isCrashed 
                            ? 'bg-red-500/20 text-red-300' 
                            : isRestored 
                            ? 'bg-emerald-500/20 text-emerald-300 animate-pulse' 
                            : isVacant 
                            ? 'bg-gray-200 dark:bg-gray-800 text-gray-400' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {isCrashed ? 'DEAD' : isRestored ? 'RESTORED' : isVacant ? 'IDLE' : 'MESH'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                        {t.candidate}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                        {isVacant ? 'Standing By' : `${t.answers} Answers Protected`}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-200/60 dark:border-gray-800 flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span>RPO: 0s</span>
                      <span className={isCrashed ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {isCrashed ? 'P2P Buffered' : 'In Sync'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Educational Callout for Judges */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-300 space-y-1">
              <strong className="block font-bold">Why This Beats TCS iON & Global Portals:</strong>
              <p>
                In TCS iON, every college depends on 1 server in the basement. If a wire cuts, 500 students freeze. 
                ExamResQ turns the examination hall into a <strong>self-protecting hive</strong>: No single server, zero required WAN, and 3-second terminal hot-swapping!
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* INTERACTIVE DEMO 2: DIGITAL DNA & ANTI-TAMPER VAULT */}
        {/* ======================================================== */}
        {activePillarTab === 'dna' && (
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-mono text-[11px] font-bold">
                    PILLAR 02 INTERACTIVE SANDBOX
                  </span>
                  <span className="text-xs text-gray-400">Continuous Merkle DAG Time-Lock</span>
                </div>
                <h2 className="text-lg font-black text-gray-900 dark:text-white mt-1">
                  Post-Exam Database Anti-Tamper & Truth Receipt Simulator
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {!isDnaTampered ? (
                  <button
                    onClick={handleTamperDna}
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Simulate Evening Admin Tamper (Modify Q3)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRestoreDna}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Restore Cryptographic State</span>
                  </button>
                )}
                <button
                  onClick={() => setShowReceiptModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>View Student Truth Receipt</span>
                </button>
              </div>
            </div>

            {/* Root Hash Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 font-mono text-xs ${
              isDnaTampered 
                ? 'bg-red-950/50 border-red-500 text-red-200' 
                : 'bg-emerald-950/30 border-emerald-500 text-emerald-200'
            }`}>
              <div className="flex items-center gap-3">
                <Lock className={`w-5 h-5 shrink-0 ${isDnaTampered ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`} />
                <div>
                  <strong className="block">
                    {isDnaTampered ? '🚨 ROOT MERKLE SIGNATURE INVALIDATED (TAMPER DETECTED)' : '🔒 IMMUTABLE MERKLE DAG ROOT: 0x1f88c9920b7ae4d00891'}
                  </strong>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    {isDnaTampered 
                      ? 'Integrity broken at Sequence #3! Attempt to modify Option B -> C after exam conclusion mathematically rejected.'
                      : 'Every answer is mathematically chained with preceding answer hash & workstation timestamp.'}
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold shrink-0 ${
                isDnaTampered ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {isDnaTampered ? 'EVIDENCE CORRUPTED' : '100% VERIFIED'}
              </span>
            </div>

            {/* Visual Merkle Chain Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {originalBlocks.map((b, idx) => {
                const isBlockTampered = isDnaTampered && b.seq === 3;
                return (
                  <div
                    key={b.seq}
                    className={`p-4 rounded-xl border transition-all ${
                      isBlockTampered 
                        ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/40 shadow-lg' 
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-gray-500">Block #{b.seq}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isBlockTampered ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {isBlockTampered ? 'TAMPERED' : 'CHAINED'}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">{b.q}</h4>
                    <div className="mt-2 text-xs">
                      Selected: <strong className={isBlockTampered ? 'text-red-400 font-mono' : 'text-gray-900 dark:text-white font-mono'}>Option {b.opt}</strong>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Timestamp: {b.time}
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-200/60 dark:border-gray-800 font-mono text-[9px] text-gray-500 truncate">
                      Hash: {b.hash}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Educational Callout for Judges */}
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-300 space-y-1">
              <strong className="block font-bold">Why This Solves India's Biggest Exam Scams:</strong>
              <p>
                In high-stakes exams, scams happen in the evening between 1:00 PM and 4:00 PM when corrupt admins alter answers in SQL databases. 
                With ExamResQ's <strong>Digital DNA Time-Lock</strong>, even the Chairman of NTA cannot alter an answer without triggering an indelible forensic alarm in High Court!
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* INTERACTIVE DEMO 3: ANTI-PANIC CO-PILOT & JUSTICE */}
        {/* ======================================================== */}
        {activePillarTab === 'empathy' && (
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold">
                    PILLAR 03 INTERACTIVE SANDBOX
                  </span>
                  <span className="text-xs text-gray-400">Student Empathy & Cognitive Reset Protocol</span>
                </div>
                <h2 className="text-lg font-black text-gray-900 dark:text-white mt-1">
                  The Anti-Panic Co-Pilot & Millisecond Justice Simulator
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSimulateEmpathyOutage}
                  disabled={isEmpathyOutage}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Simulate 2m 14s Disruption Recovery</span>
                </button>
                <button
                  onClick={() => {
                    setSilentSosSent(true);
                    addNotification({
                      target: 'admin',
                      type: 'alert',
                      title: '🚨 SILENT SOS BEACON RECEIVED',
                      message: `Candidate ${studentName} raised hardware distress flag. Invigilator dispatch SLA: 90s.`
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{silentSosSent ? 'SOS Dispatched (90s SLA)' : 'Trigger Silent 1-Click SOS'}</span>
                </button>
              </div>
            </div>

            {/* The 3 Empathy Features Display Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Feature 1: Cognitive Reset */}
              <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>60s Breathing Reset Buffer</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Zero Timer Panic Upon Reconnection
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  When reconnection happens, ExamResQ <strong>DOES NOT</strong> restart the timer countdown immediately. 
                  It provides a 60-second paused breathing window to restore cognitive calm.
                </p>
                <button
                  onClick={() => setShowBreathingModal(true)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer pt-2"
                >
                  <span>Preview Breathing Screen Modal</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Feature 2: Silent SOS */}
              <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold text-xs">
                  <Terminal className="w-4 h-4" />
                  <span>Silent Digital SOS (No Shouting)</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Eliminates Invigilator Arrogance
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Students request rough sheets or report glitches silently with 1 click. Timestamped alert logs on Central Command with an enforced 90-second arrival SLA.
                </p>
                <div className="pt-2 text-[11px] font-mono text-gray-400">
                  Status: {silentSosSent ? 'Escalated to Central Observer' : 'Standing By'}
                </div>
              </div>

              {/* Feature 3: Millisecond Parity */}
              <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400 font-bold text-xs">
                  <Clock className="w-4 h-4" />
                  <span>Millisecond Time Parity</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  The NEET Grace-Marks Killer
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Keystroke and frame lag measured at millisecond precision. 134,280 ms lost = <strong>EXACTLY +2m 14s auto-credited</strong>. Zero human bias.
                </p>
                <div className="pt-2 text-[11px] font-mono text-purple-400 font-bold">
                  Parity Formula: Eq-3.1 Automated Credit
                </div>
              </div>

            </div>

            {/* Educational Callout for Judges */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
              <strong className="block font-bold">Why This Touches the Judges' Hearts:</strong>
              <p>
                Every year, 17-year-old students cry in exam halls because timers run out during glitches, driving suicides in coaching hubs. 
                ExamResQ is the <strong>first assessment ecosystem built with human empathy</strong>, completely eliminating arbitrary grace-mark scandals in the Supreme Court!
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: 60-SECOND COGNITIVE RESET & BREATHING BUFFER */}
      {/* ======================================================== */}
      {showBreathingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#0D1527] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Breathing Animation Pulse */}
            <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-pulse relative">
              <Heart className="w-10 h-10 text-emerald-400 fill-current animate-bounce" />
              <div className="absolute inset-0 rounded-full border border-emerald-400/50 animate-ping pointer-events-none" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold uppercase">
                COGNITIVE RESET BUFFER ACTIVE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Breathe Easy, {studentName}.
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mx-auto">
                Your connection has restored. Your answers are <strong>100% secured</strong> in our cryptographic safe. 
                Your exam timer is <strong>PAUSED</strong>. Take a sip of water and regain your focus.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-gray-800 text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Interruption Detected:</span>
                <span className="text-white font-bold">2m 14s (134,280 ms)</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Compensatory Time Added:</span>
                <span>+2 Minutes 14 Seconds</span>
              </div>
              <div className="flex justify-between text-gray-400 pt-1 border-t border-gray-800">
                <span>Resuming Exam In:</span>
                <span className="text-amber-400 font-bold">{breathingSecondsLeft} Seconds</span>
              </div>
            </div>

            <button
              onClick={() => setShowBreathingModal(false)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              I am Ready • Resume My Exam Now
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CANDIDATE CRYPTOGRAPHIC TRUTH RECEIPT */}
      {/* ======================================================== */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0D1527] border border-gray-200 dark:border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-gray-900 dark:text-white space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold">Candidate Truth Proof Receipt</h3>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 text-center space-y-3 font-mono text-xs">
              <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <QrCode className="w-10 h-10 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <strong className="block text-gray-900 dark:text-white font-bold">{studentName}</strong>
                <span className="text-gray-500 text-[11px]">Roll: ET-2026-ENG-4418 | Centre 08</span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[10px] break-all select-all text-rose-600 dark:text-rose-400 font-bold">
                0x1f88c9920b7ae4d00891a2c4e6b8d0f2a4c6e8b0d2f3c4e6b8d0f2a4c6e8b0d2
              </div>
              <p className="text-[10px] text-gray-400 font-sans">
                Cryptographically sealed with ECDH key. Tampering with this record in testing agency servers is mathematically verifiable in court.
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText('0x1f88c9920b7ae4d00891a2c4e6b8d0f2a4c6e8b0d2f3c4e6b8d0f2a4c6e8b0d2');
                setCopiedHash(true);
                setTimeout(() => setCopiedHash(false), 2000);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-rose-600 hover:bg-slate-800 dark:hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedHash ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedHash ? 'Hash Copied to Clipboard!' : 'Copy Verifiable Hash to Clipboard'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
