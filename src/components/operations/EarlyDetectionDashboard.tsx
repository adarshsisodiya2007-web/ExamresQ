import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { AssessmentCentre } from '../../types';
import { 
  Radar, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Wifi, 
  WifiOff, 
  Server, 
  ArrowRight, 
  Send, 
  Download, 
  RefreshCw, 
  Filter, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Building2, 
  ChevronRight,
  TrendingDown,
  Zap,
  Radio,
  FileCheck2,
  ExternalLink,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PredictiveCentre extends AssessmentCentre {
  riskCategory: 'critical' | 'high' | 'moderate' | 'low';
  stabilityScore: number;
  repeatedDisconnections: number;
  predictedDisruptionProbability: number;
  packetLossPercent: number;
  jitterMs: number;
  observedIndicators: string[];
  preventiveRecommendations: string[];
  warningNoticeIssued: boolean;
}

const initialPredictiveCentres: PredictiveCentre[] = [
  {
    id: "centre-08",
    name: "Centre 08 — North Academic Complex",
    city: "New Delhi",
    region: "North Zone",
    status: "attention",
    totalCandidates: 184,
    activeCandidates: 179,
    networkLatency: 218,
    healthScore: 71.4,
    openIncidents: 1,
    lastSync: "10:42:31",
    ipRange: "192.168.108.0/24",
    edgeGatewayStatus: "degraded",
    riskCategory: "critical",
    stabilityScore: 68.2,
    repeatedDisconnections: 5,
    predictedDisruptionProbability: 84,
    packetLossPercent: 9.4,
    jitterMs: 54,
    observedIndicators: [
      "5 latency spikes (>210ms) detected over last 45 minutes",
      "Repeated packet jitter (54ms) on Primary Fiber Uplink",
      "Gateway BGP route flap detected at upstream exchange"
    ],
    preventiveRecommendations: [
      "Switch workstation traffic to secondary standby Edge Fiber Uplink",
      "Pre-cache encrypted offline question bundles on all 180 local terminals",
      "Issue urgent advisory to Centre Superintendent to verify local switch before next shift"
    ],
    warningNoticeIssued: true
  },
  {
    id: "centre-14",
    name: "Centre 14 — Western Polytechnic Hall",
    city: "Mumbai",
    region: "West Zone",
    status: "attention",
    totalCandidates: 250,
    activeCandidates: 246,
    networkLatency: 94,
    healthScore: 84.1,
    openIncidents: 0,
    lastSync: "10:42:58",
    ipRange: "192.168.114.0/24",
    edgeGatewayStatus: "online",
    riskCategory: "high",
    stabilityScore: 78.5,
    repeatedDisconnections: 3,
    predictedDisruptionProbability: 62,
    packetLossPercent: 4.1,
    jitterMs: 38,
    observedIndicators: [
      "3 micro-disconnections registered during morning warm-up",
      "Secondary ISP line latency jitter elevated (+38ms)",
      "UPS battery backup health at 82% estimated capacity"
    ],
    preventiveRecommendations: [
      "Run automated packet integrity test across local lab switch",
      "Engage dual-carrier cellular bonding for gateway redundancy",
      "Ensure offline cryptographic response queue is locked in memory"
    ],
    warningNoticeIssued: true
  },
  {
    id: "centre-22",
    name: "Centre 22 — National Technology Campus",
    city: "Hyderabad",
    region: "South Zone",
    status: "operational",
    totalCandidates: 410,
    activeCandidates: 408,
    networkLatency: 48,
    healthScore: 89.2,
    openIncidents: 0,
    lastSync: "10:43:10",
    ipRange: "192.168.122.0/24",
    edgeGatewayStatus: "online",
    riskCategory: "high",
    stabilityScore: 82.4,
    repeatedDisconnections: 2,
    predictedDisruptionProbability: 51,
    packetLossPercent: 2.8,
    jitterMs: 29,
    observedIndicators: [
      "2 micro-jitter spikes on primary WAN port",
      "Local DNS resolution latency increased to 120ms"
    ],
    preventiveRecommendations: [
      "Flush local DNS cache and configure secondary Anycast DNS",
      "Verify Edge server keep-alive ping interval is set to 500ms"
    ],
    warningNoticeIssued: false
  },
  {
    id: "centre-03",
    name: "Centre 03 — Eastern Digital Testing Arena",
    city: "Kolkata",
    region: "East Zone",
    status: "operational",
    totalCandidates: 290,
    activeCandidates: 288,
    networkLatency: 34,
    healthScore: 92.5,
    openIncidents: 0,
    lastSync: "10:43:15",
    ipRange: "192.168.103.0/24",
    edgeGatewayStatus: "online",
    riskCategory: "moderate",
    stabilityScore: 88.9,
    repeatedDisconnections: 1,
    predictedDisruptionProbability: 31,
    packetLossPercent: 1.2,
    jitterMs: 18,
    observedIndicators: [
      "1 brief latency anomaly (85ms) during candidate login batch",
      "Bandwidth utilization reached 78% during question asset download"
    ],
    preventiveRecommendations: [
      "Enable bandwidth throttling on non-exam subnet",
      "Monitor WAN interface queue depth before 02:00 PM session"
    ],
    warningNoticeIssued: false
  },
  {
    id: "centre-05",
    name: "Centre 05 — Central Informatics Pavilion",
    city: "Jaipur",
    region: "North Zone",
    status: "operational",
    totalCandidates: 340,
    activeCandidates: 339,
    networkLatency: 28,
    healthScore: 95.8,
    openIncidents: 0,
    lastSync: "10:43:20",
    ipRange: "192.168.105.0/24",
    edgeGatewayStatus: "online",
    riskCategory: "moderate",
    stabilityScore: 91.2,
    repeatedDisconnections: 1,
    predictedDisruptionProbability: 24,
    packetLossPercent: 0.8,
    jitterMs: 14,
    observedIndicators: [
      "Minor packet loss (0.8%) observed during shift handover",
      "Ambient server room temperature slightly elevated (28°C)"
    ],
    preventiveRecommendations: [
      "Verify HVAC ventilation in server room",
      "Perform scheduled pre-exam gateway heartbeat verification"
    ],
    warningNoticeIssued: false
  },
  {
    id: "centre-01",
    name: "Centre 01 — Metro Science Institute",
    city: "Bengaluru",
    region: "South Zone",
    status: "operational",
    totalCandidates: 320,
    activeCandidates: 318,
    networkLatency: 14,
    healthScore: 99.8,
    openIncidents: 0,
    lastSync: "10:43:02",
    ipRange: "192.168.101.0/24",
    edgeGatewayStatus: "online",
    riskCategory: "low",
    stabilityScore: 99.4,
    repeatedDisconnections: 0,
    predictedDisruptionProbability: 3,
    packetLossPercent: 0.0,
    jitterMs: 4,
    observedIndicators: [
      "All primary and secondary fiber lines operating optimally",
      "Mean latency < 15ms; zero packet loss over last 6 hours"
    ],
    preventiveRecommendations: [
      "Normal operations verified; maintain continuous passive telemetry"
    ],
    warningNoticeIssued: false
  },
  {
    id: "centre-09",
    name: "Centre 09 — Cyber City Assessment Center",
    city: "Gurugram",
    region: "North Zone",
    status: "operational",
    totalCandidates: 280,
    activeCandidates: 280,
    networkLatency: 18,
    healthScore: 99.2,
    openIncidents: 0,
    lastSync: "10:43:05",
    ipRange: "192.168.109.0/24",
    edgeGatewayStatus: "online",
    riskCategory: "low",
    stabilityScore: 98.9,
    repeatedDisconnections: 0,
    predictedDisruptionProbability: 4,
    packetLossPercent: 0.1,
    jitterMs: 6,
    observedIndicators: [
      "Redundant 1 Gbps lease line synchronized",
      "Workstation local cryptographic storage fully operational"
    ],
    preventiveRecommendations: [
      "Standard routine monitoring active"
    ],
    warningNoticeIssued: false
  }
];

export const EarlyDetectionDashboard: React.FC = () => {
  const { addNotification } = useResilience();
  const [centres, setCentres] = useState<PredictiveCentre[]>(initialPredictiveCentres);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'all' | 'critical' | 'high' | 'moderate' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCentre, setSelectedCentre] = useState<PredictiveCentre | null>(initialPredictiveCentres[0]);
  const [isExecutingAction, setIsExecutingAction] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Filtered Centres
  const filteredCentres = centres.filter(centre => {
    const matchesFilter = selectedRiskFilter === 'all' || centre.riskCategory === selectedRiskFilter;
    const matchesSearch = centre.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          centre.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          centre.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // KPI Counts
  const criticalCount = centres.filter(c => c.riskCategory === 'critical').length;
  const highCount = centres.filter(c => c.riskCategory === 'high').length;
  const moderateCount = centres.filter(c => c.riskCategory === 'moderate').length;
  const lowCount = centres.filter(c => c.riskCategory === 'low').length;

  // Execute Preventive Action for a Centre
  const handleExecutePreventiveAction = (centreId: string) => {
    setIsExecutingAction(true);
    setActionSuccessMessage(null);

    setTimeout(() => {
      setCentres(prev => prev.map(c => {
        if (c.id === centreId) {
          return {
            ...c,
            riskCategory: 'low',
            stabilityScore: 99.6,
            repeatedDisconnections: 0,
            predictedDisruptionProbability: 4,
            packetLossPercent: 0.0,
            networkLatency: 18,
            healthScore: 99.4,
            status: 'operational',
            edgeGatewayStatus: 'online',
            warningNoticeIssued: true,
            observedIndicators: [
              "Preventive failover executed: Secondary fiber line active & verified",
              "All 180 local workstations pre-buffered with offline cryptographic keys",
              "Automated network loopback probe confirmed 0.0% packet loss"
            ]
          };
        }
        return c;
      }));

      // Update selected centre state if it's the one being modified
      setSelectedCentre(prev => {
        if (prev && prev.id === centreId) {
          return {
            ...prev,
            riskCategory: 'low',
            stabilityScore: 99.6,
            repeatedDisconnections: 0,
            predictedDisruptionProbability: 4,
            packetLossPercent: 0.0,
            networkLatency: 18,
            healthScore: 99.4,
            status: 'operational',
            edgeGatewayStatus: 'online',
            warningNoticeIssued: true,
            observedIndicators: [
              "Preventive failover executed: Secondary fiber line active & verified",
              "All 180 local workstations pre-buffered with offline cryptographic keys",
              "Automated network loopback probe confirmed 0.0% packet loss"
            ]
          };
        }
        return prev;
      });

      setIsExecutingAction(false);
      setActionSuccessMessage(`Preventive action successfully executed on ${centreId.toUpperCase()}. Risk downgraded from Critical to Low!`);

      addNotification({
        target: 'admin',
        type: 'success',
        title: 'Preventive Action Executed',
        message: `${centreId.toUpperCase()}: Secondary failover engaged. 180 sessions 100% safeguarded.`
      });

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#16803C', '#2E7D32', '#C62828']
        });
      } catch (e) {}
    }, 1200);
  };

  // Simulate Anomaly on Centre 08 for Hackathon Demonstration
  const handleSimulateInstabilitySpike = () => {
    setCentres(prev => prev.map(c => {
      if (c.id === 'centre-08') {
        return {
          ...c,
          riskCategory: 'critical',
          stabilityScore: 54.2,
          repeatedDisconnections: 7,
          predictedDisruptionProbability: 92,
          packetLossPercent: 14.8,
          networkLatency: 284,
          healthScore: 64.1,
          edgeGatewayStatus: 'degraded',
          warningNoticeIssued: false,
          observedIndicators: [
            "⚠️ CRITICAL: 7 consecutive latency spikes (>280ms) over last 30 minutes",
            "Packet loss surged to 14.8% on primary WAN uplink",
            "Gateway BGP instability: 92% probability of total disconnect before next shift"
          ]
        };
      }
      return c;
    }));

    addNotification({
      target: 'admin',
      type: 'alert',
      title: 'Predictive Anomaly Detected',
      message: 'CENTRE 08: 7 network drops detected. 92% disruption probability predicted.'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Early Detection Header */}
      <div className="bg-white dark:bg-[#13151D] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-red-500/5 to-transparent pointer-events-none rounded-bl-full" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#C62828]/10 text-[#C62828] border border-[#C62828]/30 flex items-center gap-1">
                <Radar className="w-3.5 h-3.5 animate-pulse" />
                Predictive Telemetry
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-[#16803C] border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> AI Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Early Detection
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Predictive risk analysis across test centres to mitigate disruptions before they occur.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleSimulateInstabilitySpike}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-[#C77A00] border border-amber-300 dark:border-amber-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Simulate network instability on Centre 08"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Anomaly</span>
            </button>

            <button
              onClick={() => {
                setCentres(initialPredictiveCentres);
                setSelectedCentre(initialPredictiveCentres[0]);
                setActionSuccessMessage(null);
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>
      </div>

      {/* Early Warning Card */}
      <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent dark:from-red-950/40 dark:via-amber-950/20 rounded-2xl border border-red-200 dark:border-red-900/60 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#C62828] text-white shrink-0 shadow-md">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Centre 08 (New Delhi) — Connectivity Instability Warning
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/80 text-[#C62828]">
                  CRITICAL PROBABILITY: 84%
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                5 repeated latency spikes detected over last 45 minutes. Pre-emptive failover available.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleExecutePreventiveAction('centre-08')}
              disabled={isExecutingAction || centres.find(c => c.id === 'centre-08')?.riskCategory === 'low'}
              className={`px-4 py-2.5 rounded-xl text-xs font-black text-white transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                centres.find(c => c.id === 'centre-08')?.riskCategory === 'low'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-[#C62828] hover:bg-[#8E1B1B] animate-pulse'
              }`}
            >
              {isExecutingAction ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Failover...</span>
                </>
              ) : centres.find(c => c.id === 'centre-08')?.riskCategory === 'low' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Preventive Measures Sealed</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Execute Preventive Failover</span>
                </>
              )}
            </button>
          </div>
        </div>

        {actionSuccessMessage && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* 4 Risk Categories KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Critical Risk */}
        <button
          onClick={() => setSelectedRiskFilter(selectedRiskFilter === 'critical' ? 'all' : 'critical')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            selectedRiskFilter === 'critical'
              ? 'bg-red-500/10 border-red-500 shadow-md ring-2 ring-red-500/30'
              : 'bg-white dark:bg-[#13151D] border-gray-200 dark:border-gray-800 hover:border-red-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span className="font-bold flex items-center gap-1 text-[#C62828]">
              <span className="w-2 h-2 rounded-full bg-[#C62828] animate-ping" />
              CRITICAL RISK
            </span>
            <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/80 text-[#C62828] font-bold text-[10px]">
              &gt;75% Prob
            </span>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white font-mono">{criticalCount}</div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
            Immediate pre-exam failover required. Repeated drops observed.
          </p>
        </button>

        {/* High Risk */}
        <button
          onClick={() => setSelectedRiskFilter(selectedRiskFilter === 'high' ? 'all' : 'high')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            selectedRiskFilter === 'high'
              ? 'bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/30'
              : 'bg-white dark:bg-[#13151D] border-gray-200 dark:border-gray-800 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span className="font-bold flex items-center gap-1 text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              HIGH RISK
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-600 font-bold text-[10px]">
              50-75% Prob
            </span>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white font-mono">{highCount}</div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
            Elevated jitter / packet drops. Pre-session network warning sent.
          </p>
        </button>

        {/* Moderate Risk */}
        <button
          onClick={() => setSelectedRiskFilter(selectedRiskFilter === 'moderate' ? 'all' : 'moderate')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            selectedRiskFilter === 'moderate'
              ? 'bg-blue-500/10 border-blue-500 shadow-md ring-2 ring-blue-500/30'
              : 'bg-white dark:bg-[#13151D] border-gray-200 dark:border-gray-800 hover:border-blue-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span className="font-bold flex items-center gap-1 text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              MODERATE RISK
            </span>
            <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-600 font-bold text-[10px]">
              20-50% Prob
            </span>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white font-mono">{moderateCount}</div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
            Occasional latency flutters. Telemetry polling tightened to 10s.
          </p>
        </button>

        {/* Low Risk */}
        <button
          onClick={() => setSelectedRiskFilter(selectedRiskFilter === 'low' ? 'all' : 'low')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            selectedRiskFilter === 'low'
              ? 'bg-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
              : 'bg-white dark:bg-[#13151D] border-gray-200 dark:border-gray-800 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
            <span className="font-bold flex items-center gap-1 text-[#16803C]">
              <span className="w-2 h-2 rounded-full bg-[#16803C]" />
              LOW RISK
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-[#16803C] font-bold text-[10px]">
              &lt;20% Prob
            </span>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white font-mono">{lowCount}</div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
            99.8%+ stability score. Dual fiber operating at optimal throughput.
          </p>
        </button>
      </div>

      {/* Main Grid: Centre Risk Table + Detailed Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Risk Table */}
        <div className="lg:col-span-2 bg-white dark:bg-[#13151D] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs overflow-hidden flex flex-col">
          {/* Table Search & Filter Bar */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 bg-[#F8F8F6] dark:bg-[#0A0B0E]">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search centre name, city, or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#13151D] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:border-[#C62828]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500 text-[11px]">Filter:</span>
              {(['all', 'critical', 'high', 'moderate', 'low'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedRiskFilter(filter)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold capitalize transition-colors cursor-pointer ${
                    selectedRiskFilter === filter
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Centres Risk Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-[10px] font-mono uppercase tracking-wider text-gray-500">
                  <th className="py-2.5 px-4">Centre / Location</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3">Stability Index</th>
                  <th className="py-2.5 px-3">Repeated Drops</th>
                  <th className="py-2.5 px-3">Predicted Disruption</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-sans">
                {filteredCentres.map(c => {
                  const isSelected = selectedCentre?.id === c.id;
                  const isCritical = c.riskCategory === 'critical';
                  const isHigh = c.riskCategory === 'high';
                  const isModerate = c.riskCategory === 'moderate';

                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCentre(c)}
                      className={`hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-red-50/40 dark:bg-red-950/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                          {c.name}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1 mt-0.5">
                          <span>{c.city}</span>
                          <span>•</span>
                          <span>{c.id.toUpperCase()}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-black uppercase ${
                            isCritical
                              ? 'bg-red-100 dark:bg-red-950/80 text-[#C62828] border border-red-300 dark:border-red-800 animate-pulse'
                              : isHigh
                              ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                              : isModerate
                              ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-emerald-100 dark:bg-emerald-950/80 text-[#16803C] border border-emerald-200 dark:border-emerald-800'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCritical ? 'bg-[#C62828]' : isHigh ? 'bg-amber-500' : isModerate ? 'bg-blue-500' : 'bg-[#16803C]'
                            }`}
                          />
                          {c.riskCategory}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isCritical ? 'bg-[#C62828]' : isHigh ? 'bg-amber-500' : isModerate ? 'bg-blue-500' : 'bg-[#16803C]'
                              }`}
                              style={{ width: `${c.stabilityScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                            {c.stabilityScore}%
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-mono">
                        <span className={`font-bold ${c.repeatedDisconnections > 0 ? 'text-[#C62828]' : 'text-gray-500'}`}>
                          {c.repeatedDisconnections} drop{c.repeatedDisconnections !== 1 ? 's' : ''}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono font-bold">
                        <span className={c.predictedDisruptionProbability > 60 ? 'text-[#C62828]' : c.predictedDisruptionProbability > 30 ? 'text-amber-500' : 'text-[#16803C]'}>
                          {c.predictedDisruptionProbability}%
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExecutePreventiveAction(c.id);
                          }}
                          disabled={c.riskCategory === 'low'}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-colors cursor-pointer ${
                            c.riskCategory === 'low'
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                              : 'bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-xs'
                          }`}
                        >
                          {c.riskCategory === 'low' ? 'Protected' : 'Prevent'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1 Col): Detailed Inspector & Preventive Action Suite */}
        {selectedCentre ? (
          <div className="bg-white dark:bg-[#13151D] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Centre Identity & Risk Header */}
              <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-gray-400">
                    {selectedCentre.id.toUpperCase()} • {selectedCentre.region}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black uppercase ${
                      selectedCentre.riskCategory === 'critical'
                        ? 'bg-red-100 text-[#C62828]'
                        : selectedCentre.riskCategory === 'high'
                        ? 'bg-amber-100 text-amber-700'
                        : selectedCentre.riskCategory === 'moderate'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-[#16803C]'
                    }`}
                  >
                    {selectedCentre.riskCategory} Risk
                  </span>
                </div>
                <h3 className="text-base font-black text-gray-900 dark:text-white mt-1">
                  {selectedCentre.name}
                </h3>
                <p className="text-xs text-gray-500 font-mono">
                  Gateway: {selectedCentre.ipRange} • {selectedCentre.totalCandidates} Workstations
                </p>
              </div>

              {/* Observed Indicators List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#C62828]" />
                  Observed Early Indicators:
                </h4>
                <div className="space-y-1.5">
                  {selectedCentre.observedIndicators.map((ind, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-xs text-gray-800 dark:text-gray-200 flex items-start gap-2 leading-relaxed"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preventive Action Recommendations */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
                  Recommended Preventive Actions:
                </h4>
                <div className="space-y-1.5">
                  {selectedCentre.preventiveRecommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2 leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C] shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Metrics Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-[10px] text-gray-400 block">Jitter Fluctuation:</span>
                  <span className="font-bold text-gray-900 dark:text-white">±{selectedCentre.jitterMs} ms</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-[10px] text-gray-400 block">Packet Loss:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{selectedCentre.packetLossPercent}%</span>
                </div>
              </div>
            </div>

            {/* Bottom Execution Action */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <button
                onClick={() => handleExecutePreventiveAction(selectedCentre.id)}
                disabled={isExecutingAction || selectedCentre.riskCategory === 'low'}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  selectedCentre.riskCategory === 'low'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#16803C] border border-emerald-200 dark:border-emerald-800'
                    : 'bg-[#C62828] hover:bg-[#8E1B1B] text-white animate-pulse'
                }`}
              >
                {selectedCentre.riskCategory === 'low' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                    <span>No Action Required — Low Risk</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Execute All Preventive Recommendations</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center font-mono">
                Dispatches automated failover command to Edge Gateway Node.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
