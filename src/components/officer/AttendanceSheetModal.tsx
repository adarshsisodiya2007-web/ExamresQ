import React from 'react';
import examresqLogo from '../../assets/examresq-logo.png';
import { ActiveCandidateSession } from '../../types';
import { useResilience } from '../../context/ResilienceContext';
import { 
  Printer, 
  X, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  FileText, 
  ShieldCheck, 
  Building, 
  Clock,
  Download
} from 'lucide-react';

interface AttendanceSheetModalProps {
  candidates?: ActiveCandidateSession[];
  isOpen: boolean;
  onClose: () => void;
  attendanceData?: Record<string, { present: boolean; aadharVerified: boolean; photoVerified: boolean; roughSheetIssued: boolean }>;
  onToggleAttendance?: (candId: string, field: 'present' | 'aadharVerified' | 'photoVerified' | 'roughSheetIssued') => void;
}

export const AttendanceSheetModal: React.FC<AttendanceSheetModalProps> = ({
  candidates: propCandidates,
  isOpen,
  onClose,
  attendanceData: propAttendanceData,
  onToggleAttendance: propOnToggleAttendance
}) => {
  const { activeCandidates, candidateAttendance, updateCandidateAttendance } = useResilience();

  if (!isOpen) return null;

  const candidates = propCandidates || activeCandidates;
  const attendanceData = propAttendanceData || candidateAttendance;
  const onToggleAttendance = propOnToggleAttendance || updateCandidateAttendance;

  const handlePrint = () => {
    window.print();
  };

  const totalCount = candidates.length;
  const presentCount = candidates.filter(c => attendanceData[c.id]?.present ?? true).length;
  const absentCount = totalCount - presentCount;

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 backdrop-blur-md bg-black/75 animate-in fade-in select-none">
      <div className="relative w-full max-w-4xl bg-white text-gray-900 rounded-3xl border-2 border-[#C62828] shadow-2xl p-6 sm:p-8 space-y-5 overflow-hidden max-h-[90vh] flex flex-col print:border-none print:shadow-none print:p-0">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl p-1 border border-red-200 bg-red-50 flex items-center justify-center shrink-0">
              <img src={examresqLogo} alt="ExamresQ Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C62828] font-black px-2 py-0.5 rounded-full bg-red-50 border border-red-200">
                Centre Invigilator Record
              </span>
              <h1 className="text-xl font-black text-gray-900 tracking-tight mt-0.5">
                Official Examination Attendance Roll Sheet
              </h1>
              <p className="text-xs text-gray-500 font-mono">
                आधिकारिक उपस्थिति पत्रक • Centre 08 (North Academic Complex)
              </p>
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-md transition-colors cursor-pointer print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Print Attendance Sheet</span>
          </button>
        </div>

        {/* Summary Metric Strip */}
        <div className="grid grid-cols-3 gap-3 shrink-0 font-mono text-center">
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase">Total Candidates</span>
            <p className="text-lg font-black text-gray-900">{totalCount}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] text-emerald-700 uppercase">Total Present</span>
            <p className="text-lg font-black text-emerald-600">{presentCount}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
            <span className="text-[10px] text-red-700 uppercase">Total Absent</span>
            <p className="text-lg font-black text-red-600">{absentCount}</p>
          </div>
        </div>

        {/* Candidates Attendance Table */}
        <div className="flex-1 overflow-y-auto border rounded-2xl border-gray-200">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-red-50/60 sticky top-0 border-b border-red-100 text-gray-700 text-[11px] font-bold">
              <tr>
                <th className="p-3">Candidate / Roll No</th>
                <th className="p-3">Station Node</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aadhaar Check</th>
                <th className="p-3">Photo Match</th>
                <th className="p-3">Rough Paper</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {candidates.map((cand) => {
                const rec = attendanceData[cand.id] || {
                  present: true,
                  aadharVerified: true,
                  photoVerified: true,
                  roughSheetIssued: true
                };

                return (
                  <tr key={cand.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Name & Roll */}
                    <td className="p-3">
                      <div className="font-bold text-gray-900 font-sans text-xs">
                        {cand.name} {cand.isSelf && <span className="text-[9px] text-[#C62828] font-mono">(Local Station)</span>}
                      </div>
                      <div className="text-[10px] text-gray-400">{cand.rollNo}</div>
                    </td>

                    {/* Station */}
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded font-bold bg-gray-100 text-gray-800 border border-gray-200 text-[10px]">
                        {cand.stationId}
                      </span>
                    </td>

                    {/* Present / Absent Toggle */}
                    <td className="p-3">
                      <button
                        onClick={() => onToggleAttendance(cand.id, 'present')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          rec.present 
                            ? 'bg-emerald-600 text-white shadow-2xs' 
                            : 'bg-red-600 text-white shadow-2xs'
                        }`}
                      >
                        {rec.present ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Present</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Absent</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Aadhaar Checkbox */}
                    <td className="p-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rec.aadharVerified}
                          onChange={() => onToggleAttendance(cand.id, 'aadharVerified')}
                          className="w-3.5 h-3.5 accent-[#C62828] rounded cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-600">Verified</span>
                      </label>
                    </td>

                    {/* Photo Match Checkbox */}
                    <td className="p-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rec.photoVerified}
                          onChange={() => onToggleAttendance(cand.id, 'photoVerified')}
                          className="w-3.5 h-3.5 accent-[#C62828] rounded cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-600">Matched</span>
                      </label>
                    </td>

                    {/* Rough Sheet Checkbox */}
                    <td className="p-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rec.roughSheetIssued}
                          onChange={() => onToggleAttendance(cand.id, 'roughSheetIssued')}
                          className="w-3.5 h-3.5 accent-[#C62828] rounded cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-600">Issued</span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer & Signature Section for Printing */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 text-xs text-gray-500 font-mono shrink-0">
          <div className="space-y-0.5 text-center sm:text-left">
            <p>Invigilator in Charge: <strong>Inspector V. Malhotra (OFF-9042)</strong></p>
            <p className="text-[10px] text-gray-400">Date: {new Date().toLocaleDateString()} • Verified 100% Genuine Candidate Presence</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="border-b-2 border-gray-400 w-36 text-center text-[10px] text-gray-400 pb-1">
              (Room Invigilator Signature)
            </div>
            <button
              onClick={handlePrint}
              className="sm:hidden px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white print:hidden"
            >
              Print
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
