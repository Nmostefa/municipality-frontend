import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ProjectsPage from './pages/ProjectsPage';
import DeliberationsPage from './pages/DeliberationsPage';
import DecisionsPage from './pages/DecisionsPage';
import DepartmentsPage from './pages/DepartmentsPage'; // تم التعديل هنا: استخدام DepartmentsPage بصيغة الجمع
import ServicesPage from './pages/ServicesPage';
import ContactUs from './components/ContactUs';
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col min-h-screen" dir="rtl">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} siteSettings={siteSettings} />
          <div className="flex flex-1">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet context={{ API_BASE_URL }} />
            </main>
          </div>
          <Footer siteSettings={siteSettings} />
        </div>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "announcements",
          element: <AnnouncementsPage />,
        },
        {
          path: "projects",
          element: <ProjectsPage />,
        },
        {
          path: "deliberations",
          element: <DeliberationsPage />,
        },
        {
          path: "decisions",
          element: <DecisionsPage />,
        },
        {
          path: "departments",
          element: <DepartmentsPage />, // تم التعديل هنا: استخدام DepartmentsPage بصيغة الجمع
        },
        {
          path: "services",
          element: <ServicesPage />,
        },
        {
          path: "contact",
          element: <ContactUs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
