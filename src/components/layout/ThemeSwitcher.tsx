'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './ThemeSwitcher.module.scss'

const themes = [
  { id: 'tech', name: 'Tech', color: '#3b82f6' },
  { id: 'nature', name: 'Nature', color: '#059669' },
  { id: 'sunset', name: 'Sunset', color: '#c2410c' },
  { id: 'cyber', name: 'Cyber', color: '#00d9ff' },
  { id: 'video-custom', name: 'Video', color: '#b17949' } // Tambah theme baru
]

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('video-custom') // Default ke video theme

  useEffect(() => {
    const savedTheme = localStorage.getItem('video-theme') || 'video-custom'
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const switchTheme = (themeId: string) => {
    setCurrentTheme(themeId)
    document.documentElement.setAttribute('data-theme', themeId)
    localStorage.setItem('video-theme', themeId)
  }

  return (
    <div className={styles.themeSwitcher}>
      <div className={styles.themeGrid}>
        {themes.map((theme) => (
          <motion.button
            key={theme.id}
            className={`${styles.themeButton} ${currentTheme === theme.id ? styles.active : ''}`}
            onClick={() => switchTheme(theme.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ backgroundColor: theme.color }}
            title={`Switch to ${theme.name} theme`}
          >
            <span className={styles.themeName}>{theme.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}