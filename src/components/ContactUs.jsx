import React, { useState, useEffect } from 'react';

function ContactUs() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/settings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedSettings = {};
        data.forEach(setting => {
          formattedSettings[setting.setting_name] = setting.setting_value;
        });
        setSettings(formattedSettings);
      } catch (error) {
        console.error("Error fetching contact settings:", error);
        setError("فشل في تحميل معلومات الاتصال.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h2 className="text-4xl font-bold text-blue-800 mb-8">معلومات الاتصال</h2>
        <p>جاري تحميل معلومات الاتصال...</p>
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

      {/* يمكن إضافة نموذج اتصال هنا لاحقًا */}
      {/*
      <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-blue-800 text-center mb-6">أرسل لنا رسالة</h3>
        <form className="max-w-xl mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">الاسم الكامل</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">البريد الإلكتروني</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">الرسالة</label>
            <textarea id="message" name="message" rows="5" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">إرسال الرسالة</button>
        </form>
      </div>
      */}
    </div>
  );
}

export default ContactUs;