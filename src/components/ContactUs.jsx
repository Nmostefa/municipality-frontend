import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function ContactUs() {
  const { API_BASE_URL } = useOutletContext();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null); // مهم: إعادة تعيين الخطأ إلى null في بداية كل محاولة جلب

        console.log("ContactUs: Attempting to fetch settings from:", `${API_BASE_URL}/api/settings`);
        const response = await fetch(`${API_BASE_URL}/api/settings`);
        
        if (!response.ok) {
          const errorText = await response.text(); // حاول قراءة نص الخطأ
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const data = await response.json();
        console.log("ContactUs: Successfully fetched settings data:", data); // تسجيل البيانات المستلمة

        const formattedSettings = {};
        data.forEach(setting => {
          formattedSettings[setting.setting_name] = setting.setting_value;
        });
        setSettings(formattedSettings);
        setError(null); // التأكد من مسح الخطأ بعد النجاح
      } catch (error) {
        console.error("ContactUs: Error fetching contact settings:", error);
        setError("فشل في تحميل معلومات الاتصال.");
      } finally {
        setLoading(false);
      }
    };

    if (API_BASE_URL) {
      fetchSettings();
    }
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h2 className="text-4xl font-bold text-blue-800 mb-8">معلومات الاتصال</h2>
        <p>جاري تحميل معلومات الاتصال...</p>
      </div>
    );
  }

  // إذا كان هناك خطأ، اعرض رسالة الخطأ
  if (error) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h2 className="text-4xl font-bold text-red-600 mb-8">خطأ</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // إذا لم يكن هناك تحميل ولا أخطاء، اعرض البيانات
  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-800 text-center mb-8">اتصل بنا</h2>
      <p className="text-center text-lg text-gray-700 mb-12">
        نحن هنا لخدمتكم. لا تترددوا في التواصل معنا عبر المعلومات التالية:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">العنوان</h3>
          <p className="text-gray-800">{settings.address || 'غير متوفر'}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">الهاتف</h3>
          <p className="text-gray-800">{settings.phone_number || 'غير متوفر'}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">البريد الإلكتروني</h3>
          <p className="text-gray-800">{settings.email || 'غير متوفر'}</p>
        </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">ساعات العمل</h3>
          <p className="text-gray-800">{settings.working_hours || 'غير متوفر'}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
