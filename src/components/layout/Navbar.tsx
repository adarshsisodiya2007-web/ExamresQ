import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { useTheme } from '../../context/ThemeContext';
import { NotificationCenter } from './NotificationCenter';
import { 
  ShieldCheck, 
  Menu,
  ChevronRight,
  GraduationCap,
  Users,
  Sun,
  Moon,
  LogOut,
  Lock
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { 
    userRole,
    setUserRole,
    currentView, 
    networkStatus,
    isOfficerAuthenticated,
    logoutOfficer
  } = useResilience();

  const { isDark, toggleDarkMode } = useTheme();

  // Concise view names for clean UI
  const getCurrentViewLabel = () => {
    switch (currentView) {
      case 'landing':
        return 'Platform Architecture';
      case 'live_exam':
        return 'Live Exam Terminal';
      case 'candidate_portal':
        return 'Candidate Portal';
      case 'candidate_monitor':
        return 'Live Student Monitor';
      case 'operations':
        return 'Operations Center';
      case 'early_detection':
        return 'Early Detection';
      case 'centres':
        return 'Centre Monitoring';
      case 'incidents':
        return 'Incident Center';
      case 'recovery':
        return 'Disaster Recovery';
      case 'audit':
        return userRole === 'student' ? 'My Submission Proof' : 'Audit Ledger';
      case 'suspicious_patterns':
        return 'Suspicious Patterns';
      case 'reconciliation':
        return 'Response Reconciliation';
      case 'decision_support':
        return 'Decision Support';
      case 'reports':
        return 'Evidence Reports';
      case 'settings':
        return 'Governance Settings';
      default:
        return 'ExamresQ Suite';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#151D2E] text-gray-900 dark:text-white shadow-xs transition-colors">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger + Active Module Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2 text-xs truncate">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#0284C7] dark:text-[#38BDF8] shrink-0">
              ExamresQ
            </span>
            <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-600 shrink-0" />
            <span className="font-bold text-gray-900 dark:text-white sm:text-sm tracking-tight truncate">
              {getCurrentViewLabel()}
            </span>
          </div>
        </div>

        {/* Center: Real-Time Protocol Chip (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[11px] font-mono text-gray-700 dark:text-gray-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Zero-Loss SHA-256 Ledger</span>
        </div>

        {/* Right: Network Status + Light/Dark Switch + Role Switcher + Notification Bell */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-xl border border-gray-200 dark:border-[#1E2A42] bg-gray-100 dark:bg-[#0D1527] text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Live Network Health Status Pill */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
            networkStatus === 'connected'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
              : networkStatus === 'interrupted'
              ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800 animate-pulse'
              : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              networkStatus === 'connected' ? 'bg-[#16803C]' : networkStatus === 'interrupted' ? 'bg-[#C62828]' : 'bg-[#C77A00]'
            }`} />
            <span className="hidden sm:inline">{networkStatus === 'connected' ? '● Online (14ms)' : '⚠ Offline Buffer'}</span>
          </div>

          {/* Role Switcher (Student vs Officer with Guard) */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-gray-100 dark:bg-[#0D1527] border border-gray-200 dark:border-[#1E2A42]">
            <button
              onClick={() => setUserRole('student')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'student' 
                  ? 'bg-[#C62828] text-white shadow-xs' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Student Examination View"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setUserRole('officer')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'officer' 
                  ? 'bg-[#0284C7] text-white shadow-xs' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title={isOfficerAuthenticated ? "Officer Surveillance Console" : "Officer Login Required"}
            >
              {isOfficerAuthenticated ? <Users className="w-3.5 h-3.5" /> : <Lock className="w-3 h-3 text-amber-500" />}
              <span>Officer</span>
            </button>
          </div>

          {/* If Officer is logged in, show quick sign-out in navbar */}
          {userRole === 'officer' && isOfficerAuthenticated && (
            <button
              onClick={logoutOfficer}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono font-bold bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
              title="Sign Out of Officer Console"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden lg:inline">Sign Out</span>
            </button>
          )}

          <NotificationCenter />
        </div>
      </div>
    </header>
  );
};
