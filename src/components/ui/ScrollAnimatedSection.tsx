'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ScrollAnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale'
  delay?: number
  duration?: number
}

const animations = {
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
  },
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 }
  },
  slideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  }
}

export default function ScrollAnimatedSection({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0,
  duration = 0.6
}: ScrollAnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true })

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.section>
  )
}