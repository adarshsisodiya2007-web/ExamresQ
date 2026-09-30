import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Sliders, 
  RotateCcw, 
  Lock, 
  Wifi, 
  Save, 
  Check, 
  Database,
  Radio,
  Clock
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { resetSystemState, addNotification } = useResilience();

  const [heartbeatMs, setHeartbeatMs] = useState<number>(500);
  const [offlineToleranceSecs, setOfflineToleranceSecs] = useState<number>(15);
  const [encryptionStandard, setEncryptionStandard] = useState<string>('AES-256-GCM + SHA-256');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaved(true);
    addNotification({
      target: 'admin',
      type: 'success',
      title: 'Resilience Policies Updated',
      message: `Heartbeat set to ${heartbeatMs}ms. Offline timer threshold: ${offlineToleranceSecs}s.`
    });
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = () => {
    resetSystemState();
    addNotification({
      target: 'admin',
      type: 'info',
      title: 'Prototype State Re-initialized',
      message: 'All metrics, incident logs, and network simulation states reset to pristine defaults.'
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D1527] p-6 rounded-2xl border border-red-100 dark:border-gray-800 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C62828] dark:text-[#38BDF8]">
                System Governance & Policy Configuration
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              Resilience Ecosystem Settings
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Tune sub-second watchdog thresholds, failover preferences, and local ledger storage budgets
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white transition-colors cursor-pointer shadow-xs"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? 'Policies Saved' : 'Save Policies'}</span>
            </button>
          </div>
        </div>

        {/* Resilience Parameters Form */}
        <div className="bg-white dark:bg-[#0D1527] rounded-2xl border border-red-100 dark:border-gray-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C62828]" />
              Watchdog & Detection Telemetry
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="p-4 rounded-xl bg-red-50/30 dark:bg-[#080D1A] border border-red-100 dark:border-gray-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-900 dark:text-white">Watchdog Heartbeat Ping</label>
                  <span className="font-mono font-bold text-[#C62828] dark:text-[#38BDF8]">{heartbeatMs} ms</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="100"
                  value={heartbeatMs}
                  onChange={(e) => setHeartbeatMs(Number(e.target.value))}
                  className="w-full accent-[#C62828] cursor-pointer"
                />
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Frequency of client-to-edge UDP beaconing. Lower values provide faster detection but use more packet overhead.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50/30 dark:bg-[#080D1A] border border-red-100 dark:border-gray-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-900 dark:text-white">Timer Compensation Trigger</label>
                  <span className="font-mono font-bold text-[#C62828] dark:text-[#38BDF8]">{offlineToleranceSecs} s</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={offlineToleranceSecs}
                  onChange={(e) => setOfflineToleranceSecs(Number(e.target.value))}
                  className="w-full accent-[#C62828] cursor-pointer"
                />
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  If network downtime exceeds this threshold, candidate exam clock automatically credits lost seconds.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-red-100 dark:border-gray-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#16803C]" />
              Cryptographic Storage & Ledger Rules
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                <span className="font-bold text-gray-900 block">Client Encryption Cipher</span>
                <select
                  value={encryptionStandard}
                  onChange={(e) => setEncryptionStandard(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-white font-mono text-xs"
                >
                  <option value="AES-256-GCM + SHA-256">AES-256-GCM + SHA-256 (Government Default)</option>
                  <option value="ChaCha20-Poly1305">ChaCha20-Poly1305 (Ultra-low latency)</option>
                </select>
                <p className="text-[11px] text-gray-500">Hardware accelerated on all modern student workstations.</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                <span className="font-bold text-gray-900 block">Offline Ledger Cache Quota</span>
                <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 font-mono text-gray-800 text-xs">
                  50 MB (Up to 500,000 question answers)
                </div>
                <p className="text-[11px] text-gray-500">Sufficient for 72 consecutive hours of continuous disconnected assessment.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-600" />
              Multi-WAN Edge Backhaul Hierarchy
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Priority 1 (Primary):</span>
                  <span className="text-gray-700">Dedicated Terrestrial Fiber (ISP-A 1 Gbps)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-[#16803C] font-bold">ACTIVE</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Priority 2 (Secondary):</span>
                  <span className="text-gray-700">Point-to-Point Microwave Link (ISP-B 200 Mbps)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">STANDBY</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Priority 3 (Tertiary):</span>
                  <span className="text-gray-700">LEO Satellite Mesh Carrier</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-bold">ARMED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
