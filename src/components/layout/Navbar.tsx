import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { NotificationCenter } from './NotificationCenter';
import { 
  ShieldCheck, 
  Menu,
  ChevronRight,
  GraduationCap,
  Users
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { 
    userRole,
    setUserRole,
    currentView, 
    networkStatus
  } = useResilience();

  // Get human readable view name for breadcrumb
  const getCurrentViewLabel = () => {
    switch (currentView) {
      case 'landing':
        return 'Platform Architecture & Overview';
      case 'live_exam':
        return 'Live Examination Room (ENG-304)';
      case 'candidate_portal':
        return 'Candidate Assessment Portal';
      case 'candidate_monitor':
        return 'Multi-Student Live Telemetry';
      case 'operations':
        return 'Mission Control (Req 01)';
      case 'early_detection':
        return 'Early Detection & Risk Telemetry (Req 02)';
      case 'centres':
        return 'Centre Telemetry Monitoring (38 Labs)';
      case 'incidents':
        return 'Incident Management & Escalation (Req 03)';
      case 'recovery':
        return 'Disaster Recovery & Redundant Nodes (Req 04)';
      case 'audit':
        return userRole === 'student' ? 'My Cryptographic Submission Proof' : 'Tamper-Evident Storage & Audit Ledger (Req 05)';
      case 'suspicious_patterns':
        return 'Suspicious Pattern Forensic Review (Req 06)';
      case 'reconciliation':
        return 'Response Reconciliation & Verification (Req 07)';
      case 'decision_support':
        return 'Decision Support & Equivalence Framework (Req 09, 10)';
      case 'reports':
        return 'Post-Exam Evidence & Transparency Reports (Req 11)';
      case 'settings':
        return 'Governance & Security Settings';
      default:
        return 'ExamresQ Institutional Suite';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/95 backdrop-blur-md border-b border-[#151D2E] text-white shadow-md transition-colors">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger + Active Module Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2 text-xs truncate">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#38BDF8] shrink-0">
              ExamresQ
            </span>
            <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
            <span className="font-bold text-white sm:text-sm tracking-tight truncate">
              {getCurrentViewLabel()}
            </span>
          </div>
        </div>

        {/* Center: Real-Time Protocol Chip (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero-Loss SHA-256 Ledger</span>
        </div>

        {/* Right: Network Status + Role Switcher + Notification Bell */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Live Network Health Status Pill */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
            networkStatus === 'connected'
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
              : networkStatus === 'interrupted'
              ? 'bg-red-950/80 text-red-300 border-red-800 animate-pulse'
              : 'bg-amber-950/80 text-amber-300 border-amber-800'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              networkStatus === 'connected' ? 'bg-[#16803C]' : networkStatus === 'interrupted' ? 'bg-[#C62828]' : 'bg-[#C77A00]'
            }`} />
            <span className="hidden sm:inline">{networkStatus === 'connected' ? '● Connected (16ms)' : '⚠ Offline Buffer'}</span>
          </div>

          {/* Clean Role Switcher (Student vs Officer) */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[#0D1527] border border-[#1E2A42]">
            <button
              onClick={() => setUserRole('student')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'student' 
                  ? 'bg-[#C62828] text-white shadow-xs' 
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Switch to Student View"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setUserRole('officer')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'officer' 
                  ? 'bg-[#0284C7] text-white shadow-xs' 
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Switch to Officer Console"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Officer</span>
            </button>
          </div>

          <NotificationCenter />
        </div>
      </div>
    </header>
  );
};
