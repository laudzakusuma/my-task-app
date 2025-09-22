'use client'

import { useState, useEffect } from 'react'
import { Task, TaskStats } from '@/lib/types/task'

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface TasksResponse {
  data: Task[]
  pagination: PaginationInfo
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface UseTasksOptions {
  page?: number
  limit?: number
  search?: string
  category?: string
  priority?: string
  completed?: boolean
  sortBy?: string
  sortOrder?: string
  enabled?: boolean
}

export function useTasks(options: UseTasksOptions = {}) {
  const [data, setData] = useState<TasksResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.page) params.append('page', options.page.toString())
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.search) params.append('search', options.search)
      if (options.category) params.append('category', options.category)
      if (options.priority) params.append('priority', options.priority)
      if (options.completed !== undefined) params.append('completed', options.completed.toString())
      if (options.sortBy) params.append('sortBy', options.sortBy)
      if (options.sortOrder) params.append('sortOrder', options.sortOrder)

      const response = await fetch(`/api/tasks?${params.toString()}`)
      const result: ApiResponse<TasksResponse> = await response.json()

      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch tasks')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.enabled !== false) {
      fetchTasks()
    }
  }, [
    options.page,
    options.limit,
    options.search,
    options.category,
    options.priority,
    options.completed,
    options.sortBy,
    options.sortOrder,
    options.enabled
  ])

  return {
    data,
    loading,
    error,
    refetch: fetchTasks,
  }
}

export function useTaskStats() {
  const [data, setData] = useState<TaskStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/tasks/stats')
      const result: ApiResponse<TaskStats> = await response.json()

      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch stats')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchStats,
  }
}