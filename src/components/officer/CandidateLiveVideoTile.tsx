import React, { useEffect, useRef, useState } from 'react';
import { ActiveCandidateSession } from '../../types';
import { cameraStreamService } from '../../services/cameraStreamService';
import { Camera, Scan, Maximize2, Zap, AlertTriangle, ShieldCheck, Eye, VideoOff, Volume2, Mic } from 'lucide-react';

interface CandidateLiveVideoTileProps {
  candidate: ActiveCandidateSession;
  onOpenCCTV: () => void;
  size?: 'compact' | 'normal' | 'large';
}

export const CandidateLiveVideoTile: React.FC<CandidateLiveVideoTileProps> = ({
  candidate,
  onOpenCCTV,
  size = 'normal'
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [timeString, setTimeString] = useState('');

  const remoteStream = (candidate as any).remoteMediaStream as MediaStream | undefined;
  const frameDataUrl = (candidate as any).lastFrameDataUrl as string | undefined;

  // Live timestamp for CCTV overlay
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2));
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  // For isSelf (local hardware camera), bind real webcam
  useEffect(() => {
    if (!candidate.isSelf) return;

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
  }, [candidate.isSelf]);

  // For remote WebRTC stream from another laptop
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const handleConnectCamera = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConnecting(true);
    try {
      await cameraStreamService.startStream();
    } finally {
      setIsConnecting(false);
    }
  };

  const isLiveHardware = candidate.isSelf && stream && stream.active;
  const isTrulyLive = isLiveHardware || Boolean(remoteStream) || Boolean(frameDataUrl);

  return (
    <div 
      onClick={onOpenCCTV}
      className={`
        relative rounded-xl overflow-hidden bg-black border cursor-pointer group transition-all duration-300
        ${candidate.strikes > 0 ? 'border-red-500/80 shadow-red-500/20 shadow-md' : 'border-gray-800 hover:border-[#C62828]'}
        ${size === 'compact' ? 'w-20 h-20' : size === 'large' ? 'w-full aspect-video' : 'w-full h-36 sm:h-40'}
      `}
      title="Click to open full-screen CCTV Surveillance Console with Intercom"
    >
      {/* 0. MALPRACTICE EVICTION: Live Stream Severed */}
      {candidate.isTerminated ? (
        <div className="absolute inset-0 z-30 bg-red-950/95 flex flex-col items-center justify-center p-3 text-center space-y-1.5 border-2 border-red-600 animate-pulse">
          <div className="w-9 h-9 rounded-full bg-red-600/30 border border-red-500 flex items-center justify-center text-red-400">
            <VideoOff className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono font-black text-white tracking-wider">
            RECORDING TERMINATED
          </span>
          <span className="text-[8px] font-mono text-red-200 bg-red-900/90 px-2 py-0.5 rounded border border-red-700 font-bold">
            CHEATING DISQUALIFICATION
          </span>
          <p className="text-[8px] text-gray-300 max-w-[180px] truncate">
            {candidate.terminationReason || 'Malpractice Flagged - Camera Cut Off'}
          </p>
        </div>
      ) : (
        <>
          {/* 1. Real Hardware Webcam for Local Tab */}
          {candidate.isSelf && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform scale-x-[-1] ${isLiveHardware ? 'block' : 'hidden'}`}
            />
          )}

          {/* 2. WebRTC Live Video Stream from Another Laptop */}
          {remoteStream && (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform scale-x-[-1] block"
            />
          )}

          {/* 3. Real-time Multi-Tab Canvas Live Frame from Another Tab */}
          {!remoteStream && frameDataUrl && (
            <img
              src={frameDataUrl}
              alt={candidate.name}
              className="w-full h-full object-cover transform scale-x-[-1] block"
            />
          )}

          {/* 4. Fallback / Simulated Feed */}
          {!candidate.isSelf && !remoteStream && !frameDataUrl && (
            <div className="relative w-full h-full">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-full h-full object-cover filter brightness-90 contrast-105"
              />
              {/* Subtle scanning line effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent opacity-50 animate-pulse pointer-events-none" />
            </div>
          )}

          {/* CCTV Grain / Scanlines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-size-[100%_4px] pointer-events-none opacity-40" />
        </>
      )}

      {/* Top Banner: Station ID + Live Rec Badge */}
      <div className="absolute top-1.5 inset-x-1.5 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs border border-white/10 text-[9px] font-mono text-white font-bold">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
          <span className="text-red-400">REC</span>
          <span className="text-gray-300">{candidate.stationId}</span>
        </div>

        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[9px] font-mono text-emerald-400 font-bold border border-white/10">
          <span className={`w-1.5 h-1.5 rounded-full ${isTrulyLive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
          <span>{isTrulyLive ? '1080p LIVE' : '720p STANDBY'}</span>
        </div>
      </div>

      {/* Live Acoustic / Speech Detection Alert Banner */}
      {candidate.isAudioAlert && (
        <div className="absolute top-7 inset-x-1.5 z-20 bg-amber-600/95 text-white px-2 py-0.5 rounded text-[8px] font-mono font-black flex items-center justify-between shadow-lg animate-bounce">
          <span className="flex items-center gap-1">
            <Volume2 className="w-2.5 h-2.5 text-white animate-pulse" />
            <span>SOUND DETECTED: {candidate.audioLevel || 68} dB</span>
          </span>
          <span className="bg-black/60 px-1 rounded text-[7px] text-yellow-300">SPEECH</span>
        </div>
      )}

      {/* Live AI Face Tracking Bounding Box */}
      <div className="absolute inset-x-6 inset-y-4 pointer-events-none flex flex-col justify-between p-1 z-10">
        <div className={`border-2 rounded-lg transition-all duration-300 ${
          candidate.faceStatus === 'looking_away' || candidate.strikes > 0
            ? 'border-amber-400/90 bg-amber-500/10'
            : 'border-emerald-400/80 bg-emerald-500/5'
        } p-1 flex justify-between items-start`}>
          <div className="px-1 py-0.5 rounded bg-black/80 text-[8px] font-mono text-emerald-300 font-bold flex items-center gap-1">
            <Scan className="w-2.5 h-2.5" />
            <span>AI GAZE: {candidate.faceStatus === 'looking_away' ? 'DEVIATION' : '99.4%'}</span>
          </div>

          {candidate.strikes > 0 && (
            <div className="px-1 py-0.5 rounded bg-red-950/90 border border-red-500 text-[8px] font-mono text-red-200 font-black flex items-center gap-0.5">
              <AlertTriangle className="w-2 h-2 text-yellow-300" />
              <span>STRIKE {candidate.strikes}/3</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-between px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs border border-white/10 text-[9px] font-mono text-gray-300 z-10">
        <div className="flex items-center gap-1">
          <Eye className="w-2.5 h-2.5 text-emerald-400" />
          <span className="truncate max-w-[90px]">{candidate.name.split(' ')[0]}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-0.5 text-[8px] ${
            candidate.isAudioAlert 
              ? 'text-red-400 font-black animate-pulse' 
              : (candidate.audioLevel || 28) >= 56 
                ? 'text-amber-400 font-bold' 
                : 'text-gray-400'
          }`}>
            <Volume2 className="w-2.5 h-2.5" />
            {candidate.audioLevel || 28}dB
          </span>
          <span className="text-gray-400">{timeString}</span>
          <Maximize2 className="w-2.5 h-2.5 text-gray-400 group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* One-Click Connect Camera Overlay if Current Student is not yet started */}
      {candidate.isSelf && !isLiveHardware && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center z-20 space-y-1.5">
          <Camera className="w-6 h-6 text-red-500 animate-bounce" />
          <span className="text-xs font-bold text-white">Student Workstation Camera</span>
          <p className="text-[10px] text-gray-300 max-w-[150px]">
            Click to connect live hardware webcam of this candidate.
          </p>
          <button
            onClick={handleConnectCamera}
            disabled={isConnecting}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            <span>{isConnecting ? 'Connecting...' : 'Connect Live Cam'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
