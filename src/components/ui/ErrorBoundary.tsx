'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import { Button } from '@/components/ui'
import styles from './ErrorBoundary.module.scss'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const reset = () => {
        this.setState({ hasError: false, error: undefined })
      }

      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} reset={reset} />
      }

      return <DefaultErrorFallback error={this.state.error} reset={reset} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <motion.div
      className={styles.errorBoundary}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.errorIcon}>
        <FiAlertTriangle />
      </div>
      <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
      <p className={styles.errorMessage}>
        We're sorry, but something unexpected happened. Please try refreshing the page.
      </p>
      {error && process.env.NODE_ENV === 'development' && (
        <details className={styles.errorDetails}>
          <summary>Error Details (Development Only)</summary>
          <pre className={styles.errorStack}>{error.message}</pre>
        </details>
      )}
      <div className={styles.errorActions}>
        <Button
          variant="primary"
          icon={<FiRefreshCw />}
          onClick={reset}
        >
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    </motion.div>
  )
}

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryClass {...props} />
}