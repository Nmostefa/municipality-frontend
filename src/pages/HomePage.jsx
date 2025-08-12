import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">أهلاً بكم في الموقع الرسمي لبلدية ديرة</h2>
      <p className="text-lg text-gray-600 mb-6">
        نحن هنا لخدمتكم وتوفير المعلومات اللازمة حول خدمات البلدية، مشاريع التنمية، والأخبار الهامة.
      </p>
      <div className="flex justify-center space-x-reverse space-x-4 mt-8">
        <Link 
          to="/departments"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg transition duration-300"
        >
          اكتشف أقسامنا
        </Link>
        <Link 
          to="/contact"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg transition duration-300"
        >
          اتصل بنا
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
