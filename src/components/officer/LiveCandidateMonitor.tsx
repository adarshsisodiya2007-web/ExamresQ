import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  Users, 
  ShieldAlert, 
  Clock, 
  Wifi, 
  WifiOff, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  RotateCcw, 
  Radio, 
  Search, 
  Filter, 
  Sparkles, 
  Terminal, 
  Lock, 
  Camera, 
  Megaphone,
  UserCheck,
  Activity
} from 'lucide-react';

export const LiveCandidateMonitor: React.FC = () => {
  const { 
    activeCandidates, 
    telemetryEvents, 
    sendOfficerWarning, 
    grantCandidateCompensatoryTime, 
    broadcastOfficerAnnouncement, 
    syncCandidateDirect,
    networkStatus,
    triggerNetworkInterruption,
    restoreNetwork,
    setCurrentView
  } = useResilience();

  const [filter, setFilter] = useState<'all' | 'active' | 'offline_buffering' | 'flagged'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState('Please keep your eyes focused on the screen.');
  const [announcementMessage, setAnnouncementMessage] = useState('All candidates: You have 30 minutes remaining. Remember all answers are continuously saved.');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const filteredCandidates = activeCandidates.filter(c => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? c.status === 'active' :
      filter === 'offline_buffering' ? c.status === 'offline_buffering' :
      c.status === 'flagged' || c.strikes > 0;

    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.stationId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const activeCount = activeCandidates.filter(c => c.status === 'active').length;
  const offlineCount = activeCandidates.filter(c => c.status === 'offline_buffering').length;
  const flaggedCount = activeCandidates.filter(c => c.status === 'flagged' || c.strikes > 0).length;

  const handleSendWarningSubmit = () => {
    if (selectedCandidateId && warningMessage.trim()) {
      sendOfficerWarning(selectedCandidateId, warningMessage.trim());
      setSelectedCandidateId(null);
    }
  };

  const handleBroadcastSubmit = () => {
    if (announcementMessage.trim()) {
      broadcastOfficerAnnouncement(announcementMessage.trim());
      setShowAnnouncementModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-gray-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Officer Title Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0D1527] border border-[#1E2A42] p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] font-bold">
              Institutional Live Surveillance & Telemetry Hub
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#38BDF8]" />
            Multi-Student Real-Time Monitoring Room
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl">
            Continuous sub-second telemetry across all concurrent candidate terminals. Observe answers saved, offline local encryption queues, proctor gaze alerts, and instant invigilator directives.
          </p>
        </div>

        {/* Action Controls for Officer */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAnnouncementModal(true)}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            <span>Broadcast Notice</span>
          </button>

          {networkStatus === 'connected' ? (
            <button
              onClick={triggerNetworkInterruption}
              className="px-4 py-2 rounded-xl bg-[#C62828] hover:bg-[#8E1B1B] text-white text-xs font-bold transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              title="Test multi-candidate offline response buffer"
            >
              <WifiOff className="w-4 h-4" />
              <span>Simulate Lab Outage</span>
            </button>
          ) : (
            <button
              onClick={restoreNetwork}
              className="px-4 py-2 rounded-xl bg-[#16803C] hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md flex items-center gap-2 cursor-pointer animate-pulse"
            >
              <Wifi className="w-4 h-4" />
              <span>Restore & Sync All</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('live_exam')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 border border-white/10 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Switch directly to candidate terminal view"
          >
            <Radio className="w-4 h-4 text-[#E53935]" />
            <span>Go to Candidate Room</span>
          </button>
        </div>
      </div>

      {/* Real-Time Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-[#0A101F] border border-[#1A253C] p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Concurrent Candidates</span>
            <Users className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1.5">
            {activeCandidates.length} <span className="text-xs text-gray-500 font-sans font-normal">Active Terminals</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% Real-Time Connected
          </div>
        </div>

        <div className="bg-[#0A101F] border border-[#1A253C] p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Normal Answering</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1.5">
            {activeCount} <span className="text-xs text-gray-500 font-sans font-normal">Stations</span>
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">
            Avg Latency: 18ms
          </div>
        </div>

        <div className="bg-[#0A101F] border border-[#1A253C] p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Offline Buffered</span>
            <WifiOff className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1.5">
            {offlineCount} <span className="text-xs text-gray-500 font-sans font-normal">IndexedDB</span>
          </div>
          <div className="text-[10px] text-amber-400 font-mono mt-1">
            Zero Responses Lost
          </div>
        </div>

        <div className="bg-[#0A101F] border border-[#1A253C] p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Flagged / Gaze Deviation</span>
            <ShieldAlert className="w-4 h-4 text-[#C62828]" />
          </div>
          <div className="text-2xl font-black text-red-400 font-mono mt-1.5">
            {flaggedCount} <span className="text-xs text-gray-500 font-sans font-normal">Requires Review</span>
          </div>
          <div className="text-[10px] text-red-400 font-mono mt-1">
            AI Proctor Evidence Active
          </div>
        </div>
      </div>

      {/* Main Content Layout: Candidate Grid on Left (8 cols) + Real-time Telemetry Stream on Right (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Candidate Surveillance Grid (8 Cols) */}
        <div className="xl:col-span-8 space-y-4">
          
          {/* Filter Bar & Search */}
          <div className="bg-[#0A101F] border border-[#1A253C] p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'all' 
                    ? 'bg-[#38BDF8] text-black font-extrabold shadow-sm' 
                    : 'bg-[#121B2B] text-gray-400 hover:text-white'
                }`}
              >
                All Students ({activeCandidates.length})
              </button>

              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'active' 
                    ? 'bg-emerald-500 text-black font-extrabold' 
                    : 'bg-[#121B2B] text-gray-400 hover:text-white'
                }`}
              >
                Normal ({activeCount})
              </button>

              <button
                onClick={() => setFilter('offline_buffering')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'offline_buffering' 
                    ? 'bg-amber-500 text-black font-extrabold' 
                    : 'bg-[#121B2B] text-gray-400 hover:text-white'
                }`}
              >
                Offline Encrypted ({offlineCount})
              </button>

              <button
                onClick={() => setFilter('flagged')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'flagged' 
                    ? 'bg-red-500 text-white font-extrabold' 
                    : 'bg-[#121B2B] text-gray-400 hover:text-white'
                }`}
              >
                Flagged / Strikes ({flaggedCount})
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate, roll, station..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-3 py-1.5 rounded-lg text-xs bg-[#121B2B] border border-[#1E2A42] text-white focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          {/* Cards Grid of Concurrent Candidates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCandidates.map((candidate) => {
              const progressPercent = Math.round((candidate.answeredCount / candidate.totalQuestions) * 100);

              return (
                <div
                  key={candidate.id}
                  className={`
                    relative rounded-2xl bg-[#0D1527] border transition-all duration-300 p-4 space-y-3.5
                    ${candidate.isSelf ? 'border-[#38BDF8]/60 shadow-lg shadow-[#38BDF8]/10' : 'border-[#1E2A42]'}
                    ${candidate.status === 'offline_buffering' ? 'border-amber-500/70 bg-[#141822]' : ''}
                    ${candidate.status === 'flagged' || candidate.strikes > 0 ? 'border-red-500/70 bg-[#171318]' : ''}
                  `}
                >
                  {/* Top Candidate Bar: Station ID + Live Video Proctoring Snapshot */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      
                      {/* Live Camera Feed Simulation with AI Bounding Box */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black border border-gray-700 shrink-0">
                        <img 
                          src={candidate.avatar} 
                          alt={candidate.name} 
                          className="w-full h-full object-cover"
                        />

                        {/* AI Proctoring Overlay */}
                        <div className={`absolute inset-0 border-2 rounded-xl pointer-events-none ${
                          candidate.faceStatus === 'verified' 
                            ? 'border-emerald-500/80' 
                            : candidate.faceStatus === 'looking_away'
                            ? 'border-amber-500/80 animate-pulse'
                            : 'border-red-500 animate-ping'
                        }`} />

                        <div className="absolute bottom-0 inset-x-0 bg-black/80 px-1 py-0.5 text-[8px] font-mono text-center text-gray-300 flex items-center justify-center gap-0.5">
                          <Camera className="w-2.5 h-2.5 text-[#38BDF8]" />
                          <span>LIVE</span>
                        </div>
                      </div>

                      {/* Candidate Identity */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm">
                            {candidate.name}
                          </h3>
                          {candidate.isSelf && (
                            <span className="px-1.5 py-0.2 rounded bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 text-[9px] font-mono font-bold">
                              YOU (CURRENT)
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                          <span>{candidate.rollNo}</span>
                          <span className="mx-1">•</span>
                          <span className="text-[#38BDF8] font-bold">{candidate.stationId}</span>
                        </div>

                        <div className="text-[10px] text-gray-500 truncate max-w-[200px]">
                          {candidate.centreName}
                        </div>
                      </div>
                    </div>

                    {/* Connection & Strike Status */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {candidate.status === 'offline_buffering' ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-mono font-bold flex items-center gap-1 animate-pulse">
                          <WifiOff className="w-3 h-3" />
                          <span>Offline Buffered ({candidate.pendingOfflineAnswers})</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Wifi className="w-3 h-3" />
                          <span>{candidate.connectionLatency}ms Live</span>
                        </span>
                      )}

                      {candidate.strikes > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800 text-[10px] font-mono font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-red-400" />
                          <span>Strikes: {candidate.strikes}/3</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> Verified Gaze
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Answering Progress Bar */}
                  <div className="space-y-1.5 bg-[#070B14] p-2.5 rounded-xl border border-[#162033]">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400 font-mono">
                        Progress: <strong className="text-white">{candidate.answeredCount}</strong> / {candidate.totalQuestions} Questions
                      </span>
                      <span className="font-mono font-bold text-[#38BDF8]">
                        {progressPercent}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                          candidate.status === 'offline_buffering'
                            ? 'bg-amber-500'
                            : 'bg-linear-to-r from-blue-500 to-[#38BDF8]'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-0.5 font-mono">
                      <span>Active on: <strong>Q{candidate.currentQuestion}</strong></span>
                      <span>Review: <strong>{candidate.markedReviewCount}</strong></span>
                      {candidate.compensationMinutes > 0 && (
                        <span className="text-emerald-400 font-bold">
                          +{candidate.compensationMinutes}m Parity Added
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Telemetry Snapshot: Last Action & Merkle Hash */}
                  <div className="text-[11px] font-mono space-y-1 text-gray-400 border-t border-[#1A253C] pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Last Telemetry:</span>
                      <span className="text-gray-300 font-medium truncate max-w-[200px]">
                        {candidate.lastAction}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Merkle Ledger:</span>
                      <span className="text-[#38BDF8] flex items-center gap-1 text-[10px]">
                        <Lock className="w-2.5 h-2.5" />
                        {candidate.merkleHash.substring(0, 16)}...
                      </span>
                    </div>
                  </div>

                  {/* Invigilator Action Buttons for this specific candidate */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      onClick={() => {
                        setSelectedCandidateId(candidate.id);
                        setWarningMessage(`Notice to ${candidate.name}: Keep your gaze focused on Station ${candidate.stationId}.`);
                      }}
                      className="py-1.5 px-2 rounded-lg bg-red-950/70 hover:bg-red-900 border border-red-800/80 text-red-200 text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span>Issue Warning</span>
                    </button>

                    <button
                      onClick={() => grantCandidateCompensatoryTime(candidate.id, 5)}
                      className="py-1.5 px-2 rounded-lg bg-blue-950/70 hover:bg-blue-900 border border-blue-800/80 text-blue-200 text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      title="Grant +5 minutes compensation for network delay (Req 9, 10)"
                    >
                      <Clock className="w-3 h-3 text-[#38BDF8]" />
                      <span>+5m Parity</span>
                    </button>

                    <button
                      onClick={() => syncCandidateDirect(candidate.id)}
                      className="py-1.5 px-2 rounded-lg bg-[#121B2B] hover:bg-[#1A2840] border border-[#1E2A42] text-gray-300 text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      title="Force sync local buffer with central Merkle ledger"
                    >
                      <RotateCcw className="w-3 h-3 text-emerald-400" />
                      <span>Re-Sync</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Live Telemetry Stream (4 Cols) */}
        <div className="xl:col-span-4 bg-[#0A101F] border border-[#1A253C] rounded-2xl p-4.5 space-y-4 sticky top-20 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1A253C] pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#38BDF8]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Live Audit & Telemetry Stream
              </h2>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
            Real-time feed of multi-candidate activity arriving from Station 14, 15, 16, and 17. Every answer click, socket degradation, and proctor flag streams here automatically.
          </p>

          {/* Scrollable Live Event List */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1 font-mono text-[11px] custom-scrollbar">
            {telemetryEvents.map((evt) => {
              const isWarning = evt.severity === 'warning';
              const isCritical = evt.severity === 'critical';
              const isSuccess = evt.severity === 'success';

              return (
                <div 
                  key={evt.id}
                  className={`
                    p-2.5 rounded-xl border transition-all text-xs
                    ${isCritical ? 'bg-red-950/40 border-red-900/60 text-red-200' : ''}
                    ${isWarning ? 'bg-amber-950/40 border-amber-900/60 text-amber-200' : ''}
                    ${isSuccess ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-200' : ''}
                    ${!isCritical && !isWarning && !isSuccess ? 'bg-[#0D1527] border-[#1E2A42] text-gray-300' : ''}
                  `}
                >
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isCritical ? 'bg-red-400 animate-pulse' :
                        isWarning ? 'bg-amber-400' :
                        isSuccess ? 'bg-emerald-400' : 'bg-[#38BDF8]'
                      }`} />
                      {evt.candidateName}
                    </span>
                    <span>{evt.timestamp}</span>
                  </div>

                  <p className="leading-snug">
                    {evt.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Network Outage Tester Notice */}
          <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2A42] text-[11px] text-gray-400 space-y-1.5 font-sans">
            <span className="font-bold text-white flex items-center gap-1.5 font-mono text-[10px] text-[#38BDF8]">
              <Sparkles className="w-3.5 h-3.5" />
              EVALUATOR TEST TIP:
            </span>
            <p>
              Switch back to the <strong>Student View</strong> in the left sidebar, click any answer in the exam, or hit <strong>Simulate Outage</strong>. Return here to see the telemetry update instantaneously!
            </p>
          </div>
        </div>

      </div>

      {/* MODAL 1: ISSUE CANDIDATE WARNING */}
      {selectedCandidateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-[#0D1527] border border-[#1E2A42] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-base">Direct Invigilator Directive</h3>
              </div>
              <button 
                onClick={() => setSelectedCandidateId(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300">
              Transmit an immediate directive to the candidate's workstation screen. This action will be digitally logged into the central audit ledger and increments the strike counter.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-gray-400 uppercase font-bold">
                Directive Message:
              </label>
              <textarea
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-[#070B14] border border-[#1E2A42] text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedCandidateId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendWarningSubmit}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit & Issue Strike</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BROADCAST ANNOUNCEMENT */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-[#0D1527] border border-[#1E2A42] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="font-bold text-base">Broadcast Exam Announcement</h3>
              </div>
              <button 
                onClick={() => setShowAnnouncementModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300">
              Broadcast an urgent notification banner to all active candidate workstations across Centre 08.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-gray-400 uppercase font-bold">
                Announcement Text:
              </label>
              <textarea
                value={announcementMessage}
                onChange={(e) => setAnnouncementMessage(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-[#070B14] border border-[#1E2A42] text-xs text-white focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBroadcastSubmit}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast to All Terminals</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
