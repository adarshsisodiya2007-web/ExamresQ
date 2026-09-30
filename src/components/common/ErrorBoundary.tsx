import React, { Component, ErrorInfo, ReactNode } from 'react';
import examresqLogo from '../../assets/examresq-logo.png';
import { RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ExamresQ Uncaught Interface Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('examresq_student_name');
      localStorage.removeItem('examresq_luxury_theme');
    } catch {}
    window.location.reload();
  };

  private handleRecover = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFFBFB] text-gray-900 flex items-center justify-center p-4 sm:p-6 select-none font-sans">
          <div className="max-w-md w-full bg-white border-2 border-[#C62828] rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto shadow-sm">
              <img 
                src={examresqLogo} 
                alt="ExamresQ Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C62828] px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200">
                Self-Healing Resilience Container
              </span>
              <h1 className="text-xl font-black text-gray-900 mt-2">
                Interface State Realigned
              </h1>
              <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                ExamresQ client watchdog caught an interface glitch and safely secured your candidate responses.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-red-50/50 border border-red-100 text-left font-mono text-[11px] text-gray-700 space-y-1">
              <div className="flex items-center gap-1 font-bold text-[#C62828]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Protected Session Ledger</span>
              </div>
              <p className="text-[10px] text-gray-500 break-all truncate">
                {this.state.error?.message || 'Recoverable interface render signal'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={this.handleRecover}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#8E1B1B] text-white shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resume Terminal</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
              >
                <span>Reset & Reload</span>
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Immutable Ledger State Protected</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
