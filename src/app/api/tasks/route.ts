import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { taskCreateSchema } from '@/lib/validations/task'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const priority = searchParams.get('priority') || ''
    const completed = searchParams.get('completed')
    const category = searchParams.get('category') || ''

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (priority) {
      where.priority = priority
    }
    
    if (completed !== null && completed !== undefined) {
      where.completed = completed === 'true'
    }
    
    if (category) {
      where.category = { contains: category, mode: 'insensitive' }
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.task.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)
    const hasNext = page < totalPages
    const hasPrev = page > 1

    return NextResponse.json({
      success: true,
      data: {
        data: tasks,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrev
        }
      }
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Normalize priority values
    if (body.priority) {
      body.priority = body.priority.toUpperCase()
      // Convert Indonesian to English if needed
      const priorityMap: Record<string, string> = {
        'RENDAH': 'LOW',
        'SEDANG': 'MEDIUM', 
        'TINGGI': 'HIGH'
      }
      body.priority = priorityMap[body.priority] || body.priority
    }

    // Handle dueDate conversion
    if (body.dueDate && body.dueDate !== '') {
      // Convert date string to ISO format if needed
      body.dueDate = new Date(body.dueDate).toISOString()
    } else {
      body.dueDate = undefined
    }

    const validatedData = taskCreateSchema.parse(body)

    const task = await prisma.task.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        priority: validatedData.priority,
        category: validatedData.category,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        completed: validatedData.completed
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: task 
    })
  } catch (error) {
    console.error('Error creating task:', error)
    
    if (error instanceof Error && 'issues' in error) {
      // Zod validation error
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    )
  }
}