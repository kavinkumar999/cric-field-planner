import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { db } = await connectToDatabase()

    const result = await db.collection('fieldSetups').insertOne(data)

    return NextResponse.json({ id: data.id }, { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to save field setup' },
      { status: 500 }
    )
  }
} 