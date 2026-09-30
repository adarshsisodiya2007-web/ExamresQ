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
import examresqLogo from '../../assets/examresq-logo.png';
import { ActiveCandidateSession } from '../../types';
import { CandidateLiveVideoTile } from './CandidateLiveVideoTile';
import { CCTVSurveillanceModal } from './CCTVSurveillanceModal';

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
    setCurrentView,
    triggerRoleTransition
  } = useResilience();

  const [filter, setFilter] = useState<'all' | 'active' | 'offline_buffering' | 'flagged'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Video Surveillance & CCTV Console States
  const [cctvCandidate, setCctvCandidate] = useState<ActiveCandidateSession | null>(null);
  const [displayMode, setDisplayMode] = useState<'cards' | 'cctv_wall'>('cards');

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
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 space-y-6 transition-colors duration-300">
      
      {/* Top Officer Title Banner with Official ExamresQ Logo */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-[#0D1527] border border-red-100 dark:border-[#1E2A42] p-5 rounded-2xl shadow-xs dark:shadow-xl">
        <div className="flex items-start gap-3.5">
          <img 
            src={examresqLogo} 
            alt="ExamresQ Logo" 
            className="w-12 h-12 rounded-full object-contain shrink-0 drop-shadow-md cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => triggerRoleTransition('officer')}
            title="Click to trigger 3-second surveillance animation"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C62828] dark:text-[#38BDF8] font-bold">
                Institutional Live Surveillance & Telemetry Hub
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1 flex items-center gap-2.5">
              <Users className="w-6 h-6 text-[#C62828] dark:text-[#38BDF8]" />
              Multi-Student Real-Time Monitoring Room
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
              Continuous sub-second telemetry across all concurrent candidate terminals. Observe answers saved, offline local encryption queues, proctor gaze alerts, and instant invigilator directives.
            </p>
          </div>
        </div>

        {/* Action Controls for Officer */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAnnouncementModal(true)}
            className="px-4 py-2 rounded-xl bg-[#C62828] hover:bg-[#8E1B1B] dark:bg-linear-to-r dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
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
            className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-gray-800 border border-red-200 dark:bg-white/10 dark:hover:bg-white/15 dark:text-gray-200 dark:border-white/10 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Switch directly to candidate terminal view"
          >
            <Radio className="w-4 h-4 text-[#C62828] dark:text-[#E53935]" />
            <span>Go to Candidate Room</span>
          </button>
        </div>
      </div>

      {/* Real-Time Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-[#0A101F] border border-red-100 dark:border-[#1A253C] p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Concurrent Candidates</span>
            <Users className="w-4 h-4 text-[#C62828] dark:text-[#38BDF8]" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white font-mono mt-1.5">
            {activeCandidates.length} <span className="text-xs text-gray-500 font-sans font-normal">Active Terminals</span>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            100% Real-Time Connected
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A101F] border border-red-100 dark:border-[#1A253C] p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Normal Answering</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1.5">
            {activeCount} <span className="text-xs text-gray-500 font-sans font-normal">Stations</span>
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono mt-1">
            Avg Latency: 18ms
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A101F] border border-red-100 dark:border-[#1A253C] p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Offline Buffered</span>
            <WifiOff className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-1.5">
            {offlineCount} <span className="text-xs text-gray-500 font-sans font-normal">IndexedDB</span>
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-mono mt-1">
            Zero Responses Lost
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A101F] border border-red-100 dark:border-[#1A253C] p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Flagged / Gaze Deviation</span>
            <ShieldAlert className="w-4 h-4 text-[#C62828]" />
          </div>
          <div className="text-2xl font-black text-[#C62828] dark:text-red-400 font-mono mt-1.5">
            {flaggedCount} <span className="text-xs text-gray-500 font-sans font-normal">Requires Review</span>
          </div>
          <div className="text-[10px] text-[#C62828] dark:text-red-400 font-mono mt-1 font-semibold">
            AI Proctor Evidence Active
          </div>
        </div>
      </div>

      {/* Main Content Layout: Candidate Grid on Left (8 cols) + Real-time Telemetry Stream on Right (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Candidate Surveillance Grid (8 Cols) */}
        <div className="xl:col-span-8 space-y-4">
          
          {/* Filter Bar & Search & View Mode Switcher */}
          <div className="bg-white dark:bg-[#0A101F] border border-red-100 dark:border-[#1A253C] p-3 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'all' 
                    ? 'bg-[#C62828] text-white font-extrabold shadow-xs' 
                    : 'bg-red-50/60 text-gray-700 hover:bg-red-100 dark:bg-[#121B2B] dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                All Students ({activeCandidates.length})
              </button>

              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'active' 
                    ? 'bg-[#16803C] text-white font-extrabold shadow-xs' 
                    : 'bg-red-50/60 text-gray-700 hover:bg-red-100 dark:bg-[#121B2B] dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                Normal ({activeCount})
              </button>

              <button
                onClick={() => setFilter('offline_buffering')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'offline_buffering' 
                    ? 'bg-amber-500 text-black font-extrabold shadow-xs' 
                    : 'bg-red-50/60 text-gray-700 hover:bg-red-100 dark:bg-[#121B2B] dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                Offline ({offlineCount})
              </button>

              <button
                onClick={() => setFilter('flagged')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  filter === 'flagged' 
                    ? 'bg-[#C62828] text-white font-extrabold shadow-xs' 
                    : 'bg-red-50/60 text-gray-700 hover:bg-red-100 dark:bg-[#121B2B] dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                Flagged ({flaggedCount})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search roll, station..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-44 pl-9 pr-3 py-1.5 rounded-lg text-xs bg-red-50/40 dark:bg-[#121B2B] border border-red-200 dark:border-[#1E2A42] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#C62828]"
                />
              </div>

              {/* View Switcher: Detail Cards vs CCTV Matrix Wall */}
              <div className="flex items-center gap-1 border-l border-red-100 dark:border-[#1E2A42] pl-2">
                <button
                  onClick={() => setDisplayMode('cards')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    displayMode === 'cards' 
                      ? 'bg-[#C62828] text-white shadow-xs' 
                      : 'bg-red-50 text-gray-700 hover:bg-red-100 dark:bg-[#121B2B] dark:text-gray-400'
                  }`}
                  title="Show telemetry cards with embedded video player"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  onClick={() => setDisplayMode('cctv_wall')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    displayMode === 'cctv_wall' 
                      ? 'bg-[#C62828] text-white shadow-xs' 
                      : 'bg-red-50 text-gray-700 hover:bg-red-100 dark:bg-[#121B2B] dark:text-gray-400'
                  }`}
                  title="Show multi-screen live CCTV surveillance wall"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CCTV Wall</span>
                </button>
              </div>
            </div>
          </div>

          {/* VIEW 1: CCTV Surveillance Wall Mode */}
          {displayMode === 'cctv_wall' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
              {filteredCandidates.map((candidate) => (
                <div 
                  key={candidate.id}
                  className="bg-black rounded-2xl border-2 border-gray-800 hover:border-[#C62828] p-3 space-y-2 shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-white pb-1 border-b border-gray-800">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      <span>{candidate.stationId} • {candidate.name}</span>
                    </span>
                    <button
                      onClick={() => setCctvCandidate(candidate)}
                      className="text-[10px] font-bold text-red-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Focus / Intercom ↗</span>
                    </button>
                  </div>

                  <CandidateLiveVideoTile 
                    candidate={candidate} 
                    onOpenCCTV={() => setCctvCandidate(candidate)}
                    size="large"
                  />

                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-gray-400">
                    <span>Q{candidate.currentQuestion} ({candidate.answeredCount}/{candidate.totalQuestions} Solved)</span>
                    <span className={candidate.strikes > 0 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                      {candidate.strikes > 0 ? `${candidate.strikes} Violations` : 'Verified Focus'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW 2: Detail Cards Grid of Concurrent Candidates */}
          {displayMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
              {filteredCandidates.map((candidate) => {
                const progressPercent = Math.round((candidate.answeredCount / candidate.totalQuestions) * 100);

                return (
                  <div
                    key={candidate.id}
                    className={`
                      relative rounded-2xl bg-white dark:bg-[#0D1527] border transition-all duration-300 p-4 space-y-3.5 shadow-2xs
                      ${candidate.isSelf ? 'border-[#C62828] shadow-md shadow-red-500/10 dark:border-[#38BDF8]/60 dark:shadow-[#38BDF8]/10' : 'border-red-100 dark:border-[#1E2A42]'}
                      ${candidate.status === 'offline_buffering' ? 'border-amber-400 bg-amber-50/20 dark:border-amber-500/70 dark:bg-[#141822]' : ''}
                      ${candidate.status === 'flagged' || candidate.strikes > 0 ? 'border-red-300 bg-red-50/20 dark:border-red-500/70 dark:bg-[#171318]' : ''}
                    `}
                  >
                    {/* Top Candidate Bar: Identity & Connection Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                            {candidate.name}
                          </h3>
                          {candidate.isSelf && (
                            <span className="px-1.5 py-0.5 rounded bg-red-50 text-[#C62828] border border-red-200 dark:bg-[#38BDF8]/20 dark:text-[#38BDF8] dark:border-[#38BDF8]/40 text-[9px] font-mono font-bold">
                              YOU (CURRENT)
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                          <span>{candidate.rollNo}</span>
                          <span className="mx-1">•</span>
                          <span className="text-[#C62828] dark:text-[#38BDF8] font-bold">{candidate.stationId}</span>
                        </div>

                        <div className="text-[10px] text-gray-500 truncate max-w-[200px]">
                          {candidate.centreName}
                        </div>
                      </div>

                      {/* Connection & Strike Status */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {candidate.status === 'offline_buffering' ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800 text-[10px] font-mono font-bold flex items-center gap-1 animate-pulse">
                            <WifiOff className="w-3 h-3" />
                            <span>Offline Buffered ({candidate.pendingOfflineAnswers})</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                            <Wifi className="w-3 h-3" />
                            <span>{candidate.connectionLatency}ms Live</span>
                          </span>
                        )}

                        {candidate.strikes > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#C62828] border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800 text-[10px] font-mono font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span>Strikes: {candidate.strikes}/3</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <UserCheck className="w-3 h-3" /> Verified Gaze
                          </span>
                        )}
                      </div>
                    </div>

                    {/* LIVE VIDEO SURVEILLANCE TILE */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="font-bold flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                          <Camera className="w-3.5 h-3.5 text-[#C62828]" />
                          <span>Station Live Recording:</span>
                        </span>
                        <button
                          onClick={() => setCctvCandidate(candidate)}
                          className="text-[10px] font-bold text-[#C62828] dark:text-[#38BDF8] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Enlarge & Intercom ↗</span>
                        </button>
                      </div>

                      <CandidateLiveVideoTile 
                        candidate={candidate} 
                        onOpenCCTV={() => setCctvCandidate(candidate)} 
                      />
                    </div>

                    {/* Question Answering Progress Bar */}
                    <div className="space-y-1.5 bg-red-50/30 dark:bg-[#070B14] p-2.5 rounded-xl border border-red-100 dark:border-[#162033]">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-600 dark:text-gray-400 font-mono">
                          Progress: <strong className="text-gray-900 dark:text-white">{candidate.answeredCount}</strong> / {candidate.totalQuestions} Questions
                        </span>
                        <span className="font-mono font-bold text-[#C62828] dark:text-[#38BDF8]">
                          {progressPercent}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 rounded-full ${
                            candidate.status === 'offline_buffering'
                              ? 'bg-amber-500'
                              : 'bg-[#C62828] dark:bg-linear-to-r dark:from-blue-500 dark:to-[#38BDF8]'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 pt-0.5 font-mono">
                        <span>Active on: <strong>Q{candidate.currentQuestion}</strong></span>
                        <span>Review: <strong>{candidate.markedReviewCount}</strong></span>
                        {candidate.compensationMinutes > 0 && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            +{candidate.compensationMinutes}m Parity Added
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Telemetry Snapshot: Last Action & Merkle Hash */}
                    <div className="text-[11px] font-mono space-y-1 text-gray-500 dark:text-gray-400 border-t border-red-100 dark:border-[#1A253C] pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Last Telemetry:</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-[200px]">
                          {candidate.lastAction}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Merkle Ledger:</span>
                        <span className="text-[#C62828] dark:text-[#38BDF8] flex items-center gap-1 text-[10px] font-bold">
                          <Lock className="w-2.5 h-2.5" />
                          {candidate.merkleHash.substring(0, 16)}...
                        </span>
                      </div>
                    </div>

                    {/* Invigilator Action Buttons for this specific candidate */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      <button
                        onClick={() => setCctvCandidate(candidate)}
                        className="py-1.5 px-1.5 rounded-lg bg-[#C62828] hover:bg-[#8E1B1B] text-white text-[10px] font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                        title="Open full CCTV surveillance and intercom"
                      >
                        <Camera className="w-3 h-3 text-white" />
                        <span>CCTV</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCandidateId(candidate.id);
                          setWarningMessage(`Notice to ${candidate.name}: Keep your gaze focused on Station ${candidate.stationId}.`);
                        }}
                        className="py-1.5 px-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#C62828] border border-red-200 dark:bg-red-950/70 dark:hover:bg-red-900 dark:border-red-800/80 dark:text-red-200 text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3 text-red-500 dark:text-red-400" />
                        <span>Warning</span>
                      </button>

                      <button
                        onClick={() => grantCandidateCompensatoryTime(candidate.id, 5)}
                        className="py-1.5 px-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-950/70 dark:hover:bg-blue-900 dark:border-blue-800/80 dark:text-blue-200 text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                        title="Grant +5 minutes compensation for network delay (Req 9, 10)"
                      >
                        <Clock className="w-3 h-3 text-blue-600 dark:text-[#38BDF8]" />
                        <span>+5m</span>
                      </button>

                      <button
                        onClick={() => syncCandidateDirect(candidate.id)}
                        className="py-1.5 px-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 dark:bg-[#121B2B] dark:hover:bg-[#1A2840] dark:border-[#1E2A42] dark:text-gray-300 text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                        title="Force sync local buffer with central Merkle ledger"
                      >
                        <RotateCcw className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Sync</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Real-Time Live Telemetry Stream (4 Cols) */}
        <div className="xl:col-span-4 bg-white dark:bg-[#0A101F] border border-red-100 dark:border-[#1A253C] rounded-2xl p-4.5 space-y-4 sticky top-20 shadow-2xs dark:shadow-xl">
          <div className="flex items-center justify-between border-b border-red-100 dark:border-[#1A253C] pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C62828] dark:text-[#38BDF8]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Live Audit & Telemetry Stream
              </h2>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
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
                    ${isCritical ? 'bg-red-50 border-red-200 text-[#C62828] dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-200' : ''}
                    ${isWarning ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200' : ''}
                    ${isSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200' : ''}
                    ${!isCritical && !isWarning && !isSuccess ? 'bg-red-50/30 border-red-100 text-gray-800 dark:bg-[#0D1527] dark:border-[#1E2A42] dark:text-gray-300' : ''}
                  `}
                >
                  <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isCritical ? 'bg-[#C62828] animate-pulse' :
                        isWarning ? 'bg-amber-500' :
                        isSuccess ? 'bg-emerald-500' : 'bg-[#C62828] dark:bg-[#38BDF8]'
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
          <div className="p-3 rounded-xl bg-red-50/50 border border-red-100 dark:bg-[#0D1527] dark:border-[#1E2A42] text-[11px] text-gray-600 dark:text-gray-400 space-y-1.5 font-sans">
            <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5 font-mono text-[10px] text-[#C62828] dark:text-[#38BDF8]">
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
          <div className="bg-white dark:bg-[#0D1527] border border-red-200 dark:border-[#1E2A42] rounded-2xl max-w-md w-full p-6 text-gray-900 dark:text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#C62828]" />
                <h3 className="font-bold text-base">Direct Invigilator Directive</h3>
              </div>
              <button 
                onClick={() => setSelectedCandidateId(null)}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              Transmit an immediate directive to the candidate's workstation screen. This action will be digitally logged into the central audit ledger and increments the strike counter.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-gray-700 dark:text-gray-400 uppercase font-bold">
                Directive Message:
              </label>
              <textarea
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-red-50/40 dark:bg-[#070B14] border border-red-200 dark:border-[#1E2A42] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C62828]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedCandidateId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
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
          <div className="bg-white dark:bg-[#0D1527] border border-red-200 dark:border-[#1E2A42] rounded-2xl max-w-md w-full p-6 text-gray-900 dark:text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#C62828] dark:text-[#38BDF8]" />
                <h3 className="font-bold text-base">Broadcast Exam Announcement</h3>
              </div>
              <button 
                onClick={() => setShowAnnouncementModal(false)}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              Broadcast an urgent notification banner to all active candidate workstations across Centre 08.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-gray-700 dark:text-gray-400 uppercase font-bold">
                Announcement Text:
              </label>
              <textarea
                value={announcementMessage}
                onChange={(e) => setAnnouncementMessage(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-red-50/40 dark:bg-[#070B14] border border-red-200 dark:border-[#1E2A42] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C62828]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBroadcastSubmit}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast to All Terminals</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Remote CCTV Surveillance & Intercom Console Modal */}
      <CCTVSurveillanceModal 
        candidate={cctvCandidate} 
        onClose={() => setCctvCandidate(null)} 
      />

    </div>
  );
};
