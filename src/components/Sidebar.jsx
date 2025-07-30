import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-800 text-white min-h-screen p-6 shadow-lg fixed right-0 top-0 pt-20"> {/* Fixed sidebar on the right */}
      <div className="text-center mb-8">
        <Link to="/" className="text-3xl font-bold hover:text-blue-200">
          بلدية ديرة
        </Link>
      </div>
      <nav className="space-y-4">
        <Link 
          to="/" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
        >
          الرئيسية
        </Link>
        <Link 
          to="/departments" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
        >
          الأقسام
        </Link>
        <Link 
          to="/projects" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
        >
          المشاريع
        </Link>
        <Link 
          to="/announcements" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
        >
          الإعلانات
        </Link>
        <Link 
          to="/deliberations" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
        >
          المداولات
        </Link>
        <Link 
          to="/decisions" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
        >
          القرارات
        </Link>
        <Link 
          to="/contact" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
        >
          اتصل بنا
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;