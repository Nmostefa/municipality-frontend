import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

function AnnouncementsPage() {
  const { API_BASE_URL } = useOutletContext() || {};
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/announcements`);
        setAnnouncements(response.data);
      } catch (err) {
        setError('حدث خطأ أثناء جلب الإعلانات. الرجاء المحاولة لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    if (API_BASE_URL) {
      fetchAnnouncements();
    }
  }, [API_BASE_URL]);

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    try {
      return new Date(dateString).toLocaleDateString('ar-DZ', options);
    } catch {
      return 'تاريخ غير صالح';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">الإعلانات والمناقصات</h2>
        <p className="text-xl text-blue-600">جارٍ تحميل الإعلانات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">الإعلانات والمناقصات</h2>
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">الإعلانات والمناقصات</h2>
      {announcements.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">لا توجد إعلانات أو مناقصات متاحة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white p-6 rounded-lg shadow-xl flex flex-col transition-transform transform hover:scale-105 duration-300"
            >
              {announcement.image_url && (
                <img
                  src={announcement.image_url}
                  alt={announcement.title}
                  className="w-full h-48 object-cover rounded-md mb-4 border border-gray-200"
                />
              )}
              <h3 className="text-2xl font-extrabold text-blue-800 mb-3 leading-tight">{announcement.title}</h3>
              <p className="text-gray-700 mb-4 text-base flex-grow">{announcement.content}</p>

              <div className="mt-auto pt-4 border-t border-gray-200">
                {announcement.announcement_type && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold text-blue-700">النوع:</span>{' '}
                    <span className={`${
                      announcement.announcement_type === 'مناقصة' ? 'text-red-600' :
                      announcement.announcement_type === 'استشارة' ? 'text-purple-600' :
                      'text-green-600'
                    } font-medium`}>{announcement.announcement_type}</span>
                  </p>
                )}
                {announcement.author && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold text-blue-700">الناشر:</span> {announcement.author}
                  </p>
                )}
                {announcement.date_published && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold text-blue-700">تاريخ النشر:</span> {formatDate(announcement.date_published)}
                  </p>
                )}
                {announcement.deadline && (
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold text-blue-700">الموعد النهائي:</span>{' '}
                    <span className="text-red-500">{formatDate(announcement.deadline)}</span>
                  </p>
                )}
                {announcement.document_url && (
                  <a
                    href={announcement.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm mt-2"
                  >
                    تحميل دفتر الشروط
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

export default AnnouncementsPage;
