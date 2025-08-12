import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
// لا نحتاج لاستيراد STATIC_SERVICES و CATEGORIES من ملف خارجي بعد الآن
// لأنهما معرفان مباشرة داخل هذا المكون لضمان وجود البيانات.
// import { STATIC_SERVICES, CATEGORIES } from '../constants'; // (معلق)

// تعريف الخدمات الثابتة (كخيار احتياطي) مباشرة داخل هذا المكون
const STATIC_SERVICES = [
  {
    id: 1, // معرفات فريدة للخدمات
    name: 'إصدار شهادات الميلاد، الزواج، والوفاة',
    description: 'إجراءات مبسطة لإصدار وتجديد الوثائق المدنية الأساسية.',
    category: 'إدارية',
    required_documents: 'بطاقة تعريف، شهادة ميلاد الأبوين',
    steps: '1. تقديم طلب في مصلحة الحالة المدنية 2. التحقق من الوثائق 3. استلام الشهادة',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 2,
    name: 'تسليم شهادات الإقامة، الحالة العائلية، والجنسية',
    description: 'تسهيل الحصول على الوثائق التي تثبت الإقامة والحالة الشخصية والجنسية.',
    category: 'إدارية',
    required_documents: 'بطاقة تعريف، فاتورة كهرباء/غاز (للإقامة)، وثائق عائلية',
    steps: '1. تعبئة النموذج 2. تقديم الوثائق 3. استلام الشهادة',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 3,
    name: 'تحرير وعرض عقود الزواج',
    description: 'تقديم الخدمات المتعلقة بإعداد وتوثيق عقود الزواج الشرعية والرسمية.',
    category: 'إدارية',
    required_documents: 'شهادة ميلاد، بطاقة تعريف، شهادة طبية، شهود',
    steps: '1. حجز موعد 2. تقديم الوثائق 3. تحرير العقد',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 4,
    name: 'التصديق على الوثائق (الإمضاء والنسخ المطابقة للأصل)',
    description: 'خدمات التصديق على التوقيعات ومطابقة النسخ لأصول الوثائق الرسمية.',
    category: 'إدارية',
    required_documents: 'الوثيقة الأصلية والنسخة المراد التصديق عليها، بطاقة تعريف',
    steps: '1. تقديم الوثيقة 2. التحقق 3. التصديق',
    fees: 100, // مثال على رسوم بسيطة
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 5,
    name: 'تسجيل المواليد والوفيات',
    description: 'خدمة تسجيل الأحداث الحيوية لضمان حقوق المواطنين وتحديث السجلات.',
    category: 'إدارية',
    required_documents: 'شهادة طبية للميلاد/الوفاة، دفتر عائلي',
    steps: '1. التبليغ عن الحدث 2. تقديم الوثائق 3. التسجيل في السجلات',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 6,
    name: 'استخراج رخص البناء، الهدم، والتقسيم',
    description: 'إصدار التراخيص اللازمة للمشاريع العمرانية والتخطيطية لضمان الامتثال للقوانين.',
    category: 'إدارية',
    required_documents: 'مخطط هندسي، سند ملكية، دراسة تربة',
    steps: '1. إيداع الملف 2. دراسة الطلب 3. إصدار الرخصة',
    fees: 5000, // مثال على رسوم
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 7,
    name: 'تقديم الإعانات الاجتماعية للفئات المحتاجة',
    description: 'برامج دعم مالي وعيني لمساعدة الأسر والفئات الأكثر ضعفاً في المجتمع.',
    category: 'اجتماعية',
    required_documents: 'ملف اجتماعي، شهادة عدم العمل، شهادة إقامة',
    steps: '1. تقديم ملف الطلب 2. دراسة الحالة 3. صرف الإعانة',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 8,
    name: 'منح المساعدات المدرسية للتلاميذ',
    description: 'توفير الدعم المالي واللوازم المدرسية للطلاب لضمان استمراريتهم التعليمية.',
    category: 'اجتماعية',
    required_documents: 'شهادة تسجيل مدرسي، كشف دخل الأسرة',
    steps: '1. إيداع طلب 2. دراسة الحالة 3. تقديم المساعدة',
    fees: 0,
    working_hours: 'خلال الموسم الدراسي: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 9,
    name: 'دعم الأنشطة الثقافية والفنية',
    description: 'تشجيع ودعم المبادرات والفعاليات الثقافية والفنية المحلية.',
    category: 'اجتماعية',
    required_documents: 'برنامج النشاط، طلب دعم، ميزانية تقديرية',
    steps: '1. تقديم المشروع 2. دراسة الدعم 3. تنفيذ النشاط',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 10,
    name: 'تنظيم الأسواق الجوارية والمناسبات الوطنية',
    description: 'تنظيم وتنسيق الأسواق المحلية والمساهمة في إحياء المناسبات الوطنية والدينية.',
    category: 'اجتماعية',
    required_documents: 'طلب تنظيم، ترخيص أمني',
    steps: '1. تقديم الطلب 2. دراسة الموافقة 3. التنظيم',
    fees: 0,
    working_hours: 'حسب نوع السوق أو المناسبة',
  },
  {
    id: 11,
    name: 'صيانة وإصلاح الطرقات والأرصفة',
    description: 'تحسين وصيانة شبكة الطرق والأرصفة داخل حدود البلدية لضمان سلامة وسلاسة حركة المرور.',
    category: 'تنموية',
    required_documents: 'تبليغ عن ضرر (إذا كان مواطن)، تقرير هندسي',
    steps: '1. تحديد المناطق المتضررة 2. إعداد خطة الصيانة 3. التنفيذ',
    fees: 0,
    working_hours: 'حسب برنامج العمل',
  },
  {
    id: 12,
    name: 'إنجاز وتوسيع الإنارة العمومية',
    description: 'تركيب وصيانة وتوسيع شبكة الإنارة العمومية لضمان الإضاءة الكافية في الشوارع والأحياء.',
    category: 'تنموية',
    required_documents: 'طلب توسيع (من مواطن)، دراسة تقنية',
    steps: '1. دراسة الحاجة 2. إعداد المشروع 3. التنفيذ',
    fees: 0,
    working_hours: 'حسب برنامج العمل',
  },
  {
    id: 13,
    name: 'تهيئة المساحات الخضراء والحدائق العمومية',
    description: 'تصميم وإنشاء وصيانة المساحات الخضراء والحدائق لتعزيز البيئة الحضرية والترفيه.',
    category: 'تنموية',
    required_documents: 'مقترح مشروع، دراسة بيئية',
    steps: '1. وضع المخطط 2. التجهيز 3. الصيانة الدورية',
    fees: 0,
    working_hours: 'حسب برنامج العمل',
  },
  {
    id: 14,
    name: 'المساهمة في برامج السكن الاجتماعي والريفي',
    description: 'دعم ومتابعة برامج توفير السكن للفئات ذات الدخل المحدود في المناطق الحضرية والريفية.',
    category: 'تنموية',
    required_documents: 'ملف طلب سكن، شهادة دخل',
    steps: '1. استقبال الطلبات 2. دراسة الملفات 3. التوزيع',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 15,
    name: 'جمع النفايات وتنظيم حملات النظافة',
    description: 'تنظيم دورات جمع النفايات والتوعية بأهمية النظافة والمشاركة في حملات تنظيف شاملة.',
    category: 'صحة/نظافة',
    required_documents: 'لا يوجد',
    steps: '1. تحديد مسارات الجمع 2. التنفيذ اليومي 3. حملات دورية',
    fees: 0,
    working_hours: 'يومي',
  },
  {
    id: 16,
    name: 'حملات الوقاية الصحية والتوعية',
    description: 'تنظيم ورش عمل وحملات توعية حول الصحة العامة والنظافة والوقاية من الأمراض.',
    category: 'صحة/نظافة',
    required_documents: 'لا يوجد',
    steps: '1. إعداد البرامج 2. التنسيق مع الشركاء 3. التنفيذ',
    fees: 0,
    working_hours: 'حسب برنامج الحملات',
  },
  {
    id: 17,
    name: 'تسيير المذابح البلدية ومراقبة الأسواق',
    description: 'الإشراف على المذابح البلدية لضمان تطبيق المعايير الصحية ومراقبة جودة المنتجات في الأسواق.',
    category: 'صحة/نظافة',
    required_documents: 'لا يوجد',
    steps: '1. جولات تفتيش دورية 2. تطبيق المعايير الصحية 3. معالجة المخالفات',
    fees: 0,
    working_hours: 'يومي',
  },
  {
    id: 18,
    name: 'تنظيم النقل الحضري بالتنسيق مع الجهات المختصة',
    description: 'العمل على تحسين شبكة النقل العام وتسهيل حركة المواطنين داخل البلدية.',
    category: 'أخرى',
    required_documents: 'مقترحات من المواطنين أو شركات النقل',
    steps: '1. دراسة الاحتياجات 2. التنسيق مع القطاعات 3. التطبيق',
    fees: 0,
    working_hours: 'حسب البرامج والمخططات',
  },
  {
    id: 19,
    name: 'تسهيل الإجراءات للمستثمرين المحليين',
    description: 'تقديم الدعم الإداري والمعلوماتي للمستثمرين لتشجيع الاستثمار المحلي وتطوير الاقتصاد.',
    category: 'أخرى',
    required_documents: 'ملف المشروع، طلب تسهيل',
    steps: '1. استقبال المستثمرين 2. توجيههم 3. متابعة الملفات',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
  {
    id: 20,
    name: 'استقبال شكاوى واقتراحات المواطنين ومعالجتها',
    description: 'منصة لتلقي الشكاوى والاقتراحات من المواطنين والعمل على معالجتها بفاعلية وشفافية.',
    category: 'أخرى',
    required_documents: 'لا يوجد (يفضل تفاصيل الشكوى)',
    steps: '1. تقديم الشكوى 2. التسجيل 3. المعالجة 4. الرد على المواطن',
    fees: 0,
    working_hours: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً (أو عبر المنصات الرقمية 24/7)',
  },
];

// تعريف الفئات التي سيتم استخدامها في أزرار التصفية
const CATEGORIES = ['كل الخدمات', 'إدارية', 'اجتماعية', 'تنموية', 'صحة/نظافة', 'أخرى'];

// توحيد أسماء الفئات لتحسين التصفية والبحث
const normalizeCategory = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('إدارية') || c.includes('admin')) return 'إدارية';
  if (c.includes('اجتماعية') || c.includes('social')) return 'اجتماعية';
  if (c.includes('تنموية') || c.includes('develop')) return 'تنموية';
  if (c.includes('صحة') || c.includes('نظافة') || c.includes('health') || c.includes('clean')) return 'صحة/نظافة';
  if (c.includes('أخرى') || c.includes('other')) return 'أخرى';
  return cat || 'أخرى';
};

function ServicesPage() {
  const { API_BASE_URL } = useOutletContext() || {}; // التأكد من التعامل مع السياق بشكل آمن
  const [services, setServices] = useState([]); // الخدمات التي يتم جلبها من API
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ
  const [search, setSearch] = useState(''); // نص البحث
  const [activeCategory, setActiveCategory] = useState('كل الخدمات'); // الفئة النشطة

  useEffect(() => {
    // إذا لم يكن API_BASE_URL متاحًا، نكتفي بالبيانات الثابتة
    if (!API_BASE_URL) {
      setLoading(false);
      setServices(STATIC_SERVICES); // عرض الخدمات الثابتة مباشرة
      setError('عنوان API غير متوفر. يتم عرض البيانات الافتراضية.');
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(response.data);
      } catch (err) {
        console.error('Error fetching services from API:', err);
        setError('حدث خطأ أثناء جلب الخدمات من الخادم. سيتم عرض قائمة احتياطية.');
        setServices(STATIC_SERVICES); // العودة إلى الخدمات الثابتة في حالة فشل API
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [API_BASE_URL]);

  // دمج وتوحيد الخدمات (من API أو الثابتة)
  const mergedServices = useMemo(() => {
    return (services.length > 0 ? services : STATIC_SERVICES).map(s => ({
      ...s,
      category: normalizeCategory(s.category),
    }));
  }, [services]);

  // تصفية الخدمات بناءً على البحث والفئة
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
