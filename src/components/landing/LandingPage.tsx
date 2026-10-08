import React, { useState } from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  PlayCircle, 
  Eye, 
  Users, 
  AlertTriangle, 
  RotateCcw, 
  FileCheck2, 
  Cpu, 
  CheckCircle2, 
  XCircle,
  Building2,
  Activity,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
  Clock,
  ChevronRight,
  ShieldAlert,
  Layers,
  BarChart3,
  ExternalLink,
  Info,
  Check,
  Radio,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setUserRole, startDemo } = useResilience();

  // Interactive Demo Experience Tab State (Section 6)
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);

  // Smart / AI Demo Simulation State (Section 7)
  const [aiDemoScenario, setAiDemoScenario] = useState<'normal' | 'phone' | 'gaze' | 'multi'>('phone');
  const [aiSupervisorActionTaken, setAiSupervisorActionTaken] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchDemo = (view: AppView, role: 'student' | 'officer' = 'officer') => {
    setUserRole(role);
    setCurrentView(view);
  };

  // Section 6: Demo Journey Steps
  const demoJourneySteps = [
    {
      id: 'candidate',
      title: 'Candidate View',
      subtitle: 'The Student Experience',
      badge: 'Protected Environment',
      icon: <FileSpreadsheet className="w-5 h-5 text-[#C62828]" />,
      summary: 'Candidates take their assessment in a clean, distraction-free environment. If a local computer glitch or internet drop occurs, answers are protected on the workstation so the student never loses progress.',
      viewTarget: 'live_exam' as AppView,
      roleTarget: 'student' as const,
      previewDetails: [
        { label: 'Candidate Screen', value: 'Clean question display with clear timer' },
        { label: 'Response Protection', value: 'Every click saved locally without delay' },
        { label: 'Candidate Experience', value: 'Completely uninterrupted even during network blips' }
      ]
    },
    {
      id: 'monitoring',
      title: 'Monitoring Dashboard',
      subtitle: 'Central Examination Overview',
      badge: 'Live Centralized View',
      icon: <Users className="w-5 h-5 text-[#C62828]" />,
      summary: 'Supervisors and exam controllers observe candidates across workstations and test centres in one clear, high-level view without wading through technical server statistics.',
      viewTarget: 'candidate_monitor' as AppView,
      roleTarget: 'officer' as const,
      previewDetails: [
        { label: 'Supervision Mode', value: 'High-level status for all active candidates' },
        { label: 'Workstation Feeds', value: 'Clean status tiles showing active exam engagement' },
        { label: 'Supervisor Utility', value: 'Quickly find candidates needing attention' }
      ]
    },
    {
      id: 'detected',
      title: 'Unusual Activity Detected',
      subtitle: 'Smart Assistance Highlights Flag',
      badge: 'Assisted Detection',
      icon: <Eye className="w-5 h-5 text-amber-600" />,
      summary: 'Smart assistance highlights unusual candidate activity (such as an unauthorized device or missing candidate) to bring it politely to the supervisor’s attention for human verification.',
      viewTarget: 'early_detection' as AppView,
      roleTarget: 'officer' as const,
      previewDetails: [
        { label: 'Detection Type', value: 'Visual & Audio cues highlighted for supervisor' },
        { label: 'AI Role', value: 'Supports human invigilators; does not make final decisions' },
        { label: 'Fairness First', value: 'Prevents wrongful candidate disruption' }
      ]
    },
    {
      id: 'incident',
      title: 'Incident Review',
      subtitle: 'Structured Event Assessment',
      badge: 'Centralized Records',
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      summary: 'Any unusual event, connection issue, or reported observation is recorded into an orderly incident record with exact timestamps and full context.',
      viewTarget: 'incidents' as AppView,
      roleTarget: 'officer' as const,
      previewDetails: [
        { label: 'Incident Registry', value: 'Structured timeline of examination events' },
        { label: 'Actionable Context', value: 'Clear description of what occurred' },
        { label: 'Priority Sorting', value: 'Urgent issues surfaced first' }
      ]
    },
    {
      id: 'response',
      title: 'Administrator Response',
      subtitle: 'Controlled Resolution & Assistance',
      badge: 'Decisive Action',
      icon: <RotateCcw className="w-5 h-5 text-blue-600" />,
      summary: 'Administrators can grant compensatory time if a room experienced a power blip, issue announcements, or send private notices to specific workstations without panic.',
      viewTarget: 'recovery' as AppView,
      roleTarget: 'officer' as const,
      previewDetails: [
        { label: 'Compensatory Time', value: 'Add extra minutes seamlessly if delay occurred' },
        { label: 'Direct Notices', value: 'Send calm instructions to affected screens' },
        { label: 'Seamless Recovery', value: 'No need to cancel or re-run the entire examination' }
      ]
    },
    {
      id: 'report',
      title: 'Final Report & Audit',
      subtitle: 'Verifiable Assessment Trust',
      badge: 'Transparent Ledger',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
      summary: 'Once the exam concludes, the platform generates a transparent summary and receipt for candidates and institutions, proving that all responses were collected faithfully.',
      viewTarget: 'audit' as AppView,
      roleTarget: 'officer' as const,
      previewDetails: [
        { label: 'Candidate Receipts', value: 'Instant digital confirmation of submission' },
        { label: 'Institutional Proof', value: 'Clear, dispute-free log for academic integrity' },
        { label: 'Auditor Confidence', value: 'Complete transparency for post-exam inquiries' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* =========================================================================
          SECTION 1 — HERO
          ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-[#C62828]/10 via-[#E53935]/4 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#101524] border border-red-200 dark:border-gray-800 shadow-sm mb-6 transition-all hover:border-[#C62828]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-gray-800 dark:text-gray-200">
              Smart Examination Support • Demo Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Making Examinations More <br className="hidden sm:inline" />
            <span className="text-[#C62828]">Trustworthy, Transparent & Manageable</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-normal">
            ExamResQ is a smart examination support platform designed to help institutions monitor exams, identify unusual activity, manage incidents, and maintain a more reliable assessment environment.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => scrollToSection('demo-experience')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-[#C62828] hover:bg-[#A81F1F] text-white shadow-lg shadow-[#C62828]/25 hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Explore the Demo</span>
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-[#101524] border border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>

            <button
              onClick={() => handleLaunchDemo('live_exam', 'student')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold bg-red-50 dark:bg-red-950/40 text-[#C62828] dark:text-red-300 border border-red-200 dark:border-red-900/50 hover:bg-red-100 transition-all cursor-pointer"
              title="Experience what a student sees during an examination"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Try Candidate View</span>
            </button>
          </div>
        </div>

        {/* Hero Visual: Clean Non-Technical Examination Dashboard Preview */}
        <div className="mt-12 max-w-5xl mx-auto bg-white dark:bg-[#0D121F] rounded-3xl border border-red-100 dark:border-gray-800 shadow-xl overflow-hidden">
          {/* Header Bar of the Mock Dashboard */}
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-[#121829] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                ExamResQ Supervisor Console • Live Assessment Demo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                ● Examination Active
              </span>
              <span className="text-xs text-gray-500 font-mono hidden sm:inline">
                45:00 Remaining
              </span>
            </div>
          </div>

          {/* Clean Dashboard Preview Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Candidate Card 1: Normal */}
            <div className="p-4 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/80 text-[#C62828] font-bold flex items-center justify-center text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Priya Sharma</h4>
                    <p className="text-[11px] text-gray-500">Workstation 01 • Seat A-12</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Normal
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-[#151C30] p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Questions Answered:</span>
                  <span className="font-bold text-gray-900 dark:text-white">18 / 25</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Response Protection:</span>
                  <span className="font-bold text-emerald-600">Saved Locally</span>
                </div>
              </div>
            </div>

            {/* Candidate Card 2: Smart Detection Highlight */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700/60 space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 font-bold flex items-center justify-center text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Aarav Patel</h4>
                    <p className="text-[11px] text-gray-500">Workstation 08 • Seat B-04</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                  Requires Review
                </span>
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-[#151C30] p-2.5 rounded-xl border border-amber-200 dark:border-amber-800/50">
                <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-400">
                  ⚠️ Smart Flag: Unusual movement pattern
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Highlighted for supervisor discretion. No student penalty applied.
                </p>
              </div>
            </div>

            {/* Candidate Card 3: Connection Resumed */}
            <div className="p-4 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 font-bold flex items-center justify-center text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Neha Verma</h4>
                    <p className="text-[11px] text-gray-500">Workstation 14 • Seat C-09</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Protected
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-[#151C30] p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Network Status:</span>
                  <span className="font-semibold text-blue-700">Reconnected</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Response Loss:</span>
                  <span className="font-bold text-emerald-600">0 Responses Lost</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supervisor Quick Bar */}
          <div className="px-6 py-3.5 bg-gray-50 dark:bg-[#101524] border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>All 38 exam workstations safely protected with local answer memory.</span>
            </div>
            <button
              onClick={() => handleLaunchDemo('candidate_monitor', 'officer')}
              className="inline-flex items-center gap-1.5 font-bold text-[#C62828] hover:underline cursor-pointer"
            >
              <span>Open Full Supervisor Console Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — THE PROBLEM
          ========================================================================= */}
      <section id="problem" className="py-16 bg-white dark:bg-[#0A0E1A] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              The Reality of Assessments
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              The Challenge With Modern Examinations
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              When high-stakes examinations take place, administrators and supervisors face real-world operational challenges that put student trust and institutional reputation at risk.
            </p>
          </div>

          {/* 4 Simple Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl border border-red-100 dark:border-gray-800 bg-[#FFFBFB] dark:bg-[#101524] space-y-3.5 hover:border-red-300 dark:hover:border-red-800 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/80 text-[#C62828] flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Limited Visibility
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Supervisors cannot easily keep track of everything happening during an examination across dozens of computers and test rooms.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl border border-red-100 dark:border-gray-800 bg-[#FFFBFB] dark:bg-[#101524] space-y-3.5 hover:border-red-300 dark:hover:border-red-800 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/80 text-[#C62828] flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Delayed Incident Handling
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Important examination incidents may take time to identify and organize, leading to student panic and difficult decision-making.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl border border-red-100 dark:border-gray-800 bg-[#FFFBFB] dark:bg-[#101524] space-y-3.5 hover:border-red-300 dark:hover:border-red-800 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/80 text-[#C62828] flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Scattered Information
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Different examination activities and incidents can become difficult to manage when recorded across disparate paper sheets and unlinked tools.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl border border-red-100 dark:border-gray-800 bg-[#FFFBFB] dark:bg-[#101524] space-y-3.5 hover:border-red-300 dark:hover:border-red-800 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/80 text-[#C62828] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Trust & Transparency
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Institutions need better ways to maintain confidence in the assessment process and prove fair conduct if inquiries arise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — THE SOLUTION
          ========================================================================= */}
      <section id="solution" className="py-16 bg-[#FFFBFB] dark:bg-[#070B14] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              The Complete Solution
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              One Platform. A Clearer Examination Process.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              ExamResQ connects every phase of an assessment into a continuous, human-centered workflow designed for reliability.
            </p>
          </div>

          {/* Simple Visual Flow: EXAM STARTS → MONITOR → IDENTIFY → REVIEW → RESPOND → REPORT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center text-center space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-gray-400">Step 01</span>
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">EXAM STARTS</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                Candidates begin in an organized, protected environment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center text-center space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-gray-400">Step 02</span>
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">MONITOR</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                Supervisors observe active rooms and stations from one place.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center text-center space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-gray-400">Step 03</span>
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">IDENTIFY</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                Smart assistance surfaces unusual activity for quick attention.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center text-center space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-gray-400">Step 04</span>
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">REVIEW</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                Supervisors evaluate context before taking any action.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center text-center space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
                <RotateCcw className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-gray-400">Step 05</span>
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">RESPOND</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                Provide assistance or adjustments calmly without exam panic.
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col items-center text-center space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#16803C] flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-gray-400">Step 06</span>
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">REPORT</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                Generate transparent summaries and verifiable receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — HOW EXAMRESQ WORKS
          ========================================================================= */}
      <section id="how-it-works" className="py-16 bg-white dark:bg-[#0A0E1A] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              Simple 4-Step Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              How ExamResQ Works
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              A straightforward process created for educators and examination authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 relative space-y-4 hover:border-red-200 transition-all">
              <span className="text-3xl font-black text-[#C62828]/25 font-mono">01</span>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Start the Examination
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  Set up and manage the examination environment with protected answer storage on each candidate workstation.
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Protected Against Connectivity Losses</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 relative space-y-4 hover:border-red-200 transition-all">
              <span className="text-3xl font-black text-[#C62828]/25 font-mono">02</span>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Monitor the Examination
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  Supervisors can view examination activity from one place, seeing progress across all candidates without guesswork.
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-blue-600 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Centralized Overview Screen</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 relative space-y-4 hover:border-red-200 transition-all">
              <span className="text-3xl font-black text-[#C62828]/25 font-mono">03</span>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Identify Unusual Activity
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  Smart assistance highlights activity that may require attention, filtering out noise so supervisors can focus easily.
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-amber-600 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Assisted Review Highlights</span>
              </div>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 relative space-y-4 hover:border-red-200 transition-all">
              <span className="text-3xl font-black text-[#C62828]/25 font-mono">04</span>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Review & Respond
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  Supervisors can review incidents and take appropriate action with full context, ensuring fair outcomes for candidates.
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Calm & Orderly Resolution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — MAIN FEATURES
          ========================================================================= */}
      <section id="features" className="py-16 bg-[#FFFBFB] dark:bg-[#070B14] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              Essential Capabilities For Administrators
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              Built to make high-stakes examinations reliable, transparent, and simple to oversee.
            </p>
          </div>

          {/* 6 User-Facing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Live Monitoring */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 flex flex-col justify-between space-y-4 hover:border-[#C62828] transition-all">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Live Monitoring
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  A centralized view to understand what is happening during an examination across all rooms and workstations.
                </p>
              </div>
              <button
                onClick={() => handleLaunchDemo('candidate_monitor', 'officer')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-50 dark:bg-gray-800 hover:bg-red-50 hover:text-[#C62828] dark:hover:bg-red-950/40 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                <span>View Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Smart Activity Detection */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 flex flex-col justify-between space-y-4 hover:border-amber-500 transition-all">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Smart Activity Detection
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  A demonstration of how AI-assisted technology can highlight unusual activity to support invigilator oversight.
                </p>
              </div>
              <button
                onClick={() => scrollToSection('smart-demo')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-50 dark:bg-gray-800 hover:bg-amber-50 hover:text-amber-800 dark:hover:bg-amber-950/40 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                <span>View Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Incident Management */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 flex flex-col justify-between space-y-4 hover:border-red-400 transition-all">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Incident Management
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Organize and review examination-related incidents in one place with complete context and timestamps.
                </p>
              </div>
              <button
                onClick={() => handleLaunchDemo('incidents', 'officer')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-50 dark:bg-gray-800 hover:bg-red-50 hover:text-[#C62828] dark:hover:bg-red-950/40 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                <span>View Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4: Candidate Overview */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 flex flex-col justify-between space-y-4 hover:border-[#C62828] transition-all">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Candidate Overview
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Quickly understand candidate attendance, room status, and overall examination readiness.
                </p>
              </div>
              <button
                onClick={() => handleLaunchDemo('centres', 'officer')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                <span>View Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 5: Examination Recovery */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 flex flex-col justify-between space-y-4 hover:border-emerald-500 transition-all">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#16803C] flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Examination Recovery
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Provide a structured way to handle network interruptions, add compensatory time, or resume without panic.
                </p>
              </div>
              <button
                onClick={() => handleLaunchDemo('recovery', 'officer')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-50 dark:bg-gray-800 hover:bg-emerald-50 hover:text-[#16803C] dark:hover:bg-emerald-950/40 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                <span>View Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 6: Audit & Reports */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 flex flex-col justify-between space-y-4 hover:border-purple-500 transition-all">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Audit & Reports
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Present examination information in a clear and organized format, providing proof of submission and records.
                </p>
              </div>
              <button
                onClick={() => handleLaunchDemo('audit', 'officer')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-950/40 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                <span>View Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — DEMO EXPERIENCE
          ========================================================================= */}
      <section id="demo-experience" className="py-16 bg-white dark:bg-[#0A0E1A] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              Live Product Experience
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              See ExamResQ in Action
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              Walk through the actual user experience from candidate testing to supervisor response and post-examination reporting.
            </p>
          </div>

          {/* Interactive Stepper Navigation */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
            {demoJourneySteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveDemoStep(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeDemoStep === idx
                    ? 'bg-[#C62828] text-white shadow-md shadow-red-900/20'
                    : 'bg-[#FFFBFB] dark:bg-[#101524] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-red-200'
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Demo Walkthrough Display Card */}
          {(() => {
            const currentStep = demoJourneySteps[activeDemoStep];
            return (
              <div className="bg-[#FFFBFB] dark:bg-[#101524] rounded-3xl border border-red-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Context & User Experience Rationale */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center">
                        {currentStep.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C62828]">
                          {currentStep.badge}
                        </span>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                          {currentStep.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {currentStep.summary}
                    </p>

                    {/* What the user experiences */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 block">
                        What Happens in This Step:
                      </span>
                      {currentStep.previewDetails.map((item, dIdx) => (
                        <div key={dIdx} className="p-2.5 rounded-xl bg-white dark:bg-[#151C30] border border-gray-200 dark:border-gray-800 text-xs">
                          <span className="font-semibold text-gray-900 dark:text-white block">{item.label}</span>
                          <span className="text-gray-500 dark:text-gray-400">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => handleLaunchDemo(currentStep.viewTarget, currentStep.roleTarget)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black bg-[#C62828] hover:bg-[#A81F1F] text-white shadow-md transition-all cursor-pointer hover:scale-105"
                      >
                        <span>Launch This Live Screen Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup / Screen Preview */}
                  <div className="lg:col-span-7 bg-white dark:bg-[#0D121F] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                          {currentStep.subtitle}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold text-gray-400 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                        Simulated Demo Screen
                      </span>
                    </div>

                    {/* Dynamic Simulated Preview Based on Step */}
                    {activeDemoStep === 0 && (
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center justify-between">
                          <span className="text-xs font-bold text-[#C62828]">Question 03 of 25</span>
                          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Saved Locally (0s lag)</span>
                        </div>
                        <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">
                          "Which layer of the protocol ensures that assessment responses remain buffered during an unexpected network drop?"
                        </p>
                        <div className="space-y-1.5 text-xs">
                          <div className="p-2 rounded-lg border border-red-300 bg-red-50 text-[#C62828] font-bold">● Local Protected Storage (Indexed Buffer)</div>
                          <div className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-600">○ Cloud-only dependent request</div>
                        </div>
                      </div>
                    )}

                    {activeDemoStep === 1 && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-1.5">
                          <span className="text-[11px] font-bold text-gray-800 dark:text-white block">Active Candidates</span>
                          <span className="text-2xl font-black text-[#C62828]">184</span>
                          <span className="text-[10px] text-gray-500 block">All stations operating normally</span>
                        </div>
                        <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-1.5">
                          <span className="text-[11px] font-bold text-gray-800 dark:text-white block">Supervisor Notice</span>
                          <span className="text-xs font-bold text-emerald-600 block">● Normal Assessment Pace</span>
                          <span className="text-[10px] text-gray-500 block">Zero unhandled alerts</span>
                        </div>
                      </div>
                    )}

                    {activeDemoStep === 2 && (
                      <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50/50 dark:bg-amber-950/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-900 dark:text-amber-300">⚠️ Activity Highlighted</span>
                          <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">Requires Review</span>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          Candidate at Desk 08 showed unusual motion. Highlighted politely for invigilator check.
                        </p>
                      </div>
                    )}

                    {activeDemoStep === 3 && (
                      <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900 dark:text-white">Incident #INC-1042</span>
                          <span className="text-blue-600 font-bold">Investigation Active</span>
                        </div>
                        <p className="text-gray-500 text-[11px]">
                          Reported: Lab Wi-Fi flicker lasting 18 seconds. All candidate responses safely retained in local storage.
                        </p>
                      </div>
                    )}

                    {activeDemoStep === 4 && (
                      <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2 text-xs">
                        <div className="flex justify-between items-center text-emerald-800 dark:text-emerald-300 font-bold">
                          <span>Supervisor Action Executed</span>
                          <span>+3 Mins Added</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-[11px]">
                          Supervisor calmly issued compensatory time credit to Room 02. Candidates continued without panic.
                        </p>
                      </div>
                    )}

                    {activeDemoStep === 5 && (
                      <div className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#121829] space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Candidate Submission Receipt Verified</span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Receipt ID: EXAMRESQ-2026-AUTH-09 • 25 / 25 responses logged without omission.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — SMART / AI DEMO
          ========================================================================= */}
      <section id="smart-demo" className="py-16 bg-[#FFFBFB] dark:bg-[#070B14] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-mono">
                SIMULATED DEMO • PROTOTYPE
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">
              Smart Assistance — Demonstration
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              Exploring how AI-assisted technology can support examination monitoring.
            </p>
          </div>

          {/* Interactive Simulated Demonstration Box */}
          <div className="bg-white dark:bg-[#101524] rounded-3xl border border-amber-200 dark:border-gray-800 shadow-md p-6 sm:p-8 space-y-6">
            
            {/* Scenario Chooser */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-2 font-mono">
                Select a Demonstration Scenario:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'phone' as const, label: 'Unusual Object', desc: 'Possible secondary device' },
                  { id: 'gaze' as const, label: 'Gaze Away', desc: 'Looking away repeatedly' },
                  { id: 'multi' as const, label: 'Multiple Persons', desc: 'Second face in camera view' },
                  { id: 'normal' as const, label: 'Normal Session', desc: 'Attentive candidate' },
                ].map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setAiDemoScenario(sc.id);
                      setAiSupervisorActionTaken(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      aiDemoScenario === sc.id
                        ? 'border-amber-400 bg-amber-50/70 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 font-bold'
                        : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#151C30] text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xs block">{sc.label}</span>
                    <span className="text-[10px] text-gray-500 block">{sc.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Activity Detection Card */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              aiDemoScenario === 'normal' 
                ? 'bg-emerald-50/40 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800'
                : 'bg-amber-50/50 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-700/60 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    aiDemoScenario === 'normal'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {aiDemoScenario === 'normal' ? <CheckCircle2 className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {aiDemoScenario === 'normal' ? 'Candidate Activity Normal' : 'Unusual Activity Detected'}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Simulated Demonstration Feed • Workstation 08
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                    aiDemoScenario === 'normal'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900 animate-pulse'
                  }`}>
                    {aiDemoScenario === 'normal' ? 'Status: Normal' : 'Status: Requires Review'}
                  </span>
                </div>
              </div>

              {/* Data Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-[#121829] border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-500 uppercase block">Candidate</span>
                  <span className="font-bold text-gray-900 dark:text-white">Demo Candidate (Priya Sharma)</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#121829] border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-500 uppercase block">Current Assessment</span>
                  <span className="font-bold text-gray-900 dark:text-white">Sample National Test</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#121829] border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-500 uppercase block">Flag Reason</span>
                  <span className={`font-bold ${aiDemoScenario === 'normal' ? 'text-emerald-700' : 'text-amber-800 dark:text-amber-400'}`}>
                    {aiDemoScenario === 'normal' && 'Attentive, normal posture observed'}
                    {aiDemoScenario === 'phone' && 'Example activity pattern: Secondary device profile'}
                    {aiDemoScenario === 'gaze' && 'Example activity pattern: Off-screen gaze duration'}
                    {aiDemoScenario === 'multi' && 'Example activity pattern: Additional person in frame'}
                  </span>
                </div>
              </div>

              {/* Supervisor Decision Options */}
              {aiDemoScenario !== 'normal' && (
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700/60">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-2">
                    Supervisor Discretion (Human Review Controls):
                  </span>
                  
                  {aiSupervisorActionTaken ? (
                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                      <span>✓ Action recorded: {aiSupervisorActionTaken}</span>
                      <button 
                        onClick={() => setAiSupervisorActionTaken(null)} 
                        className="underline text-[11px] cursor-pointer"
                      >
                        Reset Action
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => setAiSupervisorActionTaken('Dismissed as benign movement by supervisor.')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 cursor-pointer"
                      >
                        Dismiss as Benign
                      </button>
                      <button
                        onClick={() => setAiSupervisorActionTaken('Gentle on-screen reminder sent to candidate.')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 cursor-pointer"
                      >
                        Send Polite Reminder
                      </button>
                      <button
                        onClick={() => setAiSupervisorActionTaken('Logged for formal post-exam invigilator review.')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-red-100 hover:bg-red-200 text-[#C62828] cursor-pointer"
                      >
                        Flag for Formal Review
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MANDATORY REQUIRED DISCLAIMER NOTE */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#121829] border border-gray-200 dark:border-gray-800 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                "AI-assisted functionality shown here is a demonstration of the proposed concept and is intended to support human review rather than replace human judgment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — FOR ADMINISTRATORS
          ========================================================================= */}
      <section className="py-16 bg-white dark:bg-[#0A0E1A] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              Empowering Human Supervisors
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              Designed Around the People Managing Examinations
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              ExamResQ gives supervisors the tools they need to stay confident, organized, and in complete control throughout the examination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: See More Clearly */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 hover:border-red-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                See More Clearly
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Understand examination activity from one centralized view without jumping across disparate tabs or sheets.
              </p>
            </div>

            {/* Card 2: Respond Faster */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 hover:border-red-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Respond Faster
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Bring important incidents to the supervisor's attention early so issues are addressed before they affect the test.
              </p>
            </div>

            {/* Card 3: Stay Organized */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 hover:border-red-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Stay Organized
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Keep examination events and incidents structured in a clean, chronological log that eliminates paper confusion.
              </p>
            </div>

            {/* Card 4: Improve Transparency */}
            <div className="p-6 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 hover:border-red-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Improve Transparency
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Create a clearer record of examination-related activity to provide confidence to students, parents, and authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — IMPACT
          ========================================================================= */}
      <section id="impact" className="py-16 bg-[#FFFBFB] dark:bg-[#070B14] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              Real-World Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
              Why ExamResQ Matters
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              Transforming examination administration into a more reliable and human-centered experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Impact 1: Trust */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#16803C] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Trust
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                More confidence in the assessment process for educational institutions, candidates, and evaluators.
              </p>
            </div>

            {/* Impact 2: Transparency */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Transparency
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Clearer examination activity and incident records that prevent disputes and foster accountability.
              </p>
            </div>

            {/* Impact 3: Efficiency */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Efficiency
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Less manual effort in organizing examination information, tracking attendance, and resolving routine glitches.
              </p>
            </div>

            {/* Impact 4: Better Response */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Better Response
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Faster awareness of situations requiring attention, ensuring candidates are treated fairly and without panic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Policy Alignment (Digital India, NEP 2020, Good Governance) */}
      <section className="py-14 bg-white dark:bg-[#0A0E1A] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              National Vision Alignment
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-2">
              Supporting Institutional & National Goals
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-gray-600 dark:text-gray-300">
            <div className="p-4 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-black text-[#C62828] block">Digital India</span>
              <p>Reliable offline-first design enables regional and district test centres with varying internet to conduct exams smoothly.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-black text-blue-600 block">NEP 2020</span>
              <p>Candidate-centric approach ensures no student is penalized for technical glitches, electricity drops, or computer freezes.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFFBFB] dark:bg-[#101524] border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="font-black text-emerald-600 block">Good Governance</span>
              <p>Transparent digital verification ensures fair evaluation, verifiable audit receipts, and mutual confidence between students and authorities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — DEMO DISCLAIMER & FOOTER
          ========================================================================= */}
      <footer className="bg-gray-50 dark:bg-[#070B14] border-t border-gray-200 dark:border-gray-800 py-10 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Official Professional Disclaimer Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#101524] border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto text-center">
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              "ExamResQ is currently presented as a demonstration/prototype of a smarter examination support ecosystem. Some monitoring, AI-assisted detection, and live data shown in the demo are simulated for presentation purposes."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center font-bold text-xs">
                EQ
              </div>
              <span className="font-black text-gray-900 dark:text-white text-sm">
                Exam<span className="text-[#C62828]">ResQ</span>
              </span>
              <span className="text-gray-400">| Smart Examination Support Ecosystem</span>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <span>Demonstration Prototype</span>
              <span>•</span>
              <span>Designed for Educators & Institutions</span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Zero Response Loss</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
