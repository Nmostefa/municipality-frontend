import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { STATIC_SERVICES, CATEGORIES } from '../constants'; // تأكد أن هذه الملفات موجودة في مجلد 'constants'

// توحيد أسماء الفئات لتطابق الفئات المعرفة في CATEGORIES
// هذا يضمن أن يتم عرض الفئات بشكل متسق سواء كانت قادمة من API أو من البيانات الثابتة.
const normalizeCategory = (cat = '') => {
  const c = cat.toLowerCase();
  // يمكنك إضافة المزيد من الكلمات المفتاحية هنا لتغطية حالات مختلفة
  if (c.includes('إدارية') || c.includes('admin')) return 'إدارية';
  if (c.includes('اجتماعية') || c.includes('social')) return 'اجتماعية';
  if (c.includes('تنموية') || c.includes('develop')) return 'تنموية';
  if (c.includes('صحة') || c.includes('نظافة') || c.includes('health') || c.includes('clean')) return 'صحة/نظافة';
  if (c.includes('أخرى') || c.includes('other')) return 'أخرى';
  return cat || 'أخرى'; // إذا لم تتطابق أي فئة، استخدم الفئة الأصلية أو "أخرى" كافتراضي
};

function ServicesPage() {
  // جلب API_BASE_URL من سياق المخرج (Outlet Context) الذي تم توفيره بواسطة App.jsx
  // استخدام || {} لضمان عدم وجود خطأ إذا كان السياق غير موجود بعد
  const { API_BASE_URL } = useOutletContext() || {};
  const [services, setServices] = useState([]); // لتخزين الخدمات التي تم جلبها من API
  const [loading, setLoading] = useState(true); // حالة التحميل (لإظهار مؤشر التحميل)
  const [error, setError] = useState(null); // لتخزين أي أخطاء تحدث أثناء الجلب
  const [search, setSearch] = useState(''); // لتخزين نص البحث المدخل من قبل المستخدم
  const [activeCategory, setActiveCategory] = useState('كل الخدمات'); // لتخزين الفئة النشطة المختارة

  useEffect(() => {
    // إذا لم يكن API_BASE_URL متاحًا، نعتبر التحميل منتهياً
    // ويمكننا عرض رسالة خطأ أو ببساطة استخدام الخدمات الثابتة كبديل.
    if (!API_BASE_URL) {
      setLoading(false);
      // يمكنك إلغاء التعليق عن السطر التالي إذا أردت عرض رسالة خطأ صريحة
      // setError('عنوان URL لواجهة برمجة التطبيقات غير متوفر. سيتم عرض الخدمات الاحتياطية.');
      return; // توقف عن التنفيذ إذا لم يكن API_BASE_URL متاحًا
    }

    // دالة لجلب الخدمات من الخادم
    const fetchServices = async () => {
      try {
        setLoading(true); // ابدأ التحميل
        setError(null); // مسح أي أخطاء سابقة
        // إجراء طلب HTTP GET لجلب الخدمات من API
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(response.data); // تحديث حالة الخدمات بالبيانات المستلمة
      } catch (err) {
        console.error('Error fetching services:', err); // سجل الخطأ في وحدة التحكم
        setError('حدث خطأ أثناء جلب الخدمات من الخادم. سيتم عرض قائمة احتياطية.'); // تعيين رسالة خطأ للمستخدم
        setServices(STATIC_SERVICES); // في حالة حدوث خطأ، استخدم الخدمات الثابتة كبديل
      } finally {
        setLoading(false); // أوقف التحميل بغض النظر عن النتيجة (نجاح أو فشل)
      }
    };

    fetchServices(); // استدعاء دالة جلب الخدمات عند تحميل المكون أو تغير API_BASE_URL
  }, [API_BASE_URL]); // الاعتماد على API_BASE_URL: سيتم إعادة تشغيل useEffect إذا تغير API_BASE_URL

  // استخدام useMemo لدمج الخدمات (من API أو ثابتة) وتوحيد الفئات
  // هذا يساعد على تحسين الأداء عن طريق إعادة الحساب فقط عند تغير 'services'
  const mergedServices = useMemo(() => {
    // إذا كانت هناك خدمات تم جلبها من API، استخدمها. وإلا، استخدم STATIC_SERVICES.
    // ثم قم بتوحيد فئة كل خدمة باستخدام normalizeCategory.
    return (services.length > 0 ? services : STATIC_SERVICES).map(s => ({
      ...s,
      category: normalizeCategory(s.category),
    }));
  }, [services]); // الاعتماد على 'services': سيتم إعادة الحساب إذا تغيرت الخدمات

  // استخدام useMemo لتصفية الخدمات بناءً على الفئة النشطة ونص البحث
  // هذا يحسن الأداء عن طريق إعادة التصفية فقط عند تغير البيانات أو عوامل التصفية
  const filtered = useMemo(() => {
    return mergedServices.filter(s => {
      // التحقق مما إذا كانت الخدمة تتطابق مع الفئة النشطة
      const matchesCategory =
        activeCategory === 'كل الخدمات' || normalizeCategory(s.category) === activeCategory;
      // التحقق مما إذا كانت الخدمة تتطابق مع نص البحث
      const matchesSearch =
        !search || // إذا كان حقل البحث فارغًا، اعتبره متطابقًا
        (s.name && s.name.toLowerCase().includes(search.trim().toLowerCase())) || // ابحث في اسم الخدمة
        (s.description && s.description.toLowerCase().includes(search.trim().toLowerCase())); // ابحث في وصف الخدمة
      return matchesCategory && matchesSearch; // يجب أن تتطابق مع الفئة والبحث
    });
  }, [mergedServices, activeCategory, search]); // الاعتمادات: 'mergedServices', 'activeCategory', 'search'

  // عرض حالة التحميل
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

      {/* قسم الفئات وحقل البحث */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        {/* أزرار الفئات */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat} // مفتاح فريد لكل زر فئة
              onClick={() => setActiveCategory(cat)} // عند النقر، قم بتعيين الفئة النشطة
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow' // تصميم الزر النشط
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // تصميم الزر غير النشط
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* حقل البحث */}
        <div className="mt-2 md:mt-0 md:ml-auto flex-grow max-w-md">
          <input
            aria-label="بحث في الخدمات" // تسمية للمساعدات التجميلية
            placeholder="ابحث عن خدمة..." // نص توضيحي داخل حقل البحث
            value={search} // القيمة الحالية لحقل البحث
            onChange={e => setSearch(e.target.value)} // تحديث حالة البحث عند التغيير
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* عرض رسالة الخطأ إذا كانت موجودة */}
      {error && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded p-4 mb-4">
          <strong>تنبيه:</strong> {error}
        </div>
      )}

      {/* عرض الخدمات المفلترة أو رسالة "لا توجد خدمات" */}
      {filtered.length === 0 ? (
        <p className="text-center text-lg text-gray-700">
          لا توجد خدمات تطابق البحث أو الفئة المحددة.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(service => (
            <div
              key={service.id || service.name} // استخدام id أو name كمفتاح فريد للخدمة
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
