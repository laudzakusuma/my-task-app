'use client'

import React from 'react'
import { FiX } from 'react-icons/fi'
import { Button } from '@/components/ui'
import { PRIORITY_OPTIONS, PRIORITY_LABELS } from '@/lib/constants/priority'
import styles from './TaskFilters.module.scss'

interface TaskFiltersProps {
  filters: {
    search?: string
    category?: string
    priority?: string
    completed?: boolean
  }
  onFiltersChange: (filters: TaskFiltersProps['filters']) => void
}

export default function TaskFilters({ 
  filters, 
  onFiltersChange 
}: TaskFiltersProps): React.JSX.Element {
  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className={styles.filters}>
      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Search</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Cari tasks..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Category</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Filter by category..."
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Priority</label>
          <select
            className={styles.select}
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">All Priorities</option>
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
            value={filters.completed === undefined ? '' : filters.completed.toString()}
            onChange={(e) => handleFilterChange('completed', 
              e.target.value === '' ? undefined : e.target.value === 'true'
            )}
          >
            <option value="">All Tasks</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className={styles.filterActions}>
          <span className={styles.filterCount}>
            {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
          </span>
          <Button
            variant="ghost"
            size="sm"
            icon={<FiX />}
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}