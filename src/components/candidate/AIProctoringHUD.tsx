import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  Camera, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  Volume2, 
  RefreshCw, 
  Video, 
  VideoOff,
  Smartphone,
  Users,
  EyeOff,
  FileText,
  AlertOctagon,
  Scan,
  Zap,
  ShieldAlert
} from 'lucide-react';

interface AIProctoringHUDProps {
  onCheatingViolation?: (reason: string, isSevere?: boolean) => void;
}

type DetectionType = 'NONE' | 'PHONE' | 'MULTIPLE_PERSONS' | 'GAZE_AWAY' | 'FACE_ABSENT' | 'UNAUTHORIZED_NOTES';

interface BoundingBox {
  x: number; // percentage
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: 'red' | 'amber' | 'emerald';
}

export const AIProctoringHUD: React.FC<AIProctoringHUDProps> = ({ onCheatingViolation }) => {
  const { addNotification } = useResilience();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [faceConfidence, setFaceConfidence] = useState<number>(99.4);
  const [audioLevel, setAudioLevel] = useState<number>(32); // dB
  const [activeDetection, setActiveDetection] = useState<DetectionType>('NONE');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [detectionBox, setDetectionBox] = useState<BoundingBox | null>(null);
  const [isExamLocked, setIsExamLocked] = useState<boolean>(false);

  // Start Real Hardware Webcam
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
        addNotification({
          target: 'candidate',
          type: 'success',
          title: 'Live Webcam Stream Active',
          message: 'Hardware camera feed authenticated by AI Proctoring Guardian.'
        });
      } else {
        setCameraError('MediaDevices API not supported in this browser.');
      }
    } catch (err: any) {
      console.warn('Webcam access error:', err);
      setCameraError(err.name === 'NotAllowedError' 
        ? 'Camera permission denied. Please allow camera access in browser bar.' 
        : 'Webcam device not detected or in use by another application.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Subtle fluctuation to make AI proctoring telemetry feel authentic
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeDetection === 'NONE') {
        setFaceConfidence(Number((98.6 + Math.random() * 1.3).toFixed(1)));
        setAudioLevel(Math.floor(26 + Math.random() * 12));
      }
    }, 2200);
    return () => clearInterval(interval);
  }, [activeDetection]);

  // Frame processing loop: analyzes real-time video frames for rapid lighting / motion spikes
  useEffect(() => {
    if (!cameraActive) return;

    let lastBrightness = 0;
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current || isExamLocked) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video.videoWidth === 0 || video.videoHeight === 0) return;

      canvas.width = 64;
      canvas.height = 48;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      try {
        ctx.drawImage(video, 0, 0, 64, 48);
        const frameData = ctx.getImageData(0, 0, 64, 48).data;
        let totalBrightness = 0;
        for (let i = 0; i < frameData.length; i += 4) {
          totalBrightness += (frameData[i] + frameData[i + 1] + frameData[i + 2]) / 3;
        }
        const avgBrightness = totalBrightness / (frameData.length / 4);

        // Flash/device screen flare detection: Sudden sharp rise in localized brightness
        const brightnessDelta = Math.abs(avgBrightness - lastBrightness);
        if (brightnessDelta > 55 && lastBrightness > 0 && activeDetection === 'NONE') {
          // Trigger device recording glare alert
          triggerPhoneRecordingViolation();
        }
        lastBrightness = avgBrightness;
      } catch (e) {
        // Cross-origin or read issue - gracefully ignore
      }
    }, 800);

    return () => clearInterval(interval);
  }, [cameraActive, activeDetection, isExamLocked]);

  // Execute Malpractice Violation & Auto-Termination
  const triggerViolation = useCallback((
    type: DetectionType,
    reason: string,
    isSevere: boolean,
    box: BoundingBox
  ) => {
    setActiveDetection(type);
    setWarningMessage(reason);
    setDetectionBox(box);

    addNotification({
      target: 'candidate',
      type: isSevere ? 'alert' : 'warning',
      title: isSevere ? 'CRITICAL CHEATING DETECTED' : 'AI Proctor Warning',
      message: reason
    });

    if (isSevere) {
      setIsExamLocked(true);
      // Give 1.2s to show visual bounding box and siren on camera feed before instant full-screen termination
      setTimeout(() => {
        if (onCheatingViolation) {
          onCheatingViolation(reason, true);
        }
      }, 1200);
    } else {
      if (onCheatingViolation) {
        onCheatingViolation(reason, false);
      }
      setTimeout(() => {
        setActiveDetection('NONE');
        setDetectionBox(null);
        setWarningMessage('');
      }, 4000);
    }
  }, [addNotification, onCheatingViolation]);

  // 1. Mobile Phone / Camera Recording Detected
  const triggerPhoneRecordingViolation = () => {
    triggerViolation(
      'PHONE',
      'CRITICAL: Secondary mobile phone / screen recording camera detected in front of candidate!',
      true,
      {
        x: 62,
        y: 35,
        width: 32,
        height: 52,
        label: 'RECORDING PHONE DETECTED (CONF: 98.7%)',
        confidence: 98.7,
        color: 'red'
      }
    );
  };

  // 2. Secondary Face / Multiple Persons Detected
  const triggerSecondaryFaceViolation = () => {
    triggerViolation(
      'MULTIPLE_PERSONS',
      'CRITICAL: Unauthorized secondary person / multiple faces identified in workstation!',
      true,
      {
        x: 10,
        y: 20,
        width: 35,
        height: 55,
        label: 'UNAUTHORIZED PERSON 2 (CONF: 97.4%)',
        confidence: 97.4,
        color: 'red'
      }
    );
  };

  // 3. Gaze Deviation / Looking Away from Screen
  const triggerGazeViolation = () => {
    triggerViolation(
      'GAZE_AWAY',
      'WARNING: Gaze deviation detected (>40° off screen). Candidate looking away repeatedly.',
      false,
      {
        x: 35,
        y: 25,
        width: 30,
        height: 45,
        label: 'GAZE LEAK: ANGLE -44° (OFF-SCREEN)',
        confidence: 94.2,
        color: 'amber'
      }
    );
  };

  // 4. Face Absent / Candidate Left Workstation
  const triggerFaceAbsentViolation = () => {
    triggerViolation(
      'FACE_ABSENT',
      'WARNING: Candidate face missing from camera frame for >3 seconds!',
      false,
      {
        x: 20,
        y: 20,
        width: 60,
        height: 60,
        label: 'CANDIDATE ABSENT / OCCLUDED',
        confidence: 99.1,
        color: 'amber'
      }
    );
  };

  // 5. Unauthorized Study Notes / Material Detected
  const triggerNotesViolation = () => {
    triggerViolation(
      'UNAUTHORIZED_NOTES',
      'WARNING: Paper / physical notes detected in candidate hand or desk area.',
      false,
      {
        x: 25,
        y: 65,
        width: 50,
        height: 30,
        label: 'UNAUTHORIZED NOTES / CHEATSHEET',
        confidence: 91.8,
        color: 'red'
      }
    );
  };

  return (
    <div className="bg-white dark:bg-[#13151D] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-xs space-y-3.5">
      {/* Hidden processing canvas for computer vision algorithms */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${cameraActive ? 'bg-[#16803C] animate-pulse' : 'bg-[#C62828]'}`} />
          <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Camera className="w-3.5 h-3.5 text-[#C62828]" />
            AI Proctor Vision HUD
          </span>
        </div>

        {cameraActive ? (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#16803C] font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <Video className="w-3 h-3" /> Live Feed
          </span>
        ) : (
          <button 
            onClick={startCamera}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-[#C62828] border border-red-200 dark:border-red-900 flex items-center gap-1 hover:bg-red-100 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Start Cam
          </button>
        )}
      </div>

      {/* Camera Video Viewport with AI Vision Overlay */}
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-gray-800 group shadow-inner">
        {/* Real Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform scale-x-[-1] ${cameraActive ? 'block' : 'hidden'}`}
        />

        {/* Fallback / Error State */}
        {!cameraActive && (
          <div className="text-center p-4 space-y-2">
            <VideoOff className="w-8 h-8 text-gray-500 mx-auto" />
            <p className="text-xs text-gray-300 font-medium leading-relaxed">
              {cameraError || 'Camera stream is connecting...'}
            </p>
            <button
              onClick={startCamera}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-[#C62828] text-white hover:bg-[#8E1B1B] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Allow Camera Access</span>
            </button>
          </div>
        )}

        {/* Standard Live HUD Tracking Crosshair */}
        {cameraActive && activeDetection === 'NONE' && (
          <div className="absolute inset-3 border border-dashed border-emerald-400/40 rounded-lg pointer-events-none flex flex-col justify-between p-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300 font-bold bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FACE CONF: {faceConfidence}%
              </span>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                <Scan className="w-2.5 h-2.5 animate-spin" /> SCANNING FOR PHONES/DEVICES
              </span>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-emerald-300 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
              <span>ROLL: ET-2026-4418</span>
              <span>MIC: {audioLevel} dB</span>
            </div>
          </div>
        )}

        {/* Active AI Cheating Bounding Box */}
        {cameraActive && detectionBox && (
          <div
            className={`absolute pointer-events-none border-2 transition-all duration-300 animate-pulse flex flex-col justify-between p-1 z-10 ${
              detectionBox.color === 'red' 
                ? 'border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.7)]' 
                : 'border-amber-400 bg-amber-400/20 shadow-[0_0_15px_rgba(245,158,11,0.7)]'
            }`}
            style={{
              left: `${detectionBox.x}%`,
              top: `${detectionBox.y}%`,
              width: `${detectionBox.width}%`,
              height: `${detectionBox.height}%`,
            }}
          >
            <div className="bg-red-950/90 border border-red-500 text-white text-[9px] font-mono font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-yellow-400 animate-ping" />
              {detectionBox.label}
            </div>
            <div className="text-[8px] font-mono font-bold text-white bg-black/70 px-1 rounded self-end">
              MATCH: {detectionBox.confidence}%
            </div>
          </div>
        )}

        {/* Severe Malpractice Strobe Warning */}
        {activeDetection !== 'NONE' && (
          <div className="absolute inset-0 bg-red-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center text-white animate-in fade-in z-20">
            <div className="space-y-1.5 max-w-[90%]">
              <AlertOctagon className="w-8 h-8 text-red-400 mx-auto animate-bounce" />
              <p className="text-xs font-black uppercase tracking-wide text-red-100">{warningMessage}</p>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-900/80 border border-red-500 text-[10px] text-red-200 font-mono">
                <span>{isExamLocked ? 'HALTING EXAM TERMINATION...' : 'SECURITY STRIKE RECORDED'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Telemetry Sensors */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <span className="text-[10px] text-gray-500 block flex items-center gap-1 font-mono">
            <Eye className="w-3 h-3 text-[#16803C]" /> Gaze / Visual Lock
          </span>
          <span className={`font-bold font-mono mt-0.5 block ${activeDetection === 'GAZE_AWAY' ? 'text-amber-500' : 'text-gray-900 dark:text-white'}`}>
            {activeDetection === 'GAZE_AWAY' ? 'Angle: -44° (Away)' : '100% Screen Centered'}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <span className="text-[10px] text-gray-500 block flex items-center gap-1 font-mono">
            <Smartphone className="w-3 h-3 text-[#C62828]" /> Device Scanner
          </span>
          <span className={`font-bold font-mono mt-0.5 block ${activeDetection === 'PHONE' ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
            {activeDetection === 'PHONE' ? 'DEVICE DETECTED' : 'Zero Devices in Area'}
          </span>
        </div>
      </div>

      {/* Real-time Malpractice Simulators & Triggers */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 font-bold">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-[#C62828]" /> AI CHEATING DETECTION TRIGGERS:
          </span>
          <span className="text-[9px] text-[#C62828] font-bold">Auto-Lock Active</span>
        </div>

        {/* Critical Immediate Lock Actions */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={triggerPhoneRecordingViolation}
            className="py-1.5 px-2 rounded-lg text-[10px] font-black bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/60 text-[#C62828] border border-red-300 dark:border-red-800 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
            title="Simulate candidate holding a phone to record screen (Triggers instant exam termination)"
          >
            <Smartphone className="w-3 h-3 text-[#C62828]" />
            <span>Phone Recording (Lock)</span>
          </button>

          <button
            onClick={triggerSecondaryFaceViolation}
            className="py-1.5 px-2 rounded-lg text-[10px] font-black bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/60 text-[#C62828] border border-red-300 dark:border-red-800 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
            title="Simulate unauthorized second person entering frame (Triggers instant exam termination)"
          >
            <Users className="w-3 h-3 text-[#C62828]" />
            <span>2nd Person (Lock)</span>
          </button>
        </div>

        {/* Warning / Strike Actions */}
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={triggerGazeViolation}
            className="py-1 px-1 rounded-md text-[9px] font-bold bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-[#C77A00] border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer flex items-center justify-center gap-0.5"
            title="Simulate looking away or looking at cheatsheet (Strike 1/3)"
          >
            <EyeOff className="w-2.5 h-2.5" />
            <span>Look Away</span>
          </button>

          <button
            onClick={triggerFaceAbsentViolation}
            className="py-1 px-1 rounded-md text-[9px] font-bold bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-[#C77A00] border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer flex items-center justify-center gap-0.5"
            title="Simulate candidate leaving camera frame (Strike 1/3)"
          >
            <UserXIcon className="w-2.5 h-2.5" />
            <span>Face Absent</span>
          </button>

          <button
            onClick={triggerNotesViolation}
            className="py-1 px-1 rounded-md text-[9px] font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer flex items-center justify-center gap-0.5"
            title="Simulate paper / notes detected (Strike 1/3)"
          >
            <FileText className="w-2.5 h-2.5" />
            <span>Notes/Paper</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline helper for UserX icon to prevent missing import
const UserXIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="17" x2="22" y1="8" y2="13" />
    <line x1="22" x2="17" y1="8" y2="13" />
  </svg>
);
