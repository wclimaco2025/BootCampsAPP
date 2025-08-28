'use client'
import Link from 'next/link';

export const Header = () => {
  return (
    <>
    {/* Header */}
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mr-2">
            B
          </div>
          <Link href="/">
             <span className="text-xl font-bold text-gray-800">BootCampsAPP</span>
          </Link>
        </div>
        
       {/*  <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600">Inicio</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Cursos</a>
        </nav> */}
        
        <div className="flex space-x-4">
          <Link href="/login" className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg">Login</Link>
          <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >Register</Link>
        </div>
      </div>
    </header>
  </>
  )
}
  