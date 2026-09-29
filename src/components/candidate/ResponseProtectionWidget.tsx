import React from 'react';
import { useResilience, ResponseProtectionStage } from '../../context/ResilienceContext';
import { 
  CheckCircle2, 
  WifiOff, 
  ShieldAlert, 
  Wifi, 
  RefreshCw, 
  Lock, 
  Database,
  ArrowRight
} from 'lucide-react';

export const ResponseProtectionWidget: React.FC = () => {
  const { 
    protectionStage, 
    networkStatus, 
    offlineQueueCount, 
    lastSavedHash,
    compensatoryTimeAdded,
    forcePeriodicSave
  } = useResilience();

  const stages: { stage: ResponseProtectionStage; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      stage: 'normal_saved',
      label: 'Response Saved',
      sub: 'Cloud Sync Active',
      icon: <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
    },
    {
      stage: 'connection_lost',
      label: 'Connection Lost',
      sub: 'Uplink Severed',
      icon: <WifiOff className="w-4 h-4 text-[#C62828]" />
    },
    {
      stage: 'response_protected',
      label: 'Response Protected',
      sub: 'Encrypted Local Ledger',
      icon: <Lock className="w-4 h-4 text-[#C62828]" />
    },
    {
      stage: 'network_restored',
      label: 'Network Restored',
      sub: 'Secondary Route Active',
      icon: <Wifi className="w-4 h-4 text-blue-600" />
    },
    {
      stage: 'synchronizing',
      label: 'Synchronizing',
      sub: 'Delta Stream',
      icon: <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
    },
    {
      stage: 'response_verified',
      label: 'Response Verified',
      sub: '0% Data Loss',
      icon: <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
    }
  ];

  const getStageIndex = (stage: ResponseProtectionStage) => {
    switch (stage) {
      case 'normal_saved': return 0;
      case 'connection_lost': return 1;
      case 'response_protected': return 2;
      case 'network_restored': return 3;
      case 'synchronizing': return 4;
      case 'response_verified': return 5;
      default: return 0;
    }
  };

  const currentIdx = getStageIndex(protectionStage);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-[#C62828]">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-gray-900 tracking-tight">RESPONSE PROTECTION ENGINE</h4>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Periodic auto-save heartbeat active (every 3s)" />
            </div>
            <p className="text-[10px] text-gray-500 font-mono">Client-Side AES-256 GCM + IndexedDB Sandbox (Req 4.1)</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {compensatoryTimeAdded > 0 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
              +{compensatoryTimeAdded}s Compensatory Credit
            </span>
          )}

          {offlineQueueCount > 0 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-700" />
              {offlineQueueCount} Protected Locally
            </span>
          )}

          <button
            onClick={forcePeriodicSave}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 cursor-pointer transition-colors"
            title="Force immediate periodic response commit"
          >
            Seal: {lastSavedHash.substring(0, 8)}...
          </button>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
        {stages.map((item, idx) => {
          const isActive = idx === currentIdx;
          const isPassed = idx < currentIdx;

          return (
            <div
              key={item.stage}
              className={`p-2.5 rounded-lg border text-center transition-all duration-300 relative ${
                isActive
                  ? 'border-[#C62828] bg-red-50/70 shadow-xs ring-1 ring-[#C62828]/20 scale-[1.02]'
                  : isPassed
                  ? 'border-gray-200 bg-gray-50 text-gray-700'
                  : 'border-dashed border-gray-200 bg-white opacity-50'
              }`}
            >
              <div className="flex justify-center mb-1">
                {item.icon}
              </div>
              <span className={`text-[11px] font-bold block truncate ${
                isActive ? 'text-[#C62828]' : 'text-gray-800'
              }`}>
                {item.label}
              </span>
              <span className="text-[9px] text-gray-600 block truncate mt-0.5">
                {item.sub}
              </span>

              {isActive && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C62828] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C62828]"></span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Live explanation footer */}
      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-600">
        <div className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-gray-500" />
          <span>
            {protectionStage === 'normal_saved' && 'Normal Cloud Connectivity: Each answer is committed immediately with TLS handshake.'}
            {protectionStage === 'connection_lost' && 'Uplink disruption detected. Transitioning seamlessly to client memory buffer.'}
            {protectionStage === 'response_protected' && 'Zero Loss Lock: Response secured in encrypted local sandbox with cryptographic hash seal.'}
            {protectionStage === 'network_restored' && 'Connection re-established via secondary edge route. Preparing delta sync.'}
            {protectionStage === 'synchronizing' && 'Streaming incremental delta packets to central assessment authority.'}
            {protectionStage === 'response_verified' && '100% Verified! Local hash validated against central ledger.'}
          </span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">MTTD: 1.2s</span>
      </div>
    </div>
  );
};
