
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#1e1e1e] border border-terminal-border rounded-lg p-8 text-center">
            {/* Terminal Header */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-500/20 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl font-bold text-terminal-green mb-4 font-mono">
              <span className="syntax-keyword">try</span> {"{"}
            </h2>
            
            <div className="text-terminal-text/80 mb-6 font-mono text-left">
              <div className="bg-terminal-bg/50 border border-terminal-border/30 rounded p-4 mb-4">
                <span className="syntax-comment">// Something went wrong</span><br />
                <span className="syntax-keyword">throw new</span> <span className="syntax-function">Error</span>(<br />
                <span className="pl-4 syntax-string">"Component crashed unexpectedly"</span><br />
                );
              </div>
            </div>

            <p className="text-terminal-text/60 mb-8 text-sm">
              Don't worry! This is just a temporary glitch in the matrix. 
              Try refreshing the component or the entire page.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-terminal-green text-terminal-bg px-6 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-colors flex items-center justify-center space-x-2"
                aria-label="Retry loading component"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="font-mono">retry()</span>
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full border border-terminal-green text-terminal-green px-6 py-3 rounded-lg font-semibold hover:bg-terminal-green/10 transition-colors flex items-center justify-center space-x-2"
                aria-label="Reload entire page"
              >
                <Home className="w-4 h-4" />
                <span className="font-mono">reload()</span>
              </button>
            </div>

            <div className="mt-8">
              <p className="text-terminal-green text-xl font-bold font-mono">{"}"}</p>
              <p className="text-terminal-text/40 text-xs font-mono mt-2">
                <span className="syntax-keyword">catch</span> (error) {"{"}
                <br />
                <span className="pl-4 syntax-comment">// Error handled gracefully</span>
                <br />
                {"}"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
