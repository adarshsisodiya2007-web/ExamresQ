import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { useTheme } from '../../context/ThemeContext';
import { multiCandidateMeshService } from '../../services/multiCandidateMeshService';
import { HelpRequestType, StudentHelpRequest } from '../../types';
import { 
  FileText, 
  Droplet, 
  MousePointer, 
  UserCheck, 
  X, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface StudentAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentAssistanceModal: React.FC<StudentAssistanceModalProps> = ({
  isOpen,
  onClose
}) => {
  const { studentName, addNotification } = useResilience();
  const { isDark } = useTheme();

  const [selectedType, setSelectedType] = useState<HelpRequestType>('rough_paper');
  const [additionalNote, setAdditionalNote] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const currentTabCandidate = multiCandidateMeshService.getLocalCandidate();
  const candidateId = currentTabCandidate?.id || 'cand-local';
  const stationId = currentTabCandidate?.stationId || sessionStorage.getItem('examresq_station_id') || 'STATION-14';

  const helpOptions: {
    type: HelpRequestType;
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      type: 'rough_paper',
      titleEn: 'Need Extra Rough Sheet',
      titleHi: 'अतिरिक्त रफ शीट चाहिए',
      descEn: 'Invigilator will bring an official stamped scratch paper to your seat.',
      descHi: 'कक्ष निरीक्षक आपकी सीट पर मुहर लगी रफ शीट लेकर आएंगे।',
      icon: <FileText className="w-5 h-5 text-amber-500" />,
      color: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
    },
    {
      type: 'water',
      titleEn: 'Drinking Water Needed',
      titleHi: 'पीने का पानी चाहिए',
      descEn: 'Exam hall attendant will bring clean drinking water to your desk.',
      descHi: 'सहायक आपकी डेस्क पर स्वच्छ पीने का पानी लाएगा।',
      icon: <Droplet className="w-5 h-5 text-sky-500" />,
      color: 'border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20'
    },
    {
      type: 'tech_issue',
      titleEn: 'Mouse / Computer Issue',
      titleHi: 'कंप्यूटर या माउस समस्या',
      descEn: 'Lab technician will inspect your workstation or replace hardware.',
      descHi: 'तकनीशियन तुरंत आपकी मशीन देखेगा या बैकअप सिस्टम देगा।',
      icon: <MousePointer className="w-5 h-5 text-red-500" />,
      color: 'border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20'
    },
    {
      type: 'invigilator',
      titleEn: 'Call Room Teacher / Invigilator',
      titleHi: 'कक्ष निरीक्षक (Teacher) को बुलाएं',
      descEn: 'Request the exam officer to visit your desk for general guidance.',
      descHi: 'किसी भी अन्य समस्या या मार्गदर्शन हेतु शिक्षक को बुलाएं।',
      icon: <UserCheck className="w-5 h-5 text-emerald-500" />,
      color: 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
    }
  ];

  const handleSend = () => {
    const selected = helpOptions.find(o => o.type === selectedType)!;
    const req: StudentHelpRequest = {
      id: `help-${Date.now()}`,
      candidateId,
      candidateName: studentName || 'Candidate',
      stationId,
      type: selectedType,
      title: selected.titleEn,
      titleHi: selected.titleHi,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };

    multiCandidateMeshService.sendHelpRequest(req);

    addNotification({
      target: 'candidate',
      type: 'success',
      title: 'Assistance Dispatched',
      message: `Your request for "${selected.titleEn} (${selected.titleHi})" was sent to the Invigilator.`
    });

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-in fade-in select-none">
      <div className={`
        relative w-full max-w-lg p-6 rounded-3xl border shadow-2xl flex flex-col space-y-4 transition-colors
        ${isDark ? 'bg-[#0A0E1A] border-[#1E293B] text-white' : 'bg-white border-red-200 text-gray-900 shadow-xl'}
      `}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 flex items-center justify-center text-2xl shrink-0">
            ✋
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#C62828] dark:text-red-400 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900">
              Exam Hall Silent Assistance
            </span>
            <h2 className="text-lg font-black text-gray-900 dark:text-white mt-1">
              Need Help? / सहायता चाहिए?
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Station: <strong className="text-[#C62828] dark:text-emerald-400 font-mono">{stationId}</strong> • Invigilator will attend your desk quietly.
            </p>
          </div>
        </div>

        {isSent ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Request Sent to Invigilator!
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              अनुरोध परीक्षक को भेज दिया गया है। कृपया अपनी सीट पर प्रतीक्षा करें।
            </p>
          </div>
        ) : (
          <>
            {/* 4 Interactive Assistance Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {helpOptions.map((opt) => (
                <div
                  key={opt.type}
                  onClick={() => setSelectedType(opt.type)}
                  className={`
                    p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-1.5
                    ${selectedType === opt.type 
                      ? 'border-[#C62828] dark:border-emerald-500 shadow-md ring-2 ring-red-500/20 dark:ring-emerald-500/20' 
                      : `${opt.color} hover:border-gray-400 opacity-90`}
                  `}
                >
                  <div className="flex items-center justify-between">
                    {opt.icon}
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      selectedType === opt.type ? 'border-[#C62828] dark:border-emerald-400 bg-[#C62828] dark:bg-emerald-400' : 'border-gray-400'
                    }`}>
                      {selectedType === opt.type && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                      {opt.titleEn}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#C62828] dark:text-emerald-400 mt-0.5">
                      {opt.titleHi}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight mt-1">
                      {opt.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-gray-100 dark:border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Zero Hall Disturbance</span>
              </span>
              <button
                onClick={handleSend}
                className={`
                  px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md
                  ${isDark 
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400' 
                    : 'bg-[#C62828] text-white hover:bg-[#8E1B1B]'}
                `}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Call Invigilator / शिक्षक को बुलाएं →</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
