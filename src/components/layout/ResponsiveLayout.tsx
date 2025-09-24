'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ResponsiveLayout.module.scss'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  center?: boolean
}

interface BreakpointContextType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeScreen: boolean
  screenWidth: number
  screenHeight: number
}

const BreakpointContext = React.createContext<BreakpointContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isLargeScreen: false,
  screenWidth: 0,
  screenHeight: 0,
})

export const useBreakpoint = () => React.useContext(BreakpointContext)

// Responsive Layout Component
export default function ResponsiveLayout({
  children,
  className = '',
  maxWidth = 'xl',
  padding = true,
  center = true,
}: ResponsiveLayoutProps): React.JSX.Element {
  const [breakpoint, setBreakpoint] = useState<BreakpointContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeScreen: false,
    screenWidth: 0,
    screenHeight: 0,
  })

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setBreakpoint({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1280,
        isLargeScreen: width >= 1280,
        screenWidth: width,
        screenHeight: height,
      })
    }

    // Initial check
    updateBreakpoint()

    // Add resize listener with debouncing
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateBreakpoint, 150)
    }

    window.addEventListener('resize', debouncedResize)
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      // Delay to allow browser to update dimensions
      setTimeout(updateBreakpoint, 200)
    })

    return () => {
      window.removeEventListener('resize', debouncedResize)
      window.removeEventListener('orientationchange', updateBreakpoint)
      clearTimeout(timeoutId)
    }
  }, [])

  const maxWidthClasses = {
    sm: styles.maxWidthSm,
    md: styles.maxWidthMd,
    lg: styles.maxWidthLg,
    xl: styles.maxWidthXl,
    '2xl': styles.maxWidth2xl,
    full: styles.maxWidthFull,
  }

  const layoutClasses = [
    styles.layout,
    maxWidthClasses[maxWidth],
    padding ? styles.withPadding : '',
    center ? styles.centered : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <BreakpointContext.Provider value={breakpoint}>
      <motion.div
        className={layoutClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </BreakpointContext.Provider>
  )
}

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  autoFit?: boolean
  minItemWidth?: string
}

export function ResponsiveGrid({
  children,
  className = '',
  cols = { default: 1, sm: 2, lg: 3, xl: 4 },
  gap = 'md',
  autoFit = false,
  minItemWidth = '300px',
}: ResponsiveGridProps): React.JSX.Element {
  const { isMobile, isTablet, isDesktop, isLargeScreen } = useBreakpoint()

  const getColumnCount = () => {
    if (isLargeScreen) return cols.xl || cols.lg || cols.md || cols.sm || cols.default || 1
    if (isDesktop) return cols.lg || cols.md || cols.sm || cols.default || 1
    if (isTablet) return cols.md || cols.sm || cols.default || 1
    if (isMobile) return cols.sm || cols.default || 1
    return cols.default || 1
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: `var(--spacing-${gap})`,
    gridTemplateColumns: autoFit 
      ? `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
      : `repeat(${getColumnCount()}, 1fr)`,
  }

  return (
    <div 
      className={`${styles.responsiveGrid} ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  )
}

// Responsive Show/Hide Components
interface ResponsiveShowProps {
  children: React.ReactNode
  on?: ('mobile' | 'tablet' | 'desktop' | 'large')[]
  above?: 'mobile' | 'tablet' | 'desktop'
  below?: 'tablet' | 'desktop' | 'large'
}

export function ResponsiveShow({
  children,
  on,
  above,
  below,
}: ResponsiveShowProps): React.JSX.Element | null {
  const { isMobile, isTablet, isDesktop, isLargeScreen } = useBreakpoint()

  const shouldShow = () => {
    if (on) {
      return (
        (on.includes('mobile') && isMobile) ||
        (on.includes('tablet') && isTablet) ||
        (on.includes('desktop') && isDesktop) ||
        (on.includes('large') && isLargeScreen)
      )
    }

    if (above) {
      switch (above) {
        case 'mobile': return !isMobile
        case 'tablet': return isDesktop || isLargeScreen
        case 'desktop': return isLargeScreen
        default: return false
      }
    }

    if (below) {
      switch (below) {
        case 'tablet': return isMobile
        case 'desktop': return isMobile || isTablet
        case 'large': return isMobile || isTablet || isDesktop
        default: return false
      }
    }

    return true
  }

  if (!shouldShow()) return null

  return <>{children}</>
}

// Responsive Image Component
interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  sizes?: {
    mobile?: string
    tablet?: string
    desktop?: string
    large?: string
  }
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2' | 'auto'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  sizes,
  aspectRatio = 'auto',
  objectFit = 'cover',
  loading = 'lazy',
  priority = false,
}: ResponsiveImageProps): React.JSX.Element {
  const { isMobile, isTablet, isDesktop, isLargeScreen } = useBreakpoint()

  const getCurrentSrc = () => {
    if (sizes) {
      if (isLargeScreen && sizes.large) return sizes.large
      if (isDesktop && sizes.desktop) return sizes.desktop
      if (isTablet && sizes.tablet) return sizes.tablet
      if (isMobile && sizes.mobile) return sizes.mobile
    }
    return src
  }

  const aspectRatioValues = {
    '1:1': '1 / 1',
    '4:3': '4 / 3',
    '16:9': '16 / 9',
    '3:2': '3 / 2',
    'auto': 'auto',
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: aspectRatio === 'auto' ? 'auto' : '100%',
    objectFit,
    aspectRatio: aspectRatioValues[aspectRatio],
  }

  return (
    <img
      src={getCurrentSrc()}
      alt={alt}
      className={`${styles.responsiveImage} ${className}`}
      style={imageStyle}
      loading={priority ? 'eager' : loading}
      decoding="async"
    />
  )
}

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  size?: {
    mobile?: string
    tablet?: string
    desktop?: string
    large?: string
  }
  className?: string
}

export function ResponsiveText({
  children,
  as: Component = 'p',
  size,
  className = '',
}: ResponsiveTextProps): React.JSX.Element {
  const { isMobile, isTablet, isDesktop, isLargeScreen } = useBreakpoint()

  const getCurrentSize = () => {
    if (size) {
      if (isLargeScreen && size.large) return size.large
      if (isDesktop && size.desktop) return size.desktop
      if (isTablet && size.tablet) return size.tablet
      if (isMobile && size.mobile) return size.mobile
    }
    return undefined
  }

  const textStyle: React.CSSProperties = {
    fontSize: getCurrentSize(),
  }

  return (
    <Component 
      className={`${styles.responsiveText} ${className}`}
      style={textStyle}
    >
      {children}
    </Component>
  )
}

// Hook for responsive values
export function useResponsiveValue<T>(values: {
  mobile?: T
  tablet?: T
  desktop?: T
  large?: T
  default: T
}): T {
  const { isMobile, isTablet, isDesktop, isLargeScreen } = useBreakpoint()

  if (isLargeScreen && values.large !== undefined) return values.large
  if (isDesktop && values.desktop !== undefined) return values.desktop
  if (isTablet && values.tablet !== undefined) return values.tablet
  if (isMobile && values.mobile !== undefined) return values.mobile
  return values.default
}