import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  const token = cookies().get('admin_token')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db("simple-website")
  
  const session = await db.collection("admin_sessions").findOne({
    token,
    expiresAt: { $gt: new Date() }
  })

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const admin = await db.collection("admins").findOne({ _id: session.adminId })

  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, admin: { email: admin.email } })
}

