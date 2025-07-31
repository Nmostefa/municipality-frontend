import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const API_BASE_URL = 'https://dirah-municipality-backend.onrender.com';

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
        {/* الشريط الجانبي */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* المحتوى الرئيسي */}
        {/* تم تعديل الهامش الأيمن ليناسب الشريط الجانبي */}
        <main className="flex-1 p-4 overflow-y-auto" 
              style={{ marginRight: isSidebarOpen ? '16rem' : '0' }}> 
          <Outlet context={{ API_BASE_URL }} />
        </main>
      </div>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}

export default App;
