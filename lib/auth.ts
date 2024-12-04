import { cookies } from 'next/headers'
import clientPromise from './mongodb'

export async function checkAuth() {
  const token = cookies().get('admin_token')?.value

  if (!token) {
    return null
  }

  const client = await clientPromise
  const db = client.db("simple-website")
  
  const session = await db.collection("admin_sessions").findOne({
    token,
    expiresAt: { $gt: new Date() }
  })

  if (!session) {
    return null
  }

  const admin = await db.collection("admins").findOne({ _id: session.adminId })

  return admin
}

