import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import clientPromise from '@/lib/mongodb'

export async function POST() {
  const token = cookies().get('admin_token')?.value

  if (token) {
    const client = await clientPromise
    const db = client.db("simple-website")
    await db.collection("admin_sessions").deleteOne({ token })
  }

  cookies().delete('admin_token')
  return NextResponse.json({ success: true })
}

