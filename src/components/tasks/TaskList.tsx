'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiFilter, FiPieChart } from 'react-icons/fi'
import { Button, Modal, LoadingSkeleton, useToast } from '@/components/ui'
import PageTransition from '@/components/layout/PageTransition'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'
import TaskFilters from './TaskFilters'
import TaskDashboard from './TaskDashboard'
import { useTasks } from '@/hooks/useTasks'
import { Task } from '@/lib/types/task'
import styles from './TaskList.module.scss'

type TaskFormData = {
  title: string
  content?: string
  priority: string
  category?: string
  dueDate?: string
}

interface TaskListProps {
  initialFilters?: {
    search?: string
    category?: string
    priority?: string
    completed?: boolean
  }
}

export default function TaskList({ initialFilters = {} }: TaskListProps): React.JSX.Element {
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [filters, setFilters] = useState(initialFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  const { showToast } = useToast()
  const { data, loading, error, refetch } = useTasks({
    page: currentPage,
    limit: 12,
    ...filters,
  })

  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      setSubmitting(true)
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        setShowForm(false)
        refetch()
        showToast({
          type: 'success',
          title: 'Task Created!',
          message: 'Task successfully created and added to your list.'
        })
      } else {
        throw new Error('Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
      showToast({
        type: 'error',
        title: 'Error Creating Task',
        message: 'Failed to create task. Please try again.'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return

    try {
      setSubmitting(true)
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        setEditingTask(null)
        refetch()
        showToast({
          type: 'success',
          title: 'Task Updated!',
          message: 'Task successfully updated.'
        })
      } else {
        throw new Error('Failed to update task')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      showToast({
        type: 'error',
        title: 'Error Updating Task',
        message: 'Failed to update task. Please try again.'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleComplete = async (task: Task) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      })

      if (response.ok) {
        refetch()
        showToast({
          type: 'success',
          title: task.completed ? 'Task Reopened' : 'Task Completed!',
          message: task.completed ? 'Task marked as incomplete.' : 'Congratulations! Task has been completed.'
        })
      } else {
        throw new Error('Failed to toggle task completion')
      }
    } catch (error) {
      console.error('Error toggling task completion:', error)
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to change task status.'
      })
    }
  }

  const handleDeleteTask = async (task: Task) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        refetch()
        showToast({
          type: 'success',
          title: 'Task Deleted',
          message: 'Task successfully deleted from your list.'
        })
      } else {
        throw new Error('Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      showToast({
        type: 'error',
        title: 'Error Deleting Task',
        message: 'Failed to delete task. Please try again.'
      })
    }
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <PageTransition>
        <div className={styles.error}>
          <p>Error loading tasks: {error}</p>
          <Button onClick={refetch}>Retry</Button>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className={styles.taskList}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Task Management</h1>
            <p className={styles.subtitle}>
              Efficiently manage your tasks and boost productivity
            </p>
          </div>

          <div className={styles.headerActions}>
            <Button
              variant="outline"
              icon={<FiPieChart />}
              onClick={() => setShowDashboard(!showDashboard)}
              className={styles.headerButton}
            >
              {showDashboard ? 'Hide Stats' : 'Show Stats'}
            </Button>
            
            <Button
              variant="outline"
              icon={<FiFilter />}
              onClick={() => setShowFilters(!showFilters)}
              className={styles.headerButton}
            >
              Filter
            </Button>
            
            <Button
              variant="primary"
              icon={<FiPlus />}
              onClick={() => setShowForm(true)}
              className={styles.addButton}
            >
              Add Task
            </Button>
          </div>
        </motion.div>

        {/* Dashboard */}
        <AnimatePresence>
          {showDashboard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskDashboard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State with Skeletons */}
        {loading && (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <LoadingSkeleton height="200px" className={styles.cardSkeleton} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && data?.data.length === 0 && (
          <motion.div 
            className={styles.empty}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3>No tasks yet</h3>
            <p>Start by creating your first task!</p>
            <Button
              variant="primary"
              icon={<FiPlus />}
              onClick={() => setShowForm(true)}
            >
              Create Task
            </Button>
          </motion.div>
        )}

        {/* Task Grid */}
        {!loading && data && data.data.length > 0 && (
          <motion.div
            className={styles.grid}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="popLayout">
              {data.data.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { delay: index * 0.05 }
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  <TaskCard
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <motion.div 
            className={styles.pagination}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button
              variant="outline"
              disabled={!data.pagination.hasPrev}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            
            <span className={styles.pageInfo}>
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>
            
            <Button
              variant="outline"
              disabled={!data.pagination.hasNext}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </motion.div>
        )}

        {/* Create Task Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Create New Task"
          size="md"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
            loading={submitting}
          />
        </Modal>

        {/* Edit Task Modal */}
        <Modal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          title="Edit Task"
          size="md"
        >
          {editingTask && (
            <TaskForm
              task={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
              loading={submitting}
            />
          )}
        </Modal>
      </div>
    </PageTransition>
  )
}