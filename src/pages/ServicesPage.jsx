import React from 'react';
import { FileText, Users, Wrench, HeartPulse, MoreHorizontal, CheckCircle } from 'lucide-react';

// تم تغيير اسم المكون ليتناسب مع الاسم القياسي
const ServicesPage = () => {
  // هذا المكون يعرض قائمة الخدمات الخاصة ببلدية ديرة.
  const servicesData = [
    {
      title: "الخدمات الإدارية",
      icon: <FileText size={40} className="text-white" />,
      items: [
        "إصدار شهادات الميلاد، الزواج، والوفاة.",
        "تسليم شهادات الإقامة، الحالة العائلية، والجنسية.",
        "تحرير وعرض عقود الزواج.",
        "التصديق على الوثائق (الإمضاء والنسخ المطابقة للأصل).",
        "تسجيل المواليد والوفيات.",
        "استخراج رخص البناء، الهدم، والتقسيم.",
      ],
    },
    {
      title: "الخدمات الاجتماعية",
      icon: <Users size={40} className="text-white" />,
      items: [
        "تقديم الإعانات الاجتماعية للفئات المحتاجة.",
        "منح المساعدات المدرسية للتلاميذ.",
        "دعم الأنشطة الثقافية والفنية.",
        "تنظيم الأسواق الجوارية والمناسبات الوطنية.",
      ],
    },
    {
      title: "الخدمات التنموية",
      icon: <Wrench size={40} className="text-white" />,
      items: [
        "صيانة وإصلاح الطرقات والأرصفة.",
        "إنجاز وتوسيع الإنارة العمومية.",
        "تهيئة المساحات الخضراء والحدائق العمومية.",
        "المساهمة في برامج السكن الاجتماعي والريفي.",
      ],
    },
    {
      title: "خدمات الصحة والنظافة",
      icon: <HeartPulse size={40} className="text-white" />,
      items: [
        "جمع النفايات وتنظيم حملات النظافة.",
        "حملات الوقاية الصحية والتوعية.",
        "تسيير المذابح البلدية ومراقبة الأسواق.",
      ],
    },
    {
      title: "خدمات أخرى",
      icon: <MoreHorizontal size={40} className="text-white" />,
      items: [
        "تنظيم النقل الحضري بالتنسيق مع الجهات المختصة.",
        "تسهيل الإجراءات للمستثمرين المحليين.",
        "استقبال شكاوى واقتراحات المواطنين ومعالجتها.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8 md:p-12 lg:p-16 font-inter text-right">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">خدمات بلدية ديرة</h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          تلتزم بلدية ديرة بتقديم مجموعة واسعة من الخدمات الإدارية، الاجتماعية، والتنموية لجميع المواطنين.
          نسعى جاهدين لتحسين جودة الحياة في المنطقة وتلبية احتياجات المجتمع بفاعلية وكفاءة.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-end text-right border-t-4 border-indigo-500">
            <div className="flex items-center justify-center mb-4 p-3 bg-indigo-500 rounded-full shadow-md">
              {service.icon}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">{service.title}</h2>
            <ul className="list-none space-y-2 text-gray-700 w-full">
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex} className="relative pr-6">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-500">
                    <CheckCircle size={16} />
                  </span>
                  <span className="block">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;

