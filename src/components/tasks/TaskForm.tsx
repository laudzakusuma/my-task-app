'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { FiSave, FiX } from 'react-icons/fi'
import { Button } from '@/components/ui'
import { createTaskSchema } from '@/lib/validations/task'
import { Task } from '@/lib/types/task'
import { PRIORITY_OPTIONS, PRIORITY_LABELS } from '@/lib/constants/priority'
import { z } from 'zod'
import styles from './TaskForm.module.scss'

// Define form data type based on schema
type TaskFormData = z.infer<typeof createTaskSchema>

interface TaskFormProps {
  task?: Task | null
  onSubmit: (data: TaskFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export default function TaskForm({ 
  task, 
  onSubmit, 
  onCancel, 
  loading = false 
}: TaskFormProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: task?.title || '',
      content: task?.content || '',
      priority: (task?.priority as any) || 'MEDIUM',
      category: task?.category || '',
      dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : undefined,
    },
  })

  const handleFormSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <motion.form
      className={styles.taskForm}
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Judul Task *
        </label>
        <input
          id="title"
          type="text"
          className={`${styles.input} ${errors.title ? styles.error : ''}`}
          placeholder="Masukkan judul task..."
          {...register('title')}
        />
        {errors.title && (
          <span className={styles.errorMessage}>{errors.title.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="content" className={styles.label}>
          Deskripsi
        </label>
        <textarea
          id="content"
          className={`${styles.textarea} ${errors.content ? styles.error : ''}`}
          placeholder="Deskripsi task (opsional)..."
          rows={3}
          {...register('content')}
        />
        {errors.content && (
          <span className={styles.errorMessage}>{errors.content.message}</span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="priority" className={styles.label}>
            Prioritas
          </label>
          <select
            id="priority"
            className={`${styles.select} ${errors.priority ? styles.error : ''}`}
            {...register('priority')}
          >
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
          {errors.priority && (
            <span className={styles.errorMessage}>{errors.priority.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="category" className={styles.label}>
            Kategori
          </label>
          <input
            id="category"
            type="text"
            className={`${styles.input} ${errors.category ? styles.error : ''}`}
            placeholder="e.g. Development, Design..."
            {...register('category')}
          />
          {errors.category && (
            <span className={styles.errorMessage}>{errors.category.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="dueDate" className={styles.label}>
          Deadline
        </label>
        <input
          id="dueDate"
          type="datetime-local"
          className={`${styles.input} ${errors.dueDate ? styles.error : ''}`}
          {...register('dueDate')}
        />
        {errors.dueDate && (
          <span className={styles.errorMessage}>{errors.dueDate.message}</span>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || loading}
        >
          <FiX />
          Batal
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting || loading}
          disabled={isSubmitting || loading}
        >
          <FiSave />
          {task ? 'Update Task' : 'Buat Task'}
        </Button>
      </div>
    </motion.form>
  )
}