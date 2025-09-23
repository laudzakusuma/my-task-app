interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

class Analytics {
  private isEnabled: boolean

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production'
  }

  track(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('Analytics (dev):', event)
      return
    }

    // Implement your analytics provider here
    // Example: Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined' && 'gtag' in window) {
      window.gtag('event', event.name, event.properties)
    }
  }

  page(path: string) {
    if (!this.isEnabled) return

    if (typeof window !== 'undefined' && 'gtag' in window && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: path,
      })
    }
  }
}

export const analytics = new Analytics()

// Performance monitoring
export function measurePerformance(name: string) {
  return {
    start: performance.now(),
    end: function() {
      const duration = performance.now() - this.start
      analytics.track({
        name: 'performance_measure',
        properties: { name, duration }
      })
      return duration
    }
  }
}