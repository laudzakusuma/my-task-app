'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { format } from 'date-fns'
import { Card, Button } from '@/components/ui'
import { Task } from '@/lib/types/task'
import { PRIORITY_LABELS, PRIORITY_COLORS } from '@/lib/constants/priority'
import styles from './TaskCard.module.scss'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
  onToggleComplete?: (task: Task) => void
}

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}: TaskCardProps): React.JSX.Element {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

  const handleToggleComplete = () => {
    if (onToggleComplete) {
      onToggleComplete(task)
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task)
    }
  }

  return (
    <Card 
      className={`${styles.taskCard} ${task.completed ? styles.completed : ''} ${isOverdue ? styles.overdue : ''}`}
      whileHover={{ y: -2 }}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <motion.button
            className={styles.checkButton}
            onClick={handleToggleComplete}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? (
              <FiCheck className={styles.checkIcon} />
            ) : (
              <div className={styles.emptyCheck} />
            )}
          </motion.button>
          
          <div className={styles.titleContent}>
            <h3 className={styles.title}>{task.title}</h3>
            {task.content && (
              <p className={styles.content}>{task.content}</p>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            icon={<FiEdit />}
            onClick={handleEdit}
            aria-label="Edit task"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<FiTrash2 />}
            onClick={handleDelete}
            aria-label="Delete task"
          />
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <span 
            className={styles.priority}
            style={{ backgroundColor: PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS] }}
          >
            {PRIORITY_LABELS[task.priority as keyof typeof PRIORITY_LABELS]}
          </span>
          
          {task.category && (
            <span className={styles.category}>{task.category}</span>
          )}
        </div>

        {task.dueDate && (
          <div className={styles.metaRow}>
            <div className={styles.dueDate}>
              <FiCalendar className={styles.calendarIcon} />
              <span className={isOverdue ? styles.overdueText : ''}>
                {format(new Date(task.dueDate), 'dd MMM yyyy')}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}