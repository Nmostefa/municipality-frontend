import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { STATIC_SERVICES, CATEGORIES } from '../constants';

// توحيد أسماء الفئات
const normalizeCategory = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('administr')) return 'إدارية';
  if (c.includes('social')) return 'اجتماعية';
  if (c.includes('develop')) return 'تنموية';
  if (c.includes('health') || c.includes('clean')) return 'صحة/نظافة';
  if (c.includes('other')) return 'أخرى';
  return cat || 'أخرى';
};

function ServicesPage() {
  const { API_BASE_URL } = useOutletContext() || {};
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('كل الخدمات');

  useEffect(() => {
    if (!API_BASE_URL) {
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(data);
        setError(null);
      } catch (err) {
        setError('حدث خطأ أثناء جلب الخدمات. سيتم عرض قائمة احتياطية.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [API_BASE_URL]);

  const mergedServices = useMemo(() => {
    return (services.length > 0 ? services : STATIC_SERVICES).map(s => ({
      ...s,
      category: normalizeCategory(s.category),
    }));
  }, [services]);

  const filtered = useMemo(() => {
    return mergedServices.filter(s => {
      const matchesCategory =
        activeCategory === 'كل الخدمات' || normalizeCategory(s.category) === activeCategory;
      const matchesSearch =
        !search ||
        (s.name && s.name.toLowerCase().includes(search.trim().toLowerCase())) ||
        (s.description && s.description.toLowerCase().includes(search.trim().toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [mergedServices, activeCategory, search]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">الخدمات البلدية</h2>
        <p>جاري تحميل الخدمات...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-800 text-center mb-6">الخدمات البلدية</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mt-2 md:mt-0 md:ml-auto flex-grow max-w-md">
          <input
            aria-label="بحث في الخدمات"
            placeholder="ابحث عن خدمة..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded p-4 mb-4">
          <strong>تنبيه:</strong> {error}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-lg text-gray-700">
          لا توجد خدمات تطابق البحث أو الفئة المحددة.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(service => (
            <div
              key={service.id || service.name}
              className="bg-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-gray-100"
            >
              <div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">{service.name}</h3>
                <p className="text-gray-700 text-base mb-3">{service.description}</p>
              </div>
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                {service.required_documents && (
                  <p>
                    <span className="font-semibold">المستندات المطلوبة:</span>{' '}
                    {service.required_documents}
                  </p>
                )}
                {service.steps && (
                  <p>
                    <span className="font-semibold">الخطوات:</span> {service.steps}
                  </p>
                )}
                {service.fees !== undefined && service.fees !== null && (
                  <p>
                    <span className="font-semibold">الرسوم:</span>{' '}
                    {typeof service.fees === 'number'
                      ? service.fees.toLocaleString('ar-DZ', {
                          style: 'currency',
                          currency: 'DZD',
                        })
                      : service.fees}
                  </p>
                )}
                {service.working_hours && (
                  <p>
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
