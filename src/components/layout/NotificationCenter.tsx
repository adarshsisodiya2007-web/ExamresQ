import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  X, 
  Trash2, 
  ShieldCheck, 
  Radio, 
  Check,
  ExternalLink
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, dismissNotification, setCurrentView } = useResilience();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'candidate' | 'admin'>('all');

  const filteredNotifications = notifications.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'candidate') return item.target === 'candidate' || item.target === 'both';
    if (filter === 'admin') return item.target === 'admin' || item.target === 'both';
    return true;
  });

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        aria-label="Notification Center"
        title="Open Notification Center"
      >
        <Bell className="w-4 h-4" />
        {notifications.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C62828] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C62828] text-white text-[9px] font-bold items-center justify-center">
              {notifications.length}
            </span>
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#13151D] border border-gray-200 dark:border-gray-800 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#0A0B0E] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#C62828]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Real-Time Notification Center
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 text-[11px] font-semibold">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 py-1 rounded-lg text-center transition-colors cursor-pointer ${
                  filter === 'all' 
                    ? 'bg-white dark:bg-[#181B26] text-gray-900 dark:text-white shadow-xs font-bold' 
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('candidate')}
                className={`flex-1 py-1 rounded-lg text-center transition-colors cursor-pointer ${
                  filter === 'candidate' 
                    ? 'bg-white dark:bg-[#181B26] text-gray-900 dark:text-white shadow-xs font-bold' 
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Candidate Channel
              </button>
              <button
                onClick={() => setFilter('admin')}
                className={`flex-1 py-1 rounded-lg text-center transition-colors cursor-pointer ${
                  filter === 'admin' 
                    ? 'bg-white dark:bg-[#181B26] text-gray-900 dark:text-white shadow-xs font-bold' 
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Operations Telemetry
              </button>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400">
                  No notifications in this channel
                </div>
              ) : (
                filteredNotifications.map(item => (
                  <div 
                    key={item.id} 
                    className="p-3.5 hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition-colors flex items-start gap-3 text-xs"
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.type === 'alert' && <AlertCircle className="w-4 h-4 text-[#C62828]" />}
                      {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#C77A00]" />}
                      {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16803C]" />}
                      {item.type === 'info' && <Info className="w-4 h-4 text-blue-600" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-gray-900 dark:text-white truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-gray-400 shrink-0 font-mono">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                        {item.message}
                      </p>
                    </div>

                    <button
                      onClick={() => dismissNotification(item.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 rounded shrink-0 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-[#F8F8F6] dark:bg-[#0A0B0E] flex items-center justify-between text-[11px]">
              <span className="text-gray-500 font-mono">Telemetry sync: 500ms</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCurrentView('incidents');
                }}
                className="text-[#C62828] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open Incident Center</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
