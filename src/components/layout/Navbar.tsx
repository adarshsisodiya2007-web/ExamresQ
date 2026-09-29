import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { NotificationCenter } from './NotificationCenter';
import { LifecycleDrawer } from './LifecycleDrawer';
import { 
  ShieldCheck, 
  Menu,
  ChevronRight,
  Lock,
  GraduationCap,
  Users,
  Sparkles
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

  const [lifecycleDrawerOpen, setLifecycleDrawerOpen] = useState(false);

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
        return 'Multi-Student Live Telemetry & Surveillance';
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
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0B0E]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-xs transition-colors duration-300">
        {/* Top Telemetry & Network Status Strip */}
        <div className="bg-[#050811] text-gray-300 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-[#151D2E]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
            <span className="font-bold text-white tracking-wide">ExamresQ Institutional Resilience</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="hidden sm:inline text-gray-400">Zero-Loss Online Assessment Protocol</span>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#38BDF8]">
              <Lock className="w-2.5 h-2.5" />
              SHA-256 Ledger
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Network Health Status Pill */}
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${
              networkStatus === 'connected'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                : networkStatus === 'interrupted'
                ? 'bg-red-950/80 text-red-300 border-red-800 animate-pulse'
                : 'bg-amber-950/80 text-amber-300 border-amber-800'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                networkStatus === 'connected' ? 'bg-[#16803C]' : networkStatus === 'interrupted' ? 'bg-[#C62828]' : 'bg-[#C77A00]'
              }`} />
              <span>{networkStatus === 'connected' ? '● Connected (16ms)' : '⚠ Offline Protected'}</span>
            </div>

            <NotificationCenter />
          </div>
        </div>

        {/* Main Header Row - Clean, Minimal, NO Desktop Menu Button, NO Giant Horizontal Bar */}
        <div className="px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          
          {/* Left: Mobile hamburger (only on mobile screens) + Active View Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile only toggle (hidden on desktop) */}
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors shrink-0"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}

            {/* Active Navigation Breadcrumb */}
            <div className="flex items-center gap-2 text-xs truncate">
              <span className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-mono text-[10px] shrink-0">
                Module
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="font-bold text-gray-900 dark:text-white sm:text-sm tracking-tight truncate">
                {getCurrentViewLabel()}
              </span>
            </div>
          </div>

          {/* Right: Small Lifecycle Drawer Trigger + Role Toggle & Security Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Small Area Trigger for 10-Phase Lifecycle (Right Side) */}
            <button
              onClick={() => setLifecycleDrawerOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-[#121B2B] hover:bg-gray-200 dark:hover:bg-[#1A263D] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1E2A42] text-xs font-mono transition-colors cursor-pointer"
              title="Open 10-Phase Lifecycle in right side panel"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
              <span className="hidden sm:inline">10-Phase Lifecycle</span>
            </button>

            {/* Direct Role Switcher (Student vs Officer) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-[#121B2B] border border-gray-200 dark:border-[#1E2A42]">
              <button
                onClick={() => setUserRole('student')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  userRole === 'student' 
                    ? 'bg-[#C62828] text-white shadow-xs' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                title="Switch to Student Exam Terminal"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                onClick={() => setUserRole('officer')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  userRole === 'officer' 
                    ? 'bg-[#0284C7] text-white shadow-xs' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                title="Switch to Officer Surveillance & Operations"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Officer</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-[#121B2B] border border-gray-200 dark:border-[#1E2A42] text-[11px] font-mono text-gray-600 dark:text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
              <span>WORM Verified</span>
            </div>
          </div>
        </div>
      </header>

      {/* Small Right-Side Floating Lifecycle Drawer */}
      <LifecycleDrawer 
        isOpen={lifecycleDrawerOpen} 
        onClose={() => setLifecycleDrawerOpen(false)} 
      />
    </>
  );
};
