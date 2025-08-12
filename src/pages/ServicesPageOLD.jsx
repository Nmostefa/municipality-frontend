import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

function ServicesPage() {
  const { API_BASE_URL } = useOutletContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null); // مهم: إعادة تعيين الخطأ إلى null في بداية كل محاولة جلب

        console.log("ServicesPage: Attempting to fetch services from:", `${API_BASE_URL}/api/services`);
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        console.log("ServicesPage: Successfully fetched services data:", response.data); // تسجيل البيانات المستلمة

        setServices(response.data);
        setError(null); // التأكد من مسح الخطأ بعد النجاح
      } catch (err) {
        console.error('ServicesPage: Error fetching services:', err);
        setError('حدث خطأ أثناء جلب الخدمات. الرجاء المحاولة لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    if (API_BASE_URL) {
      fetchServices();
    }
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h2 className="text-4xl font-bold text-blue-800 mb-8">الخدمات البلدية</h2>
        <p>جاري تحميل الخدمات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h2 className="text-4xl font-bold text-red-600 mb-8">خطأ</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-800 text-center mb-8">الخدمات البلدية</h2>
      {services.length === 0 ? (
        <p className="text-center text-lg text-gray-700">لا توجد خدمات متاحة حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">{service.name}</h3>
              <p className="text-gray-700 text-base mb-4 flex-grow">{service.description}</p>
              <div className="mt-auto">
                {service.required_documents && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">المستندات المطلوبة:</span> {service.required_documents}
                  </p>
                )}
                {service.steps && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">الخطوات:</span> {service.steps}
                  </p>
                )}
                {service.fees !== undefined && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">الرسوم:</span> {service.fees.toLocaleString('ar-DZ', { style: 'currency', currency: 'DZD' })}
                  </p>
                )}
                {service.working_hours && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">ساعات العمل:</span> {service.working_hours}
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

export default ServicesPage;
