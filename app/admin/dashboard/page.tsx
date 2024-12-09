'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Products from '../products/page'

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/admin/check-auth')
      if (!response.ok) {
        router.push('/admin/login')
      } else {
        const data = await response.json()
        setAdminEmail(data.admin.email)
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const response = await fetch('/api/admin/logout', { method: 'POST' })
    if (response.ok) {
      router.push('/admin/login')
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-lg font-semibold">Admin Dashboard</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Logged in as: {adminEmail}</span>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <Products />
     
    </div>
  )
}

