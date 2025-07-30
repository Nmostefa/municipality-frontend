import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // لتصيير المسارات الفرعية
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/Sidebar.jsx'; // تأكد من المسار الصحيح للـ Sidebar

// هذا هو عنوان الـ API الجديد للواجهة الخلفية المنشورة على Render.com
// تأكد من تحديث هذا الرابط إذا تغير عنوان الواجهة الخلفية
const API_BASE_URL = 'https://dirah-municipality-backend.onrender.com';

function App() {
  // يمكنك هنا جلب إعدادات الموقع إذا كنت تحتاجها في Header/Footer
  // أو يمكنك جلبها مباشرة في المكونات التي تحتاجها
  const [siteSettings, setSiteSettings] = useState([]);

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
        // يمكنك تعيين قيم افتراضية أو عرض رسالة خطأ للمستخدم
        setSiteSettings([
          { setting_name: "phone_number", setting_value: "N/A" },
          { setting_name: "email", setting_value: "N/A" },
          { setting_name: "address", setting_value: "N/A" },
          { setting_name: "working_hours", setting_value: "N/A" }
        ]);
      }
    };

    fetchSiteSettings();
  }, []); // يتم تشغيله مرة واحدة عند تحميل المكون

  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      {/* تمرير إعدادات الموقع إلى الـ Header والـ Footer (إذا كانا يحتاجانها) */}
      <Header siteSettings={siteSettings} />

      <div className="flex flex-grow">
        <Sidebar />

        <main className="flex-grow mr-64 p-4">
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
