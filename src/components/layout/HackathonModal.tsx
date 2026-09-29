import React, { useState } from 'react';
import { useResilience, AppView } from '../../context/ResilienceContext';
import { 
  X, 
  HelpCircle, 
  ShieldAlert, 
  Cpu, 
  Server, 
  CheckCircle2, 
  FileCheck2, 
  AlertTriangle, 
  Camera, 
  ArrowRight,
  Database,
  Radio,
  BookOpen,
  Award,
  ExternalLink,
  Layers,
  Flag
} from 'lucide-react';

interface HackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonModal: React.FC<HackathonModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentView } = useResilience();
  const [activeTab, setActiveTab] = useState<'problem_solution' | 'challenge_features' | 'pillars' | 'policy'>('problem_solution');

  if (!isOpen) return null;

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#13151D] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#0E1017] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-black shadow-md shadow-[#C62828]/25">
              ET
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C62828]">
                  Idea & Innovation Hackathon 2026
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-[#C62828]">
                  Problem Statement Solution
                </span>
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white mt-0.5">
                Resilient & Trustworthy Online Assessment Ecosystem
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('problem_solution')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'problem_solution'
                ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            1. Problem vs Solution
          </button>
          <button
            onClick={() => setActiveTab('challenge_features')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'challenge_features'
                ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            2. The 7 Challenge Capabilities
          </button>
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pillars'
                ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            3. The 5 Core Pillars
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'policy'
                ? 'bg-white dark:bg-[#181B26] text-[#C62828] shadow-xs font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            4. National Policy Alignment
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: Problem vs Solution */}
          {activeTab === 'problem_solution' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase text-[#C62828] block">
                  The Critical Problem Statement
                </span>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xs">
                  Bade national exams online shift ho rahe hain, lekin <strong>Technical Failures</strong> (server down, internet chala jana, computer freeze), <strong>Operational Issues</strong> (mismanagement, corrupted answers), aur <strong>Security Concerns</strong> (leaks, cheating) ki wajah se exams cancel/reschedule hote hain. Isse government ka arbon rupaye ka nuksan hota hai aur students ka vishwas toot jata hai.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/60 text-[#C62828] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Technical Failures</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong>Solution:</strong> EVALTRUST Client-Side Encrypted Ledger (AES-256) locks answers on-device in 0.04s. Zero answers lost even during complete WAN cut.
                  </p>
                  <button
                    onClick={() => navigateTo('live_exam')}
                    className="text-[#C62828] font-bold hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>Test in Live Exam</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-[#C77A00] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Operational Blindness</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong>Solution:</strong> Sub-second automated anomaly watchdog flags network drops across all 38 centres within 1.2s before students panic.
                  </p>
                  <button
                    onClick={() => navigateTo('operations')}
                    className="text-[#C62828] font-bold hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>Inspect Operations Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#16803C] flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Security & Tampering</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong>Solution:</strong> AI-powered Cheating Detection (Face/Pose/Tab-switch) combined with immutable SHA-256 Merkle audit proof.
                  </p>
                  <button
                    onClick={() => navigateTo('audit')}
                    className="text-[#C62828] font-bold hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>View Cryptographic Proof</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: The 7 Challenge Capabilities */}
          {activeTab === 'challenge_features' && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block">
                Direct Mapping of Challenge Capabilities to EVALTRUST Prototype
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#181B26] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Radio className="w-4 h-4 text-[#C62828]" /> 1. Live Monitoring
                    </span>
                    <button onClick={() => navigateTo('operations')} className="text-[11px] text-[#C62828] font-bold hover:underline">Launch →</button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px]">Real-time server health, latency radar, and active candidate telemetry across 38 regional test centres.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#181B26] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-[#C77A00]" /> 2. Early Detection
                    </span>
                    <button onClick={() => navigateTo('incidents')} className="text-[11px] text-[#C62828] font-bold hover:underline">Launch →</button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px]">Autonomous anomaly watchdog detects ISP uplink dropouts in 1.2s before candidates notice screen freeze.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#181B26] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-blue-600" /> 3. Backup & Zero-Loss Recovery
                    </span>
                    <button onClick={() => navigateTo('recovery')} className="text-[11px] text-[#C62828] font-bold hover:underline">Launch →</button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px]">Multi-WAN microwave backhaul failover + vector clock delta queue reconciles answers with 0.00% data loss.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#181B26] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-purple-600" /> 4. AI Cheating Detection
                    </span>
                    <button onClick={() => navigateTo('live_exam')} className="text-[11px] text-[#C62828] font-bold hover:underline">Launch →</button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px]">Integrated AI Proctor HUD in Live Exam detects face absence, tab switching, and secondary persons live.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#181B26] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-[#C62828]" /> 5. Secure Tamper-Proof Storage
                    </span>
                    <button onClick={() => navigateTo('live_exam')} className="text-[11px] text-[#C62828] font-bold hover:underline">Launch →</button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px]">Client-side IndexedDB sandbox encrypted with ephemeral AES-256 session keys prevents any client manipulation.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#181B26] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Radio className="w-4 h-4 text-[#16803C]" /> 6. Real-Time Communication
                    </span>
                    <button onClick={() => navigateTo('live_exam')} className="text-[11px] text-[#C62828] font-bold hover:underline">Launch →</button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px]">Candidate is instantly reassured ("Your response is protected") and admin operations center alerted.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#181B26] space-y-1.5 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-600" /> 7. Post-Exam Audit & Verifiable Reports
                    </span>
                    <button onClick={() => navigateTo('audit')} className="text-[11px] text-[#C62828] font-bold hover:underline">Launch →</button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px]">SHA-256 Merkle root state seal provides irrefutable forensic audit proof for courts, exam boards, and candidates.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: The 5 Core Pillars */}
          {activeTab === 'pillars' && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block">
                The 5 Resilience Pillars Mandated by Problem Statement
              </span>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181B26] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">PREVENTION: Pre-empt Failures</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">Automated pre-flight synthetic load testing across server clusters, edge appliances, and client sandboxes.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181B26] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-[#C77A00] flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">DETECTION: 1.2s Anomaly Watchdog</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">500ms bidirectional UDP keep-alives identify dropped packets before screen freezes manifest to candidates.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181B26] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-[#C62828] flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">RESPONSE: Candidate-First Protection</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">Candidate informed calmly. Encrypted client ledger locks answers with zero lost clicks and timer freeze safety.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181B26] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">RECOVERY: Multi-WAN Edge Failover</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">Automatic failover to secondary microwave route and delta stream reconciliation with MTTR under 48 seconds.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181B26] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#16803C] flex items-center justify-center font-bold shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">TRUST: Cryptographic Verification</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">Merkle state tree seals all events into an immutable digital certificate eliminating corruption and legal dispute.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: National Policy Alignment */}
          {activeTab === 'policy' && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block">
                Aligned with National Strategic Policies & Vision
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-[#C62828]" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">Digital India Initiative</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                    Builds sovereign digital resilience for tier-2/tier-3 district test centres, allowing remote rural centres to conduct high-stakes assessments reliably even over intermittent connectivity.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">NEP 2020 (National Education Policy)</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                    Ensures fair, stress-free, and equitable testing conditions where students are never penalized or traumatized because of infrastructure glitches or sudden server reboots.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">Viksit Bharat 2047 Vision</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                    Establishes world-class, zero-downtime, paperless examination technology saving thousands of crores of public funds lost to exam cancellations and paper re-examinations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#181B26] border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">Good Governance & Public Trust</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                    Eliminates public skepticism, administrative fraud, and paper leaks through cryptographic transparency, verifiable hash receipts, and unalterable audit trails.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#0E1017] flex items-center justify-between text-xs">
          <span className="text-gray-500 font-mono">MVP Version 2.4 • Hackathon Ready</span>
          <button
            onClick={() => navigateTo('live_exam')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-xs cursor-pointer"
          >
            <span>Experience Live Prototype</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
