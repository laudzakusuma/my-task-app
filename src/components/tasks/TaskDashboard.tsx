'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiClock, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi'
import { Card } from '@/components/ui'
import { useTaskStats } from '@/hooks/useTasks'
import { PRIORITY_COLORS, PRIORITY_LABELS } from '@/lib/constants/priority'
import styles from './TaskDashboard.module.scss'

export default function TaskDashboard(): React.JSX.Element {
  const { data: stats, loading, error } = useTaskStats()

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    )
  }

  if (error || !stats) {
    return <div className={styles.error}>Failed to load statistics</div>
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-accent)' }}>
              <FiTrendingUp />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.total}</h3>
              <p className={styles.statLabel}>Total Tasks</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-success)' }}>
              <FiCheckCircle />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.completed}</h3>
              <p className={styles.statLabel}>Completed</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#f97316' }}>
              <FiClock />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.pending}</h3>
              <p className={styles.statLabel}>Pending</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-error)' }}>
              <FiAlertTriangle />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.overdue}</h3>
              <p className={styles.statLabel}>Overdue</p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className={styles.chartsGrid}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Completion Rate</h3>
            <div className={styles.progressContainer}>
              <div className={styles.progressCircle}>
                <div className={styles.progressValue}>{completionRate}%</div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className={styles.chartCard}>
            <h3 className={styles.chartTitle}>By Priority</h3>
            <div className={styles.priorityList}>
              {Object.entries(stats.byPriority).map(([priority, count]) => (
                <div key={priority} className={styles.priorityItem}>
                  <div className={styles.priorityInfo}>
                    <span 
                      className={styles.priorityDot}
                      style={{ backgroundColor: PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] }}
                    />
                    <span className={styles.priorityLabel}>
                      {PRIORITY_LABELS[priority as keyof typeof PRIORITY_LABELS]}
                    </span>
                  </div>
                  <span className={styles.priorityCount}>{count}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {Object.keys(stats.byCategory).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className={styles.chartCard}>
              <h3 className={styles.chartTitle}>By Category</h3>
              <div className={styles.categoryList}>
                {Object.entries(stats.byCategory)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([category, count]) => (
                  <div key={category} className={styles.categoryItem}>
                    <span className={styles.categoryName}>{category}</span>
                    <span className={styles.categoryCount}>{count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}