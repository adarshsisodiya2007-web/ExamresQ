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
  HelpCircle,
  Radar,
  Scale,
  GitCompare,
  Eye,
  ArrowRight,
  Radio
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
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [hackathonModalOpen, setHackathonModalOpen] = useState(false);

  // Grouped Navigation by systematic domain
  const operationsViews: { id: AppView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'operations', label: 'Operations Dashboard', icon: <Activity className="w-4 h-4" /> },
    { id: 'early_detection', label: 'Early Detection & Risk (Req 2)', icon: <Radar className="w-4 h-4 text-amber-500" />, badge: 'AI Predict' },
    { id: 'centres', label: 'Centre Monitoring (38)', icon: <Building2 className="w-4 h-4" />, badge: '38 Online' },
    { id: 'incidents', label: 'Incident Mgmt & Escalation (Req 3)', icon: <AlertOctagon className="w-4 h-4 text-[#C62828]" />, badge: 'Req 3' },
    { id: 'recovery', label: 'Backup & Disaster Recovery (Req 4)', icon: <RotateCcw className="w-4 h-4 text-blue-600" />, badge: 'Req 4' },
    { id: 'audit', label: 'Tamper-Evident Storage (Req 5)', icon: <FileCheck2 className="w-4 h-4 text-emerald-600" />, badge: 'Req 5' },
    { id: 'suspicious_patterns', label: 'Suspicious Pattern Review (Req 6)', icon: <Eye className="w-4 h-4 text-orange-500" />, badge: 'Req 6' },
    { id: 'reconciliation', label: 'Reconciliation & Validation (Req 7)', icon: <GitCompare className="w-4 h-4 text-purple-600" />, badge: 'Req 7' },
    { id: 'decision_support', label: 'Decision Support & Fairness (Req 9, 10)', icon: <Scale className="w-4 h-4 text-blue-500" />, badge: 'Req 9, 10' },
    { id: 'reports', label: 'Post-Exam Evidence Reports (Req 11)', icon: <BarChart3 className="w-4 h-4 text-gray-700" />, badge: 'Req 11' },
    { id: 'settings', label: 'Governance Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setSideMenuOpen(false);
  };

  // Get human readable view name for breadcrumb
  const getCurrentViewLabel = () => {
    if (currentView === 'landing') return 'Overview & Architecture';
    if (currentView === 'candidate_portal') return 'Candidate Portal';
    if (currentView === 'live_exam') return 'Live Examination Room';
    const found = operationsViews.find(v => v.id === currentView);
    return found ? found.label : 'EVALTRUST Ecosystem';
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0B0E]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-xs transition-colors duration-300">
        {/* Top Minimal Notification Bar */}
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

          <div className="flex items-center gap-3">
            {/* Live Network Health Status Pill */}
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
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

        {/* Main Clean Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Logo */}
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

            {/* Center: Current Active View Breadcrumb Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs">
              <span className="text-gray-500 font-medium">Active:</span>
              <span className="font-bold text-gray-900 dark:text-white truncate max-w-[280px]">
                {getCurrentViewLabel()}
              </span>
            </div>

            {/* Right: Clean Action & Side Menu Toggle Button */}
            <div className="flex items-center gap-2.5">
              {/* Quick Enter Exam Button */}
              {currentView !== 'live_exam' && (
                <button
                  onClick={() => handleNavClick('live_exam')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Enter Exam</span>
                </button>
              )}

              {/* Theme Trigger Pill */}
              <button
                onClick={() => setIsThemeDrawerOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 cursor-pointer transition-colors"
                title="Change luxury aesthetic theme"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C62828]" />
                <span className="hidden xl:inline">{activeTheme.name}</span>
              </button>

              {/* MAIN SIDE MENU TOGGLE BUTTON */}
              <button
                onClick={() => setSideMenuOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all cursor-pointer shadow-md group"
                aria-label="Open Side Navigation Menu"
              >
                <Menu className="w-4 h-4 text-[#E53935] group-hover:rotate-90 transition-transform" />
                <span>Side Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Persistent Systematic Core Product Story (10-Phase Lifecycle Bar) */}
      <LifecycleBar />

      {/* SLIDE-OVER SIDE MENU DRAWER */}
      {sideMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setSideMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300" 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-[#13151D] text-gray-900 dark:text-white shadow-2xl flex flex-col border-l border-gray-200 dark:border-gray-800 animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight">Navigation & Control Menu</h3>
                    <p className="text-[10px] text-gray-500 font-mono">EVALTRUST Institutional Ecosystem</p>
                  </div>
                </div>

                <button
                  onClick={() => setSideMenuOpen(false)}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* Section 1: Quick Simulation & Testing Actions */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                    Quick Simulation & Testing Controls
                  </span>

                  <div className="grid grid-cols-1 gap-2">
                    {networkStatus === 'connected' ? (
                      <button
                        onClick={triggerNetworkInterruption}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-red-50 dark:bg-red-950/40 text-[#C62828] border border-red-200 dark:border-red-900/60 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <WifiOff className="w-4 h-4 text-[#C62828]" />
                          <span>Simulate Network Outage</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-black/40">Req 3, 4</span>
                      </button>
                    ) : (
                      <button
                        onClick={restoreNetwork}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-[#16803C] border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer animate-pulse"
                      >
                        <div className="flex items-center gap-2">
                          <Wifi className="w-4 h-4 text-[#16803C]" />
                          <span>Restore Network & Auto-Sync</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-black/40">Zero Loss</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSideMenuOpen(false);
                        startDemo();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-[#C62828]" />
                        <span>7-Step Hackathon Resilience Demo</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">Auto Tour</span>
                    </button>

                    <button
                      onClick={() => {
                        setSideMenuOpen(false);
                        setHackathonModalOpen(true);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-500" />
                        <span>Problem Statement & Architecture</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">7 Challenges</span>
                    </button>
                  </div>
                </div>

                {/* Section 2: Assessment Hub */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                    Assessment Hub & Student Portals
                  </span>

                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavClick('landing')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentView === 'landing' ? 'bg-[#C62828] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4" />
                        <span>Platform Overview & Architecture</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('candidate_portal')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentView === 'candidate_portal' ? 'bg-[#C62828] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4" />
                        <span>Candidate Assessment Portal</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('live_exam')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentView === 'live_exam' ? 'bg-[#C62828] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileSpreadsheet className="w-4 h-4 text-[#C62828]" />
                        <span>Live Examination Room (ENG-304)</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
                    </button>
                  </div>
                </div>

                {/* Section 3: All 11 Systematic Hackathon Requirements */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                      Hackathon System Requirements (Req 1 - 11)
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-[#C62828] font-bold">
                      11 Modules
                    </span>
                  </div>

                  <div className="space-y-1">
                    {operationsViews.map((view) => (
                      <button
                        key={view.id}
                        onClick={() => handleNavClick(view.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          currentView === view.id 
                            ? 'bg-[#C62828] text-white font-bold shadow-xs' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={currentView === view.id ? 'text-white' : 'text-gray-400'}>
                            {view.icon}
                          </span>
                          <span className="truncate">{view.label}</span>
                        </div>

                        {view.badge && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                            currentView === view.id ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                            {view.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 4: Theme & Appearance */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                    Appearance & Governance
                  </span>

                  <button
                    onClick={() => {
                      setSideMenuOpen(false);
                      setIsThemeDrawerOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C62828]" />
                      <span>Theme: {activeTheme.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Customize</span>
                  </button>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>EVALTRUST v2.6.4</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">● System Healthy</span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Problem Statement & Hackathon Architecture Modal */}
      <HackathonModal 
        isOpen={hackathonModalOpen} 
        onClose={() => setHackathonModalOpen(false)} 
      />
    </>
  );
};
