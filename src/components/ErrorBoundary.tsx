import { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import StarBorder from './StarBorder';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // تسجيل الخطأ في Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen animated-bg text-white flex items-center justify-center px-4">
          <div className="glass p-8 md:p-12 max-w-2xl text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-4xl font-bold gradient-text mb-6">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
              We encountered an unexpected error. Our team has been notified and is working to fix it.
            </p>
            <div className="space-y-4">
              <StarBorder
                className="btn-modern text-lg px-8 py-4 font-semibold"
                color="#ffffff"
                speed="4s"
                onClick={() => window.location.reload()}
              >
                Try Again
              </StarBorder>
              <p className="text-sm text-gray-500">
                Error: {this.state.error?.message}
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