import Link from 'next/link'

export default function UserView() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-lg font-semibold">User View</span>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, User!</h1>
          <p className="mt-2 text-gray-600">This is the user view of our simple website.</p>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Latest Updates</h2>
            <ul className="mt-4 space-y-4">
              <li className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-4 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">New Feature Announcement</h3>
                  <p className="mt-1 text-sm text-gray-500">We've added some exciting new features to our website!</p>
                </div>
              </li>
              <li className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-4 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Maintenance</h3>
                  <p className="mt-1 text-sm text-gray-500">We'll be performing maintenance on our servers next week.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

