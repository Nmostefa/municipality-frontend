import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeliberationsPage() {
  const [deliberations, setDeliberations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliberations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/deliberations');
        setDeliberations(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching deliberations:', err);
        setError('حدث خطأ أثناء جلب المداولات. الرجاء المحاولة لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliberations();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">مداولات البلدية</h2>
        <p className="text-xl text-blue-600">جارٍ تحميل المداولات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">مداولات البلدية</h2>
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">مداولات البلدية</h2>
      {deliberations.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">لا توجد مداولات متاحة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliberations.map((deliberation) => (
            <div key={deliberation.id} className="bg-white p-6 rounded-lg shadow-xl flex flex-col transition-transform transform hover:scale-105 duration-300">
              {deliberation.image_url && (
                <img src={deliberation.image_url} alt={deliberation.title} className="w-full h-48 object-cover rounded-md mb-4 border border-gray-200" />
              )}
              <h3 className="text-2xl font-extrabold text-blue-800 mb-3 leading-tight">{deliberation.title}</h3>
              <p className="text-gray-700 mb-4 text-base flex-grow">{deliberation.description}</p> {/* عرض الملخص */}

              <div className="mt-auto pt-4 border-t border-gray-200">
                {deliberation.category && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold text-blue-700">التصنيف:</span> {deliberation.category}
                  </p>
                )}
                {deliberation.date && (
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold text-blue-700">التاريخ:</span> {deliberation.date}
                  </p>
                )}
                {deliberation.document_url && (
                  <a
                    href={deliberation.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition-colors duration-300 text-sm mt-2"
                  >
                    تحميل المستند
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeliberationsPage;