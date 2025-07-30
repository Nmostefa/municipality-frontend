import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom'; // استيراد useOutletContext

function ProjectsPage() {
  // جلب API_BASE_URL من السياق الذي تم تمريره من App.jsx
  const { API_BASE_URL } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null); // مسح أي أخطاء سابقة
        // استخدام API_BASE_URL في طلب الجلب (axios.get)
        const response = await axios.get(`${API_BASE_URL}/api/projects`);
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('حدث خطأ أثناء جلب المشاريع. الرجاء المحاولة لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    // تأكد من أن API_BASE_URL متاح قبل محاولة الجلب
    if (API_BASE_URL) {
      fetchProjects();
    }
  }, [API_BASE_URL]); // إضافة API_BASE_URL كاعتماد لـ useEffect

  if (loading) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">مشاريع البلدية</h2>
        <p className="text-xl text-blue-600">جارٍ تحميل المشاريع...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">مشاريع البلدية</h2>
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">مشاريع البلدية</h2>
      {projects.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">لا توجد مشاريع متاحة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
              )}
              <h3 className="text-xl font-bold text-blue-700 mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-3 text-sm flex-grow">{project.description}</p>
              <div className="mt-auto">
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">الحالة:</span> <span className={`${
                    project.status === 'قيد التنفيذ' ? 'text-orange-500' :
                    project.status === 'منجز' ? 'text-green-600' :
                    'text-blue-500'
                  }`}>{project.status}</span>
                </p>
                {project.progress_percentage !== undefined && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">التقدم:</span> {project.progress_percentage}%
                  </p>
                )}
                {project.category && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">الفئة:</span> {project.category}
                  </p>
                )}
                {project.budget && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">الميزانية:</span> {project.budget.toLocaleString('ar-DZ', { style: 'currency', currency: 'DZD' })}
                  </p>
                )}
                {project.contractor && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">المقاول:</span> {project.contractor}
                  </p>
                )}
                {project.start_date && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">تاريخ البدء:</span> {project.start_date}
                  </p>
                )}
                {project.end_date && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">تاريخ الانتهاء المتوقع:</span> {project.end_date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
