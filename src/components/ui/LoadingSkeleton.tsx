'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './LoadingSkeleton.module.scss'

interface LoadingSkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
}

export default function LoadingSkeleton({ 
  width = '100%',
  height = '1em',
  className = '',
  variant = 'text'
}: LoadingSkeletonProps): React.JSX.Element {
  return (
    <motion.div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{ width, height }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}