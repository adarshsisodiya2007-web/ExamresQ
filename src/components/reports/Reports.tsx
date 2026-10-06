import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { samplePostExamAuditReport } from '../../data/governanceSecurityData';
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
  Filter,
  FileText,
  Award,
  Sparkles,
  Printer,
  X
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { metrics, centres, auditTrail } = useResilience();
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [closureModalOpen, setClosureModalOpen] = useState<boolean>(false);

  const handleExport = () => {
    // Generate authentic CSV export file of centres & incident telemetry
    const headers = 'CentreID,CentreName,TotalCandidates,Active,Status,LatencyMs,HealthScore\n';
    const rows = centres.map(c => `"${c.id}","${c.name}",${c.totalCandidates},${c.activeCandidates},"${c.status}",${c.networkLatency},${c.healthScore}%`).join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `ExamresQ_Audit_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D1527] p-6 sm:p-7 rounded-2xl border border-red-100 dark:border-gray-800 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Audit & Reporting
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Certified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1.5 tracking-tight">
              Evidence Reports
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-3xl">
              Post-examination incident logs, response recovery proofs, and executive closure seals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={() => setClosureModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-black transition-colors cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Closure Seal</span>
            </button>

            <button
              onClick={handlePrintDossier}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors cursor-pointer shadow-xs"
              title="Print official PDF report"
            >
              <Printer className="w-4 h-4 text-blue-500" />
              <span>Print PDF</span>
            </button>

            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Downloaded' : 'Export CSV'}</span>
            </button>
          </div>
        </div>

        {/* TRUST SCORE / SYSTEM STATUS */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Health Score Gauge (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                OVERALL POST-EXAMINATION HEALTH
              </span>
              <div className="text-5xl font-black text-gray-900 font-mono tracking-tight">
                99.4%
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#16803C] text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Reconciled Zero-Loss</span>
              </div>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed">
                Certified across 38 test centres, 14,820 candidate sessions, and 1 recovered WAN disruption.
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
                    <span className="font-semibold text-gray-700">1. Reliability (Edge & Cloud Clusters)</span>
                    <span className="font-mono font-bold text-gray-900">99.8%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16803C] h-full rounded-full" style={{ width: '99.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">2. Security (WORM Encrypted Ledgers)</span>
                    <span className="font-mono font-bold text-gray-900">100.0%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16803C] h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">3. Speed (1.2s MTTD / 48s MTTR)</span>
                    <span className="font-mono font-bold text-gray-900">99.1%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16803C] h-full rounded-full" style={{ width: '99.1%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">4. Precision (Data Reconciliation Parity)</span>
                    <span className="font-mono font-bold text-[#16803C]">100.00% Zero-Loss</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16803C] h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">5. Fairness (Parity Score Across Disruptions)</span>
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

        {/* 6 Comprehensive Post-Examination Report Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Section 1: Candidate Verification */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16803C] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">1. Response Verification</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              14,820 of 14,820 candidates had 100% of their responses cross-verified against client-side IndexedDB sandboxes. Zero answers dropped.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Verified Candidates: 14,820 / 14,820</div>
              <div>Unreconciled Responses: 0</div>
            </div>
          </div>

          {/* Section 2: Disruption & MTTD/MTTR */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#C62828] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">2. Disruption Recovery</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              1 disruption recorded at Centre 08. Detected in 1.2s; failover to secondary microwave completed in 48s. Exam timer was frozen during outage.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Detection (MTTD): 1.2s</div>
              <div>Recovery (MTTR): 48.0s</div>
            </div>
          </div>

          {/* Section 3: Centre Performance */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
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

          {/* Section 4: Incident & Notification Log */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C77A00] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">4. Incident & Advisory Log</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Incident #ET-1042 triggered automatically. 4 on-screen candidate advisories dispatched instructing calm; proctors approved time extension.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Incident Severity: Medium</div>
              <div>Candidate Notifications: 4 Logged</div>
            </div>
          </div>

          {/* Section 5: Authority Decision Sign-off */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">5. Authority Decisions</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Central Examination Authority authorized 'Extend' for Centre 08 (+312s compensatory time). 0 arbitrary invalidations executed.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Sign-off Authority: Dr. R. C. Varma</div>
              <div>Decision Status: Approved & Executed</div>
            </div>
          </div>

          {/* Section 6: Cryptographic Merkle Archive */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-900 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">6. Merkle Archive Sealed</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Merkle tree state roots computed for all 14,820 candidate sessions. Cryptographically sealed for dispute-free judicial validity.
            </p>
            <div className="pt-2 border-t border-gray-100 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Archive Seal: 0x3f9a...012a</div>
              <div>Legal Integrity: 100% Immutable</div>
            </div>
          </div>
        </div>

        {/* EXECUTIVE CLOSURE MODAL */}
        {closureModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-blue-600 relative space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-blue-700 font-bold block">
                      CENTRAL BOARD OF ONLINE ASSESSMENTS
                    </span>
                    <h3 className="text-lg font-black text-gray-900">Official Examination Closure & Audit Seal</h3>
                  </div>
                </div>

                <button 
                  onClick={() => setClosureModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                <p>
                  This official document confirms that <strong>Paper ENG-304 (Engineering Mathematics III)</strong> has formally completed all testing windows across <strong>38 Assessment Centres</strong> under the ExamresQ Resilient Framework.
                </p>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 font-mono text-[11px] space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Report Code:</span>
                    <span className="font-bold text-gray-900">{samplePostExamAuditReport.reportId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Validated Candidates:</span>
                    <span className="font-bold text-gray-900">{samplePostExamAuditReport.totalCandidates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Response Reconciliation:</span>
                    <span className="font-bold text-[#16803C]">100.00% Zero-Loss Match</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Audit Merkle Seal:</span>
                    <span className="font-bold text-gray-900 truncate max-w-xs">{samplePostExamAuditReport.merkleArchiveRoot}</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500">
                  Certified with zero unauthorized edits, zero candidate loss, and complete empirical audit trails.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-[#16803C] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Formally Certified & Sealed
                </span>
                <button
                  onClick={() => setClosureModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
