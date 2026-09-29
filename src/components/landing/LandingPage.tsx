import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { HeroVisualization } from './HeroVisualization';
import { PillarsSection } from './PillarsSection';
import { SystemReadinessWidget } from './SystemReadinessWidget';
import { 
  ShieldCheck, 
  ArrowRight, 
  PlayCircle, 
  Lock, 
  Server, 
  FileCheck2, 
  Cpu, 
  CheckCircle2, 
  XCircle,
  Building2,
  Activity
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, startDemo } = useResilience();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] dark:bg-[#0A0B0E] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#C62828]/12 via-[#E53935]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* 1. HERO SECTION */}
      <section className="pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Institutional Luxury Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#13151D]/90 border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/40 dark:shadow-black/40 backdrop-blur-md mb-6 hover:scale-105 transition-all">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-gray-800 dark:text-gray-200 font-mono">
              Idea & Innovation Hackathon 2026 • Presidential Grade Ecosystem
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#171717] dark:text-white tracking-tight leading-tight">
            EVAL<span className="text-[#C62828] drop-shadow-sm">TRUST</span>
          </h1>

          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#C62828] mt-3 tracking-tight">
            Reliable Assessments. Zero Lost Responses.
          </p>

          {/* Supporting Text */}
          <p className="mt-5 text-base sm:text-lg text-[#666666] dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
            A resilient online assessment ecosystem designed to maintain exam continuity, protect candidate responses during disruptions, provide real-time operational visibility, and create a transparent audit trail.
          </p>

          {/* CTAs (Per instruction: Primary CTA "Explore EvalTrust", Secondary CTA "See How It Works". DO NOT put "Start Exam" on the hero.) */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('architecture')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-lg shadow-[#C62828]/25 hover:shadow-xl hover:shadow-[#C62828]/35 transition-all cursor-pointer hover:scale-105"
            >
              <span>Explore EvalTrust</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={startDemo}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold bg-white dark:bg-[#13151D] border border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <PlayCircle className="w-4 h-4 text-[#C62828]" />
              <span>See How It Works</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Animation */}
        <div className="mt-8">
          <HeroVisualization />
        </div>
      </section>

      {/* 2. THE CORE PROBLEM VS EVALTRUST RESILIENCE */}
      <section id="architecture" className="py-14 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              The Problem Statement
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-3">
              Why Traditional Online Examinations Break Down
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Online examinations cannot be treated like ordinary web apps. Millions of student futures depend on uninterrupted continuity during high-stakes tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old / Vulnerable Way */}
            <div className="p-6 rounded-2xl border border-red-200 bg-red-50/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-[#C62828]">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Traditional Exam Platforms</h3>
                  <p className="text-xs text-[#C62828] font-medium">Fragile, opaque & disruption-prone</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C62828] font-bold">✕</span>
                  <span><strong>Internet drops = Blank screens:</strong> Candidates lose progress and enter panic states.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C62828] font-bold">✕</span>
                  <span><strong>Lost Responses:</strong> Unsaved answers vanish if connection breaks before form submission.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C62828] font-bold">✕</span>
                  <span><strong>Blind Operations:</strong> Administrators only discover centre-level failures after students protest.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C62828] font-bold">✕</span>
                  <span><strong>No Post-Exam Proof:</strong> Impossible to prove what happened during an outage for court or grievance inquiries.</span>
                </li>
              </ul>
            </div>

            {/* The EvalTrust Resilient Way */}
            <div className="p-6 rounded-2xl border border-emerald-300 bg-emerald-50/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#16803C]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">The EvalTrust Resilient Ecosystem</h3>
                  <p className="text-xs text-[#16803C] font-medium">Engineered for absolute continuity</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16803C] font-bold">✓</span>
                  <span><strong>Guaranteed Zero Lost Responses:</strong> Client-side encrypted cryptographic ledger preserves every click.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16803C] font-bold">✓</span>
                  <span><strong>1.2s Automated Detection:</strong> Watchdog telemetry flags network degradation before candidates notice.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16803C] font-bold">✓</span>
                  <span><strong>Self-Healing Recovery:</strong> Automatic failover to secondary WAN backhaul with delta synchronization.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#16803C] font-bold">✓</span>
                  <span><strong>Transparent Audit Trail:</strong> Merkle state proofs provide dispute-free legal and institutional trust.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 5 PILLARS (PREVENTION -> DETECTION -> RESPONSE -> RECOVERY -> TRUST) */}
      <PillarsSection />

      {/* 4. LIVE READINESS & DETECTION TELEMETRY */}
      <SystemReadinessWidget />

      {/* 5. EXPLORE PORTALS & BOTTOM CTA */}
      <section className="py-14 bg-[#F8F8F6] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-[#C62828] font-bold uppercase">
                  Institutional Ready Prototype
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-1">
                  Ready to Experience the Complete Ecosystem?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Switch between the Candidate examination view, the institutional Operations Room, the Centre drill-down, the Incident Management center, and the Cryptographic Audit ledger.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setCurrentView('operations')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer"
                  >
                    <Activity className="w-4 h-4 text-[#E53935]" />
                    <span>Launch Operations Dashboard</span>
                  </button>

                  <button
                    onClick={() => setCurrentView('live_exam')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Experience Candidate Exam</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setCurrentView('centres')}
                  className="p-4 rounded-xl border border-gray-200 bg-[#F8F8F6] hover:border-[#C62828] cursor-pointer transition-all"
                >
                  <Building2 className="w-5 h-5 text-[#C62828] mb-2" />
                  <span className="text-xs font-bold text-gray-900 block">Centre Monitoring</span>
                  <span className="text-[11px] text-gray-500">Live telemetry across 38 regional centres</span>
                </div>

                <div 
                  onClick={() => setCurrentView('incidents')}
                  className="p-4 rounded-xl border border-gray-200 bg-[#F8F8F6] hover:border-[#C62828] cursor-pointer transition-all"
                >
                  <Cpu className="w-5 h-5 text-[#C77A00] mb-2" />
                  <span className="text-xs font-bold text-gray-900 block">Incident Center</span>
                  <span className="text-[11px] text-gray-500">Sub-second timeline for incident #ET-1042</span>
                </div>

                <div 
                  onClick={() => setCurrentView('recovery')}
                  className="p-4 rounded-xl border border-gray-200 bg-[#F8F8F6] hover:border-[#C62828] cursor-pointer transition-all"
                >
                  <Server className="w-5 h-5 text-blue-600 mb-2" />
                  <span className="text-xs font-bold text-gray-900 block">Recovery Center</span>
                  <span className="text-[11px] text-gray-500">Resilience status & delta stream queue</span>
                </div>

                <div 
                  onClick={() => setCurrentView('audit')}
                  className="p-4 rounded-xl border border-gray-200 bg-[#F8F8F6] hover:border-[#C62828] cursor-pointer transition-all"
                >
                  <FileCheck2 className="w-5 h-5 text-[#16803C] mb-2" />
                  <span className="text-xs font-bold text-gray-900 block">Audit & Trust</span>
                  <span className="text-[11px] text-gray-500">Cryptographic SHA-256 Merkle root verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NATIONAL POLICY ALIGNMENT SECTION (Digital India, NEP 2020, Viksit Bharat 2047, Good Governance) */}
      <section className="py-16 bg-white dark:bg-[#13151D] border-t border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 px-3 py-1 rounded-full font-mono">
              National Vision & Policy Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
              Aligned with India's Major Strategic Policies
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              EVALTRUST is architected to advance the digital sovereignty, equity, and transparency missions of key national initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-[#F8F8F6] dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-[#C62828] flex items-center justify-center font-bold">
                DI
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Digital India</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                Empowering district and rural test centres with autonomous offline resilience. High-stakes exams run uninterrupted even with intermittent connectivity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F8F6] dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
                NEP
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">NEP 2020</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                National Education Policy focus on student-centric, stress-free examination environments with zero candidate penalty for infrastructure breakdowns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F8F6] dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 flex items-center justify-center font-bold">
                VB
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Viksit Bharat 2047</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                Pioneering world-class digital public infrastructure (DPI) for education that eliminates paper wastage and multi-crore re-examination expenditures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F8F6] dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#16803C] flex items-center justify-center font-bold">
                GG
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Good Governance</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                Restoring absolute public trust in examination authorities through verifiable SHA-256 Merkle proofs, judicial auditability, and zero administrative bias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#C62828] flex items-center justify-center text-white text-xs font-bold">
              ET
            </div>
            <span className="font-extrabold text-gray-900">EVAL<span className="text-[#C62828]">TRUST</span> 2026</span>
            <span>— Resilient & Trustworthy Online Assessment Ecosystem</span>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <span>Hackathon Prototype</span>
            <span>•</span>
            <span>Government & Institution Ready</span>
            <span>•</span>
            <span className="text-[#16803C] font-semibold">Zero Data Loss Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
