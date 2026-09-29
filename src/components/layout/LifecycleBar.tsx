import React, { useState } from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { 
  Play, 
  Activity, 
  AlertTriangle, 
  BellRing, 
  UserCheck, 
  ShieldCheck, 
  RotateCcw, 
  RefreshCw, 
  FileCheck2, 
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Radar
} from 'lucide-react';

interface LifecycleNode {
  step: number;
  label: string;
  sub: string;
  targetView: AppView;
  icon: React.ReactNode;
  isActive: (status: string, stage: string) => boolean;
}

export const LifecycleBar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    networkStatus, 
    protectionStage 
  } = useResilience();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const lifecycleStages: LifecycleNode[] = [
    {
      step: 1,
      label: 'EXAM STARTS',
      sub: 'Session Initialized',
      targetView: 'live_exam',
      icon: <Play className="w-3.5 h-3.5" />,
      isActive: () => currentView === 'live_exam' && networkStatus === 'connected'
    },
    {
      step: 2,
      label: 'SYSTEM MONITORING',
      sub: '16ms Telemetry',
      targetView: 'operations',
      icon: <Activity className="w-3.5 h-3.5" />,
      isActive: () => networkStatus === 'connected'
    },
    {
      step: 3,
      label: 'EARLY DETECTION',
      sub: 'Predictive Risk (Req 2)',
      targetView: 'early_detection',
      icon: <Radar className="w-3.5 h-3.5" />,
      isActive: () => currentView === 'early_detection' || networkStatus === 'interrupted' || protectionStage === 'connection_lost'
    },
    {
      step: 4,
      label: 'IMMEDIATE RESPONSE',
      sub: 'Edge Failover',
      targetView: 'incidents',
      icon: <BellRing className="w-3.5 h-3.5" />,
      isActive: () => networkStatus === 'interrupted'
    },
    {
      step: 5,
      label: 'CANDIDATE INFORMED',
      sub: 'Calm Notification',
      targetView: 'live_exam',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      isActive: () => networkStatus === 'interrupted'
    },
    {
      step: 6,
      label: 'RESPONSE PROTECTED',
      sub: 'Local SHA-256 Ledger',
      targetView: 'live_exam',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      isActive: () => protectionStage === 'response_protected'
    },
    {
      step: 7,
      label: 'BACKUP & RECOVERY',
      sub: 'Zero-Loss Sync (Req 4)',
      targetView: 'recovery',
      icon: <RotateCcw className="w-3.5 h-3.5" />,
      isActive: () => currentView === 'recovery' || protectionStage === 'network_restored' || networkStatus === 'reconnecting'
    },
    {
      step: 8,
      label: 'SYNCHRONIZATION',
      sub: 'Delta Reconciled',
      targetView: 'recovery',
      icon: <RefreshCw className="w-3.5 h-3.5" />,
      isActive: () => protectionStage === 'synchronizing'
    },
    {
      step: 9,
      label: 'AUDIT',
      sub: 'Merkle Chain Sealed',
      targetView: 'audit',
      icon: <FileCheck2 className="w-3.5 h-3.5" />,
      isActive: () => currentView === 'audit' || protectionStage === 'response_verified'
    },
    {
      step: 10,
      label: 'TRUST',
      sub: '0% Data Loss Proof',
      targetView: 'reports',
      icon: <Award className="w-3.5 h-3.5" />,
      isActive: () => currentView === 'reports' || protectionStage === 'response_verified'
    }
  ];

  return (
    <div className="bg-[#171717] dark:bg-[#07080B] text-white border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#C62828] text-white">
              Core Product Story
            </span>
            <span className="text-xs font-bold text-gray-200 hidden sm:inline">
              10-Phase Autonomous Resilience Lifecycle
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400 font-mono hidden md:inline">
              Status: {networkStatus === 'connected' ? '● Normal Telemetry' : '⚠ Interruption Safeguarded'}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>{isExpanded ? 'Collapse Lifecycle' : 'Expand 10-Step Journey'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 10-Phase Horizontal Flow */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-800/80 overflow-x-auto pb-2">
            <div className="flex items-center min-w-[980px] justify-between gap-1 relative">
              {lifecycleStages.map((stage, index) => {
                const active = stage.isActive(networkStatus, protectionStage);
                const isCurrentView = currentView === stage.targetView;

                return (
                  <React.Fragment key={stage.step}>
                    <button
                      onClick={() => setCurrentView(stage.targetView)}
                      className={`flex-1 p-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                        active
                          ? 'bg-[#C62828] text-white shadow-md ring-2 ring-red-400 scale-105 z-10'
                          : isCurrentView
                          ? 'bg-white/15 text-white border border-white/20'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-transparent'
                      }`}
                      title={`Step ${stage.step}: ${stage.label} (Click to open ${stage.targetView})`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[9px] font-mono opacity-70">0{stage.step}</span>
                        {stage.icon}
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-tight block truncate max-w-[85px]">
                        {stage.label}
                      </span>
                      <span className="text-[8px] opacity-75 truncate block max-w-[85px]">
                        {stage.sub}
                      </span>

                      {active && (
                        <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      )}
                    </button>

                    {index < lifecycleStages.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-gray-600 shrink-0 mx-0.5 opacity-60" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
