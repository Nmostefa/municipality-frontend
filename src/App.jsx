import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/Sidebar.jsx';

// هذا هو عنوان الـ API الجديد للواجهة الخلفية المنشورة على Render.com
// تأكد من تحديث هذا الرابط إذا تغير عنوان الواجهة الخلفية
const API_BASE_URL = 'https://dirah-municipality-backend.onrender.com';

function App() {
  const [siteSettings, setSiteSettings] = useState([]);
  // حالة جديدة للتحكم في فتح/إغلاق الشريط الجانبي على الجوال
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSiteSettings(data);
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
        setSiteSettings([
          { setting_name: "phone_number", setting_value: "N/A" },
          { setting_name: "email", setting_value: "N/A" },
          { setting_name: "address", setting_value: "N/A" },
          { setting_name: "working_hours", setting_value: "N/A" }
        ]);
      }
    };

    fetchSiteSettings();
  }, []);

  // دالة لتبديل حالة الشريط الجانبي (فتح/إغلاق)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // useEffect لإغلاق الشريط الجانبي تلقائياً على الشاشات الكبيرة
  // وتحديث isSidebarOpen بناءً على حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      // إذا كانت الشاشة أكبر من أو تساوي 'md' (768px)، تأكد من أن الشريط الجانبي مفتوح
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        // إذا كانت الشاشة أصغر من 'md'، أغلق الشريط الجانبي (لتبدأ وهو مغلق)
        setIsSidebarOpen(false);
      }
    };

    // استمع لحدث تغيير حجم النافذة
    window.addEventListener('resize', handleResize);
    // قم بتشغيل الدالة مرة واحدة عند التحميل الأولي لتحديد الحالة الأولية
    handleResize();

    // تنظيف المستمع عند إلغاء تحميل المكون
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      {/* تمرير toggleSidebar إلى Header للسماح بفتحه/إغلاقه */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow relative"> {/* أضف relative هنا */}
        {/* تمرير isOpen و toggleSidebar إلى Sidebar للتحكم في حالته */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Overlay يغلق الشريط الجانبي عند النقر خارجه على الجوال */}
        {isSidebarOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/*
          المحتوى الرئيسي:
          - md:mr-64: على الشاشات المتوسطة والكبيرة، اترك مساحة 64 (256px) على اليمين للشريط الجانبي.
          - flex-grow: لملء المساحة المتبقية.
          - p-4: تبطين افتراضي.
          - transition-all duration-300 ease-in-out: لجعل الانتقال سلساً عند فتح/إغلاق الشريط الجانبي.
        */}
        <main
          className={`
            flex-grow p-4 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'md:mr-64' : 'md:mr-0'}
            ${window.innerWidth < 768 && isSidebarOpen ? 'overflow-hidden' : ''}
          `}
        >
          {/* Outlet لتصيير المكونات الفرعية (الصفحات) بناءً على المسار */}
          {/* نمرر API_BASE_URL عبر context ليكون متاحاً لجميع الصفحات الفرعية */}
          <Outlet context={{ API_BASE_URL }} />
        </main>
      </div>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}

export default App;
