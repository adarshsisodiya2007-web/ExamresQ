import React from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { 
  Play, 
  Activity, 
  BellRing, 
  UserCheck, 
  ShieldCheck, 
  RotateCcw, 
  RefreshCw, 
  FileCheck2, 
  Award,
  Radar,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface LifecycleNode {
  step: number;
  label: string;
  sub: string;
  targetView: AppView;
  icon: React.ReactNode;
  isActive: (status: string, stage: string) => boolean;
}

interface LifecycleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LifecycleDrawer: React.FC<LifecycleDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    currentView, 
    setCurrentView, 
    networkStatus, 
    protectionStage 
  } = useResilience();

  if (!isOpen) return null;

  const lifecycleStages: LifecycleNode[] = [
    {
      step: 1,
      label: 'Exam Starts',
      sub: 'Session Initialized',
      targetView: 'live_exam',
      icon: <Play className="w-3.5 h-3.5 text-blue-400" />,
      isActive: () => currentView === 'live_exam' && networkStatus === 'connected'
    },
    {
      step: 2,
      label: 'System Monitoring',
      sub: '16ms Telemetry',
      targetView: 'operations',
      icon: <Activity className="w-3.5 h-3.5 text-emerald-400" />,
      isActive: () => networkStatus === 'connected'
    },
    {
      step: 3,
      label: 'Early Detection',
      sub: 'Predictive Risk (Req 2)',
      targetView: 'early_detection',
      icon: <Radar className="w-3.5 h-3.5 text-amber-400" />,
      isActive: () => currentView === 'early_detection' || networkStatus === 'interrupted' || protectionStage === 'connection_lost'
    },
    {
      step: 4,
      label: 'Immediate Response',
      sub: 'Edge Failover',
      targetView: 'incidents',
      icon: <BellRing className="w-3.5 h-3.5 text-red-400" />,
      isActive: () => networkStatus === 'interrupted'
    },
    {
      step: 5,
      label: 'Candidate Informed',
      sub: 'Calm Notification',
      targetView: 'live_exam',
      icon: <UserCheck className="w-3.5 h-3.5 text-purple-400" />,
      isActive: () => networkStatus === 'interrupted'
    },
    {
      step: 6,
      label: 'Response Protected',
      sub: 'Local SHA-256 Ledger',
      targetView: 'live_exam',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      isActive: () => protectionStage === 'response_protected'
    },
    {
      step: 7,
      label: 'Backup & Recovery',
      sub: 'Zero-Loss Sync (Req 4)',
      targetView: 'recovery',
      icon: <RotateCcw className="w-3.5 h-3.5 text-blue-400" />,
      isActive: () => currentView === 'recovery' || protectionStage === 'network_restored' || networkStatus === 'reconnecting'
    },
    {
      step: 8,
      label: 'Synchronization',
      sub: 'Delta Reconciled',
      targetView: 'recovery',
      icon: <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />,
      isActive: () => protectionStage === 'synchronizing'
    },
    {
      step: 9,
      label: 'Audit Integrity',
      sub: 'Merkle Chain Sealed',
      targetView: 'audit',
      icon: <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />,
      isActive: () => currentView === 'audit' || protectionStage === 'response_verified'
    },
    {
      step: 10,
      label: 'Trust & Verification',
      sub: '0% Data Loss Proof',
      targetView: 'reports',
      icon: <Award className="w-3.5 h-3.5 text-amber-400" />,
      isActive: () => currentView === 'reports' || protectionStage === 'response_verified'
    }
  ];

  const handleStepClick = (view: AppView) => {
    setCurrentView(view);
    onClose();
  };

  return (
    <>
      {/* Subtle backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Small Right-Side Floating Drawer Panel */}
      <aside className="fixed top-14 right-4 z-50 w-80 max-h-[85vh] bg-[#0A101F] text-gray-200 border border-[#1E2A42] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-3.5 border-b border-[#1E2A42] bg-[#070B14] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                10-Phase Lifecycle
              </h3>
              <p className="text-[10px] text-gray-400 font-sans">Autonomous Resilience Journey</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Network Status Pill inside Drawer */}
        <div className="px-3.5 py-2 bg-[#0D1527] border-b border-[#1A253C] flex items-center justify-between text-[11px] font-mono">
          <span className="text-gray-400">Current Protocol:</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            networkStatus === 'connected' 
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' 
              : 'bg-red-950/80 text-red-300 border border-red-800 animate-pulse'
          }`}>
            {networkStatus === 'connected' ? '● Online 16ms' : '⚠ Local Buffer Active'}
          </span>
        </div>

        {/* Vertical Stepper List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 custom-scrollbar">
          {lifecycleStages.map((stage) => {
            const active = stage.isActive(networkStatus, protectionStage);
            const isCurrentView = currentView === stage.targetView;

            return (
              <button
                key={stage.step}
                onClick={() => handleStepClick(stage.targetView)}
                className={`
                  w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer group text-xs
                  ${
                    active
                      ? 'bg-linear-to-r from-red-950/90 to-[#1C1217] border border-red-700/80 text-white shadow-md'
                      : isCurrentView
                      ? 'bg-[#121B2B] border border-[#38BDF8]/40 text-[#38BDF8]'
                      : 'hover:bg-white/5 border border-transparent text-gray-300'
                  }
                `}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className={`
                    w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-mono text-[10px] font-bold
                    ${active ? 'bg-[#C62828] text-white' : 'bg-[#121B2B] text-gray-400 group-hover:text-white'}
                  `}>
                    {stage.step}
                  </div>

                  <div className="truncate">
                    <span className="font-bold block truncate text-xs">
                      {stage.label}
                    </span>
                    <span className="text-[10px] text-gray-400 block truncate">
                      {stage.sub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-[#1E2A42] bg-[#070B14] text-[10px] font-mono text-gray-500 flex items-center justify-between">
          <span>Click any phase to navigate</span>
          <span className="text-[#38BDF8] font-bold">ExamresQ</span>
        </div>

      </aside>
    </>
  );
};
