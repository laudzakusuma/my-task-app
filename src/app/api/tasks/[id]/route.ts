import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateTaskSchema } from '@/lib/validations/task'
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
  { params }: RouteParams
) {
  try {
    const { id } = params
    const body = await request.json()
    
    const validatedData = updateTaskSchema.parse({ ...body, id })

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id },
    })

    if (!existingTask) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
        },
        { status: 404 }
      )
    }

    // Build update data object
    const updateData: Record<string, any> = {}
    
    if (validatedData.title !== undefined) updateData.title = validatedData.title
    if (validatedData.content !== undefined) updateData.content = validatedData.content
    if (validatedData.completed !== undefined) updateData.completed = validatedData.completed
    if (validatedData.priority !== undefined) updateData.priority = validatedData.priority
    if (validatedData.category !== undefined) updateData.category = validatedData.category
    if (validatedData.dueDate !== undefined) {
      updateData.dueDate = validatedData.dueDate ? new Date(validatedData.dueDate) : null
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: task,
      message: 'Task updated successfully',
    })

  } catch (error) {
    console.error(`PUT /api/tasks/${params.id} error:`, error)
    
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
        error: error instanceof Error ? error.message : 'Failed to update task',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params

    const existingTask = await prisma.task.findUnique({
      where: { id },
    })

    if (!existingTask) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
        },
        { status: 404 }
      )
    }

    await prisma.task.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
    })

  } catch (error) {
    console.error(`DELETE /api/tasks/${params.id} error:`, error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete task',
      },
      { status: 500 }
    )
  }
}