import { z } from 'zod'

// Task validation schemas
export const taskCreateSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(255, 'Title too long'),
  content: z.string().optional().nullable(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  category: z.string().max(100, 'Category too long').optional().nullable(),
  dueDate: z.string().optional().nullable(),
  completed: z.boolean().default(false).optional()
}).strict()

export const taskUpdateSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(255, 'Title too long').optional(),
  content: z.string().optional().nullable(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  category: z.string().max(100, 'Category too long').optional().nullable(),
  dueDate: z.string().optional().nullable(),
  completed: z.boolean().optional()
}).strict()

// Type exports
export type TaskCreateInput = z.infer<typeof taskCreateSchema>
export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>

// Named exports for better compatibility
export {
  taskCreateSchema as TaskCreateSchema,
  taskUpdateSchema as TaskUpdateSchema
}