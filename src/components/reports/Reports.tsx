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
  const { metrics, centres, auditTrail, downloadAuditDossierPDF, downloadAuditLedgerCSV } = useResilience();
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
              onClick={downloadAuditDossierPDF}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
              title="Download official jsPDF regulatory compliance dossier with SHA-256 seal"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Official PDF Dossier</span>
            </button>

            <button
              onClick={downloadAuditLedgerCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors cursor-pointer shadow-xs"
              title="Export complete cryptographic hash chain ledger (CSV)"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export Ledger CSV</span>
            </button>

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
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* 1. ASSESSMENT OVERVIEW (3 Key Metrics per Rule 15 & 16) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Average Score</span>
            <div className="text-3xl font-black text-gray-900 dark:text-white font-mono mt-1">
              78%
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
              ● Strong overall performance
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Completion Rate</span>
            <div className="text-3xl font-black text-gray-900 dark:text-white font-mono mt-1">
              86%
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
              ✓ All sessions accounted for
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Students Evaluated</span>
            <div className="text-3xl font-black text-[#B91C3C] font-mono mt-1">
              42
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 block">
              Mid-Semester Assessment
            </span>
          </div>
        </div>

        {/* 2. SIMPLE PERFORMANCE DISTRIBUTION (One simple chart per Rule 15) */}
        <div className="bg-white dark:bg-[#0D1527] rounded-2xl border border-[#F0D9D4] dark:border-[#1E2A42] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0D9D4] dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Score Distribution
              </h3>
              <p className="text-xs text-gray-500">Student performance across score bands</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 font-mono">Highest: 94%</span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-gray-700 dark:text-gray-300">Excellent (85% – 100%)</span>
                <span className="font-bold text-gray-900 dark:text-white">14 Students (33%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-[#B91C3C] h-full rounded-full transition-all duration-500" style={{ width: '33%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-gray-700 dark:text-gray-300">Proficient (70% – 84%)</span>
                <span className="font-bold text-gray-900 dark:text-white">22 Students (52%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-[#E2C2BB] dark:bg-red-900/50 h-full rounded-full transition-all duration-500" style={{ width: '52%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-gray-700 dark:text-gray-300">Review Recommended (&lt; 70%)</span>
                <span className="font-bold text-gray-900 dark:text-white">6 Students (15%)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. PERFORMANCE SNAPSHOT (Exactly 3 Sample Student Results per Rules 4, 15, 16) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Student Results Snapshot (3 Sample Records)
            </h2>
            <span className="text-xs text-gray-500 font-mono">Verified Submissions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Student 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
                <span className="text-xs font-mono text-gray-400">Station 14</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Aarav Sharma</h3>
                <p className="text-xs text-gray-500">Roll: ET-2026-4418</p>
              </div>
              <div className="pt-2 border-t border-[#F0D9D4] dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">Score</span>
                <span className="text-xl font-black text-[#B91C3C] font-mono">94%</span>
              </div>
            </div>

            {/* Student 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
                <span className="text-xs font-mono text-gray-400">Station 15</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Riya Patel</h3>
                <p className="text-xs text-gray-500">Roll: ET-2026-4419</p>
              </div>
              <div className="pt-2 border-t border-[#F0D9D4] dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">Score</span>
                <span className="text-xl font-black text-[#B91C3C] font-mono">89%</span>
              </div>
            </div>

            {/* Student 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Reviewed
                </span>
                <span className="text-xs font-mono text-gray-400">Station 16</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Kabir Singh</h3>
                <p className="text-xs text-gray-500">Roll: ET-2026-4420</p>
              </div>
              <div className="pt-2 border-t border-[#F0D9D4] dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">Score</span>
                <span className="text-xl font-black text-[#B91C3C] font-mono">84%</span>
              </div>
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
