import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// استيراد الصفحات الخاصة بك (بافتراض أنها في مجلد pages)
import HomePage from './pages/HomePage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import AnnouncementsPage from './pages/AnnouncementsPage.jsx';
import DeliberationsPage from './pages/DeliberationsPage.jsx';
import DecisionsPage from './pages/DecisionsPage.jsx';
import ContactUsPage from './components/ContactUs.jsx'; // <--- أضف هذا الاستيراد هنا (تأكد من المسار)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App هو الآن مكون التخطيط الرئيسي
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'departments',
        element: <DepartmentsPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'announcements',
        element: <AnnouncementsPage />,
      },
      {
        path: 'deliberations',
        element: <DeliberationsPage />,
      },
      {
        path: 'decisions',
        element: <DecisionsPage />,
      },
      {
        path: 'contact', // <--- أضف هذا المسار هنا لصفحة اتصل بنا
        element: <ContactUsPage />,
      },
      // هنا يمكنك إضافة مسارات أخرى لصفحاتك
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);