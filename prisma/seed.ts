import { PrismaClient } from '@prisma/client'
import { PRIORITY_VALUES } from '../src/lib/constants/priority'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')
  
  // Clear existing data
  await prisma.task.deleteMany()
  
  // Seed tasks
  const tasks = [
    {
      title: 'Setup project infrastructure',
      content: 'Initialize Next.js project with TypeScript, Prisma, and styling setup',
      completed: true,
      priority: PRIORITY_VALUES.HIGH,
      category: 'Development',
      dueDate: new Date('2024-01-15')
    },
    {
      title: 'Design UI components',
      content: 'Create reusable UI components with animations and proper TypeScript interfaces',
      completed: true,
      priority: PRIORITY_VALUES.MEDIUM,
      category: 'Design',
      dueDate: new Date('2024-01-20')
    },
    {
      title: 'Implement CRUD operations',
      content: 'Build API routes for creating, reading, updating, and deleting tasks',
      completed: false,
      priority: PRIORITY_VALUES.HIGH,
      category: 'Development',
      dueDate: new Date('2024-01-25')
    },
    {
      title: 'Add authentication system',
      content: 'Integrate NextAuth.js for user authentication and authorization',
      completed: false,
      priority: PRIORITY_VALUES.MEDIUM,
      category: 'Security',
      dueDate: new Date('2024-02-01')
    },
    {
      title: 'Write comprehensive tests',
      content: 'Add unit tests and integration tests for all major features',
      completed: false,
      priority: PRIORITY_VALUES.LOW,
      category: 'Testing',
      dueDate: new Date('2024-02-10')
    }
  ]

  for (const task of tasks) {
    await prisma.task.create({
      data: task
    })
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })