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
  LogOut, 
  Flame, 
  Sparkles,
  Home,
  Layers,
  HelpCircle
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
  const [moreExpanded, setMoreExpanded] = useState(false);

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
      title: language === 'hi' ? 'मुख्य पृष्ठ' : 'OVERVIEW',
      items: [
        {
          id: 'landing',
          label: language === 'hi' ? 'उत्पाद अवलोकन' : 'Product Story & Overview',
          icon: <Home className="w-4 h-4 text-[#C62828]" />,
          badge: 'HOME',
          badgeColor: 'bg-red-50 text-[#C62828] border-red-200'
        }
      ]
    },
    {
      title: language === 'hi' ? 'परीक्षा' : 'EXAMINATION DEMO',
      items: [
        {
          id: 'live_exam',
          label: language === 'hi' ? 'लाइव परीक्षा कक्ष' : 'Candidate Exam Demo',
          icon: <FileSpreadsheet className="w-4 h-4 text-[#C62828]" />,
          badge: language === 'hi' ? 'सक्रिय' : 'ACTIVE',
          badgeColor: 'bg-red-50 text-[#C62828] border-red-200'
        },
        {
          id: 'candidate_portal',
          label: language === 'hi' ? 'छात्र पोर्टल' : 'Candidate Portal Demo',
          icon: <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        },
        {
          id: 'audit',
          label: language === 'hi' ? 'सबमिशन पावती' : 'Submission Receipt Demo',
          icon: <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          badge: 'VERIFIED',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }
      ]
    }
  ];

  // Officer / Supervisor Navigation: Non-technical, demo-oriented
  const officerSections: SidebarSection[] = [
    {
      title: language === 'hi' ? 'उत्पाद प्रस्तुति' : 'PRODUCT PRESENTATION',
      items: [
        {
          id: 'landing',
          label: language === 'hi' ? 'उत्पाद अवलोकन' : 'Product Story & Overview',
          icon: <Home className="w-4 h-4 text-[#C62828]" />,
          badge: 'HOME',
          badgeColor: 'bg-red-50 text-[#C62828] border-red-200 font-bold'
        },
        {
          id: 'three_pillars',
          label: language === 'hi' ? '⭐ 3 मुख्य पिलर्स (USP)' : '⭐ 3 Breakthrough Pillars (USP)',
          icon: <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />,
          badge: 'USP DEMO',
          badgeColor: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black shadow-xs'
        }
      ]
    },
    {
      title: language === 'hi' ? 'सुपरवाइजर डेमो कंसोल' : 'SUPERVISOR DEMO CONSOLE',
      items: [
        {
          id: 'operations',
          label: language === 'hi' ? '01 केंद्रीय अवलोकन' : '01 Central Assessment Overview',
          icon: <Compass className="w-4 h-4 text-[#C62828]" />
        },
        {
          id: 'candidate_monitor',
          label: language === 'hi' ? '02 लाइव मॉनिटरिंग डेमो' : '02 Live Monitoring Demo',
          icon: <Users className="w-4 h-4 text-[#C62828]" />,
          badge: 'DEMO DATA',
          badgeColor: 'bg-red-50 text-[#C62828] border-red-200 font-bold'
        },
        {
          id: 'early_detection',
          label: language === 'hi' ? '03 स्मार्ट डिटेक्शन डेमो' : '03 Smart Detection Demo',
          icon: <Eye className="w-4 h-4 text-amber-500" />,
          badge: 'PROTOTYPE',
          badgeColor: 'bg-amber-50 text-amber-800 border-amber-200 font-bold'
        },
        {
          id: 'incidents',
          label: language === 'hi' ? '04 घटना प्रबंधन डेमो' : '04 Incident Management Demo',
          icon: <AlertOctagon className="w-4 h-4 text-red-500" />
        },
        {
          id: 'recovery',
          label: language === 'hi' ? '05 परीक्षा रिकवरी डेमो' : '05 Examination Recovery Demo',
          icon: <RotateCcw className="w-4 h-4 text-blue-500" />
        },
        {
          id: 'audit',
          label: language === 'hi' ? '06 ऑडिट एवं रिपोर्ट्स' : '06 Audit & Reports Demo',
          icon: <FileCheck2 className="w-4 h-4 text-emerald-600" />
        },
        {
          id: 'centres',
          label: language === 'hi' ? '07 परीक्षा केंद्र अवलोकन' : '07 Exam Centres Overview',
          icon: <Building2 className="w-4 h-4 text-gray-500" />
        }
      ]
    },
    {
      title: language === 'hi' ? 'अतिरिक्त डेमो टूल्स' : 'ADDITIONAL DEMO TOOLS',
      items: [
        {
          id: 'simulation_lab',
          label: language === 'hi' ? 'आपदा सिम्युलेटर' : 'Interruption Simulator Demo',
          icon: <Flame className="w-4 h-4 text-rose-600 dark:text-rose-400" />
        },
        {
          id: 'decision_support',
          label: language === 'hi' ? 'निर्णय सहायता' : 'Supervisor Decision Support',
          icon: <Scale className="w-4 h-4 text-cyan-600" />
        },
        {
          id: 'reports',
          label: language === 'hi' ? 'एनालिटिक्स एवं रिपोर्ट' : 'Examination Analytics',
          icon: <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        },
        {
          id: 'reconciliation',
          label: language === 'hi' ? 'डेटा मिलान सत्यापन' : 'Response Verification Proof',
          icon: <GitCompare className="w-4 h-4 text-purple-600" />
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
      {/* Top Branding - click navigates to Home / Product Story */}
      <div className="p-4 border-b border-red-100 dark:border-[#151D2E] bg-white dark:bg-[#070B14] flex items-center justify-between">
        <BrandLogoSimulation 
          onNavigateHome={() => handleItemClick('landing')} 
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

      {/* Role Selector: Student vs Supervisor */}
      <div className="px-3 pt-3 pb-2 border-b border-red-100 dark:border-[#151D2E] bg-red-50/40 dark:bg-[#0A0F1D]">
        <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1.5 px-1 flex items-center justify-between">
          <span>Demo Role</span>
          <span className="text-[9px] text-[#C62828] dark:text-[#38BDF8] font-bold">Interactive</span>
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
            title="Candidate Exam View"
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
            title="Supervisor Oversight Console"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Supervisor</span>
          </button>
        </div>
      </div>

      {/* Scrollable Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
        
        {/* Supervisor Outage Simulation Box */}
        {userRole === 'officer' && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1527] border border-red-100 dark:border-[#1E2A42] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 dark:text-gray-400">
              <span className="uppercase font-bold tracking-wider">Demo Disruption</span>
              <span className={`w-2 h-2 rounded-full ${networkStatus === 'connected' ? 'bg-[#16803C]' : 'bg-[#C62828] animate-ping'}`} />
            </div>

            {networkStatus === 'connected' ? (
              <button
                onClick={triggerNetworkInterruption}
                className="w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-[#C62828] hover:bg-[#A81F1F] text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                title="Simulate what happens when network connectivity drops"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulate Connection Drop</span>
              </button>
            ) : (
              <button
                onClick={restoreNetwork}
                className="w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-[#16803C] hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors animate-pulse"
                title="Restore connectivity and verify safe synchronization"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Restore Connection</span>
              </button>
            )}
          </div>
        )}

        {/* Categorized Navigation Items */}
        {currentSections.map((section, sIdx) => {
          const isExpandableSection = sIdx > 1 && userRole === 'officer';

          return (
            <div key={sIdx} className="space-y-1">
              <div className="flex items-center justify-between px-3 pb-1">
                <h2 className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#C62828] dark:text-[#5A6E8C]">
                  {section.title}
                </h2>
                {isExpandableSection && (
                  <button
                    onClick={() => setMoreExpanded(!moreExpanded)}
                    className="text-[10px] text-[#C62828] dark:text-[#38BDF8] hover:underline flex items-center gap-0.5 cursor-pointer font-mono font-bold"
                  >
                    <span>{moreExpanded ? 'Hide' : 'More'}</span>
                    {moreExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}
              </div>

              {(!isExpandableSection || moreExpanded) && (
                <div className="space-y-1 animate-in fade-in">
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
                              ? 'bg-red-50 text-[#C62828] border border-red-200 shadow-2xs font-bold dark:bg-gradient-to-r dark:from-[#0C2438] dark:to-[#081826] dark:text-[#38BDF8] dark:border-[#0284C7]/50'
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
              )}
            </div>
          );
        })}

        {/* 6-Step Examination Lifecycle Guide */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between px-3 pb-1">
            <h2 className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#C62828] dark:text-[#5A6E8C]">
              EXAM LIFECYCLE
            </h2>
            <button
              onClick={() => setLifecycleExpanded(!lifecycleExpanded)}
              className="text-[10px] text-[#C62828] dark:text-[#38BDF8] hover:underline flex items-center gap-0.5 cursor-pointer font-mono font-bold"
            >
              <span>{lifecycleExpanded ? 'Hide' : '6 Steps'}</span>
              {lifecycleExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {lifecycleExpanded && (
            <div className="p-2 rounded-xl bg-white dark:bg-[#050811] border border-red-100 dark:border-[#162033] space-y-1 font-mono text-[11px] animate-in fade-in shadow-2xs">
              {[
                { step: '01', name: 'Exam Starts', view: 'live_exam' as AppView },
                { step: '02', name: 'Monitor Exam', view: 'candidate_monitor' as AppView },
                { step: '03', name: 'Identify Activity', view: 'early_detection' as AppView },
                { step: '04', name: 'Review Incident', view: 'incidents' as AppView },
                { step: '05', name: 'Respond & Assist', view: 'recovery' as AppView },
                { step: '06', name: 'Final Report', view: 'audit' as AppView },
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
                  <span className="text-[9px] opacity-40 font-sans">View →</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Status: Demo Environment Notice */}
      <div className="p-3 border-t border-red-100 dark:border-[#151D2E] bg-red-50/30 dark:bg-[#05080F] flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Demo Platform Active</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#C62828] dark:text-[#38BDF8]">
          SIMULATED
        </span>
      </div>
    </aside>
  );
};
