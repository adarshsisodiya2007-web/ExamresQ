import React from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ShieldCheck, 
  Activity, 
  Building2, 
  AlertOctagon, 
  RotateCcw, 
  FileCheck2, 
  BarChart3, 
  Settings as SettingsIcon,
  Wifi, 
  WifiOff, 
  FileSpreadsheet, 
  Sparkles, 
  Globe, 
  User, 
  Radar, 
  Scale, 
  GitCompare, 
  Eye, 
  Compass, 
  Users,
  GraduationCap,
  ShieldAlert,
  Award,
  Lock,
  ArrowRight
} from 'lucide-react';

interface SidebarItem {
  id: AppView;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarProps {
  onOpenHackathonModal: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onOpenHackathonModal, 
  mobileOpen = false, 
  onCloseMobile 
}) => {
  const { 
    userRole,
    setUserRole,
    currentView, 
    setCurrentView, 
    networkStatus, 
    triggerNetworkInterruption, 
    restoreNetwork, 
    startDemo,
    activeCandidates
  } = useResilience();

  const { activeTheme, setIsThemeDrawerOpen } = useTheme();

  const handleItemClick = (view: AppView) => {
    setCurrentView(view);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleRoleChange = (role: 'student' | 'officer') => {
    setUserRole(role);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  // Student Navigation: Minimal, Distraction-Free, ONLY What Student Needs
  const studentSections: SidebarSection[] = [
    {
      title: 'EXAMINATION WORKSPACE',
      items: [
        {
          id: 'live_exam',
          label: 'Live Exam Room',
          icon: <FileSpreadsheet className="w-4 h-4 text-[#E53935]" />,
          badge: 'ACTIVE NOW',
          badgeColor: 'bg-red-950/90 text-red-300 border-red-700 animate-pulse'
        },
        {
          id: 'candidate_portal',
          label: 'Candidate Portal & Admit Card',
          icon: <User className="w-4 h-4 text-indigo-400" />
        },
        {
          id: 'audit',
          label: 'My Submission Proof (WORM)',
          icon: <FileCheck2 className="w-4 h-4 text-emerald-400" />,
          badge: 'VERIFIED',
          badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
        },
        {
          id: 'landing',
          label: 'Platform Rules & Continuity',
          icon: <Globe className="w-4 h-4 text-gray-400" />
        }
      ]
    }
  ];

  // Officer Navigation: Multi-Student Surveillance, Anomaly Detection, Disaster Recovery, Governance
  const officerSections: SidebarSection[] = [
    {
      title: 'LIVE SURVEILLANCE',
      items: [
        {
          id: 'candidate_monitor',
          label: 'Multi-Student Monitor',
          icon: <Users className="w-4 h-4 text-[#38BDF8]" />,
          badge: `${activeCandidates.length} ONLINE`,
          badgeColor: 'bg-cyan-950/90 text-[#38BDF8] border-cyan-800 animate-pulse'
        }
      ]
    },
    {
      title: 'OPERATIONS & RISK',
      items: [
        {
          id: 'operations',
          label: 'Mission Control',
          icon: <Compass className="w-4 h-4 text-cyan-400" />,
          badge: 'ACTIVE',
          badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
        },
        {
          id: 'early_detection',
          label: 'Early Detection (Req 2)',
          icon: <Radar className="w-4 h-4 text-amber-400" />,
          badge: 'AI PREDICT',
          badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800'
        },
        {
          id: 'centres',
          label: 'Centre Telemetry',
          icon: <Building2 className="w-4 h-4 text-blue-400" />,
          badge: '38 LABS',
          badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-800'
        },
        {
          id: 'incidents',
          label: 'Incident Mgmt (Req 3)',
          icon: <AlertOctagon className="w-4 h-4 text-red-400" />,
          badge: '1 ACTIVE',
          badgeColor: 'bg-red-950/80 text-red-300 border-red-800'
        }
      ]
    },
    {
      title: 'RESILIENCE & RECOVERY',
      items: [
        {
          id: 'recovery',
          label: 'Disaster Recovery (Req 4)',
          icon: <RotateCcw className="w-4 h-4 text-blue-400" />,
          badge: 'ZERO-LOSS',
          badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-800'
        },
        {
          id: 'audit',
          label: 'Tamper Storage (Req 5)',
          icon: <FileCheck2 className="w-4 h-4 text-emerald-400" />,
          badge: 'WORM',
          badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
        },
        {
          id: 'suspicious_patterns',
          label: 'Suspicious Review (Req 6)',
          icon: <Eye className="w-4 h-4 text-orange-400" />,
          badge: 'EVIDENCE',
          badgeColor: 'bg-orange-950/80 text-orange-300 border-orange-800'
        },
        {
          id: 'reconciliation',
          label: 'Reconciliation (Req 7)',
          icon: <GitCompare className="w-4 h-4 text-purple-400" />,
          badge: '100% MATCH',
          badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-800'
        }
      ]
    },
    {
      title: 'GOVERNANCE & FAIRNESS',
      items: [
        {
          id: 'decision_support',
          label: 'Decision Support (Req 9,10)',
          icon: <Scale className="w-4 h-4 text-cyan-400" />,
          badge: 'PARITY',
          badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
        },
        {
          id: 'reports',
          label: 'Post-Exam Reports (Req 11)',
          icon: <BarChart3 className="w-4 h-4 text-gray-300" />,
          badge: 'SEALED',
          badgeColor: 'bg-gray-800 text-gray-300 border-gray-700'
        },
        {
          id: 'settings',
          label: 'Governance Settings',
          icon: <SettingsIcon className="w-4 h-4 text-gray-400" />
        }
      ]
    }
  ];

  const currentSections = userRole === 'student' ? studentSections : officerSections;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-[#070B14] text-gray-300 border-r border-[#151D2E] flex flex-col transition-transform duration-300 ease-in-out
      lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 shrink-0
      ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Top Branding matching reference style */}
      <div className="p-4 border-b border-[#151D2E] flex items-center justify-between">
        <div 
          onClick={() => handleItemClick(userRole === 'student' ? 'live_exam' : 'candidate_monitor')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1E293B] via-[#0F172A] to-[#E53935]/80 p-0.5 border border-[#334155] flex items-center justify-center shadow-lg group-hover:border-[#E53935] transition-colors">
            <div className="w-full h-full rounded-[10px] bg-[#0A0F1D] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#E53935]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-base tracking-wider text-white font-mono uppercase">
                ExamresQ
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-[#16803C] animate-pulse" />
            </div>
            <p className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold">
              RESILIENT SUITE
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
          >
            ✕
          </button>
        )}
      </div>

      {/* DEDICATED ROLE SELECTOR TABS: Student vs Officer */}
      <div className="px-3 pt-3 pb-2 border-b border-[#151D2E] bg-[#0A0F1D]">
        <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold mb-1.5 px-1 flex items-center justify-between">
          <span>Active Role</span>
          <span className="text-[9px] text-[#38BDF8] font-bold">Role Isolated</span>
        </div>

        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#050811] border border-[#1E2A42] gap-1">
          <button
            onClick={() => handleRoleChange('student')}
            className={`
              flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer
              ${
                userRole === 'student'
                  ? 'bg-[#C62828] text-white shadow-md shadow-red-900/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }
            `}
            title="Candidate Portal & Live Examination Room"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            onClick={() => handleRoleChange('officer')}
            className={`
              flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer
              ${
                userRole === 'officer'
                  ? 'bg-[#0284C7] text-white shadow-md shadow-cyan-900/30 font-extrabold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }
            `}
            title="Multi-Student Surveillance, Incidents & Operations"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Officer</span>
          </button>
        </div>
      </div>

      {/* Scrollable Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
        
        {/* Officer-Only: Quick Lab Outage & Demo Simulator Box */}
        {userRole === 'officer' && (
          <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#1E2A42] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span className="uppercase font-bold tracking-wider">Outage Simulation</span>
              <span className={`w-2 h-2 rounded-full ${networkStatus === 'connected' ? 'bg-[#16803C]' : 'bg-[#C62828] animate-ping'}`} />
            </div>

            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulate Lab Outage</span>
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-[#16803C] hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors animate-pulse"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Restore & Reconcile All</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={startDemo}
                className="py-1 px-2 rounded-lg text-[10px] font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-center cursor-pointer transition-colors"
              >
                Demo Tour
              </button>
              <button
                onClick={onOpenHackathonModal}
                className="py-1 px-2 rounded-lg text-[10px] font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-center cursor-pointer transition-colors"
              >
                Architecture
              </button>
            </div>
          </div>
        )}

        {/* Student-Only: Personal Terminal Status Card */}
        {userRole === 'student' && (
          <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2A42] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span className="uppercase font-bold tracking-wider">Candidate Terminal</span>
              <span className="text-emerald-400 font-bold">STATION-14</span>
            </div>

            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Adarsh Singh (ET-4418)</span>
            </div>

            <p className="text-[11px] text-gray-400 leading-snug">
              Client Encrypted Buffer: <strong className="text-emerald-400 font-mono">ACTIVE</strong>. Any network interruption automatically freezes timer with zero data loss.
            </p>

            {networkStatus === 'interrupted' && (
              <div className="p-2 rounded-lg bg-red-950/80 border border-red-800 text-[10px] text-red-200 font-mono animate-pulse">
                ⚠ Network Interrupted. Responses encrypted locally in IndexedDB.
              </div>
            )}
          </div>
        )}

        {/* Categorized Navigation Items */}
        {currentSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <h2 className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#5A6E8C] px-3 pb-1">
              {section.title}
            </h2>

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer group text-left
                      ${
                        isActive
                          ? 'bg-linear-to-r from-[#0C2438] to-[#081826] text-[#38BDF8] border border-[#0284C7]/50 shadow-md shadow-[#0284C7]/15 font-bold'
                          : 'text-[#9AAEC8] hover:text-white hover:bg-[#121B2B] border border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`shrink-0 transition-colors ${isActive ? 'text-[#38BDF8]' : 'text-[#64748B] group-hover:text-white'}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 uppercase tracking-wider ${item.badgeColor || 'bg-gray-800 text-gray-300 border-gray-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* SYSTEM THEME SWITCHER */}
        <div className="space-y-1 pt-1">
          <h2 className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#5A6E8C] px-3 pb-1">
            AESTHETICS
          </h2>

          <button
            onClick={() => setIsThemeDrawerOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#9AAEC8] hover:text-white hover:bg-[#121B2B] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#E53935]" />
              <span>Theme: {activeTheme.name}</span>
            </div>
            <span className="text-[9px] font-mono text-[#64748B]">THEME</span>
          </button>
        </div>

      </div>

      {/* Bottom Footer Status */}
      <div className="p-3 border-t border-[#151D2E] bg-[#05080F] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#16803C]" />
          <span>{userRole === 'student' ? 'Terminal Armed' : 'Surveillance Active'}</span>
        </div>
        <span className="text-[#38BDF8] font-bold">SHA-256</span>
      </div>
    </aside>
  );
};
