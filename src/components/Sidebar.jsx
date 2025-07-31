import React from 'react';
import { Link } from 'react-router-dom';

// المكون يستقبل isOpen و toggleSidebar كـ props من App.jsx
function Sidebar({ isOpen, toggleSidebar }) {
  return (
    // استخدام Tailwind CSS لضبط العرض والموقع بناءً على حالة isOpen
    <aside
      className={`
        fixed inset-y-0 right-0 z-40 w-64 bg-blue-800 text-white p-6 shadow-lg 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
        md:translate-x-0 md:static md:min-h-screen
      `}
    >
      {/* زر إغلاق الشريط الجانبي على الجوال */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-white md:hidden focus:outline-none"
        aria-label="إغلاق القائمة الجانبية"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div className="text-center mb-8 mt-4 md:mt-0"> {/* ضبط الهامش العلوي للعنوان */}
        <Link to="/" className="text-3xl font-bold hover:text-blue-200" onClick={toggleSidebar}>
          بلدية ديرة
        </Link>
      </div>
      <nav className="space-y-4">
        <Link 
          to="/" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar} // إغلاق الشريط الجانبي عند النقر على رابط
        >
          الرئيسية
        </Link>
        <Link 
          to="/departments" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar}
        >
          الأقسام
        </Link>
        <Link 
          to="/projects" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar}
        >
          المشاريع
        </Link>
        <Link 
          to="/announcements" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar}
        >
          الإعلانات
        </Link>
        <Link 
          to="/deliberations" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar}
        >
          المداولات
        </Link>
        <Link 
          to="/decisions" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar}
        >
          القرارات
        </Link>
        <Link 
          to="/services" // إضافة رابط الخدمات
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar}
        >
          الخدمات
        </Link>
        <Link 
          to="/contact" 
          className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg text-right"
          onClick={toggleSidebar}
        >
          اتصل بنا
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
