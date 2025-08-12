import React from 'react';
import { Link } from 'react-router-dom';

function Header({ toggleSidebar }) {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md z-30 relative">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="text-white md:hidden focus:outline-none"
          aria-label="فتح القائمة الجانبية"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <Link to="/" className="text-3xl font-bold hover:text-blue-200">
          بلدية ديرة
        </Link>
        
        <a 
          href="https://dirah-municipality-backend.onrender.com/admin" 
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition duration-300 text-lg"
        >
          لوحة التحكم
        </a>
      </div>
    </header>
  );
}

export default Header;
