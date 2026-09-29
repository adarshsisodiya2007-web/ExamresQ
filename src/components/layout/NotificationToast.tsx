import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, ShieldCheck } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, dismissNotification } = useResilience();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
      {notifications.map(item => {
        const isCandidate = item.target === 'candidate';
        const isSuccess = item.type === 'success';
        const isWarning = item.type === 'warning';
        const isAlert = item.type === 'alert';

        return (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
              isAlert
                ? 'bg-white border-[#C62828]/30 shadow-[#C62828]/10'
                : isWarning
                ? 'bg-amber-50/95 border-amber-300/60 shadow-amber-500/10'
                : isSuccess
                ? 'bg-emerald-50/95 border-emerald-300/60 shadow-emerald-500/10'
                : 'bg-white/95 border-gray-200'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isAlert && <AlertCircle className="w-5 h-5 text-[#C62828]" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-[#C77A00]" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#16803C]" />}
              {item.type === 'info' && <Info className="w-5 h-5 text-gray-700" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  {isCandidate ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
                      Candidate Guard
                    </>
                  ) : (
                    'Operations Telemetry'
                  )}
                  <span className="text-[10px] text-gray-400 font-normal">({item.timestamp})</span>
                </span>
                <button
                  onClick={() => dismissNotification(item.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{item.title}</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
