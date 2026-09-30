import React, { useState, useEffect, useRef } from 'react';
import { ActiveCandidateSession } from '../../types';
import { cameraStreamService } from '../../services/cameraStreamService';
import { useResilience } from '../../context/ResilienceContext';
import { 
  X, 
  Camera, 
  Mic, 
  MicOff, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  Radio, 
  Volume2, 
  Zap, 
  Send,
  Eye,
  Scan,
  ShieldCheck,
  FileCheck,
  VideoOff
} from 'lucide-react';

interface CCTVSurveillanceModalProps {
  candidate: ActiveCandidateSession | null;
  onClose: () => void;
}

export const CCTVSurveillanceModal: React.FC<CCTVSurveillanceModalProps> = ({
  candidate,
  onClose
}) => {
  const { 
    sendOfficerWarning, 
    grantCandidateCompensatoryTime, 
    addNotification 
  } = useResilience();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [intercomActive, setIntercomActive] = useState(false);
  const [intercomMessage, setIntercomMessage] = useState('Attention Candidate: Maintain direct visual focus on your workstation monitor.');
  const [snapshotHash, setSnapshotHash] = useState<string | null>(null);
  const [isCapturingSnapshot, setIsCapturingSnapshot] = useState(false);
  const [audioLevel, setAudioLevel] = useState(28); // dB
  const [timeString, setTimeString] = useState('');

  const remoteStream = (candidate as any)?.remoteMediaStream as MediaStream | undefined;
  const frameDataUrl = (candidate as any)?.lastFrameDataUrl as string | undefined;

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0'));
    };
    updateTime();
    const interval = setInterval(updateTime, 80);
    return () => clearInterval(interval);
  }, []);

  // Audio level fluctuation
  useEffect(() => {
    if (!candidate) return;
    if (candidate.audioLevel) {
      setAudioLevel(candidate.audioLevel);
      return;
    }
    const interval = setInterval(() => {
      setAudioLevel(Math.floor(24 + Math.random() * 12));
    }, 400);
    return () => clearInterval(interval);
  }, [candidate?.audioLevel]);

  // Bind real webcam for candidate.isSelf
  useEffect(() => {
    if (!candidate || !candidate.isSelf) return;

    const unsubscribe = cameraStreamService.subscribe((activeStream) => {
      setStream(activeStream);
      if (videoRef.current && activeStream) {
        videoRef.current.srcObject = activeStream;
      }
    });

    if (!cameraStreamService.getStream()) {
      cameraStreamService.startStream().catch(() => {});
    }

    return () => {
      unsubscribe();
    };
  }, [candidate]);

  if (!candidate) return null;

  const isLiveHardware = candidate.isSelf && stream && stream.active;

  const handleSendIntercom = () => {
    if (intercomMessage.trim()) {
      sendOfficerWarning(candidate.id, `[DISPATCH INTERCOM]: ${intercomMessage.trim()}`);
      addNotification({
        target: 'admin',
        type: 'info',
        title: `Intercom Dispatched to ${candidate.stationId}`,
        message: intercomMessage.trim()
      });
      setIntercomMessage('');
    }
  };

  const handleCaptureSnapshot = () => {
    setIsCapturingSnapshot(true);
    setTimeout(() => {
      const mockHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setSnapshotHash(mockHash);
      setIsCapturingSnapshot(false);
      addNotification({
        target: 'both',
        type: 'success',
        title: 'Cryptographic Frame Snapshot Sealed',
        message: `Video frame of ${candidate.name} at ${candidate.stationId} committed to Merkle ledger with hash ${mockHash.substring(0, 12)}...`
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in select-none">
      <div className="bg-[#FFFBFB] dark:bg-[#0D1527] text-gray-900 dark:text-white rounded-3xl max-w-5xl w-full border-2 border-red-200 dark:border-[#1E2A42] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-100 dark:border-gray-800 bg-white/95 dark:bg-[#111827]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/60 text-[#C62828] flex items-center justify-center">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C62828] dark:text-[#38BDF8]">
                  Surveillance Console • {candidate.stationId}
                </span>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 dark:bg-red-950 text-[#C62828] border border-red-200 dark:border-red-900">
                  LIVE 1080P STREAM
                </span>
              </div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">
                {candidate.name} {candidate.isSelf ? '(Active User Feed)' : ''}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Surveillance Console Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT: Video Viewport & AI Proctored HUD (8 cols) */}
          <div className="lg:col-span-8 p-5 bg-black flex flex-col justify-between relative overflow-hidden min-h-[360px] sm:min-h-[440px]">
            
            {/* 0. MALPRACTICE EVICTION: CCTV Stream Severed */}
            {candidate.isTerminated ? (
              <div className="absolute inset-0 z-30 bg-red-950/95 flex flex-col items-center justify-center p-6 text-center space-y-3 border-4 border-red-600 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center text-red-400">
                  <VideoOff className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-mono font-black text-white tracking-widest uppercase">
                    CCTV STREAM & RECORDING TERMINATED
                  </h3>
                  <div className="inline-block mt-1 px-3 py-1 rounded bg-red-900/90 text-red-200 border border-red-700 font-mono text-xs font-bold">
                    CANDIDATE DISQUALIFIED FOR MALPRACTICE
                  </div>
                </div>
                <p className="text-xs text-gray-300 max-w-md font-mono bg-black/50 p-2.5 rounded-xl border border-red-900">
                  Violation Record: {candidate.terminationReason || 'Critical Anti-Cheating Threshold Breached'}
                </p>
                <span className="text-[11px] text-red-400 font-mono">
                  Hardware stream cutoff initiated by central security daemon.
                </span>
              </div>
            ) : (
              <>
                {/* 1. The Live Video Player for Local Hardware */}
                {candidate.isSelf && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transform scale-x-[-1] absolute inset-0 ${isLiveHardware ? 'block' : 'hidden'}`}
                  />
                )}

                {/* 2. WebRTC Live Video Stream from Another Laptop */}
                {remoteStream && (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1] absolute inset-0 block"
                  />
                )}

                {/* 3. Multi-Tab Real-time Frame from Another Tab */}
                {!remoteStream && frameDataUrl && (
                  <img
                    src={frameDataUrl}
                    alt={candidate.name}
                    className="w-full h-full object-cover transform scale-x-[-1] absolute inset-0 block"
                  />
                )}

                {/* 4. Simulated / Standby Feed */}
                {!candidate.isSelf && !remoteStream && !frameDataUrl && (
                  <div className="absolute inset-0">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                  </div>
                )}

                {/* Scanlines / CCTV Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-size-[100%_4px] pointer-events-none opacity-50" />
              </>
            )}

            {/* Top Video HUD Information */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-red-600 text-white font-mono text-xs font-black flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>LIVE SURVEILLANCE FEED</span>
                </span>
                <span className="px-2 py-1 rounded bg-black/80 text-gray-200 font-mono text-xs border border-white/20">
                  {candidate.centreName}
                </span>
              </div>

              <div className="px-3 py-1 rounded bg-black/80 font-mono text-xs text-emerald-400 font-bold border border-white/20">
                {timeString} UTC+05:30
              </div>
            </div>

            {/* Center AI Target Tracking Reticle */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-none">
              <div className={`w-48 sm:w-64 h-56 sm:h-72 border-2 rounded-2xl transition-all duration-300 relative flex flex-col justify-between p-2 ${
                candidate.strikes > 0 ? 'border-red-500 bg-red-500/10' : 'border-emerald-400/80 bg-emerald-500/5'
              }`}>
                {/* Corner reticle marks */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />

                <div className="flex justify-between items-center text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-emerald-300 font-bold border border-emerald-500/40">
                  <span className="flex items-center gap-1">
                    <Scan className="w-3 h-3 animate-spin" />
                    <span>FACE CONF: 99.4%</span>
                  </span>
                  <span>ROLL: {candidate.rollNo}</span>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/40">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#16803C]" />
                    <span>GAZE: CENTERED (0°)</span>
                  </span>
                  <span className={candidate.isAudioAlert ? 'text-red-400 font-black animate-pulse' : (candidate.audioLevel || audioLevel) >= 56 ? 'text-amber-400 font-bold' : 'text-emerald-300'}>
                    AUDIO: {candidate.audioLevel || audioLevel} dB {candidate.isAudioAlert ? '(SPEECH!)' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Video Controls & Snapshot Seal */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCaptureSnapshot}
                  disabled={isCapturingSnapshot}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-white/30"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isCapturingSnapshot ? 'Sealing...' : 'Capture Cryptographic Proof'}</span>
                </button>

                <div className="text-[10px] font-mono text-gray-300 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Uplink: 16ms</span>
                </div>
              </div>

              {snapshotHash && (
                <div className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500 text-[10px] font-mono text-emerald-200">
                  SHA-256: {snapshotHash.substring(0, 18)}...
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Real-Time Telemetry & Disciplinary Intercom (4 cols) */}
          <div className="lg:col-span-4 p-5 space-y-5 bg-[#FFFBFB] dark:bg-[#0A101F] border-t lg:border-t-0 lg:border-l border-red-100 dark:border-gray-800">
            
            {/* Candidate Metadata Summary */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-red-100 dark:border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between border-b border-red-100 dark:border-gray-800 pb-1.5">
                <span className="text-gray-500">Station Terminal:</span>
                <span className="font-mono font-bold text-[#C62828] dark:text-[#38BDF8]">{candidate.stationId}</span>
              </div>
              <div className="flex justify-between border-b border-red-100 dark:border-gray-800 pb-1.5">
                <span className="text-gray-500">Roll Number:</span>
                <span className="font-mono font-bold">{candidate.rollNo}</span>
              </div>
              <div className="flex justify-between border-b border-red-100 dark:border-gray-800 pb-1.5">
                <span className="text-gray-500">Answering Progress:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {candidate.answeredCount} / {candidate.totalQuestions} Questions
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Security Strikes:</span>
                <span className={`font-mono font-bold ${candidate.strikes > 0 ? 'text-[#C62828]' : 'text-emerald-600'}`}>
                  {candidate.strikes} / 3 Strikes
                </span>
              </div>
            </div>

            {/* Officer Direct Intercom (Push-to-Talk Broadcast) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-red-100 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-[#C62828]" />
                  Direct Station Intercom
                </span>
                <button
                  onClick={() => setIntercomActive(!intercomActive)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border cursor-pointer ${
                    intercomActive 
                      ? 'bg-red-50 text-[#C62828] border-red-200' 
                      : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {intercomActive ? 'MIC LIVE' : 'MIC MUTED'}
                </button>
              </div>

              <textarea
                value={intercomMessage}
                onChange={(e) => setIntercomMessage(e.target.value)}
                placeholder="Type invigilator broadcast message..."
                rows={2}
                className="w-full p-2.5 rounded-xl text-xs bg-red-50/30 dark:bg-gray-900 border border-red-100 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#C62828]"
              />

              <button
                onClick={handleSendIntercom}
                className="w-full py-2 rounded-xl bg-[#C62828] hover:bg-[#8E1B1B] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Warning to Workstation</span>
              </button>
            </div>

            {/* Remote Invigilation Direct Actions */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-bold block">
                Disciplinary Enforcement Controls:
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    sendOfficerWarning(candidate.id, 'Formal Disciplinary Strike recorded: Unauthorized movement detected.');
                  }}
                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/70 dark:hover:bg-red-900 border border-red-200 dark:border-red-800 text-[#C62828] dark:text-red-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Issue Strike (1/3)</span>
                </button>

                <button
                  onClick={() => {
                    grantCandidateCompensatoryTime(candidate.id, 5);
                  }}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/70 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Grant +5m Parity</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-400 space-y-1">
              <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
                <span>Judicial Audit Grade</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                All camera feeds and invigilator audio transmissions are sealed with SHA-256 Merkle proofs for post-examination evidence reporting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
