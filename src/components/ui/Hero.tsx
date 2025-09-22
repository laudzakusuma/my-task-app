'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiClock, FiStar } from 'react-icons/fi'
import styles from './Hero.module.scss'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

interface HeroProps {
  onGetStarted?: () => void
}

const features: FeatureItem[] = [
  {
    icon: <FiCheckCircle />,
    title: 'Simple & Elegant',
    description: 'Clean interface yang mudah digunakan'
  },
  {
    icon: <FiClock />,
    title: 'Real-time Updates',
    description: 'Sinkronisasi data secara real-time'
  },
  {
    icon: <FiStar />,
    title: 'Powerful Features',
    description: 'Fitur lengkap untuk produktivitas maksimal'
  }
]

export default function Hero({ onGetStarted }: HeroProps): React.JSX.Element {
  const handleGetStarted = (): void => {
    if (onGetStarted) {
      onGetStarted()
    } else {
      // Default scroll to tasks section
      const tasksSection = document.getElementById('tasks-section')
      tasksSection?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero}>
      <div className="container">
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Kelola Tugas Anda dengan{' '}
            <span className={styles.accent}>Elegan</span>
          </motion.h1>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            TaskFlow membantu Anda mengorganisir tugas-tugas dengan interface yang 
            indah dan animasi yang halus. Tingkatkan produktivitas dengan style.
          </motion.p>

          <motion.button
            className={styles.ctaButton}
            onClick={handleGetStarted}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mulai Sekarang
            <FiArrowRight className={styles.ctaIcon} />
          </motion.button>
        </motion.div>

        <motion.div 
          className={styles.features}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8 + (index * 0.1),
                ease: 'easeOut'
              }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}