import React, { useState, useEffect } from 'react';
import { 
  User, 
  Send, 
  Database, 
  WifiOff, 
  ShieldCheck, 
  Wifi, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight,
  Play,
  RotateCcw
} from 'lucide-react';

interface StageConfig {
  id: string;
  name: string;
  sub: string;
  icon: React.ReactNode;
  badgeColor: string;
  statusText: string;
}

export const HeroVisualization: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const stages: StageConfig[] = [
    {
      id: 'candidate',
      name: '1. Student',
      sub: 'Active Exam',
      icon: <User className="w-5 h-5" />,
      badgeColor: 'border-gray-200 bg-white text-gray-800',
      statusText: 'Student selects answer'
    },
    {
      id: 'saved',
      name: '2. Normal Save',
      sub: 'Instant Sync',
      icon: <Database className="w-5 h-5 text-emerald-600" />,
      badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      statusText: 'Answer saved instantly to system'
    },
    {
      id: 'interruption',
      name: '3. Connection Drop',
      sub: 'Network Outage',
      icon: <WifiOff className="w-5 h-5 text-[#B91C3C]" />,
      badgeColor: 'border-red-300 bg-red-50 text-[#B91C3C] animate-pulse',
      statusText: 'Internet disconnects unexpectedly'
    },
    {
      id: 'protected',
      name: '4. Safe Mode',
      sub: 'Protected Offline',
      icon: <ShieldCheck className="w-5 h-5 text-[#B91C3C]" />,
      badgeColor: 'border-[#B91C3C] bg-red-50 text-[#B91C3C] font-bold',
      statusText: 'Student continues without losing answers or time'
    },
    {
      id: 'restored',
      name: '5. Restored',
      sub: 'Backup Link',
      icon: <Wifi className="w-5 h-5 text-blue-600" />,
      badgeColor: 'border-blue-200 bg-blue-50 text-blue-700',
      statusText: 'Connection safely reconnects'
    },
    {
      id: 'verified',
      name: '6. All Verified',
      sub: 'Zero Loss',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      badgeColor: 'border-emerald-300 bg-emerald-100 text-emerald-800',
      statusText: 'All responses matched and verified'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStageIndex(prev => (prev + 1) % stages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [autoPlay, stages.length]);

  const current = stages[activeStageIndex];

  return (
    <div className="w-full bg-white/90 dark:bg-[#13151D]/90 backdrop-blur-xl rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/50 p-5 sm:p-8 relative overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C62828]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Live Indicator & Scrubber Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800/80 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-ping" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-gray-100 font-mono">
            Autonomous Resilience Lifecycle Simulator
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border border-gray-200 dark:border-gray-700">
            Phase 0{activeStageIndex + 1} / 0{stages.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            {autoPlay ? <span className="text-[11px]">Pause Loop</span> : <Play className="w-3 h-3 text-[#C62828]" />}
            {!autoPlay && <span className="text-[11px]">Resume Loop</span>}
          </button>
          <button
            onClick={() => {
              setActiveStageIndex(0);
              setAutoPlay(true);
            }}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
            title="Reset from Stage 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Flow Pipeline with Moving Red Indicator */}
      <div className="relative py-5 z-10">
        {/* Connection Track Line with Subtle Glow */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0 overflow-hidden">
          <div className="h-full bg-linear-to-r from-transparent via-[#C62828] to-transparent w-48 animate-laser opacity-75" />
        </div>
        
        {/* Animated Active Progress Fill */}
        <div 
          className="hidden lg:block absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-gradient-to-r from-[#8E1B1B] via-[#C62828] to-[#E53935] rounded-full transition-all duration-700 ease-out z-0 shadow-sm shadow-[#C62828]/50"
          style={{ width: `${(activeStageIndex / (stages.length - 1)) * 88}%` }}
        />

        {/* Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageIndex(idx);
                  setAutoPlay(false);
                }}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#C62828] bg-white dark:bg-[#1A1D2B] shadow-lg shadow-[#C62828]/15 scale-105 ring-2 ring-[#C62828]/30'
                    : isCompleted
                    ? 'border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#151722]/80 opacity-90'
                    : 'border-dashed border-gray-200 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/30 opacity-60 hover:opacity-90'
                }`}
              >
                {/* Node Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-[#E53935] to-[#C62828] text-white shadow-md shadow-[#C62828]/30 scale-105'
                    : isCompleted
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    : 'bg-white dark:bg-[#181B26] text-gray-400'
                }`}>
                  {stage.icon}
                </div>

                {/* Node Title */}
                <span className={`text-[11px] font-black tracking-tight block ${
                  isActive ? 'text-[#C62828]' : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {stage.name.replace(/^\d+\.\s*/, '')}
                </span>

                {/* Subtitle */}
                <span className="text-[10px] text-gray-500 dark:text-gray-400 block mt-0.5 font-medium">
                  {stage.sub}
                </span>

                {/* Progress Dot */}
                <div className="mt-2.5">
                  {isActive ? (
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C62828] animate-ping" />
                  ) : isCompleted ? (
                    <span className="inline-block w-2 h-2 rounded-full bg-[#16803C]" />
                  ) : (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live State Breakdown Card */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#0E1017] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 flex items-center justify-center shrink-0 shadow-xs">
            {current.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">{current.name}</span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${current.badgeColor}`}>
                {current.sub}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{current.statusText}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono hidden md:inline bg-white dark:bg-gray-900 px-2.5 py-1 rounded border border-gray-200 dark:border-gray-800">
            Hash: 0x7f9a...842b
          </span>
          <button
            onClick={() => setActiveStageIndex(prev => (prev + 1) % stages.length)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#171717] dark:bg-white hover:bg-black text-white dark:text-black transition-colors cursor-pointer shadow-xs"
          >
            <span>Next Phase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
