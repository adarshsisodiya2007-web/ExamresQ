import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { AssessmentCentre } from '../../types';
import { Building2, Wifi, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export const CentreMap: React.FC = () => {
  const { centres, selectedCentre, setSelectedCentre, setCurrentView } = useResilience();

  // Geographical distribution positions on custom map grid
  const nodePositions: Record<string, { top: string; left: string }> = {
    'centre-08': { top: '24%', left: '38%' }, // Delhi / North
    'centre-01': { top: '74%', left: '42%' }, // Bengaluru / South
    'centre-14': { top: '56%', left: '26%' }, // Mumbai / West
    'centre-22': { top: '62%', left: '46%' }, // Hyderabad / South
    'centre-31': { top: '44%', left: '72%' }, // Kolkata / East
    'centre-19': { top: '48%', left: '44%' }, // Bhopal / Central
  };

  const handleSelectCentre = (centre: AssessmentCentre) => {
    setSelectedCentre(centre);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#C62828]" />
            National Assessment Centre Telemetry Mesh
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time edge connectivity, latency jitter & failover states across 38 centres
          </p>
        </div>

        <button
          onClick={() => setCurrentView('centres')}
          className="text-xs font-bold text-[#C62828] hover:text-[#8E1B1B] flex items-center gap-1 cursor-pointer"
        >
          <span>View All 38 Centres</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Schematic Topology Map (8 cols) */}
        <div className="lg:col-span-8 bg-[#F8F8F6] rounded-xl border border-gray-200 p-4 relative min-h-[340px] flex flex-col justify-between overflow-hidden">
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#D1D5DB 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          />

          {/* Map Status Header */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-600 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded border border-gray-200">
              Mesh Protocol: AES-256 + UDP Keep-Alive
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#16803C]" /> Operational</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#C62828] animate-pulse" /> Edge Failover</span>
            </div>
          </div>

          {/* Centre Nodes positioned on map */}
          <div className="relative w-full h-[240px] my-auto">
            {centres.map((centre) => {
              const pos = nodePositions[centre.id] || { top: '50%', left: '50%' };
              const isSelected = selectedCentre?.id === centre.id;
              const isOutage = centre.status === 'incident' || centre.status === 'recovering';

              return (
                <div
                  key={centre.id}
                  onClick={() => handleSelectCentre(centre)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Ping effect for outage or normal */}
                  <div className="relative flex items-center justify-center">
                    <span className={`w-8 h-8 rounded-full absolute transition-transform group-hover:scale-125 ${
                      isOutage ? 'bg-red-500/20 animate-ping' : 'bg-emerald-500/10'
                    }`} />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${
                      isSelected
                        ? 'border-[#171717] bg-[#171717] text-white'
                        : isOutage
                        ? 'border-[#C62828] bg-[#C62828] text-white'
                        : 'border-[#16803C] bg-white text-[#16803C]'
                    }`}>
                      <span className="text-[10px] font-black">{centre.id.replace('centre-', '')}</span>
                    </div>
                  </div>

                  {/* Tooltip Pill */}
                  <div className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow-xs border transition-opacity ${
                    isSelected
                      ? 'bg-gray-900 text-white border-black'
                      : isOutage
                      ? 'bg-red-50 text-[#C62828] border-red-200'
                      : 'bg-white text-gray-800 border-gray-200 group-hover:opacity-100'
                  }`}>
                    {centre.city} • {centre.networkLatency}ms
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-200/60 pt-2">
            <span>Primary Cloud Gateway: Mumbai Azure Central</span>
            <span className="font-mono">Global Health: 99.4%</span>
          </div>
        </div>

        {/* Selected Centre Detail Card (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-xl border border-gray-200 bg-[#F8F8F6] flex flex-col justify-between space-y-4">
          {selectedCentre ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500 uppercase">{selectedCentre.region}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    selectedCentre.status === 'operational'
                      ? 'bg-emerald-50 text-[#16803C] border-emerald-200'
                      : 'bg-red-50 text-[#C62828] border-red-200'
                  }`}>
                    {selectedCentre.status.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mt-1">{selectedCentre.name}</h4>
                <p className="text-xs text-gray-500">City: {selectedCentre.city} • Subnet: {selectedCentre.ipRange}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Candidates</span>
                  <span className="font-bold text-gray-900 font-mono text-sm">
                    {selectedCentre.activeCandidates} / {selectedCentre.totalCandidates}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Network Ping</span>
                  <span className="font-bold text-gray-900 font-mono text-sm">
                    {selectedCentre.networkLatency} ms
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Edge Gateway</span>
                  <span className={`font-bold font-mono text-xs ${
                    selectedCentre.edgeGatewayStatus === 'online' ? 'text-[#16803C]' : 'text-[#C62828]'
                  }`}>
                    {selectedCentre.edgeGatewayStatus.toUpperCase()}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Last Delta Sync</span>
                  <span className="font-bold text-gray-900 font-mono text-xs">
                    {selectedCentre.lastSync}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-gray-200 text-xs space-y-1">
                <span className="font-semibold text-gray-800 block">Resilience Status</span>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  {selectedCentre.status === 'operational'
                    ? 'All candidate workstations streaming heartbeats with zero packet drop.'
                    : 'Uplink degradation active. Client-side encrypted buffers active with zero response loss.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-gray-500">
              Select any centre node on the mesh map to inspect live telemetry.
            </div>
          )}

          <button
            onClick={() => setCurrentView('centres')}
            className="w-full py-2 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Open Centre Monitoring Room
          </button>
        </div>
      </div>
    </div>
  );
};
