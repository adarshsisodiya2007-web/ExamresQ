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

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C62828]">
                Behavior Monitoring
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#C62828] border border-red-200">
                Evidence-Based
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1.5 tracking-tight">
              Suspicious Patterns
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-3xl">
              Anomaly detection and evidence-based review queue.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
              {alerts.filter(a => a.status === 'Flagged for Review' || a.status === 'Under Investigation').length} Pending Action
            </span>
          </div>
        </div>

        {/* 4 Pillars of Pattern Detection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#C62828]">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Pattern Telemetry</h4>
            <p className="text-xs text-gray-500">
              Sub-cognitive bursts and irregular cadence.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Fingerprint className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Session Integrity</h4>
            <p className="text-xs text-gray-500">
              Concurrent logins and network hops.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Review Queue</h4>
            <p className="text-xs text-gray-500">
              Official supervisor evidence sign-off.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#16803C]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase text-gray-900">Zero False Accusations</h4>
            <p className="text-xs text-gray-500">
              Distinguishes legitimate network failover IP shifts from malicious proxy spoofing with cryptographic proof.
            </p>
          </div>
        </div>

        {/* Review Queue Table */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-black text-gray-900">
                Official Examination Official Review Queue
              </h3>
              <p className="text-xs text-gray-500">
                Evidence-backed alerts awaiting verification by Central Examination Authorities
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 cursor-pointer"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 uppercase text-[11px]">
                  <th className="py-2.5 px-3">Alert Code</th>
                  <th className="py-2.5 px-3">Candidate / Centre</th>
                  <th className="py-2.5 px-3">Suspicious Pattern Category</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Review Status</th>
                  <th className="py-2.5 px-3 text-right">Official Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono">
                {filteredAlerts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-gray-900">{item.id}</td>
                    <td className="py-3.5 px-3 font-sans">
                      <span className="font-bold text-gray-900 block">{item.candidateName}</span>
                      <span className="text-gray-500 text-[11px] font-mono">{item.rollNumber} • {item.centreId}</span>
                    </td>
                    <td className="py-3.5 px-3 font-sans">
                      <span className="font-bold text-[#C62828] block">{item.category}</span>
                      <span className="text-[11px] text-gray-500">Flagged at {item.flaggedAt}</span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-gray-800">{item.confidenceScore}% AI Confidence</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-sans ${
                        item.severity === 'Critical' ? 'bg-red-100 text-[#C62828]' :
                        item.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        item.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-sans">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Cleared (Legitimate)' ? 'bg-emerald-50 text-[#16803C] border border-emerald-200' :
                        item.status === 'Sanction Recommended' ? 'bg-red-50 text-[#C62828] border border-red-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedAlert(item);
                          setEvidenceModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Evidence</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
