import React, { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom'; // استيراد Outlet و useOutletContext
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // بما أن API_BASE_URL لم يعد معرفاً مباشرة هنا، يمكننا جلبه من السياق إذا لزم الأمر
  // ولكن في هذه الحالة، سنمرره مباشرة من main.jsx إلى Outlet
  // ثم نستخدم useOutletContext في الصفحات الفرعية
  
  // جلب API_BASE_URL من السياق الذي تم تمريره من RouterProvider في main.jsx
  // لا، هذا غير صحيح. API_BASE_URL يجب أن يمرر إلى Outlet context من App نفسه
  // أو أن يتم تعريفه مرة واحدة في main.jsx وتمريره كـ prop إلى App
  // الحل الأبسط هو تعريفه في main.jsx وتمريره إلى App كـ prop
  // ثم App يمرره إلى Outlet context

  // بما أننا سنمرر API_BASE_URL كـ prop من main.jsx إلى App،
  // سنحتاج إلى استقباله هنا
  // لا، الأسهل هو تعريف API_BASE_URL في App.jsx نفسه لأنه يستخدم في جلب siteSettings
  // ثم يمرر إلى Outlet context.
  // سنعيد API_BASE_URL إلى App.jsx لأنه يستخدم لجلب siteSettings

  const API_BASE_URL = 'https://dirah-municipality-backend.onrender.com'; // أبقي هذا هنا

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
        console.error("Failed to fetch site settings in App.jsx:", error);
        setSiteSettings([
          { setting_name: "phone_number", setting_value: "N/A" },
          { setting_name: "email", setting_value: "N/A" },
          { setting_name: "address", setting_value: "N/A" },
          { setting_name: "working_hours", setting_value: "N/A" }
        ]);
      }
    };

    if (API_BASE_URL) {
      fetchSiteSettings();
    }
  }, [API_BASE_URL]);

  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} siteSettings={siteSettings} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 overflow-y-auto">
          {/* تمرير API_BASE_URL عبر سياق Outlet ليكون متاحاً لجميع الصفحات الفرعية */}
          <Outlet context={{ API_BASE_URL }} />
        </main>
      </div>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}

export default App;
