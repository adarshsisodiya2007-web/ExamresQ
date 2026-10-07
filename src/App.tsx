import React, { useState } from 'react';
import { ResilienceProvider, useResilience } from './context/ResilienceContext';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { NotificationToast } from './components/layout/NotificationToast';
import { HackathonModal } from './components/layout/HackathonModal';
import { LandingPage } from './components/landing/LandingPage';
import { LiveExam } from './components/candidate/LiveExam';
import { CandidatePortal } from './components/candidate/CandidatePortal';
import { LiveCandidateMonitor } from './components/officer/LiveCandidateMonitor';
import { OperationsDashboard } from './components/operations/OperationsDashboard';
import { CentreMonitoring } from './components/centres/CentreMonitoring';
import { IncidentCenter } from './components/incidents/IncidentCenter';
import { RecoveryCenter } from './components/recovery/RecoveryCenter';
import { EarlyDetectionDashboard } from './components/operations/EarlyDetectionDashboard';
import { AuditTrust } from './components/audit/AuditTrust';
import { SuspiciousPatternCenter } from './components/security/SuspiciousPatternCenter';
import { ReconciliationCenter } from './components/audit/ReconciliationCenter';
import { OfficerLoginModal } from './components/layout/OfficerLoginModal';
import { CandidateVerificationModal } from './components/candidate/CandidateVerificationModal';
import { RoleTransitionSplash } from './components/layout/RoleTransitionSplash';
import { DecisionSupportCenter } from './components/operations/DecisionSupportCenter';
import { Reports } from './components/reports/Reports';
import { Settings } from './components/settings/Settings';
import { SimulationLab } from './components/simulation/SimulationLab';

const AppContent: React.FC = () => {
  const { currentView } = useResilience();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [hackathonModalOpen, setHackathonModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'live_exam':
        return <LiveExam />;
      case 'candidate_portal':
        return <CandidatePortal />;
      case 'candidate_monitor':
        return <LiveCandidateMonitor />;
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
      case 'simulation_lab':
        return <SimulationLab />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] dark:bg-[#070B14] flex selection:bg-[#C62828] selection:text-white antialiased transition-colors">
      {/* Permanent Left Sidebar Navigation (Matching User Screenshot) */}
      <Sidebar 
        onOpenHackathonModal={() => setHackathonModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area beside Sidebar */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FFFBFB] dark:bg-[#0A0B0E] transition-colors duration-300">
        {/* Minimal Top Header - No desktop menu button */}
        <Navbar onOpenMobileMenu={() => setMobileSidebarOpen(true)} />

        {/* Main View Router */}
        <main className="flex-1">
          {renderActiveView()}
        </main>
      </div>

      {/* Real-Time Toast Notifications (Candidate & Admin channels) */}
      <NotificationToast />

      {/* 3-Second Role Transition Simulation Splash (Student & Officer, Light & Dark) */}
      <RoleTransitionSplash />

      {/* Mandatory Candidate Identity Verification Gate (Name, Aadhaar, Phone) */}
      <CandidateVerificationModal />

      {/* Officer-Only Authentication Modal */}
      <OfficerLoginModal />

      {/* Architecture & Problem Statement Modal */}
      <HackathonModal 
        isOpen={hackathonModalOpen}
        onClose={() => setHackathonModalOpen(false)}
      />
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
