import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const client = await clientPromise
  const db = client.db("simple-website")

  const existingAdmin = await db.collection("admins").findOne({ email })

  if (existingAdmin) {
    return NextResponse.json({ message: 'Email already in use' }, { status: 400 })
  }

  await db.collection("admins").insertOne({ email, password })

  return NextResponse.json({ success: true })
}

