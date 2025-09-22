import { z } from 'zod'
import { PRIORITY_VALUES } from '@/lib/constants/priority'

const prioritySchema = z.enum([
  PRIORITY_VALUES.LOW,
  PRIORITY_VALUES.MEDIUM,
  PRIORITY_VALUES.HIGH,
  PRIORITY_VALUES.URGENT,
])

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().optional(),
  priority: prioritySchema.default(PRIORITY_VALUES.MEDIUM),
  category: z.string().optional(),
  dueDate: z.string().optional(),
})

export const updateTaskSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  content: z.string().optional(),
  completed: z.boolean().optional(),
  priority: prioritySchema.optional(),
  category: z.string().optional(),
  dueDate: z.string().optional(),
})

export const deleteTaskSchema = z.object({
  id: z.string().cuid(),
})

export const getTasksSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  priority: prioritySchema.optional(),
  completed: z.coerce.boolean().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'dueDate', 'title', 'priority']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>
export type GetTasksInput = z.infer<typeof getTasksSchema>