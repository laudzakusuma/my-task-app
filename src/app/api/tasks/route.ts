import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createTaskSchema, getTasksSchema } from '@/lib/validations/task'
import { ApiResponse, PaginatedTasks } from '@/lib/types/task'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams)
    
    const validatedParams = getTasksSchema.parse(params)
    const { page, limit, search, category, priority, completed, sortBy, sortOrder } = validatedParams

    // Build where clause with simple object
    const where: Record<string, any> = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ]
    }
    
    if (category) {
      where.category = { contains: category }
    }
    
    if (priority) {
      where.priority = priority
    }
    
    if (completed !== undefined) {
      where.completed = completed
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count
    const total = await prisma.task.count({ where })

    // Get tasks
    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limit,
    })

    const totalPages = Math.ceil(total / limit)

    const response = {
      data: tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }

    return NextResponse.json({
      success: true,
      data: response,
    })

  } catch (error) {
    console.error('GET /api/tasks error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch tasks',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createTaskSchema.parse(body)

    const task = await prisma.task.create({
      data: {
        title: validatedData.title,
        content: validatedData.content || null,
        priority: validatedData.priority,
        category: validatedData.category || null,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
      },
    })

    return NextResponse.json({
      success: true,
      data: task,
      message: 'Task created successfully',
    })

  } catch (error) {
    console.error('POST /api/tasks error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create task',
      },
      { status: 500 }
    )
  }
}