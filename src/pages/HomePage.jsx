import React from 'react';
import { Link } from 'react-router-dom'; // <--- استيراد مكون Link

function HomePage() {
  return (
    <div className="text-center py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">أهلاً بكم في الموقع الرسمي لبلدية ديرة</h2>
      <p className="text-lg text-gray-600 mb-6">نحن هنا لخدمتكم وتوفير المعلومات اللازمة حول خدمات البلدية، مشاريع التنمية، والأخبار الهامة.</p>
      <div className="flex justify-center space-x-reverse space-x-4 mt-8"> {/* space-x-reverse لدعم RTL */}
        {/* استخدام Link للتنقل داخل التطبيق */}
        <Link 
          to="/departments" // <--- تم التعديل من href إلى to والمسار
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg transition duration-300"
        >
          اكتشف أقسامنا
        </Link>
        {/* استخدام Link لزر "اتصل بنا" وربطه بمسار /contact */}
        <Link 
          to="/contact" // <--- تم التعديل من href إلى to والمسار لصفحة الاتصال
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg transition duration-300"
        >
          اتصل بنا
        </Link>
      </div>
    </div>
  );
}

export default HomePage;