interface ErrorInfo {
  error: Error
  errorInfo?: React.ErrorInfo
  context?: string
}

class ErrorTracker {
  private isEnabled: boolean

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production'
  }

  captureException(errorInfo: ErrorInfo) {
    if (!this.isEnabled) {
      console.error('Error (dev):', errorInfo)
      return
    }

    // Log to console in all environments
    console.error(`[${errorInfo.context || 'Unknown'}]`, errorInfo.error)

    // In production, send to error tracking service
    // Example: Sentry, LogRocket, etc.
    try {
      if (typeof window !== 'undefined') {
        // Client-side error tracking
        fetch('/api/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: errorInfo.error.message,
            stack: errorInfo.error.stack,
            context: errorInfo.context,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
          })
        }).catch(console.error)
      }
    } catch (trackingError) {
      console.error('Failed to track error:', trackingError)
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (!this.isEnabled && level !== 'error') return

    console[level === 'warning' ? 'warn' : level === 'error' ? 'error' : 'log'](message)
  }
}

export const errorTracker = new ErrorTracker()