'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import styles from './Card.module.scss'

interface CardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  className?: string
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = true,
  className = '',
  ...motionProps
}: CardProps): React.JSX.Element {
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: hoverable ? {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    } : {},
    tap: hoverable ? {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    } : {}
  }

  const cardClasses = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}