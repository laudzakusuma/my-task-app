export const TASK_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
} as const

export const PRIORITY_LABELS = {
  LOW: 'Low',
  MEDIUM: 'Medium', 
  HIGH: 'High'
} as const

export const PRIORITY_COLORS = {
  LOW: '#10b981',     // Green
  MEDIUM: '#f59e0b',  // Yellow/Orange
  HIGH: '#ef4444'     // Red
} as const

export type TaskPriority = keyof typeof TASK_PRIORITIES