'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiX } from 'react-icons/fi'
import { Button } from '@/components/ui'
import { Task } from '@/lib/types/task'
import { TASK_PRIORITIES, PRIORITY_LABELS } from '@/lib/constants/task'
import styles from './TaskForm.module.scss'

interface TaskFormProps {
  task?: Task
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  loading?: boolean
}

type TaskFormData = {
  title: string
  content?: string
  priority: string
  category?: string
  dueDate?: string
}

export default function TaskForm({ 
  task, 
  onSubmit, 
  onCancel, 
  loading = false 
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || '',
    content: task?.content || '',
    priority: task?.priority || 'MEDIUM',
    category: task?.category || '',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    onSubmit(formData)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <motion.form
      className={styles.taskForm}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`${styles.input} ${errors.title ? styles.error : ''}`}
          placeholder="Enter task title"
          disabled={loading}
        />
        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          Description
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className={styles.textarea}
          placeholder="Enter task description"
          rows={3}
          disabled={loading}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="priority" className={styles.label}>
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className={styles.select}
            disabled={loading}
          >
            <option value="LOW">{PRIORITY_LABELS.LOW}</option>
            <option value="MEDIUM">{PRIORITY_LABELS.MEDIUM}</option>
            <option value="HIGH">{PRIORITY_LABELS.HIGH}</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="e.g. Development, Design"
            disabled={loading}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dueDate" className={styles.label}>
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formActions}>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          icon={<FiX />}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          icon={<FiSave />}
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </motion.form>
  )
}