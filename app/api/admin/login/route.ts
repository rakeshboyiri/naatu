import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import crypto from 'crypto'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const client = await clientPromise
  const db = client.db("simple-website")
  const admin = await db.collection("admins").findOne({ email, password })

  if (admin) {
    const token = crypto.randomBytes(64).toString('hex')
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

    await db.collection("admin_sessions").insertOne({
      adminId: admin._id,
      token,
      expiresAt: expirationDate
    })

    // Use NextResponse to set the cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, { 
      httpOnly: true,
      expires: expirationDate,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}
