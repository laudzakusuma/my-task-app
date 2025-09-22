import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PRIORITY_VALUES } from '@/lib/constants/priority'
import { Task } from '@/lib/types/task';

export async function GET(request: NextRequest) {
  try {
    // Get basic counts
    const total = await prisma.task.count()
    const completed = await prisma.task.count({ where: { completed: true } })
    const pending = await prisma.task.count({ where: { completed: false } })

    // Get overdue tasks count
    const overdue = await prisma.task.count({
      where: {
        completed: false,
        dueDate: {
          lt: new Date(),
        },
      },
    })

    // Get priority stats individually
    const lowPriority = await prisma.task.count({ where: { priority: PRIORITY_VALUES.LOW } })
    const mediumPriority = await prisma.task.count({ where: { priority: PRIORITY_VALUES.MEDIUM } })
    const highPriority = await prisma.task.count({ where: { priority: PRIORITY_VALUES.HIGH } })
    const urgentPriority = await prisma.task.count({ where: { priority: PRIORITY_VALUES.URGENT } })

    const byPriority = {
      [PRIORITY_VALUES.LOW]: lowPriority,
      [PRIORITY_VALUES.MEDIUM]: mediumPriority,
      [PRIORITY_VALUES.HIGH]: highPriority,
      [PRIORITY_VALUES.URGENT]: urgentPriority,
    }

    // Get category stats
    const tasksWithCategories = await prisma.task.findMany({
      select: { category: true },
      where: { category: { not: null } },
    })

    const byCategory: Record<string, number> = {}
        tasksWithCategories.forEach((task: Task) => {
        if (task.category) {
            byCategory[task.category] = (byCategory[task.category] || 0) + 1
        }
    })

    const stats = {
      total,
      completed,
      pending,
      overdue,
      byPriority,
      byCategory,
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })

  } catch (error) {
    console.error('GET /api/tasks/stats error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch task statistics',
      },
      { status: 500 }
    )
  }
}