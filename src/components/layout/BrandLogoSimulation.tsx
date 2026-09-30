import React, { useState, useEffect } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  ShieldCheck, 
  Activity, 
  Radio, 
  Lock, 
  Wifi, 
  Eye, 
  Server,
  Zap
} from 'lucide-react';

interface BrandLogoSimulationProps {
  onNavigateHome?: () => void;
}

export const BrandLogoSimulation: React.FC<BrandLogoSimulationProps> = ({ onNavigateHome }) => {
  const { userRole, networkStatus } = useResilience();
  const [showSimDetails, setShowSimDetails] = useState(false);
  const [simPulse, setSimPulse] = useState(0);

  // Periodic heartbeat animation state (simulating live telemetry ticks)
  useEffect(() => {
    const interval = setInterval(() => {
      setSimPulse((prev) => (prev + 1) % 100);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const isStudent = userRole === 'student';

  return (
    <div className="relative">
      <div 
        onClick={() => {
          if (onNavigateHome) onNavigateHome();
          setShowSimDetails(!showSimDetails);
        }}
        className="flex items-center gap-3 cursor-pointer group select-none"
        title="Click to toggle live simulation telemetry"
      >
        {/* Animated Icon Container with mode-specific radar effect & Official ExamresQ Logo */}
        <div className={`relative w-10 h-10 rounded-xl p-0.5 border transition-all duration-300 ${
          isStudent 
            ? 'bg-linear-to-br from-[#1E293B] via-[#0F172A] to-[#16803C]/70 border-[#1E293B] group-hover:border-emerald-500/80 shadow-md group-hover:shadow-emerald-950/40' 
            : 'bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0284C7]/80 border-[#1E293B] group-hover:border-sky-500/80 shadow-md group-hover:shadow-sky-950/40'
        }`}>
          {/* Radar sweep ring simulation */}
          <div className={`absolute inset-0 rounded-xl opacity-30 animate-ping ${
            isStudent ? 'bg-emerald-500' : 'bg-sky-400'
          }`} style={{ animationDuration: '3s' }} />

          <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#0A0F1D] flex items-center justify-center relative z-10 overflow-hidden p-0.5">
            <img 
              src="/examresq-logo.png" 
              alt="ExamresQ Logo" 
              className="w-full h-full object-contain rounded-full transition-transform group-hover:scale-110 duration-200" 
            />
            
            {/* Simulation scanline shine */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
          </div>
        </div>

        {/* Text and Dynamic Simulation Status */}
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-black text-base tracking-wider text-gray-900 dark:text-white font-mono uppercase">
              ExamresQ
            </h1>
            <span className={`w-2 h-2 rounded-full transition-colors ${
              networkStatus === 'connected' 
                ? (isStudent ? 'bg-emerald-500 animate-pulse' : 'bg-sky-400 animate-pulse') 
                : 'bg-red-500 animate-ping'
            }`} />
          </div>

          {/* Mode-Specific Live Simulation Ticker */}
          <div className="flex items-center gap-1.5 mt-0.5">
            {isStudent ? (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                <span>● TERMINAL ARMED</span>
                <span className="text-[8px] opacity-60 font-mono">
                  {simPulse % 2 === 0 ? '• 14ms' : '• SYNC'}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-widest text-sky-600 dark:text-[#38BDF8] font-bold uppercase">
                <span>⚡ SURVEILLANCE GRID</span>
                <span className="text-[8px] opacity-60 font-mono">
                  {simPulse % 2 === 0 ? '• 3 LABS' : '• 0 LOSS'}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Simulation Popover HUD */}
      {showSimDetails && (
        <div className="absolute left-0 top-full mt-2 w-72 p-3 rounded-xl bg-[#090D1A] border border-[#1E2A42] text-white shadow-2xl z-50 animate-in fade-in zoom-in-95 text-xs font-mono">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1E2A42]">
            <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulated Engine Telemetry</span>
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowSimDetails(false); }}
              className="text-gray-400 hover:text-white text-[10px]"
            >
              ✕
            </button>
          </div>

          {isStudent ? (
            <div className="space-y-1.5 text-[11px] text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Terminal Node:</span>
                <span className="text-emerald-400 font-bold">WS-08-41 (Local)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Local Ledger:</span>
                <span className="text-white">AES-256 IndexedDB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Heartbeat:</span>
                <span className="text-emerald-400 font-bold">Active (14ms loop)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Integrity Seal:</span>
                <span className="text-[#38BDF8]">0x7f9a842b109e</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 text-[11px] text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Central Hub:</span>
                <span className="text-[#38BDF8] font-bold">ALPHA-COMMAND-01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monitored Labs:</span>
                <span className="text-emerald-400 font-bold">3 Test Centers Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Auto Failover:</span>
                <span className="text-white">1.2s Sub-second Watchdog</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Data Loss:</span>
                <span className="text-emerald-400 font-bold">0.00% Absolute Zero</span>
              </div>
            </div>
          )}

          <div className="mt-2.5 pt-2 border-t border-[#1E2A42] flex items-center justify-between text-[10px] text-gray-400">
            <span>Protocol: Zero-Loss Merkle</span>
            <span className="text-emerald-400 font-bold">ARMED</span>
          </div>
        </div>
      )}
    </div>
  );
};
