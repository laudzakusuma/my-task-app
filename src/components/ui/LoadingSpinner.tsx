'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './LoadingSpinner.module.scss'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'var(--color-accent)',
  className = '' 
}: LoadingSpinnerProps): React.JSX.Element {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${className}`}>
      <motion.div
        className={styles.ring}
        style={{ borderTopColor: color }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}