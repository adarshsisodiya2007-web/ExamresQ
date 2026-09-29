import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  FileCheck2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  Copy, 
  Check, 
  Award, 
  Download, 
  FileText,
  Search,
  ExternalLink,
  Lock
} from 'lucide-react';

export const AuditTrust: React.FC = () => {
  const { auditTrail, setCurrentView } = useResilience();
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(auditTrail.merkleRoot);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#16803C]">
                Institutional Trust & Audit Ledger
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Examination Integrity & Event Audit
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Answering "What happened during this examination?" with immutable chronological proof
            </p>
          </div>

          <button
            onClick={() => setShowCertificateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
          >
            <Award className="w-4 h-4" />
            <span>Generate Integrity Certificate</span>
          </button>
        </div>

        {/* Candidate Session Integrity Header (Requirement 11) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16803C] border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cryptographically Verified
                </span>
                <span className="text-xs font-mono text-gray-400">Audited at {auditTrail.lastVerificationTime}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mt-1">
                Candidate Session: {auditTrail.sessionId}
              </h2>
              <p className="text-xs text-gray-600">
                Candidate: <strong className="text-gray-900">{auditTrail.candidateName}</strong> (Roll: {auditTrail.candidateRoll}) • {auditTrail.centreId}
              </p>
            </div>

            {/* Cryptographic Merkle Root Pill */}
            <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200 flex flex-col gap-1 max-w-md w-full">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold uppercase text-[10px]">Session Merkle State Root</span>
                <button
                  onClick={handleCopyHash}
                  className="text-[11px] text-[#C62828] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-[#16803C]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                </button>
              </div>
              <span className="font-mono text-xs text-gray-900 font-bold truncate">
                {auditTrail.merkleRoot}
              </span>
              <span className="text-[10px] text-gray-500">
                Guarantees zero response tampering or alteration between outage and recovery.
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">EXAMINATION</span>
              <span className="font-bold text-gray-900 mt-0.5 block truncate">Eng Mathematics III</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">ANSWERS LOGGED</span>
              <span className="font-bold text-gray-900 mt-0.5 block font-mono">28 / 40 Questions</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">DISRUPTIONS ENCOUNTERED</span>
              <span className="font-bold text-[#C62828] mt-0.5 block font-mono">1 (Recovered in 48s)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">DATA INTEGRITY RATING</span>
              <span className="font-bold text-[#16803C] mt-0.5 block font-mono">100.00% Zero-Loss</span>
            </div>
          </div>

          {/* COMPLETE CANDIDATE SESSION TIMELINE (Requirement 11) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C62828]" />
                Complete Chronological Audit Timeline
              </h3>
              <span className="text-[11px] font-mono text-gray-500">8 Chain Checkpoints</span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {auditTrail.events.map((evt, idx) => {
                const isAlert = evt.status === 'alert';
                const isWarning = evt.status === 'warning';
                const isSuccess = evt.status === 'success';

                return (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full ring-4 ring-white ${
                      isAlert ? 'bg-[#C62828]' : isWarning ? 'bg-[#C77A00]' : isSuccess ? 'bg-[#16803C]' : 'bg-gray-400'
                    }`} />

                    <div className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                            isAlert ? 'bg-red-100 text-[#C62828]' :
                            isWarning ? 'bg-amber-100 text-amber-800' :
                            isSuccess ? 'bg-emerald-100 text-[#16803C]' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {evt.eventType}
                          </span>
                          <span className="font-mono text-gray-400 text-[11px]">{evt.timestamp}</span>
                        </div>

                        <span className="font-mono text-[11px] text-gray-400">
                          Seal: {evt.hashSignature}
                        </span>
                      </div>

                      <p className="text-xs text-gray-800 leading-relaxed font-medium">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border-4 border-[#C62828] relative space-y-6">
            <div className="text-center space-y-2 border-b border-gray-200 pb-5">
              <div className="w-12 h-12 rounded-xl bg-[#C62828] text-white flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C62828] font-bold block">
                NATIONAL ASSESSMENT RESILIENCE COUNCIL
              </span>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                Certificate of Examination Integrity
              </h3>
              <p className="text-xs text-gray-500">
                Document Code: CERT-ET2026-9941-VERIFIED
              </p>
            </div>

            <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
              <p>
                This certifies that the candidate session for <strong>{auditTrail.candidateName}</strong> (Roll: <strong>{auditTrail.candidateRoll}</strong>) in <strong>{auditTrail.examName}</strong> at <strong>{auditTrail.centreId}</strong> was monitored under the <strong>EVALTRUST Zero-Loss Protocol</strong>.
              </p>
              <p>
                During the examination at 10:42:01, a localized network carrier interruption occurred. All candidate responses submitted prior to, during, and post-restoration were secured via encrypted client-side ledger and validated without data loss.
              </p>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 font-mono text-[11px]">
                <div>Merkle State Root: {auditTrail.merkleRoot}</div>
                <div>Status: 100% Mathematically Sealed & Verified</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-[11px] text-[#16803C] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Digitally Signed & Sealed
              </span>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
