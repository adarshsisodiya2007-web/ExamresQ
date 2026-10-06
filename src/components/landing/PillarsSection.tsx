import React, { useState } from 'react';
import { 
  Shield, 
  Radar, 
  ShieldAlert, 
  RotateCcw, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2,
  Server,
  Activity,
  HardDrive
} from 'lucide-react';

interface Pillar {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  detailedPoints: string[];
  metricLabel: string;
  metricValue: string;
  icon: React.ReactNode;
}

export const PillarsSection: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('prevention');

  const features = [
    {
      id: 'secure_access',
      name: 'Secure Access',
      desc: 'Student verification before start',
      metric: 'Verified Safe',
      icon: <Shield className="w-5 h-5 text-[#B91C3C]" />
    },
    {
      id: 'smart_monitoring',
      name: 'Smart Monitoring',
      desc: 'Live activity tracking',
      metric: 'Real-time',
      icon: <Radar className="w-5 h-5 text-amber-600" />
    },
    {
      id: 'fair_assessment',
      name: 'Fair Assessment',
      desc: 'Secure exam environment',
      metric: '100% Reliable',
      icon: <ShieldAlert className="w-5 h-5 text-[#B91C3C]" />
    },
    {
      id: 'early_alerts',
      name: 'Early Alerts',
      desc: 'Unusual activity detection',
      metric: 'Instant Action',
      icon: <RotateCcw className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'performance_insights',
      name: 'Performance Insights',
      desc: 'Simple result analytics',
      metric: 'Accurate Reports',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'reliable_access',
      name: 'Reliable Access',
      desc: 'Designed for unstable connectivity',
      metric: 'Zero Response Loss',
      icon: <HardDrive className="w-5 h-5 text-purple-600" />
    }
  ];

  return (
    <section className="py-12 border-t border-[#F0D9D4] dark:border-gray-800 bg-[#FFF8F5] dark:bg-[#070B14] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B91C3C] dark:text-[#38BDF8] bg-red-50 dark:bg-white/5 border border-[#F0D9D4] dark:border-white/10 px-3 py-1 rounded-full">
            Core Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2 tracking-tight">
            Designed for Seamless Assessments
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            How ExamresQ delivers fairness, resilience, and clarity
          </p>
        </div>

        {/* 6-Card Visual Feature Grid (Rule 18: Icon, Feature Name, 3-5 word description) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0D1527] border border-[#F0D9D4] dark:border-[#1E2A42] shadow-xs hover:border-[#B91C3C] transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">
                  {item.metric}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
