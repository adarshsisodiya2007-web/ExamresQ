import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  RotateCcw, 
  FileCheck2,
  Calendar,
  Filter
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { metrics, centres } = useResilience();
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Institutional Reporting & Analytics
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Assessment Health & Resilience Reports
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Comprehensive post-examination verification, centre uptime benchmarks, and incident summaries
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Report Exported (PDF/CSV)' : 'Export Official Audit Report'}</span>
            </button>
          </div>
        </div>

        {/* TRUST SCORE / SYSTEM STATUS (Requirement 13) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Health Score Gauge (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                OVERALL ASSESSMENT HEALTH
              </span>
              <div className="text-5xl font-black text-gray-900 font-mono tracking-tight">
                98.7%
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#16803C] text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fully Operational</span>
              </div>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed">
                Aggregated system-status metric computed across multi-node telemetry and zero data loss confirmation.
              </p>
            </div>

            {/* 5 Dimensional Health Breakdown (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                Five-Dimensional Assessment Ecosystem Index
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">1. Reliability (Server & Clusters)</span>
                    <span className="font-mono font-bold text-gray-900">99.8%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16803C] h-full rounded-full" style={{ width: '99.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">2. Security (Encrypted Ledgers & Sandboxes)</span>
                    <span className="font-mono font-bold text-gray-900">100.0%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16803C] h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">3. Connectivity (Multi-WAN Mesh & Carrier Uptime)</span>
                    <span className="font-mono font-bold text-gray-900">98.4%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '98.4%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">4. Recovery (Automated Failover & Delta Queues)</span>
                    <span className="font-mono font-bold text-gray-900">97.6%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '97.6%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">5. Audit (Merkle Root Consistency & Verification)</span>
                    <span className="font-mono font-bold text-gray-900">100.0%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16803C] h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 REPORT SECTIONS (Requirement 12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Section 1: Assessment Summary */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#C62828] flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">1. Assessment Summary</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Paper ENG-304: Engineering Mathematics III. 14,820 total candidates registered across 38 centres with 0% unrecovered dropout.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Scheduled Duration: 60 Minutes</div>
              <div>Submissions Received: 14,820</div>
            </div>
          </div>

          {/* Section 2: Candidate Activity */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">2. Candidate Activity</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Total clicks registered: 412,890. Mean answer response time: 24.2 seconds. Real-time client heartbeats acknowledged with zero timeout.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Average Progress: 72%</div>
              <div>Marked for Review: 8.4%</div>
            </div>
          </div>

          {/* Section 3: Centre Performance */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16803C] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">3. Centre Performance</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              37 of 38 centres operated with flawless primary fiber. Centre 08 successfully engaged backup microwave backhaul within 48 seconds.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Peak Latency: 42ms</div>
              <div>Lowest Latency: 14ms (Centre 01)</div>
            </div>
          </div>

          {/* Section 4: Incident Summary */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C77A00] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">4. Incident Summary</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Incident #ET-1042 triggered automatically at 10:42:01. Sub-second threshold flagged ISP carrier severance. 7 workstations protected.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Incident Severity: Medium</div>
              <div>Human Intervention Needed: 0</div>
            </div>
          </div>

          {/* Section 5: Recovery Summary */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">5. Recovery Summary</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Delta stream reconciliation completed across all 7 affected nodes. All buffered responses committed to the central cluster with 0 conflicts.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Recovery Duration: 48s</div>
              <div>Data Loss Rate: 0.00%</div>
            </div>
          </div>

          {/* Section 6: Audit Summary */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-900 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">6. Audit Summary</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Merkle tree state roots computed for all 14,820 candidate sessions. Cryptographically sealed for dispute-free judicial and institutional validity.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Merkle Verification: 100% Passed</div>
              <div>Audit Authority: National Board</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
