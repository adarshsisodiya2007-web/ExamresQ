import React, { useEffect, useRef } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, ShieldCheck } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, dismissNotification } = useResilience();
  const timerMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Show only the 3 most recent notifications on screen to prevent clutter
  const visibleNotifications = notifications.slice(0, 3);

  // Automatically dismiss each toast after 3.5 seconds (or 4.5s for critical alerts)
  useEffect(() => {
    visibleNotifications.forEach(item => {
      if (!timerMapRef.current.has(item.id)) {
        const duration = item.type === 'alert' ? 4500 : 3500;
        const timer = setTimeout(() => {
          dismissNotification(item.id);
          timerMapRef.current.delete(item.id);
        }, duration);

        timerMapRef.current.set(item.id, timer);
      }
    });

    // Cleanup stale timers
    const activeIds = new Set(visibleNotifications.map(n => n.id));
    timerMapRef.current.forEach((timer, id) => {
      if (!activeIds.has(id)) {
        clearTimeout(timer);
        timerMapRef.current.delete(id);
      }
    });
  }, [visibleNotifications, dismissNotification]);

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-4">
      {visibleNotifications.map(item => {
        const isCandidate = item.target === 'candidate';
        const isSuccess = item.type === 'success';
        const isWarning = item.type === 'warning';
        const isAlert = item.type === 'alert';

        return (
          <div
            key={item.id}
            className={`pointer-events-auto relative overflow-hidden flex items-start gap-3 p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-right-4 ${
              isAlert
                ? 'bg-red-950/90 text-white border-red-500/50 shadow-red-900/30'
                : isWarning
                ? 'bg-amber-50/95 dark:bg-amber-950/90 border-amber-300/60 dark:border-amber-800 text-amber-950 dark:text-amber-100 shadow-amber-500/10'
                : isSuccess
                ? 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-300/60 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 shadow-emerald-500/10'
                : 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100'
            }`}
          >
            {/* Auto-Dismiss Progress Bar at Bottom */}
            <div 
              className={`absolute bottom-0 left-0 h-1 bg-current opacity-30 animate-[shrink_3.5s_linear_forwards]`}
              style={{ width: '100%' }}
            />

            <div className="mt-0.5 shrink-0">
              {isAlert && <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-500" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {item.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70 flex items-center gap-1">
                  {isCandidate ? (
                    <>
                      <ShieldCheck className="w-3 h-3" />
                      Candidate Guard
                    </>
                  ) : (
                    'Operations Telemetry'
                  )}
                  <span className="opacity-60">({item.timestamp})</span>
                </span>
                <button
                  onClick={() => {
                    const timer = timerMapRef.current.get(item.id);
                    if (timer) clearTimeout(timer);
                    timerMapRef.current.delete(item.id);
                    dismissNotification(item.id);
                  }}
                  className="opacity-50 hover:opacity-100 transition-opacity p-0.5 rounded cursor-pointer"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-bold mt-0.5">{item.title}</p>
              <p className="text-[11px] opacity-80 mt-0.5 leading-relaxed line-clamp-2">{item.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
