import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { AssessmentCentre } from '../../types';
import { CentreDetailDrawer } from './CentreDetailDrawer';
import { 
  Building2, 
  Search, 
  Filter, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  ChevronRight, 
  Clock,
  HardDrive
} from 'lucide-react';

export const CentreMonitoring: React.FC = () => {
  const { 
    centres, 
    selectedCentre, 
    setSelectedCentre, 
    networkStatus 
  } = useResilience();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'operational' | 'attention' | 'recovering'>('all');

  const filteredCentres = centres.filter(centre => {
    const matchesSearch = centre.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          centre.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          centre.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'operational') return matchesSearch && centre.status === 'operational';
    if (statusFilter === 'attention' || statusFilter === 'recovering') {
      return matchesSearch && (centre.status === 'incident' || centre.status === 'recovering');
    }
    return matchesSearch;
  });

  const handleOpenDetail = (centre: AssessmentCentre) => {
    setSelectedCentre(centre);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Centres Overview
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200 uppercase">
                DEMO CENTRES
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Examination Centres Overview (38 Centres)
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Overview of regional candidate attendance, room status, and examination environment readiness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
              Heartbeat: 500ms
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search centre, city, ID (e.g. Centre 08)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-gray-200 bg-[#F8F8F6] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                statusFilter === 'all' ? 'bg-[#171717] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Centres ({centres.length})
            </button>
            <button
              onClick={() => setStatusFilter('operational')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                statusFilter === 'operational' ? 'bg-[#16803C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Operational ({centres.filter(c => c.status === 'operational').length})
            </button>
            <button
              onClick={() => setStatusFilter('attention')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                statusFilter === 'attention' ? 'bg-[#C62828] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Attention Needed ({centres.filter(c => c.status === 'incident' || c.status === 'recovering').length})
            </button>
          </div>
        </div>

        {/* Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCentres.map((centre) => {
            const isOutage = centre.status === 'incident' || centre.status === 'recovering';

            return (
              <div
                key={centre.id}
                onClick={() => handleOpenDetail(centre)}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs hover:shadow-md cursor-pointer relative ${
                  isOutage
                    ? 'border-[#C62828]/50 ring-2 ring-[#C62828]/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Centre Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                      isOutage ? 'bg-red-50 text-[#C62828]' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {centre.id.replace('centre-', 'C')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{centre.name}</span>
                      </div>
                      <p className="text-[11px] text-gray-500">{centre.city} • {centre.region}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${
                    centre.status === 'operational'
                      ? 'bg-emerald-50 text-[#16803C] border-emerald-200'
                      : 'bg-red-50 text-[#C62828] border-red-200 animate-pulse'
                  }`}>
                    ● {centre.status}
                  </span>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F8F8F6] border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Candidates</span>
                    <span className="font-bold text-gray-900 font-mono text-sm">
                      {centre.activeCandidates} / {centre.totalCandidates}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8F8F6] border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Network Latency</span>
                    <span className={`font-bold font-mono text-sm ${
                      isOutage ? 'text-[#C62828]' : 'text-gray-900'
                    }`}>
                      {centre.networkLatency} ms
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8F8F6] border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Open Incidents</span>
                    <span className={`font-bold font-mono text-xs ${
                      centre.openIncidents > 0 ? 'text-[#C62828]' : 'text-gray-800'
                    }`}>
                      {centre.openIncidents} {centre.openIncidents > 0 ? 'Active' : 'None'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8F8F6] border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Last Sync</span>
                    <span className="font-bold text-gray-900 font-mono text-xs">
                      {centre.lastSync}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 text-[11px] font-mono">Gateway: {centre.edgeGatewayStatus}</span>
                  <div className="text-[#C62828] font-bold flex items-center gap-1">
                    <span>Inspect Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Panel Drawer */}
      {drawerOpen && (
        <CentreDetailDrawer
          centre={selectedCentre}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
};
