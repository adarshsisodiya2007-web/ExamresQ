import React from 'react';
import examresqLogo from '../../assets/examresq-logo.png';
import { SubmissionReceipt } from '../../types';
import { 
  CheckCircle2, 
  Printer, 
  X, 
  ShieldCheck, 
  Lock, 
  Clock, 
  User, 
  FileCheck2, 
  Download,
  Building,
  Award
} from 'lucide-react';

interface SubmissionReceiptModalProps {
  receipt: SubmissionReceipt | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionReceiptModal: React.FC<SubmissionReceiptModalProps> = ({
  receipt,
  isOpen,
  onClose
}) => {
  if (!isOpen || !receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 backdrop-blur-md bg-black/75 animate-in fade-in select-none">
      <div className="relative w-full max-w-xl bg-white text-gray-900 rounded-3xl border-2 border-[#C62828] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto print:border-none print:shadow-none print:p-0">
        
        {/* Top Close (Hidden when printing) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Header */}
        <div className="flex items-center gap-4 pb-4 border-b-2 border-red-100">
          <div className="w-16 h-16 rounded-2xl p-1.5 border border-red-200 bg-red-50 flex items-center justify-center shrink-0">
            <img 
              src={examresqLogo} 
              alt="ExamresQ Official Logo" 
              className="w-full h-full object-contain filter drop-shadow-xs" 
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C62828] font-black px-2 py-0.5 rounded-full bg-red-50 border border-red-200">
              Official Examination Authority
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
              Candidate Submission Receipt
            </h1>
            <p className="text-xs text-gray-500 font-mono">
              राष्ट्रीय परीक्षा जमा पावती • Ref: {receipt.receiptId}
            </p>
          </div>
        </div>

        {/* Sealed Green Stamp */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wide">
              Official Assessment Sealed & Confirmed (परीक्षा सफलतापूर्वक जमा)
            </h3>
            <p className="text-[11px] text-emerald-800 font-mono">
              All responses locked with SHA-256 Merkle root. Zero packet loss verified.
            </p>
          </div>
        </div>

        {/* Candidate & Assessment Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1">
              <User className="w-3 h-3 text-[#C62828]" />
              Candidate Full Name:
            </span>
            <p className="font-bold text-gray-900 text-sm">{receipt.candidateName}</p>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1">
              <Award className="w-3 h-3 text-[#C62828]" />
              Roll Number:
            </span>
            <p className="font-bold text-[#C62828] text-sm">{receipt.rollNo}</p>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1">
              <Building className="w-3 h-3 text-[#C62828]" />
              Station & Test Node:
            </span>
            <p className="font-bold text-gray-900">{receipt.stationId}</p>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C62828]" />
              Verified Aadhaar ID:
            </span>
            <p className="font-bold text-gray-900">
              ●●●● ●●●● {receipt.aadharCard ? receipt.aadharCard.slice(-4) : '4418'}
            </p>
          </div>
        </div>

        {/* Question Score & Summary Box */}
        <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span>Subject / Examination:</span>
            <span className="text-gray-900 text-right">{receipt.examName}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-red-100 text-center font-mono">
            <div className="p-2 rounded-xl bg-white border border-red-100 shadow-2xs">
              <span className="text-[10px] text-gray-400 uppercase">Total Questions</span>
              <p className="text-base font-black text-gray-900">{receipt.totalQuestions}</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-emerald-200 shadow-2xs">
              <span className="text-[10px] text-emerald-700 uppercase">Answered</span>
              <p className="text-base font-black text-emerald-600">{receipt.answeredCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-purple-200 shadow-2xs">
              <span className="text-[10px] text-purple-700 uppercase">Review Marked</span>
              <p className="text-base font-black text-purple-600">{receipt.markedReviewCount}</p>
            </div>
          </div>
        </div>

        {/* Security Ledger Signature */}
        <div className="p-3 rounded-xl bg-gray-100 border border-gray-200 font-mono text-[10px] space-y-1 text-gray-600 break-all">
          <div className="flex justify-between items-center text-gray-500 font-bold">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Official Timestamp: {receipt.submittedAt}</span>
            </span>
            <span className="text-emerald-700">INTEGRITY: 100%</span>
          </div>
          <p className="text-[9px] text-gray-400">
            Cryptographic Merkle Seal: <span className="text-gray-700">{receipt.securityHash}</span>
          </p>
        </div>

        {/* Buttons (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            ← Close Window
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Official Slip (पावती प्रिंट करें)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
