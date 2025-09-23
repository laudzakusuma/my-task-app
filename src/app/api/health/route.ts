import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check database connection - use a simple count query instead of $queryRaw
    await prisma.task.count()
    
    // Check environment
    const env = process.env.NODE_ENV
    const timestamp = new Date().toISOString()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp,
      environment: env,
      database: 'connected',
      version: process.env.npm_package_version || '1.0.0'
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}