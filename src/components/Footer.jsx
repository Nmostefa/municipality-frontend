import React from 'react'; // لم نعد نحتاج useState و useEffect هنا

// المكون يستقبل siteSettings كـ prop من App.jsx
function Footer({ siteSettings }) {
  // تحويل مصفوفة الإعدادات إلى كائن لسهولة الوصول إليها
  // بما أننا نستقبلها كـ prop، يجب أن تكون App.jsx قد قامت بالفعل بهذا التحويل
  // أو أننا نقوم به هنا إذا كانت App.jsx تمررها كمصفوفة
  // بناءً على App.jsx، يتم تمريرها كمصفوفة، لذا سنقوم بالتحويل هنا
  const formattedSettings = {};
  siteSettings.forEach(setting => {
    formattedSettings[setting.setting_name] = setting.setting_value;
  });

  // لم نعد نحتاج لحالة التحميل أو الخطأ هنا، لأن App.jsx هي المسؤولة عنها
  // App.jsx يمكنها عرض شاشة تحميل أو خطأ عام للتطبيق بأكمله

  return (
    <footer className="bg-blue-700 text-white p-6 text-center mt-8">
      <div className="container mx-auto">
        <p className="mb-2">© 2025 بلدية ديرة. جميع الحقوق محفوظة.</p>
        <div className="text-sm">
          <p>
            <strong>العنوان:</strong> {formattedSettings.address || 'غير متوفر'}
          </p>
          <p>
            <strong>الهاتف:</strong> {formattedSettings.phone_number || 'غير متوفر'}
          </p>
          <p>
            <strong>البريد الإلكتروني:</strong> {formattedSettings.email || 'غير متوفر'}
          </p>
          <p>
            <strong>ساعات العمل:</strong> {formattedSettings.working_hours || 'غير متوفر'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
