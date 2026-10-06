import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { sampleSuspiciousPatternAlerts } from '../../data/governanceSecurityData';
import { SuspiciousPatternAlert } from '../../types';
import { 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FileText, 
  ShieldAlert, 
  X, 
  Check, 
  ArrowRight,
  Filter,
  Sparkles,
  Search,
  Scale,
  BrainCircuit,
  Fingerprint
} from 'lucide-react';

export const SuspiciousPatternCenter: React.FC = () => {
  const { addNotification, setCurrentView } = useResilience();
  const [alerts, setAlerts] = useState<SuspiciousPatternAlert[]>(sampleSuspiciousPatternAlerts);
  const [selectedAlert, setSelectedAlert] = useState<SuspiciousPatternAlert | null>(alerts[0]);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState<boolean>(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const handleReviewAction = (alertId: string, newStatus: SuspiciousPatternAlert['status'], remarks: string) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId 
        ? { ...a, status: newStatus, reviewedBy: 'Dr. V. K. Raman (Chief Invigilator)', reviewRemarks: remarks }
        : a
    ));

    addNotification({
      target: 'admin',
      type: newStatus === 'Cleared (Legitimate)' ? 'info' : 'warning',
      title: `Official Review Decision: ${alertId}`,
      message: `Status updated to ${newStatus}. Remarks: ${remarks}`
    });

    setEvidenceModalOpen(false);
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header - Simple & Clean */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D1527] p-6 rounded-2xl border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B91C3C] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#B91C3C] dark:text-[#38BDF8]">
                Student Safety & Integrity
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              Security Alerts
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Identifies unusual activity requiring faculty attention
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            02 Requiring Review
          </span>
        </div>

        {/* Attention Summary Cards (3 simple cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4.5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs text-gray-500 dark:text-gray-400">Total Alerts Today</span>
            <div className="text-2xl font-black text-gray-900 dark:text-white font-mono mt-1">03</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Low rate across all halls</span>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs text-gray-500 dark:text-gray-400">Pending Review</span>
            <div className="text-2xl font-black text-[#B91C3C] font-mono mt-1">02</div>
            <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Quick action recommended</span>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs">
            <span className="text-xs text-gray-500 dark:text-gray-400">Resolved Today</span>
            <div className="text-2xl font-black text-emerald-600 font-mono mt-1">01</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Cleared as normal activity</span>
          </div>
        </div>

        {/* Alerts Cards List (Maximum 3 sample records per Rule 4, 13) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Recent Alerts (3)
            </h2>
            <span className="text-xs text-gray-500">Click review to inspect</span>
          </div>

          <div className="space-y-3">
            {filteredAlerts.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status.includes('Review') || item.status.includes('Invest')
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}>
                      {item.status.includes('Review') ? 'Needs Review' : item.status.includes('Cleared') ? 'Safe / Cleared' : 'Under Review'}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Flagged at {item.flaggedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {item.candidateName} <span className="text-xs font-normal text-gray-500">({item.rollNumber})</span>
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    <strong>Issue:</strong> {item.category} • {item.centreId}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedAlert(item);
                      setEvidenceModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#B91C3C] hover:bg-[#8E1B1B] text-white transition-all cursor-pointer shadow-xs"
                  >
                    Review Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EVIDENCE DOSSIER MODAL */}
        {evidenceModalOpen && selectedAlert && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full border border-gray-200 shadow-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-[#C62828] flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Forensic Evidence Dossier</h3>
                    <p className="text-xs text-gray-500 font-mono">{selectedAlert.id} • {selectedAlert.candidateName} ({selectedAlert.rollNumber})</p>
                  </div>
                </div>

                <button 
                  onClick={() => setEvidenceModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Flagged Pattern:</span>
                    <span className="font-bold text-[#C62828]">{selectedAlert.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Telemetry Confidence Score:</span>
                    <span className="font-mono font-bold text-gray-900">{selectedAlert.confidenceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Assessment Centre:</span>
                    <span className="font-medium text-gray-800">{selectedAlert.centreId}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Chronological Evidence Points:
                  </h4>
                  <ul className="space-y-2">
                    {selectedAlert.evidenceDetails.map((evidence, idx) => (
                      <li key={idx} className="p-3 rounded-lg bg-red-50/50 border border-red-100 text-gray-800 flex items-start gap-2">
                        <span className="font-mono text-[#C62828] font-bold mt-0.5">•</span>
                        <span>{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedAlert.reviewRemarks && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                    <span className="font-bold block">Official Review Record:</span>
                    <p>{selectedAlert.reviewRemarks}</p>
                    <span className="text-[10px] text-emerald-700 font-mono">Reviewed by: {selectedAlert.reviewedBy}</span>
                  </div>
                )}
              </div>

              {/* Official Review Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setEvidenceModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>

                <button
                  onClick={() => handleReviewAction(selectedAlert.id, 'Cleared (Legitimate)', 'Investigated and verified as normal network telemetry variance during failover. No malpractice.')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Clear as Legitimate</span>
                </button>

                <button
                  onClick={() => handleReviewAction(selectedAlert.id, 'Sanction Recommended', 'Evidence confirms non-human answer velocity and unauthorized clipboard paste. Disciplinary action initiated.')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white cursor-pointer flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Recommend Sanction</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
