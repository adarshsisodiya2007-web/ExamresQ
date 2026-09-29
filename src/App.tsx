import React from 'react';
import { ResilienceProvider, useResilience } from './context/ResilienceContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { NotificationToast } from './components/layout/NotificationToast';
import { DemoModal } from './components/layout/DemoModal';
import { ThemeSwitcher } from './components/layout/ThemeSwitcher';
import { LandingPage } from './components/landing/LandingPage';
import { LiveExam } from './components/candidate/LiveExam';
import { CandidatePortal } from './components/candidate/CandidatePortal';
import { OperationsDashboard } from './components/operations/OperationsDashboard';
import { CentreMonitoring } from './components/centres/CentreMonitoring';
import { IncidentCenter } from './components/incidents/IncidentCenter';
import { RecoveryCenter } from './components/recovery/RecoveryCenter';
import { EarlyDetectionDashboard } from './components/operations/EarlyDetectionDashboard';
import { AuditTrust } from './components/audit/AuditTrust';
import { SuspiciousPatternCenter } from './components/security/SuspiciousPatternCenter';
import { ReconciliationCenter } from './components/audit/ReconciliationCenter';
import { DecisionSupportCenter } from './components/operations/DecisionSupportCenter';
import { Reports } from './components/reports/Reports';
import { Settings } from './components/settings/Settings';

const AppContent: React.FC = () => {
  const { currentView } = useResilience();

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'live_exam':
        return <LiveExam />;
      case 'candidate_portal':
        return <CandidatePortal />;
      case 'operations':
        return <OperationsDashboard />;
      case 'early_detection':
        return <EarlyDetectionDashboard />;
      case 'centres':
        return <CentreMonitoring />;
      case 'incidents':
        return <IncidentCenter />;
      case 'recovery':
        return <RecoveryCenter />;
      case 'audit':
        return <AuditTrust />;
      case 'suspicious_patterns':
        return <SuspiciousPatternCenter />;
      case 'reconciliation':
        return <ReconciliationCenter />;
      case 'decision_support':
        return <DecisionSupportCenter />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] text-[#171717] font-sans antialiased flex flex-col selection:bg-[#C62828] selection:text-white transition-colors duration-300">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Real-Time Toast Notifications (Candidate & Admin channels) */}
      <NotificationToast />

      {/* 7-Step Hackathon Resilience Demo Tour Modal */}
      <DemoModal />

      {/* Luxury Theme Switcher Floating Pill & Modal */}
      <ThemeSwitcher />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ResilienceProvider>
        <AppContent />
      </ResilienceProvider>
    </ThemeProvider>
  );
}

