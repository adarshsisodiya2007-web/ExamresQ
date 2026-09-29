import React from 'react';
import { AssessmentCentre } from '../../types';
import { 
  X, 
  Building2, 
  Wifi, 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  Clock,
  HardDrive,
  Activity
} from 'lucide-react';

interface CentreDetailDrawerProps {
  centre: AssessmentCentre | null;
  onClose: () => void;
  onTriggerFailover?: () => void;
}

export const CentreDetailDrawer: React.FC<CentreDetailDrawerProps> = ({ 
  centre, 
  onClose 
}) => {
  if (!centre) return null;

  const isDegraded = centre.status === 'incident' || centre.status === 'recovering';

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#F8F8F6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#C62828] shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#C62828]">
                {centre.id.toUpperCase()}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                centre.status === 'operational'
                  ? 'bg-emerald-50 text-[#16803C] border-emerald-200'
                  : 'bg-red-50 text-[#C62828] border-red-200 animate-pulse'
              }`}>
                {centre.status.toUpperCase()}
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mt-0.5">{centre.name}</h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
        {/* Quick summary grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
            <span className="text-gray-500 block">Active Candidates</span>
            <span className="text-lg font-black font-mono text-gray-900 mt-1 block">
              {centre.activeCandidates} / {centre.totalCandidates}
            </span>
            <span className="text-[10px] text-emerald-600 font-medium">97.3% In Seat</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
            <span className="text-gray-500 block">Network Latency</span>
            <span className="text-lg font-black font-mono text-gray-900 mt-1 block">
              {centre.networkLatency} ms
            </span>
            <span className={`text-[10px] font-medium ${isDegraded ? 'text-[#C62828]' : 'text-emerald-600'}`}>
              {isDegraded ? 'Uplink degraded' : 'Jitter < 2ms'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
            <span className="text-gray-500 block">Edge Gateway</span>
            <span className="text-sm font-bold font-mono text-gray-900 mt-1 block uppercase">
              {centre.edgeGatewayStatus}
            </span>
            <span className="text-[10px] text-gray-500">Route: BGP Multi-Homed</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200">
            <span className="text-gray-500 block">Last Sync Check</span>
            <span className="text-sm font-bold font-mono text-gray-900 mt-1 block">
              {centre.lastSync}
            </span>
            <span className="text-[10px] text-[#16803C] font-semibold">0 Delta Lag</span>
          </div>
        </div>

        {/* Candidate Status Breakdown */}
        <div className="space-y-3">
          <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#C62828]" />
            Candidate Workstation Breakdown
          </h4>
          <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Answering</span>
              <span className="font-bold font-mono text-gray-900">172 nodes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Review Mode</span>
              <span className="font-bold font-mono text-gray-900">7 nodes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Local Buffer Engaged</span>
              <span className="font-bold font-mono text-[#C62828]">{isDegraded ? '7 nodes' : '0 nodes'}</span>
            </div>
          </div>
        </div>

        {/* Incidents & Recovery Events */}
        <div className="space-y-3">
          <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#C77A00]" />
            Centre Incident & Recovery Telemetry
          </h4>
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 bg-white">
            <div className="p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Incident #ET-1042</span>
                <span className="text-[10px] font-mono text-gray-400">10:42:11</span>
              </div>
              <p className="text-[11px] text-gray-600">WAN drop; 7 candidate buffers automatically locked in AES-256 local ledger.</p>
              <span className="text-[10px] font-semibold text-[#16803C] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Reconciled with 0% data loss
              </span>
            </div>

            <div className="p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Pre-Flight Audit</span>
                <span className="text-[10px] font-mono text-gray-400">09:30:00</span>
              </div>
              <p className="text-[11px] text-gray-600">184 workstations passed sandbox integrity check.</p>
            </div>
          </div>
        </div>

        {/* Edge Appliance Details */}
        <div className="p-4 rounded-xl bg-[#F8F8F6] border border-gray-200 space-y-2">
          <span className="font-bold text-gray-900 block flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-gray-600" />
            Edge Resilience Appliance Specs
          </span>
          <div className="space-y-1 text-gray-600 text-[11px]">
            <div className="flex justify-between">
              <span>Appliance Host:</span>
              <span className="font-mono text-gray-800">EDGE-DEL-08A</span>
            </div>
            <div className="flex justify-between">
              <span>Subnet:</span>
              <span className="font-mono text-gray-800">{centre.ipRange}</span>
            </div>
            <div className="flex justify-between">
              <span>Offline Ledger Capacity:</span>
              <span className="font-mono text-gray-800">500,000 responses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-[#F8F8F6] flex gap-2">
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Close Centre Panel
        </button>
      </div>
    </div>
  );
};
