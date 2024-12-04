'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin!</h1>
          <p className="mt-2 text-gray-600">This is your admin dashboard. You can manage your website from here.</p>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                <p className="mt-1 text-sm text-gray-500">Manage user accounts and permissions.</p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Content Management</h3>
                <p className="mt-1 text-sm text-gray-500">Update and manage website content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

