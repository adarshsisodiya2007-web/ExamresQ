import React, { useState } from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { useTheme } from '../../context/ThemeContext';
import { NotificationCenter } from './NotificationCenter';
import { LifecycleBar } from './LifecycleBar';
import { HackathonModal } from './HackathonModal';
import { 
  ShieldCheck, 
  Activity, 
  Layers, 
  Building2, 
  AlertOctagon, 
  RotateCcw, 
  FileCheck2, 
  BarChart3, 
  Settings as SettingsIcon,
  PlayCircle,
  Wifi,
  WifiOff,
  Menu,
  X,
  FileSpreadsheet,
  Sparkles,
  ChevronDown,
  Globe,
  User,
  Sliders,
  HelpCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    networkStatus, 
    triggerNetworkInterruption, 
    restoreNetwork, 
    startDemo 
  } = useResilience();

  const { activeTheme, setIsThemeDrawerOpen } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [operationsDropdownOpen, setOperationsDropdownOpen] = useState(false);
  const [hackathonModalOpen, setHackathonModalOpen] = useState(false);

  // Grouped Navigation by systematic domain
  const operationsViews: { id: AppView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'operations', label: 'Operations Dashboard', icon: <Activity className="w-4 h-4" /> },
    { id: 'centres', label: 'Centre Monitoring (38)', icon: <Building2 className="w-4 h-4" />, badge: '38 Online' },
    { id: 'incidents', label: 'Incident Center', icon: <AlertOctagon className="w-4 h-4" />, badge: '1 Active' },
    { id: 'recovery', label: 'Recovery & Failover', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'audit', label: 'Cryptographic Audit', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'reports', label: 'Analytical Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: 'Governance Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const isOperationsActive = operationsViews.some(v => v.id === currentView);

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setOperationsDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0B0E]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-xs transition-colors duration-300">
        {/* Top Institutional Notification Bar */}
        <div className="bg-[#171717] dark:bg-[#050608] text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16803C] animate-pulse"></span>
            <span className="font-bold text-gray-200">EVALTRUST Institutional Ecosystem</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="hidden sm:inline text-gray-400">Zero-Loss Online Assessment Architecture</span>
            <span className="hidden md:inline px-2 py-0.2 rounded bg-white/10 text-[10px] font-mono text-gray-300">
              SHA-256 + Merkle State Tree
            </span>
          </div>

          {/* Quick Simulation & Demo Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-all shadow-xs cursor-pointer"
                title="Test real-time candidate protection and edge failover"
              >
                <WifiOff className="w-3 h-3" />
                <span>Simulate Interruption</span>
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#16803C] hover:bg-emerald-700 text-white transition-all shadow-xs cursor-pointer animate-pulse"
                title="Re-establish uplink and initiate delta synchronization"
              >
                <Wifi className="w-3 h-3" />
                <span>Restore Network & Sync</span>
              </button>
            )}

            <button
              onClick={() => setHackathonModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828]/20 hover:bg-[#C62828]/30 text-red-200 border border-red-500/40 transition-all cursor-pointer"
              title="View Problem Statement, 7 Challenges, 5 Pillars & Policy Alignment"
            >
              <HelpCircle className="w-3 h-3 text-[#E53935]" />
              <span>Problem Statement & Architecture</span>
            </button>

            <button
              onClick={startDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              <PlayCircle className="w-3 h-3 text-[#E53935]" />
              <span>Resilience Demo</span>
            </button>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E53935] to-[#C62828] flex items-center justify-center text-white shadow-md shadow-[#C62828]/25 group-hover:scale-105 transition-all">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-[#171717] dark:text-white">
                    EVAL<span className="text-[#C62828]">TRUST</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-50 dark:bg-red-950/60 text-[#C62828] border border-red-200 dark:border-red-900/60 font-mono">
                    2026
                  </span>
                </div>
                <p className="text-[11px] text-[#666666] dark:text-gray-400 tracking-tight leading-none hidden sm:block">
                  Resilient Online Assessment Ecosystem
                </p>
              </div>
            </div>

            {/* Systematic 3-Domain Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-gray-100/70 dark:bg-gray-900/70 p-1 rounded-2xl border border-gray-200/80 dark:border-gray-800">
              {/* Domain 1: Public Overview */}
              <button
                onClick={() => handleNavClick('landing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentView === 'landing'
                    ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              {/* Domain 2: Candidate Hub */}
              <button
                onClick={() => handleNavClick('candidate_portal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentView === 'candidate_portal'
                    ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Candidate Portal</span>
              </button>

              {/* Live Exam Room Direct Button */}
              <button
                onClick={() => handleNavClick('live_exam')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentView === 'live_exam'
                    ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#C62828]" />
                <span>Live Exam</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16803C] animate-pulse" />
              </button>

              {/* Domain 3: Operations & Governance Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOperationsDropdownOpen(!operationsDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isOperationsActive
                      ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Operations Suite</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {operationsDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setOperationsDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#13151D] border border-gray-200 dark:border-gray-800 shadow-2xl p-2 z-40 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100 dark:border-gray-800 mb-1">
                        Operations & Governance
                      </div>
                      {operationsViews.map(view => (
                        <button
                          key={view.id}
                          onClick={() => handleNavClick(view.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                            currentView === view.id
                              ? 'bg-red-50 dark:bg-red-950/40 text-[#C62828] font-bold'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={currentView === view.id ? 'text-[#C62828]' : 'text-gray-400'}>
                              {view.icon}
                            </span>
                            <span>{view.label}</span>
                          </div>
                          {view.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gray-100 dark:bg-gray-800 font-bold text-gray-600 dark:text-gray-400">
                              {view.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </nav>

            {/* Right Status, Theme, Notification Center & CTA */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Luxury Theme Selector */}
              <button
                onClick={() => setIsThemeDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 transition-all cursor-pointer shadow-xs"
                title="Change luxury aesthetic theme"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C62828]" />
                <span className="hidden xl:inline">{activeTheme.name}</span>
              </button>

              {/* Notification Center */}
              <NotificationCenter />

              {/* Status Pill */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                networkStatus === 'connected'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-[#16803C] border-emerald-200 dark:border-emerald-800'
                  : networkStatus === 'interrupted'
                  ? 'bg-red-50 dark:bg-red-950/60 text-[#C62828] border-red-200 dark:border-red-800 animate-pulse'
                  : 'bg-amber-50 dark:bg-amber-950/50 text-[#C77A00] border-amber-200 dark:border-amber-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  networkStatus === 'connected'
                    ? 'bg-[#16803C]'
                    : networkStatus === 'interrupted'
                    ? 'bg-[#C62828]'
                    : 'bg-[#C77A00] animate-ping'
                }`} />
                <span className="capitalize text-[11px]">
                  {networkStatus === 'connected' ? 'Mesh 18ms' : networkStatus === 'interrupted' ? 'Protected Offline' : 'Syncing Delta'}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleNavClick('live_exam')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-xs transition-colors cursor-pointer"
              >
                Enter Exam
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <NotificationCenter />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#13151D] border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-4 space-y-2 shadow-lg">
            <div className="py-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Status:</span>
              <span className={`text-xs font-semibold ${
                networkStatus === 'connected' ? 'text-emerald-700' : 'text-[#C62828]'
              }`}>
                {networkStatus === 'connected' ? '● Connected' : '⚠ Protected Offline'}
              </span>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('landing')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentView === 'landing' ? 'bg-red-50 text-[#C62828]' : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Overview & Architecture</span>
              </button>
              <button
                onClick={() => handleNavClick('candidate_portal')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentView === 'candidate_portal' ? 'bg-red-50 text-[#C62828]' : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Candidate Portal</span>
              </button>
              <button
                onClick={() => handleNavClick('live_exam')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentView === 'live_exam' ? 'bg-red-50 text-[#C62828]' : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-[#C62828]" />
                <span>Live Examination Room</span>
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">
                Operations Suite
              </span>
              {operationsViews.map(view => (
                <button
                  key={view.id}
                  onClick={() => handleNavClick(view.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                    currentView === view.id ? 'bg-red-50 text-[#C62828] font-bold' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {view.icon}
                    <span>{view.label}</span>
                  </div>
                  {view.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gray-100 text-gray-600 font-bold">
                      {view.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsThemeDrawerOpen(true);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-center flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C62828]" />
                <span>Theme: {activeTheme.name}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  startDemo();
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white text-center"
              >
                Resilience Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Persistent Systematic Core Product Story (10-Phase Lifecycle Bar) */}
      <LifecycleBar />

      {/* Problem Statement & Hackathon Architecture Modal */}
      <HackathonModal 
        isOpen={hackathonModalOpen} 
        onClose={() => setHackathonModalOpen(false)} 
      />
    </>
  );
};
