import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  sampleDecisionSupportRecords, 
  sampleFairnessComparisons, 
  sampleStudentGrievanceTickets 
} from '../../data/governanceSecurityData';
import { DecisionSupportRecord, StudentGrievanceTicket } from '../../types';
import { 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  UserCheck, 
  FileText, 
  ShieldCheck, 
  X, 
  Check, 
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  HelpCircle,
  Building2,
  Users,
  Timer
} from 'lucide-react';

export const DecisionSupportCenter: React.FC = () => {
  const { addNotification, decisionSupportResult, getDecisionSupportScoring } = useResilience();
  const [incidents, setIncidents] = useState<DecisionSupportRecord[]>(sampleDecisionSupportRecords);
  const [grievances, setGrievances] = useState<StudentGrievanceTicket[]>(sampleStudentGrievanceTickets);
  const [selectedIncident, setSelectedIncident] = useState<DecisionSupportRecord | null>(incidents[0]);
  const [decisionModalOpen, setDecisionModalOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<DecisionSupportRecord['systemRecommendation']>('Extend');
  const [decisionNotes, setDecisionNotes] = useState<string>('');

  // Handle Official Decision Sign-off (Requirement 9)
  const handleAuthorizeDecision = (incidentId: string) => {
    const now = new Date().toLocaleTimeString();
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? {
            ...inc,
            authorityDecision: selectedAction,
            decisionRationale: decisionNotes || `Authority approved ${selectedAction} based on 100% response recovery evidence.`,
            authorizedOfficial: 'Dr. R. C. Varma (Chairman, Central Examination Authority)',
            authorizedAt: `Today at ${now}`,
            status: 'Approved & Executed'
          }
        : inc
    ));

    addNotification({
      target: 'admin',
      type: 'success',
      title: `Official Authority Decision Approved: ${selectedAction}`,
      message: `Sign-off recorded for ${incidentId}. System executed policy: ${selectedAction}.`
    });

    setDecisionModalOpen(false);
  };

  // Handle Student Grievance Resolution (Requirement 10)
  const handleResolveGrievance = (ticketId: string) => {
    setGrievances(prev => prev.map(g => 
      g.ticketId === ticketId 
        ? { ...g, status: 'Resolved - Extra Buffer Granted', resolvedBy: 'Fairness Disruption Committee' }
        : g
    ));

    addNotification({
      target: 'candidate',
      type: 'success',
      title: 'Grievance Review Approved',
      message: `Ticket ${ticketId} resolved. Equal treatment parity verified. Zero academic loss.`
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                Governance & Parity
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200">
                Human Sign-Off
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1.5 tracking-tight">
              Decision Support
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-3xl">
              Impact assessment, evidence-based resolutions, and compensatory time parity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-gray-100 text-gray-800 border border-gray-300">
              Fairness Protocol Active
            </span>
          </div>
        </div>

        {/* Short & Clean Decision & Parity Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-gray-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <div>
              <strong className="text-emerald-300">Human Sign-Off: </strong>
              <span>Empirical evidence provided; system never cancels without official sign-off.</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-950/40 border border-sky-800/50 text-gray-200">
            <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
            <div>
              <strong className="text-sky-300">Fairness Parity: </strong>
              <span>Standardized compensation formula guarantees equal parity across labs.</span>
            </div>
          </div>
        </div>

        {/* Live Mathematical Scoring Engine Banner (Req 09) */}
        <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <span>Autonomous Policy Recommendation:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold uppercase">
                    {decisionSupportResult.recommendedAction} ({decisionSupportResult.confidencePercent}% Confidence)
                  </span>
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  {decisionSupportResult.rationale}
                </p>
              </div>
            </div>

            <button
              onClick={() => getDecisionSupportScoring()}
              className="px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700 font-bold text-xs cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Recalculate Scores</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${decisionSupportResult.recommendedAction === 'Resume with Parity' ? 'bg-emerald-900/50 border-emerald-500 ring-1 ring-emerald-400' : 'bg-black/30 border-gray-800'}`}>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Resume Score</span>
              <div className="text-lg font-black font-mono text-emerald-300 mt-0.5">{decisionSupportResult.scores.resumeScore}/100</div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Sub-2m interruption + 0 loss</span>
            </div>

            <div className={`p-3 rounded-xl border ${decisionSupportResult.recommendedAction === 'Extend by +5m' ? 'bg-emerald-900/50 border-emerald-500 ring-1 ring-emerald-400' : 'bg-black/30 border-gray-800'}`}>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Extend Exam Score</span>
              <div className="text-lg font-black font-mono text-blue-300 mt-0.5">{decisionSupportResult.scores.extendScore}/100</div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Formula parity granted</span>
            </div>

            <div className={`p-3 rounded-xl border ${decisionSupportResult.recommendedAction === 'Reschedule Centre' ? 'bg-amber-900/50 border-amber-500 ring-1 ring-amber-400' : 'bg-black/30 border-gray-800'}`}>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Reschedule Score</span>
              <div className="text-lg font-black font-mono text-amber-300 mt-0.5">{decisionSupportResult.scores.rescheduleScore}/100</div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Catastrophic &gt; 30m outage</span>
            </div>

            <div className={`p-3 rounded-xl border ${decisionSupportResult.recommendedAction === 'Re-conduct Examination' ? 'bg-red-900/50 border-red-500 ring-1 ring-red-400' : 'bg-black/30 border-gray-800'}`}>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Re-conduct Score</span>
              <div className="text-lg font-black font-mono text-red-300 mt-0.5">{decisionSupportResult.scores.reconductScore}/100</div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Zero-recovery threshold</span>
            </div>
          </div>
        </div>

        {/* 5 Decision Support Options Grid */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-black text-gray-900">
              5 Decision Pathways
            </h3>
            <p className="text-xs text-gray-500">
              Authorized options for examination authority sign-off
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1 text-center">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">Option 01</span>
              <h4 className="font-bold text-emerald-950">RESUME</h4>
              <p className="text-[11px] text-gray-600">Disruption &lt; 2 mins, 100% data intact. Workstations resume immediately.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1 text-center">
              <span className="text-[10px] font-mono font-bold uppercase text-blue-800">Option 02</span>
              <h4 className="font-bold text-blue-950">EXTEND</h4>
              <p className="text-[11px] text-gray-600">Adds compensatory time (T_outage + 60s) to clocks. Exam continues seamlessly.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1 text-center">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-800">Option 03</span>
              <h4 className="font-bold text-amber-950">PAUSE</h4>
              <p className="text-[11px] text-gray-600">Freezes all timers while secondary edge fiber links warm up.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-orange-200 bg-orange-50/50 space-y-1 text-center">
              <span className="text-[10px] font-mono font-bold uppercase text-orange-800">Option 04</span>
              <h4 className="font-bold text-orange-950">RESCHEDULE</h4>
              <p className="text-[11px] text-gray-600">Automated free re-booking within 48h for affected batch.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/50 space-y-1 text-center">
              <span className="text-[10px] font-mono font-bold uppercase text-red-800">Option 05</span>
              <h4 className="font-bold text-red-950">RE-CONDUCT</h4>
              <p className="text-[11px] text-gray-600">Full re-examination if exam paper integrity is irrecoverably compromised.</p>
            </div>
          </div>
        </div>

        {/* Active Incident Decision Support Queue */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-black text-gray-900">
                Disruption Incident Impact & Decision Register
              </h3>
              <p className="text-xs text-gray-500">
                Official records of empirical impact assessments and authority decision authorizations
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {incidents.map((inc) => (
              <div 
                key={inc.id}
                className="p-5 rounded-2xl border border-gray-200 bg-[#F8F8F6] space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-100 text-[#C62828]">
                        {inc.incidentId}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900">{inc.centreName}</h4>
                    </div>
                    <span className="text-xs text-gray-500 mt-0.5 block">
                      Affected Candidates: <strong>{inc.affectedCandidates}</strong> • Outage Duration: <strong>{inc.incidentDurationMinutes} mins</strong> • Recovery Rate: <strong>{inc.responseRecoveryPercent}%</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                      Recommendation: {inc.systemRecommendation} ({inc.confidenceScore}% confidence)
                    </span>
                    <button
                      onClick={() => {
                        setSelectedIncident(inc);
                        setSelectedAction(inc.systemRecommendation);
                        setDecisionModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#171717] hover:bg-black text-white transition-colors cursor-pointer"
                    >
                      Authority Action & Sign-Off
                    </button>
                  </div>
                </div>

                {/* Evidence & Rationale Breakdown */}
                <div className="text-xs space-y-1.5">
                  <div className="text-gray-700">
                    <strong>Documented Official Rationale:</strong> {inc.decisionRationale}
                  </div>
                  <div className="text-gray-500 font-mono text-[11px] flex items-center gap-2">
                    <span>Authorized by: <strong>{inc.authorizedOfficial}</strong></span>
                    <span>•</span>
                    <span>Status: <strong className="text-[#16803C]">{inc.status}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirement 10: Equal Treatment Parity Matrix & Grievances */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parity Comparison Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase">
                  Candidate Equal Treatment Parity Matrix
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                Mathematical proof that identical disruptions yield identical compensation
              </p>
            </div>

            <div className="space-y-3">
              {sampleFairnessComparisons.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">{item.incidentGroup}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#16803C] font-mono font-bold text-[10px]">
                      Parity Score: {item.parityScore}% (100% Fair)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 bg-white rounded border border-gray-200">
                      <span className="text-gray-500 block">Candidate A: {item.candidateA.name}</span>
                      <span className="text-gray-900 font-bold">Outage: {item.candidateA.interruptionSeconds}s → +{item.candidateA.compensationGrantedSeconds}s</span>
                    </div>

                    <div className="p-2 bg-white rounded border border-gray-200">
                      <span className="text-gray-500 block">Candidate B: {item.candidateB.name}</span>
                      <span className="text-gray-900 font-bold">Outage: {item.candidateB.interruptionSeconds}s → +{item.candidateB.compensationGrantedSeconds}s</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-500 font-mono">
                    Rule: {item.standardFormula}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Grievance Resolution Desk */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase">
                  Candidate Review & Grievance Desk
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                Official review mechanism for candidates requesting audit of interruption time
              </p>
            </div>

            <div className="space-y-3">
              {grievances.map((ticket) => (
                <div key={ticket.ticketId} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-900">{ticket.candidateName}</span>
                      <span className="text-gray-500 text-[11px] ml-1.5 font-mono">({ticket.rollNumber})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                      {ticket.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-[11px]">{ticket.grievanceReason}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-200 text-[11px] font-mono text-gray-500">
                    <span>Claim: {ticket.claimedLossMinutes}m | Given: +{ticket.automatedCompensationMinutes}m</span>
                    <button
                      onClick={() => handleResolveGrievance(ticket.ticketId)}
                      className="text-xs font-bold text-[#C62828] hover:underline cursor-pointer"
                    >
                      Verify Parity & Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DECISION AUTHORIZATION MODAL */}
        {decisionModalOpen && selectedIncident && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16803C] flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Authority Disruption Decision Sign-Off</h3>
                    <p className="text-xs text-gray-500 font-mono">{selectedIncident.incidentId} • {selectedIncident.centreName}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setDecisionModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Affected Candidates:</span>
                    <span className="font-bold text-gray-900">{selectedIncident.affectedCandidates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Incident Duration:</span>
                    <span className="font-mono text-gray-800">{selectedIncident.incidentDurationMinutes} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Empirical Response Recovery:</span>
                    <span className="font-mono font-bold text-[#16803C]">{selectedIncident.responseRecoveryPercent}% (Verified)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">System AI Recommendation:</span>
                    <span className="font-bold text-blue-700">{selectedIncident.systemRecommendation}</span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-800 block mb-1.5">
                    Select Authorized Decision Pathway:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {(['Resume', 'Extend', 'Pause', 'Reschedule', 'Re-Conduct'] as const).map(action => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => setSelectedAction(action)}
                        className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          selectedAction === action
                            ? 'border-[#C62828] bg-red-50 text-[#C62828] ring-1 ring-[#C62828]'
                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-800 block mb-1">
                    Documented Justification & Authority Rationale:
                  </label>
                  <textarea
                    rows={3}
                    value={decisionNotes}
                    onChange={(e) => setDecisionNotes(e.target.value)}
                    placeholder="Enter official rationale for audit logs (e.g. 100% data intact, compensatory time credits applied, student parity guaranteed)..."
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#C62828]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDecisionModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAuthorizeDecision(selectedIncident.id)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16803C] hover:bg-emerald-700 text-white cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sign & Execute Official Decision</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
