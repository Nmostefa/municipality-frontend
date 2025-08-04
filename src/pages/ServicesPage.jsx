import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const STATIC_SERVICES = [
  {
    id: 'admin-1',
    name: 'إصدار شهادة الميلاد',
    description: 'إصدار شهادة ميلاد رسمية للمواطنين.',
    category: 'إدارية',
    required_documents: 'بطاقة تعريف، ملف طلب',
    steps: 'تعبئة الاستمارة → تقديم الوثائق → استلام الشهادة',
    fees: 0,
    working_hours: '08:00 - 15:00',
  },
  {
    id: 'admin-2',
    name: 'استخراج رخصة البناء',
    description: 'ترخيص بناء أو هدم أو تقسيم العقارات.',
    category: 'إدارية',
    required_documents: 'مخطط، ملكية، تصريح مهندس',
    steps: 'تقديم المشروع → دراسة → الموافقة',
    fees: 5000,
    working_hours: '08:00 - 15:00',
  },
  {
    id: 'social-1',
    name: 'منح المساعدات المدرسية',
    description: 'تقديم دعم مادي للتلاميذ المحتاجين.',
    category: 'اجتماعية',
    required_documents: 'طلب، إثبات حالة اجتماعية',
    steps: 'تقديم ملف → دراسة الحالة → صرف المنحة',
    working_hours: '08:00 - 15:00',
  },
  {
    id: 'dev-1',
    name: 'صيانة الطرقات',
    description: 'إصلاح وإعادة تهيئة الشوارع والأرصفة.',
    category: 'تنموية',
    required_documents: '',
    steps: 'تقييم → تنفيذ الصيانة',
    working_hours: 'حسب البرنامج',
  },
  {
    id: 'health-1',
    name: 'جمع النفايات',
    description: 'تنظيم جمع النفايات الصلبة في الأحياء.',
    category: 'صحة/نظافة',
    required_documents: '',
    steps: 'تحديد المواعيد → جمع → تصريف',
    working_hours: 'يومي',
  },
  {
    id: 'other-1',
    name: 'استقبال الشكاوى',
    description: 'تسجيل ومعالجة شكاوى المواطنين.',
    category: 'أخرى',
    required_documents: 'وصف المشكلة',
    steps: 'تقديم الشكوى → متابعة → رد',
    working_hours: '08:00 - 16:00',
  },
];

const CATEGORIES = ['كل الخدمات', 'إدارية', 'اجتماعية', 'تنموية', 'صحة/نظافة', 'أخرى'];

function ServicesPage() {
  // Fix: Handle the case where useOutletContext() returns null
  // We get the full context object first, and if it's null, we use an empty object.
  const context = useOutletContext() || {};
  const { API_BASE_URL } = context;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('كل الخدمات');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          'ServicesPage: Attempting to fetch services from:',
          `${API_BASE_URL}/api/services`
        );
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        console.log('ServicesPage: Successfully fetched services data:', response.data);
        // normalize if needed: ensure category field exists and matches our labels
        setServices(response.data);
        setError(null);
      } catch (err) {
        console.error('ServicesPage: Error fetching services:', err);
        setError('حدث خطأ أثناء جلب الخدمات. سيتم عرض قائمة احتياطية.'); // نترك fallback
        // لا نوقف عرض؛ نعرض services ثابتة لاحقًا
      } finally {
        setLoading(false);
      }
    };

    if (API_BASE_URL) {
      fetchServices();
    }
  }, [API_BASE_URL]);

  const mergedServices = useMemo(() => {
    // إذا جلبت من API و فيه بيانات، استخدمها مع دمج تصنيفات إن لم توجد
    if (services && services.length > 0) {
      return services.map((s) => ({
        ...s,
        category: s.category || 'أخرى',
      }));
    }
    // عودة القائمة الثابتة إذا لم تأتِ بيانات من API
    return STATIC_SERVICES;
  }, [services]);

  const filtered = useMemo(() => {
    return mergedServices
      .filter((s) => {
        if (activeCategory !== 'كل الخدمات') {
          // تطابق مع الفئة؛ نُحوّل بعض الوسوم لتوحيد
          let cat = s.category || '';
          // توحيد تسميات إن وجدت مختلفة
          if (cat.toLowerCase().includes('administr')) cat = 'إدارية';
          if (cat.toLowerCase().includes('social')) cat = 'اجتماعية';
          if (cat.toLowerCase().includes('develop')) cat = 'تنموية';
          if (cat.toLowerCase().includes('health') || cat.toLowerCase().includes('clean')) cat = 'صحة/نظافة';
          if (cat.toLowerCase().includes('other')) cat = 'أخرى';
          if (activeCategory === 'صحة/نظافة') {
            return cat === 'صحة/نظافة';
          }
          return cat === activeCategory;
        }
        return true;
      })
      .filter((s) => {
        if (!search) return true;
        const lc = search.trim().toLowerCase();
        return (
          (s.name && s.name.toLowerCase().includes(lc)) ||
          (s.description && s.description.toLowerCase().includes(lc))
        );
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
          {CATEGORIES.map((cat) => (
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
            onChange={(e) => setSearch(e.target.value)}
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
        <p className="text-center text-lg text-gray-700">لا توجد خدمات تطابق البحث أو الفئة المحددة.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
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

