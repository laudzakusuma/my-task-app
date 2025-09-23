'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './VideoBackground.module.scss'

interface VideoBackgroundProps {
  lightModeSrc: string
  darkModeSrc: string
  poster?: string
  overlay?: boolean
  muted?: boolean
  children?: React.ReactNode
}

export default function VideoBackground({ 
  lightModeSrc,
  darkModeSrc,
  poster, 
  overlay = true,
  muted = true,
  children 
}: VideoBackgroundProps) {
  const lightVideoRef = useRef<HTMLVideoElement>(null)
  const darkVideoRef = useRef<HTMLVideoElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Listen for dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      const currentMode = document.documentElement.getAttribute('data-mode')
      const newIsDarkMode = currentMode === 'dark'
      
      if (newIsDarkMode !== isDarkMode) {
        setIsTransitioning(true)
        setIsDarkMode(newIsDarkMode)
        
        // Reset transition state after animation
        setTimeout(() => {
          setIsTransitioning(false)
        }, 1000)
      }
    }

    // Initial check
    checkDarkMode()

    // Watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-mode') {
          checkDarkMode()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode']
    })

    return () => observer.disconnect()
  }, [isDarkMode])

  // Handle video playback
  useEffect(() => {
    const playVideo = (videoRef: React.RefObject<HTMLVideoElement>) => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(console.error)
      }
    }

    if (isDarkMode) {
      playVideo(darkVideoRef)
    } else {
      playVideo(lightVideoRef)
    }
  }, [isDarkMode])

  // Sync muted state
  useEffect(() => {
    [lightVideoRef, darkVideoRef].forEach(ref => {
      if (ref.current) {
        ref.current.muted = muted
      }
    })
  }, [muted])

  return (
    <div className={styles.videoContainer}>
      {/* Light Mode Video */}
      <AnimatePresence>
        {!isDarkMode && (
          <motion.video
            ref={lightVideoRef}
            className={styles.video}
            autoPlay
            muted={muted}
            loop
            playsInline
            poster={poster}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <source src={lightModeSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
      </AnimatePresence>

      {/* Dark Mode Video */}
      <AnimatePresence>
        {isDarkMode && (
          <motion.video
            ref={darkVideoRef}
            className={styles.video}
            autoPlay
            muted={muted}
            loop
            playsInline
            poster={poster}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <source src={darkModeSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
      </AnimatePresence>
      
      {/* Dynamic Overlay berdasarkan mode */}
      {overlay && (
        <motion.div 
          className={styles.overlay}
          animate={{
            background: isDarkMode 
              ? [
                  'linear-gradient(135deg, rgba(26, 15, 11, 0.8) 0%, rgba(177, 121, 73, 0.2) 30%, rgba(173, 136, 104, 0.1) 70%, rgba(26, 15, 11, 0.9) 100%)'
                ]
              : [
                  'linear-gradient(135deg, rgba(58, 41, 34, 0.7) 0%, rgba(177, 121, 73, 0.3) 30%, rgba(173, 136, 104, 0.2) 70%, rgba(58, 41, 34, 0.8) 100%)'
                ]
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      )}
      
      <div className={styles.content}>
        {children}
      </div>

      {/* Loading indicator saat transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className={styles.transitionOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.transitionSpinner} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}