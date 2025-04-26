import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className=" shadow-sm sticky top-0 z-50">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="hero.webp" 
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500" 
              alt="Blitzwing logo" 
            />
            <span className="text-xl font-bold  dark:text-white">Blitzwing4k</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              {[
                { path: '/', name: 'Home' },
                { path: '/illustration', name: 'Illustration' },
                { path: '/post', name: 'Posts' },
                { path: '/youtube', name: 'Videos' },
                { path: '/about', name: 'About' },
                { path: '/contact', name: 'Contact' },
                { path: '/support', name: 'Support' }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className=" text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white  focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col gap-4">
              {[
                { path: '/', name: 'Home' },
                { path: '/illustration', name: 'Illustration' },
                { path: '/post', name: 'Posts' },
                { path: '/youtube', name: 'Videos' },
                { path: '/about', name: 'About' },
                { path: '/contact', name: 'Contact' },
                { path: '/support', name: 'Support' }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="block py-2 text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header