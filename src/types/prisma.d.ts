declare module '@prisma/client' {
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

  export class PrismaClient {
    task: {
      findMany: (args?: any) => Promise<Task[]>
      findUnique: (args: any) => Promise<Task | null>
      create: (args: any) => Promise<Task>
      update: (args: any) => Promise<Task>
      delete: (args: any) => Promise<Task>
      count: (args?: any) => Promise<number>
      deleteMany: (args?: any) => Promise<any>
    }
    $disconnect: () => Promise<void>
  }
}