import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md z-10 relative"> {/* z-10 for layering */}
      <div className="container mx-auto flex justify-center items-center">
        {/* removed navigation links from here */}
        <Link to="/" className="text-3xl font-bold hover:text-blue-200">
          بلدية ديرة
        </Link>
      </div>
    </header>
  );
}

export default Header;