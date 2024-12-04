import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Simple Website</h1>
      <div className="space-x-4">
        <Link href="/user" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          User View
        </Link>
        <Link href="/admin/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Admin Login
        </Link>
      </div>
    </div>
  )
}

