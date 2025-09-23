'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckSquare, FiMoon, FiSun } from 'react-icons/fi'
import styles from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'video-custom')
    
    const savedMode = localStorage.getItem('dark-mode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-mode', 'dark')
    }
  }, [])

  const toggleDarkMode = (): void => {
    setIsTransitioning(true)
    
    // Add transition class to body for smooth color transitions
    document.body.classList.add('mode-transitioning')
    
    const newMode = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-mode', newMode)
    localStorage.setItem('dark-mode', newMode)

    // Remove transition class and reset state after animation
    setTimeout(() => {
      document.body.classList.remove('mode-transitioning')
      setIsTransitioning(false)
    }, 1000)
  }

  return (
    <motion.header 
      className={`${styles.header} ${className || ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container">
        <nav className={styles.nav}>
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCheckSquare className={styles.logoIcon} />
            <span className={styles.logoText}>TaskFlow</span>
          </motion.div>

          <motion.button
            className={styles.darkModeToggle}
            onClick={toggleDarkMode}
            disabled={isTransitioning}
            whileHover={{ scale: isTransitioning ? 1 : 1.1 }}
            whileTap={{ scale: isTransitioning ? 1 : 0.9 }}
            animate={{
              backgroundColor: isDarkMode 
                ? 'rgba(240, 237, 233, 0.1)' 
                : 'rgba(26, 15, 11, 0.1)'
            }}
            transition={{ duration: 0.5 }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiSun />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiMoon />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Loading indicator saat transition */}
            {isTransitioning && (
              <motion.div
                className={styles.transitionRing}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              />
            )}
          </motion.button>
        </nav>
      </div>
    </motion.header>
  )
}