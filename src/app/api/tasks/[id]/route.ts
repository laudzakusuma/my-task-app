import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { taskUpdateSchema } from '@/lib/validations/task'
import { z } from 'zod'


interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params

    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: task,
    })

  } catch (error) {
    console.error(`GET /api/tasks/${params.id} error:`, error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch task',
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    // Normalize priority values
    if (body.priority) {
      body.priority = body.priority.toUpperCase()
      const priorityMap: Record<string, string> = {
        'RENDAH': 'LOW',
        'SEDANG': 'MEDIUM', 
        'TINGGI': 'HIGH'
      }
      body.priority = priorityMap[body.priority] || body.priority
    }

    // Handle dueDate conversion
    if (body.dueDate !== undefined) {
      if (body.dueDate === '' || body.dueDate === null) {
        body.dueDate = null
      } else {
        body.dueDate = new Date(body.dueDate).toISOString()
      }
    }

    const validatedData = taskUpdateSchema.parse(body)

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(validatedData.title && { title: validatedData.title }),
        ...(validatedData.content !== undefined && { content: validatedData.content }),
        ...(validatedData.priority && { priority: validatedData.priority }),
        ...(validatedData.category !== undefined && { category: validatedData.category }),
        ...(validatedData.dueDate !== undefined && { 
          dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null 
        }),
        ...(validatedData.completed !== undefined && { completed: validatedData.completed })
      }
    })

    return NextResponse.json({
      success: true,
      data: task
    })
  } catch (error) {
    console.error('Error updating task:', error)
    
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.task.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}