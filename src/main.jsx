import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ProjectsPage from './pages/ProjectsPage';
import DeliberationsPage from './pages/DeliberationsPage';
import DecisionsPage from './pages/DecisionsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import ServicesPage from './pages/ServicesPage';
import ContactUs from './components/ContactUs';

// هذا هو عنوان الـ API الجديد للواجهة الخلفية المنشورة على Render.com
const API_BASE_URL = 'https://dirah-municipality-backend.onrender.com';

// تعريف الـ router هنا في أعلى مستوى
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App هو المكون الرئيسي الذي يحتوي على Header/Sidebar/Footer و Outlet
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
        element: <DepartmentsPage />,
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* تمرير API_BASE_URL كـ prop إلى App */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
