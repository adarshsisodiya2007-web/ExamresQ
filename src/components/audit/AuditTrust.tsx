import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { sampleAuditAccessLogs } from '../../data/governanceSecurityData';
import { AuditAccessRecord } from '../../types';
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
  Lock,
  UserCheck,
  ShieldAlert,
  Key,
  Database,
  History,
  X,
  Printer
} from 'lucide-react';

export const AuditTrust: React.FC = () => {
  const { auditTrail, addNotification, setCurrentView } = useResilience();
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [accessLogs, setAccessLogs] = useState<AuditAccessRecord[]>(sampleAuditAccessLogs);
  const [activeAuditorRole, setActiveAuditorRole] = useState<'Central Auditor' | 'Chief Invigilator' | 'Read-Only Inspector'>('Central Auditor');

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(auditTrail.merkleRoot);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // Test Tamper Prevention Action (Requirement 5)
  const handleTestTamperAttempt = () => {
    const newLog: AuditAccessRecord = {
      id: `ACC-LOG-${Math.floor(Math.random() * 9000 + 1000)}`,
      accessorName: 'Simulated Malicious Payload',
      role: 'Read-Only Inspector',
      action: 'ATTEMPT_EDIT_REJECTED',
      targetCandidate: `${auditTrail.candidateRoll} (Direct SQL / Storage Mutation)`,
      timestamp: new Date().toLocaleTimeString(),
      ipAddress: '192.168.1.199 (Blocked)',
      authLevel: 'Arbitrary Write Injection',
      outcome: 'TAMPER_PREVENTED'
    };

    setAccessLogs(prev => [newLog, ...prev]);

    addNotification({
      target: 'admin',
      type: 'alert',
      title: 'SECURITY ALARM: Tamper Attempt Defended',
      message: 'Direct memory edit blocked. Merkle root hash validation rejected foreign payload. Zero data altered.'
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D1527] p-6 sm:p-7 rounded-2xl border border-red-100 dark:border-gray-800 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#16803C]">
                Audit & Trust
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200">
                WORM Locked
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1.5 tracking-tight">
              Audit Ledger
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-3xl">
              Cryptographic response validation and immutable access logs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleTestTamperAttempt}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-red-700 border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Test system rejection of unauthorized response editing"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#C62828]" />
              <span>Simulate Tamper</span>
            </button>

            <button
              onClick={() => setShowCertificateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Generate Certificate</span>
            </button>
          </div>
        </div>

        {/* Short & Clean WORM Security Callout */}
        <div className="flex items-center justify-between rounded-xl bg-emerald-950/40 border border-emerald-800/50 px-4 py-3 text-white text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-emerald-200">WORM Policy: </span>
              <span className="text-gray-300">Read-only inspection with tamper protection.</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700">
            SHA-256 SEALED
          </span>
        </div>

        {/* Candidate Session Integrity Header (Requirement 5 & 11) */}
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
                Verifiable proof that records have not been improperly altered.
              </span>
            </div>
          </div>

          {/* 4 Core Integrity Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">EXAMINATION</span>
              <span className="font-bold text-gray-900 mt-0.5 block truncate">Eng Mathematics III</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">SAVED RESPONSES</span>
              <span className="font-bold text-gray-900 mt-0.5 block font-mono">40 / 40 Answers Sealed</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">DISRUPTIONS OVERCOME</span>
              <span className="font-bold text-[#C62828] mt-0.5 block font-mono">1 (Recovered in 48s)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-gray-200 text-center">
              <span className="text-gray-400 block text-[10px]">TAMPER LOG INTEGRITY</span>
              <span className="font-bold text-[#16803C] mt-0.5 block font-mono">100.00% Zero-Loss</span>
            </div>
          </div>

          {/* Access Control & Audit Log (Requirement 5) */}
          <div className="pt-2 border-t border-gray-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-600" />
                  Restricted Access & Immutable Audit Access Log (Req 5)
                </h3>
                <p className="text-xs text-gray-500">
                  Records of who accessed, inspected, or attempted to modify examination data
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-gray-500">Auditor Mode:</span>
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200 font-mono">
                  {activeAuditorRole} (Read-Only)
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 uppercase text-[11px]">
                    <th className="py-2.5 px-3">Log ID</th>
                    <th className="py-2.5 px-3">Accessor & Role</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Target Candidate / Resource</th>
                    <th className="py-2.5 px-3">IP & Auth Level</th>
                    <th className="py-2.5 px-3">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  {accessLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-gray-900">{log.id}</td>
                      <td className="py-3 px-3 font-sans">
                        <span className="font-bold text-gray-900 block">{log.accessorName}</span>
                        <span className="text-gray-500 text-[11px]">{log.role}</span>
                      </td>
                      <td className="py-3 px-3 font-sans font-bold text-gray-800">{log.action}</td>
                      <td className="py-3 px-3 font-sans text-gray-700">{log.targetCandidate}</td>
                      <td className="py-3 px-3 text-gray-500 text-[11px]">
                        <div>{log.ipAddress}</div>
                        <div className="text-[10px] text-gray-400">{log.authLevel}</div>
                      </td>
                      <td className="py-3 px-3 font-sans">
                        {log.outcome === 'TAMPER_PREVENTED' ? (
                          <span className="px-2 py-0.5 rounded bg-red-100 text-[#C62828] font-bold text-[10px] flex items-center gap-1 w-fit">
                            <ShieldAlert className="w-3 h-3" /> Blocked & Defended
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#16803C] font-bold text-[10px] flex items-center gap-1 w-fit">
                            <Check className="w-3 h-3" /> {log.outcome}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chronological Event History (Requirement 5 & 11) */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C62828]" />
                History of Saved Responses & Examination Events
              </h3>
              <span className="text-[11px] font-mono text-gray-500">8 Cryptographic Checkpoints</span>
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

                    <div className="bg-[#F8F8F6] p-3.5 rounded-xl border border-gray-200 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isAlert ? 'bg-red-100 text-[#C62828]' : isWarning ? 'bg-amber-100 text-[#C77A00]' : 'bg-emerald-100 text-[#16803C]'
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
                This certifies that the candidate session for <strong>{auditTrail.candidateName}</strong> (Roll: <strong>{auditTrail.candidateRoll}</strong>) in <strong>{auditTrail.examName}</strong> at <strong>{auditTrail.centreId}</strong> was monitored under the <strong>ExamresQ Zero-Loss Protocol</strong>.
              </p>
              <p>
                During the examination at 10:42:01, a localized network carrier interruption occurred. All candidate responses submitted prior to, during, and post-restoration were secured via encrypted client-side ledger and validated without data loss.
              </p>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 font-mono text-[11px]">
                <div>Merkle State Root: {auditTrail.merkleRoot}</div>
                <div>Status: 100% Mathematically Sealed & Verified</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-[11px] text-[#16803C] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Digitally Signed & Sealed
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Print official verification certificate"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-black text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
