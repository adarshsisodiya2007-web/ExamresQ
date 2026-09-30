import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Zap, 
  UserCheck, 
  AlertCircle,
  Building,
  X
} from 'lucide-react';
import examresqLogo from '../../assets/examresq-logo.png';

export const OfficerLoginModal: React.FC = () => {
  const { 
    isOfficerLoginOpen, 
    setIsOfficerLoginOpen, 
    loginOfficer 
  } = useResilience();

  const [officerId, setOfficerId] = useState('OFF-9042');
  const [securityPin, setSecurityPin] = useState('resq2026');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOfficerLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim() || !securityPin.trim()) {
      setErrorMsg('Please enter both Officer ID and Security Passcode.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');
    setTimeout(() => {
      loginOfficer(officerId, securityPin);
      setIsVerifying(false);
    }, 600);
  };

  const handleQuickDemo = () => {
    setIsVerifying(true);
    setErrorMsg('');
    setTimeout(() => {
      loginOfficer('OFF-9042', 'resq2026');
      setIsVerifying(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-[#0B0F19] text-white border border-[#1E293B] shadow-2xl overflow-hidden relative">
        
        {/* Top glowing bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-[#0284C7] via-[#38BDF8] to-[#16803C]" />

        {/* Close Button */}
        <button
          onClick={() => setIsOfficerLoginOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Close and return to Student Mode"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header with Official Logo */}
          <div className="flex items-center gap-3.5">
            <img 
              src={examresqLogo} 
              alt="ExamresQ Logo" 
              className="w-12 h-12 rounded-full object-contain shrink-0 drop-shadow-md" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#38BDF8] font-bold">
                  LEVEL 4 CLEARANCE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Officer Terminal Access
              </h2>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Candidate exams require no login. Surveillance, real-time telemetry, and incident intervention tools require authorized invigilator credentials.
          </p>

          {/* Quick Demo Login Pill */}
          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={isVerifying}
            className="w-full py-2.5 px-3 rounded-xl bg-[#0284C7]/10 hover:bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
          >
            <Zap className="w-4 h-4 fill-[#38BDF8]" />
            <span>⚡ Quick 1-Click Officer Sign In (Demo Mode)</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-800 w-full" />
            <span className="bg-[#0B0F19] px-3 text-[10px] uppercase font-mono text-gray-400 tracking-wider">
              Or Manual Authorization
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">
                Officer Badge / ID
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#131B2E] border border-[#1E293B] text-white text-xs font-mono focus:outline-hidden focus:border-[#0284C7] transition-colors"
                  placeholder="e.g. OFF-9042"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">
                Security Clearance Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#131B2E] border border-[#1E293B] text-white text-xs font-mono focus:outline-hidden focus:border-[#0284C7] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#050811] border border-[#162033] flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Station: Alpha Surveillance Deck</span>
              </span>
              <span className="text-emerald-400 font-bold">SHA-256</span>
            </div>

            {errorMsg && (
              <div className="p-2 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOfficerLoginOpen(false)}
                className="w-1/3 py-2 px-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5 text-xs font-bold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isVerifying}
                className="w-2/3 py-2 px-3 rounded-xl bg-[#0284C7] hover:bg-sky-600 text-white text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#0284C7]/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isVerifying ? 'Decrypting Console...' : 'Sign In as Officer'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
