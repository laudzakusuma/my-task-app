'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlay, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { Button } from '@/components/ui'
import VideoBackground from './VideoBackground'
import GlassCard from './GlassCard'
import styles from './EnhancedHero.module.scss'

interface EnhancedHeroProps {
  onGetStarted?: () => void
}

export default function EnhancedHero({ onGetStarted }: EnhancedHeroProps) {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <section className={styles.hero}>
      <VideoBackground 
        lightModeSrc="/videos/background.mp4"
        darkModeSrc="/videos/background-night.mp4"
        overlay={true}
        muted={isMuted}
      >
        <div className="container">
          <div className={styles.heroContent}>
            <motion.div
              className={styles.textContent}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.h1 
                className={styles.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Digital Transformation{' '}
                <span className={styles.gradient}>TaskFlow</span>
              </motion.h1>

              <motion.p 
                className={styles.subtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Revolutionize modern team workflows with AI-powered technology 
                that seamlessly integrates productivity, collaboration, and innovation 
                in one comprehensive platform.
              </motion.p>

              <motion.div
                className={styles.buttonGroup}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon={<FiArrowRight />}
                  onClick={onGetStarted}
                  className={styles.primaryButton}
                >
                  Start Your Journey
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  icon={<FiPlay />}
                  className={styles.secondaryButton}
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.visualContent}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GlassCard className={styles.dashboardPreview}>
                <div className={styles.previewHeader}>
                  <div className={styles.previewTitle}>TaskFlow Dashboard</div>
                  <div className={styles.previewStats}>
                    <span className={styles.statDot}></span>
                    <span>Live Analytics</span>
                  </div>
                </div>
                
                <div className={styles.previewContent}>
                  <div className={styles.chartArea}>
                    <div className={styles.chartBars}>
                      <div className={styles.bar} style={{ height: '60%' }}></div>
                      <div className={styles.bar} style={{ height: '80%' }}></div>
                      <div className={styles.bar} style={{ height: '45%' }}></div>
                      <div className={styles.bar} style={{ height: '90%' }}></div>
                      <div className={styles.bar} style={{ height: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div className={styles.taskPreview}>
                    <div className={styles.taskRow}>
                      <div className={styles.taskIcon}></div>
                      <div className={styles.taskInfo}>
                        <div className={styles.taskName}></div>
                        <div className={styles.taskProgress}></div>
                      </div>
                    </div>
                    <div className={styles.taskRow}>
                      <div className={styles.taskIcon}></div>
                      <div className={styles.taskInfo}>
                        <div className={styles.taskName}></div>
                        <div className={styles.taskProgress}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        <motion.button
          className={styles.audioControl}
          onClick={() => setIsMuted(!isMuted)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            backgroundColor: isMuted 
              ? 'var(--glass-bg)' 
              : 'var(--color-accent)'
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: isMuted ? 0 : 360 }}
            transition={{ duration: 0.5 }}
          >
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </motion.div>
        </motion.button>
      </VideoBackground>
    </section>
  )
}