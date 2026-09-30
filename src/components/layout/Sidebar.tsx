import React, { useState } from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { BrandLogoSimulation } from './BrandLogoSimulation';
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
  User, 
  Radar, 
  Scale, 
  GitCompare, 
  Eye, 
  Compass, 
  Users,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  LogOut
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
    activeCandidates,
    isOfficerAuthenticated,
    logoutOfficer,
    studentName,
    language
  } = useResilience();

  const [lifecycleExpanded, setLifecycleExpanded] = useState(false);

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

  // Student Navigation: Clean, Short & Focused
  const studentSections: SidebarSection[] = [
    {
      title: language === 'hi' ? 'परीक्षा कक्ष (EXAM)' : 'EXAMINATION TERMINAL',
      items: [
        {
          id: 'live_exam',
          label: language === 'hi' ? 'लाइव परीक्षा कक्ष' : 'Live Exam Room',
          icon: <FileSpreadsheet className="w-4 h-4 text-[#E53935]" />,
          badge: language === 'hi' ? 'सक्रिय' : 'ACTIVE',
          badgeColor: 'bg-red-950/90 text-red-300 border-red-700 animate-pulse'
        },
        {
          id: 'candidate_portal',
          label: language === 'hi' ? 'उम्मीदवार पोर्टल' : 'Candidate Portal',
          icon: <User className="w-4 h-4 text-indigo-400" />
        },
        {
          id: 'audit',
          label: language === 'hi' ? 'सबमिशन पावती व ऑडिट' : 'Submission Proof',
          icon: <FileCheck2 className="w-4 h-4 text-emerald-400" />,
          badge: 'SHA-256',
          badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
        }
      ]
    }
  ];

  // Officer Navigation: Short, Crisp, Enterprise Grade
  const officerSections: SidebarSection[] = [
    {
      title: language === 'hi' ? 'निगरानी एवं मॉनिटरिंग' : 'SURVEILLANCE & MONITOR',
      items: [
        {
          id: 'candidate_monitor',
          label: language === 'hi' ? 'लाइव छात्र निगरानी कक्ष' : 'Live Student Monitor',
          icon: <Users className="w-4 h-4 text-[#38BDF8]" />,
          badge: `${activeCandidates.length} ${language === 'hi' ? 'लाइव' : 'ONLINE'}`,
          badgeColor: 'bg-cyan-950/90 text-[#38BDF8] border-cyan-800 animate-pulse'
        },
        {
          id: 'operations',
          label: language === 'hi' ? 'ऑपरेशन्स केंद्र' : 'Operations Center',
          icon: <Compass className="w-4 h-4 text-cyan-400" />,
          badge: language === 'hi' ? 'सक्रिय' : 'ACTIVE',
          badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
        },
        {
          id: 'centres',
          label: language === 'hi' ? 'परीक्षा केंद्र स्थिति' : 'Centre Monitoring',
          icon: <Building2 className="w-4 h-4 text-blue-400" />
        }
      ]
    },
    {
      title: language === 'hi' ? 'घटना प्रबंधन एवं बैकअप' : 'INCIDENT & RECOVERY',
      items: [
        {
          id: 'early_detection',
          label: language === 'hi' ? 'पूर्व चेतावनी प्रणाली' : 'Early Detection',
          icon: <Radar className="w-4 h-4 text-amber-400" />,
          badge: language === 'hi' ? 'एआई भविष्यवाणी' : 'AI PREDICT',
          badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800'
        },
        {
          id: 'incidents',
          label: language === 'hi' ? 'घटना नियंत्रण केंद्र' : 'Incident Center',
          icon: <AlertOctagon className="w-4 h-4 text-red-400" />,
          badge: language === 'hi' ? '१ सक्रिय' : '1 OPEN',
          badgeColor: 'bg-red-950/80 text-red-300 border-red-800'
        },
        {
          id: 'recovery',
          label: language === 'hi' ? 'डिजास्टर रिकवरी' : 'Disaster Recovery',
          icon: <RotateCcw className="w-4 h-4 text-blue-400" />
        }
      ]
    },
    {
      title: language === 'hi' ? 'फॉरेंसिक एवं ऑडिट लेजर' : 'FORENSICS & AUDIT',
      items: [
        {
          id: 'audit',
          label: language === 'hi' ? 'ब्लॉकचेन ऑडिट लेजर' : 'Audit Ledger',
          icon: <FileCheck2 className="w-4 h-4 text-emerald-400" />,
          badge: 'WORM',
          badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
        },
        {
          id: 'suspicious_patterns',
          label: language === 'hi' ? 'संदेहास्पद हलचल जांच' : 'Suspicious Patterns',
          icon: <Eye className="w-4 h-4 text-orange-400" />
        },
        {
          id: 'reconciliation',
          label: language === 'hi' ? 'डेटा मिलान (रिकंसीलेशन)' : 'Reconciliation',
          icon: <GitCompare className="w-4 h-4 text-purple-400" />,
          badge: '100% MATCH',
          badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-800'
        }
      ]
    },
    {
      title: language === 'hi' ? 'प्रशासन एवं नीतियां' : 'GOVERNANCE',
      items: [
        {
          id: 'decision_support',
          label: language === 'hi' ? 'निर्णय सहायता प्रणाली' : 'Decision Support',
          icon: <Scale className="w-4 h-4 text-cyan-400" />
        },
        {
          id: 'reports',
          label: language === 'hi' ? 'आधिकारिक साक्ष्य रिपोर्ट' : 'Evidence Reports',
          icon: <BarChart3 className="w-4 h-4 text-gray-300" />,
          badge: language === 'hi' ? 'सत्यापित' : 'SEALED',
          badgeColor: 'bg-gray-800 text-gray-300 border-gray-700'
        },
        {
          id: 'settings',
          label: language === 'hi' ? 'सिस्टम नीतियां व सेटिंग्स' : 'Governance Settings',
          icon: <SettingsIcon className="w-4 h-4 text-gray-400" />
        }
      ]
    }
  ];

  const currentSections = userRole === 'student' ? studentSections : officerSections;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-white dark:bg-[#070B14] text-gray-800 dark:text-gray-300 border-r border-red-100 dark:border-[#151D2E] flex flex-col transition-all duration-300 ease-in-out
      lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 shrink-0
      ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Top Branding with Dynamic Logo Simulation (Student vs Officer) */}
      <div className="p-4 border-b border-red-100 dark:border-[#151D2E] bg-white dark:bg-[#070B14] flex items-center justify-between">
        <BrandLogoSimulation 
          onNavigateHome={() => handleItemClick(userRole === 'student' ? 'live_exam' : 'candidate_monitor')} 
        />

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
      <div className="px-3 pt-3 pb-2 border-b border-red-100 dark:border-[#151D2E] bg-red-50/40 dark:bg-[#0A0F1D]">
        <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1.5 px-1 flex items-center justify-between">
          <span>Active Role</span>
          <span className="text-[9px] text-[#C62828] dark:text-[#38BDF8] font-bold">Role Isolated</span>
        </div>

        <div className="grid grid-cols-2 p-1 rounded-xl bg-white dark:bg-[#050811] border border-red-200 dark:border-[#1E2A42] gap-1 shadow-2xs">
          <button
            onClick={() => handleRoleChange('student')}
            className={`
              flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer
              ${
                userRole === 'student'
                  ? 'bg-[#C62828] text-white shadow-md shadow-red-900/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/5'
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
                  ? 'bg-[#C62828] dark:bg-[#0284C7] text-white shadow-md shadow-red-900/20 dark:shadow-cyan-900/30 font-extrabold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/5'
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
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1527] border border-red-100 dark:border-[#1E2A42] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 dark:text-gray-400">
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

            <button
              onClick={onOpenHackathonModal}
              className="w-full py-1.5 px-2 rounded-lg text-[10px] font-bold bg-red-50/80 hover:bg-red-100 text-gray-700 border border-red-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-300 dark:border-white/10 text-center cursor-pointer transition-colors"
            >
              🏛️ Challenge Architecture & Guidelines
            </button>
          </div>
        )}

        {/* Student-Only: Personal Terminal Status Card */}
        {userRole === 'student' && (
          <div className="p-3 rounded-xl bg-white dark:bg-[#0D1527] border border-red-100 dark:border-[#1E2A42] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 dark:text-gray-400">
              <span className="uppercase font-bold tracking-wider">Candidate Terminal</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">STATION-14</span>
            </div>

            <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{studentName} (ET-4418)</span>
            </div>

            <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug">
              Client Encrypted Buffer: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">ACTIVE</strong>. Any network interruption automatically freezes timer with zero data loss.
            </p>

            {networkStatus === 'interrupted' && (
              <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-[10px] text-[#C62828] dark:bg-red-950/80 dark:border-red-800 dark:text-red-200 font-mono animate-pulse">
                ⚠ Network Interrupted. Responses encrypted locally in IndexedDB.
              </div>
            )}
          </div>
        )}

        {/* Categorized Navigation Items */}
        {currentSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <h2 className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#C62828] dark:text-[#5A6E8C] px-3 pb-1">
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
                          ? 'bg-red-50 text-[#C62828] border border-red-200 shadow-2xs font-bold dark:bg-linear-to-r dark:from-[#0C2438] dark:to-[#081826] dark:text-[#38BDF8] dark:border-[#0284C7]/50 dark:shadow-md dark:shadow-[#0284C7]/15'
                          : 'text-gray-700 hover:text-[#C62828] hover:bg-red-50/50 dark:text-[#9AAEC8] dark:hover:text-white dark:hover:bg-[#121B2B] border border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`shrink-0 transition-colors ${isActive ? 'text-[#C62828] dark:text-[#38BDF8]' : 'text-gray-400 dark:text-[#64748B] group-hover:text-[#C62828] dark:group-hover:text-white'}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 uppercase tracking-wider ${item.badgeColor || 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* 10-PHASE RESILIENCE LIFECYCLE (Compact in Sidebar) */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between px-3 pb-1">
            <h2 className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#C62828] dark:text-[#5A6E8C]">
              RESILIENCE LIFECYCLE
            </h2>
            <button
              onClick={() => setLifecycleExpanded(!lifecycleExpanded)}
              className="text-[10px] text-[#C62828] dark:text-[#38BDF8] hover:underline flex items-center gap-0.5 cursor-pointer font-mono font-bold"
            >
              <span>{lifecycleExpanded ? 'Hide' : '10 Steps'}</span>
              {lifecycleExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {lifecycleExpanded && (
            <div className="p-2 rounded-xl bg-white dark:bg-[#050811] border border-red-100 dark:border-[#162033] space-y-1 font-mono text-[11px] animate-in fade-in shadow-2xs">
              {[
                { step: '01', name: 'Exam Starts', view: 'live_exam' as AppView },
                { step: '02', name: 'System Monitoring', view: 'operations' as AppView },
                { step: '03', name: 'Early Detection', view: 'early_detection' as AppView },
                { step: '04', name: 'Immediate Response', view: 'incidents' as AppView },
                { step: '05', name: 'Candidate Informed', view: 'live_exam' as AppView },
                { step: '06', name: 'Response Protected', view: 'live_exam' as AppView },
                { step: '07', name: 'Backup & Recovery', view: 'recovery' as AppView },
                { step: '08', name: 'Synchronization', view: 'reconciliation' as AppView },
                { step: '09', name: 'Audit Integrity', view: 'audit' as AppView },
                { step: '10', name: 'Trust Sealed', view: 'reports' as AppView },
              ].map((phase) => (
                <button
                  key={phase.step}
                  onClick={() => handleItemClick(phase.view)}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-left transition-colors cursor-pointer text-[10px] ${
                    currentView === phase.view 
                      ? 'bg-red-50 text-[#C62828] font-bold border border-red-200 dark:bg-[#0C2438] dark:text-[#38BDF8] dark:border-[#0284C7]/40'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-red-50/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="opacity-60">{phase.step}</span>
                    <span>{phase.name}</span>
                  </span>
                  <span className="text-[9px] opacity-40 font-sans">Go →</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Status */}
      <div className="p-3 border-t border-red-100 dark:border-[#151D2E] bg-red-50/30 dark:bg-[#05080F] flex items-center justify-between text-[11px] font-mono text-gray-600 dark:text-gray-400">
        {userRole === 'officer' && isOfficerAuthenticated ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-[#C62828] dark:bg-sky-400 animate-pulse" />
              <span className="text-gray-900 dark:text-white font-bold truncate">OFF-9042</span>
              <span className="text-[9px] text-[#C62828] dark:text-[#38BDF8] font-bold">CMD</span>
            </div>
            <button
              onClick={logoutOfficer}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 dark:bg-red-950/60 dark:hover:bg-red-900 dark:border-red-800 dark:text-red-300 font-bold transition-colors cursor-pointer"
              title="Lock Officer Console and return to Student Portal"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#16803C]" />
              <span>{userRole === 'student' ? 'Terminal Armed' : 'Surveillance Active'}</span>
            </div>
            <span className="text-[#C62828] dark:text-[#38BDF8] font-bold">SHA-256</span>
          </>
        )}
      </div>
    </aside>
  );
};
