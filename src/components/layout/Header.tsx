'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCheckSquare, FiMoon, FiSun } from 'react-icons/fi'
import styles from './Header.module.scss'
import ThemeSwitcher from './ThemeSwitcher'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = (): void => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '')
    localStorage.setItem('theme', newTheme)
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
            className={styles.themeToggle}
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </motion.button>
        </nav>
      </div>
      <div className={styles.headerControls}>
        <ThemeSwitcher />
        <motion.button
          className={styles.themeToggle}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </motion.button>
      </div>
    </motion.header>
  )
}