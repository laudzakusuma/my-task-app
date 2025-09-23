'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi'
import { Task } from '@/lib/types/task'
import { PRIORITY_LABELS, PRIORITY_COLORS } from '@/lib/constants/task'
import styles from './TaskCard.module.scss'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onToggleComplete: (task: Task) => void
}

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}: TaskCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date))
  }

  const getPriorityLabel = (priority: string) => {
    const normalizedPriority = priority.toUpperCase()
    switch (normalizedPriority) {
      case 'HIGH':
      case 'TINGGI':
        return PRIORITY_LABELS.HIGH
      case 'MEDIUM':
      case 'SEDANG':
        return PRIORITY_LABELS.MEDIUM
      case 'LOW':
      case 'RENDAH':
        return PRIORITY_LABELS.LOW
      default:
        return PRIORITY_LABELS.MEDIUM
    }
  }

  const getPriorityColor = (priority: string) => {
    const normalizedPriority = priority.toUpperCase()
    switch (normalizedPriority) {
      case 'HIGH':
      case 'TINGGI':
        return PRIORITY_COLORS.HIGH
      case 'MEDIUM':
      case 'SEDANG':
        return PRIORITY_COLORS.MEDIUM
      case 'LOW':
      case 'RENDAH':
        return PRIORITY_COLORS.LOW
      default:
        return PRIORITY_COLORS.MEDIUM
    }
  }

  return (
    <motion.div
      className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.cardHeader}>
        <motion.button
          className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
          onClick={() => onToggleComplete(task)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <FiCheck />}
        </motion.button>

        <div className={styles.cardActions}>
          <motion.button
            className={styles.actionButton}
            onClick={() => onEdit(task)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Edit task"
          >
            <FiEdit2 />
          </motion.button>
          
          <motion.button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => onDelete(task)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Delete task"
          >
            <FiTrash2 />
          </motion.button>
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        
        {task.content && (
          <p className={styles.taskDescription}>{task.content}</p>
        )}

        <div className={styles.cardMeta}>
          <span 
            className={styles.priorityBadge}
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {getPriorityLabel(task.priority)}
          </span>

          {task.category && (
            <span className={styles.categoryBadge}>
              {task.category}
            </span>
          )}
        </div>

        {task.dueDate && (
          <div className={styles.dueDate}>
            <FiCalendar />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}