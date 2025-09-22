// Gunakan type assertion untuk menghindari import issues
export interface Task {
  id: string
  title: string
  content: string | null
  completed: boolean
  priority: string
  category: string | null
  dueDate: Date | null
  createdAt: Date
  updatedAt: Date
}

export type TaskWithMeta = Task & {
  _count?: {
    subtasks?: number
  }
}

export interface TaskFilters {
  search?: string
  category?: string
  priority?: string
  completed?: boolean
  dateRange?: {
    from: Date
    to: Date
  }
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  overdue: number
  byPriority: Record<string, number>
  byCategory: Record<string, number>
}

export interface PaginatedTasks {
  data: Task[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  details?: any
}