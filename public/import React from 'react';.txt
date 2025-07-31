import React from 'react';
import { Link } from 'react-router-dom';

// المكون يستقبل toggleSidebar كـ prop من App.jsx
function Header({ toggleSidebar }) {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md z-30 relative"> {/* z-30 for layering above sidebar */}
      <div className="container mx-auto flex justify-between items-center">
        {/* زر تبديل الشريط الجانبي (يظهر فقط على الشاشات الصغيرة) */}
        <button
          onClick={toggleSidebar}
          className="text-white md:hidden focus:outline-none"
          aria-label="فتح القائمة الجانبية"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* عنوان البلدية */}
        <Link to="/" className="text-3xl font-bold hover:text-blue-200">
          بلدية ديرة
        </Link>
        
        {/* عنصر وهمي للمحاذاة على الشاشات الكبيرة إذا لزم الأمر */}
        <div className="hidden md:block w-8"></div>
      </div>
    </header>
  );
}

export default Header;
