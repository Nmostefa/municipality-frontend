import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom'; // استيراد useOutletContext

const DecisionsPage = () => {
  // جلب API_BASE_URL من السياق الذي تم تمريره من App.jsx
  const { API_BASE_URL } = useOutletContext();
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        setLoading(true);
        setError(null); // مسح أي أخطاء سابقة
        // استخدام API_BASE_URL في طلب الجلب (axios.get)
        const response = await axios.get(`${API_BASE_URL}/api/decisions`);
        setDecisions(response.data);
      } catch (err) {
        console.error('Error fetching decisions:', err);
        setError('فشل في جلب القرارات. يرجى التأكد من تشغيل الواجهة الخلفية.');
      } finally {
        setLoading(false);
      }
    };

    // تأكد من أن API_BASE_URL متاح قبل محاولة الجلب
    if (API_BASE_URL) {
      fetchDecisions();
    }
  }, [API_BASE_URL]); // إضافة API_BASE_URL كاعتماد لـ useEffect

  if (loading) {
    return <div className="text-center py-8 text-gray-700">جاري تحميل القرارات...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">القرارات البلدية</h1>
      {decisions.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">لا توجد قرارات لعرضها حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decisions.map((decision) => (
            <div key={decision.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{decision.title}</h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">النوع:</span> {decision.type}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">التاريخ:</span> {decision.date}
                </p>
                {decision.document_url && (
                  <a
                    href={decision.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                  >
                    عرض الوثيقة
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecisionsPage;
