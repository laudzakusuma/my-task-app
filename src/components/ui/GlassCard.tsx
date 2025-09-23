'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './GlassCard.module.scss'

interface GlassCardProps {
  children: React.ReactNode
  blur?: number
  className?: string
}

export default function GlassCard({ 
  children, 
  blur = 10, 
  className = '' 
}: GlassCardProps) {
  return (
    <motion.div
      className={`${styles.glassCard} ${className}`}
      style={{ backdropFilter: `blur(${blur}px)` }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}