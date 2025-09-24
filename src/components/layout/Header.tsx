'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCheckSquare, 
  FiMoon, 
  FiSun, 
  FiMenu, 
  FiX,
  FiHome,
  FiList,
  FiPieChart
} from 'react-icons/fi'
import styles from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

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
    document.body.classList.add('mode-transitioning')
    
    const newMode = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-mode', newMode)
    localStorage.setItem('dark-mode', newMode)

    setTimeout(() => {
      document.body.classList.remove('mode-transitioning')
      setIsTransitioning(false)
    }, 1000)
  }

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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
          {/* Logo */}
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCheckSquare className={styles.logoIcon} />
            <span className={styles.logoText}>TaskFlow</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={styles.navigation}>
            <motion.a
              href="#dashboard"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHome />
              <span>Dashboard</span>
            </motion.a>
            <motion.a
              href="#tasks"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiList />
              <span>Tasks</span>
            </motion.a>
            <motion.a
              href="#analytics"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPieChart />
              <span>Analytics</span>
            </motion.a>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Dark Mode Toggle */}
            <motion.button
              className={styles.darkModeToggle}
              onClick={toggleDarkMode}
              disabled={isTransitioning}
              whileHover={{ scale: isTransitioning ? 1 : 1.1 }}
              whileTap={{ scale: isTransitioning ? 1 : 0.9 }}
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
              
              {isTransitioning && (
                <motion.div
                  className={styles.transitionRing}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className={styles.mobileMenuToggle}
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className={styles.mobileMenuContent}>
                <motion.a
                  href="#dashboard"
                  className={styles.mobileNavLink}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <FiHome />
                  <span>Dashboard</span>
                </motion.a>
                <motion.a
                  href="#tasks"
                  className={styles.mobileNavLink}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <FiList />
                  <span>Tasks</span>
                </motion.a>
                <motion.a
                  href="#analytics"
                  className={styles.mobileNavLink}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
                  <FiPieChart />
                  <span>Analytics</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}