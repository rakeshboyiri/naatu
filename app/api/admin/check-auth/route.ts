import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('admin_token')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db("simple-website")
    
    const session = await db.collection("admin_sessions").findOne({
      token,
      expiresAt: { $gt: new Date() }
    })

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const admin = await db.collection("admins").findOne({ _id: new ObjectId(session.adminId) })

    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true, admin: { email: admin.email } })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

