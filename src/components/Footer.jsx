import React, { useState, useEffect } from 'react';

function Footer() {
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

        // تحويل مصفوفة الإعدادات إلى كائن لسهولة الوصول إليها
        const formattedSettings = {};
        data.forEach(setting => {
          formattedSettings[setting.setting_name] = setting.setting_value;
        });
        setSettings(formattedSettings);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setError("فشل في تحميل معلومات الاتصال.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []); // [] لضمان تشغيل التأثير مرة واحدة فقط عند تحميل المكون

  if (loading) {
    return (
      <footer className="bg-gray-800 text-white p-6 text-center mt-8">
        <div className="container mx-auto">
          <p>جاري تحميل معلومات الاتصال...</p>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-gray-800 text-white p-6 text-center mt-8">
        <div className="container mx-auto">
          <p className="text-red-500">{error}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-blue-700 text-white p-6 text-center mt-8">
      <div className="container mx-auto">
        <p className="mb-2">© 2025 بلدية ديرة. جميع الحقوق محفوظة.</p>
        <div className="text-sm">
          <p>
            <strong>العنوان:</strong> {settings.address || 'غير متوفر'}
          </p>
          <p>
            <strong>الهاتف:</strong> {settings.phone_number || 'غير متوفر'}
          </p>
          <p>
            <strong>البريد الإلكتروني:</strong> {settings.email || 'غير متوفر'}
          </p>
          <p>
            <strong>ساعات العمل:</strong> {settings.working_hours || 'غير متوفر'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;