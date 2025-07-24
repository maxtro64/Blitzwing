import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Hero Image fixed background */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="Blitzwing.webp" 
          alt="Blitzwing creative work" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Overlay text with responsive adjustments */}
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
            Welcome to Blitzwing4k
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            Exploring the intersection of storytelling, art, and digital creation
          </p>
          <Link to='/blitzwing' className="inline-block">
            <button 
              type="button" 
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-center transition-all duration-300 transform hover:scale-105"
            >
              Explore My BlitzWing AI Bot
            </button>
          </Link>
        </div>
      </div>

      {/* Optional: Add a subtle animated scroll indicator at bottom */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

export default Home;