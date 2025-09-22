'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiFilter, FiPieChart } from 'react-icons/fi' // Changed FiBarChart3 to FiPieChart
import { Button, Modal } from '@/components/ui'
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

  const { data, loading, error, refetch } = useTasks({
    page: currentPage,
    limit: 12,
    ...filters,
  })

  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
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
      } else {
        throw new Error('Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return

    try {
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
      } else {
        throw new Error('Failed to update task')
      }
    } catch (error) {
      console.error('Error updating task:', error)
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
      } else {
        throw new Error('Failed to toggle task completion')
      }
    } catch (error) {
      console.error('Error toggling task completion:', error)
    }
  }

  const handleDeleteTask = async (task: Task) => {
    if (!confirm('Apakah Anda yakin ingin menghapus task ini?')) return

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        refetch()
      } else {
        throw new Error('Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading tasks: {error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  return (
    <div className={styles.taskList}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Task Management</h1>
          <p className={styles.subtitle}>
            Kelola tugas-tugas Anda dengan efisien
          </p>
        </div>

        <div className={styles.headerActions}>
          <Button
            variant="outline"
            icon={<FiPieChart />}
            onClick={() => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? 'Hide Stats' : 'Show Stats'}
          </Button>
          
          <Button
            variant="outline"
            icon={<FiFilter />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter
          </Button>
          
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={() => setShowForm(true)}
          >
            Tambah Task
          </Button>
        </div>
      </div>

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

      {/* Task Grid */}
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading tasks...</p>
        </div>
      ) : data?.data.length === 0 ? (
        <div className={styles.empty}>
          <h3>Belum ada task</h3>
          <p>Mulai dengan membuat task pertama Anda!</p>
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={() => setShowForm(true)}
          >
            Buat Task
          </Button>
        </div>
      ) : (
        <motion.div
          className={styles.grid}
          layout
        >
          <AnimatePresence>
            {data?.data.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
        <div className={styles.pagination}>
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
        </div>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Buat Task Baru"
        size="md"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
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
          />
        )}
      </Modal>
    </div>
  )
}