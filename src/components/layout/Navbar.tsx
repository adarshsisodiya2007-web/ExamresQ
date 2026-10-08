import React, { useState } from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { useTheme } from '../../context/ThemeContext';
import { NotificationCenter } from './NotificationCenter';
import examresqLogo from '../../assets/examresq-logo.png';
import { 
  ShieldCheck, 
  Menu,
  ChevronRight,
  GraduationCap,
  Users,
  Sun,
  Moon,
  LogOut,
  Lock,
  PlayCircle,
  Eye,
  FileSpreadsheet,
  AlertTriangle,
  RotateCcw,
  FileCheck2,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { 
    userRole,
    setUserRole,
    currentView, 
    setCurrentView,
    networkStatus, 
    isOfficerAuthenticated,
    logoutOfficer,
    language,
    setLanguage
  } = useResilience();

  const { isDark, toggleDarkMode } = useTheme();
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const navigateToSection = (sectionId?: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDemo = (view: AppView, role: 'student' | 'officer') => {
    setUserRole(role);
    setCurrentView(view);
    setDemoMenuOpen(false);
  };

  // Human-centered demo labels
  const getCurrentViewLabel = () => {
    switch (currentView) {
      case 'landing':
        return 'Product Overview';
      case 'live_exam':
        return 'Candidate Exam Demo';
      case 'candidate_portal':
        return 'Candidate Portal Demo';
      case 'candidate_monitor':
        return 'Live Monitoring Demo';
      case 'operations':
        return 'Assessment Overview Demo';
      case 'early_detection':
        return 'Smart Detection Demo';
      case 'centres':
        return 'Exam Centres Overview';
      case 'incidents':
        return 'Incident Management Demo';
      case 'recovery':
        return 'Examination Recovery Demo';
      case 'audit':
        return 'Audit & Reports Demo';
      case 'suspicious_patterns':
        return 'Activity Alerts Demo';
      case 'reconciliation':
        return 'Response Verification Demo';
      case 'decision_support':
        return 'Supervisor Decision Demo';
      case 'reports':
        return 'Examination Reports Demo';
      case 'simulation_lab':
        return 'Outage Simulation Demo';
      case 'three_pillars':
        return '3 Breakthrough Pillars Demo';
      case 'settings':
        return 'System Settings';
      default:
        return 'ExamResQ';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-md border-b border-red-100 dark:border-[#151D2E] text-gray-900 dark:text-white shadow-xs transition-colors">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger + Active Module Breadcrumb / Home */}
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

          <div 
            onClick={() => navigateToSection()}
            className="flex items-center gap-2.5 text-xs truncate cursor-pointer group"
            title="Return to Product Overview"
          >
            <img 
              src={examresqLogo} 
              alt="ExamresQ Logo" 
              className="w-7 h-7 rounded-full object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform" 
            />
            <span className="font-mono text-[11px] uppercase font-black tracking-widest text-[#C62828] dark:text-[#38BDF8] shrink-0">
              ExamresQ
            </span>
            <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-600 shrink-0" />
            <span className="font-bold text-gray-900 dark:text-white sm:text-sm tracking-tight truncate">
              {getCurrentViewLabel()}
            </span>
          </div>
        </div>

        {/* Center: Non-Technical Story Navigation (Desktop) */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-gray-600 dark:text-gray-300">
          <button 
            onClick={() => navigateToSection()} 
            className={`hover:text-[#C62828] transition-colors cursor-pointer ${currentView === 'landing' ? 'text-[#C62828] font-bold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateToSection('problem')} 
            className="hover:text-[#C62828] transition-colors cursor-pointer"
          >
            Problem
          </button>
          <button 
            onClick={() => navigateToSection('solution')} 
            className="hover:text-[#C62828] transition-colors cursor-pointer"
          >
            Solution
          </button>
          <button 
            onClick={() => navigateToSection('features')} 
            className="hover:text-[#C62828] transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => navigateToSection('demo-experience')} 
            className="hover:text-[#C62828] transition-colors cursor-pointer"
          >
            Demo Flow
          </button>
          <button 
            onClick={() => navigateToSection('impact')} 
            className="hover:text-[#C62828] transition-colors cursor-pointer"
          >
            Impact
          </button>
        </nav>

        {/* Right: Quick Demo Selector + Language + Theme + Role + Status */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Quick Demo Hub Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#A81F1F] shadow-xs cursor-pointer transition-all"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explore Demos</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {demoMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#101524] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in"
                onMouseLeave={() => setDemoMenuOpen(false)}
              >
                <div className="px-3 py-1.5 font-mono text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Interactive Demos (Simulated)
                </div>
                
                <button
                  onClick={() => handleSelectDemo('live_exam', 'student')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#C62828]" />
                  <div>
                    <span className="font-bold block">01 Candidate Exam</span>
                    <span className="text-[10px] text-gray-500">Student interface with answer backup</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectDemo('candidate_monitor', 'officer')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#C62828]" />
                  <div>
                    <span className="font-bold block">02 Live Monitoring</span>
                    <span className="text-[10px] text-gray-500">Supervisor overview with demo data</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectDemo('early_detection', 'officer')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-amber-50 dark:hover:bg-amber-950/40 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="font-bold block">03 Smart Detection</span>
                    <span className="text-[10px] text-gray-500">Highlighting unusual activity</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectDemo('incidents', 'officer')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <div>
                    <span className="font-bold block">04 Incident Management</span>
                    <span className="text-[10px] text-gray-500">Orderly resolution tracking</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectDemo('recovery', 'officer')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-bold block">05 Examination Recovery</span>
                    <span className="text-[10px] text-gray-500">Compensatory time & resumption</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectDemo('audit', 'officer')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 text-[#16803C]" />
                  <div>
                    <span className="font-bold block">06 Audit & Reports</span>
                    <span className="text-[10px] text-gray-500">Verifiable examination proofs</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Bilingual Language Switcher (EN / हिन्दी) */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-red-200 dark:border-[#1E2A42] bg-red-50/60 dark:bg-[#0D1527] text-[#C62828] dark:text-[#38BDF8] hover:border-red-400 transition-colors cursor-pointer text-xs font-bold font-mono shadow-2xs"
            title="Switch Language / भाषा बदलें"
          >
            <span>🌐</span>
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-red-200 dark:border-[#1E2A42] bg-red-50/60 dark:bg-[#0D1527] text-gray-800 dark:text-gray-200 hover:border-red-400 transition-colors cursor-pointer text-xs font-semibold"
            title={isDark ? "Switch to Red & White Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme Mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-[#C62828] shrink-0" />
            )}
          </button>

          {/* Human-Centered Demo Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-[#16803C]" />
            <span>Demo Mode Active</span>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-red-50/40 dark:bg-[#0D1527] border border-red-200 dark:border-[#1E2A42]">
            <button
              onClick={() => setUserRole('student')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'student' 
                  ? 'bg-[#C62828] text-white shadow-xs' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Student View"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setUserRole('officer')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'officer' 
                  ? 'bg-[#C62828] dark:bg-[#0284C7] text-white shadow-xs' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Supervisor / Officer View"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Supervisor</span>
            </button>
          </div>

          <NotificationCenter />
        </div>
      </div>
    </header>
  );
};
