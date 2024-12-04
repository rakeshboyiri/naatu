import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import clientPromise from '@/lib/mongodb'

export async function POST() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token) {
    const client = await clientPromise
    const db = client.db("simple-website")
    await db.collection("admin_sessions").deleteOne({ token })
  }

  cookieStore.delete('admin_token')
  return NextResponse.json({ success: true })
}

