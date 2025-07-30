import React, { useEffect, useState } from 'react';
import axios from 'axios'; // استيراد مكتبة axios

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]); // لحفظ قائمة الأقسام
  const [loading, setLoading] = useState(true); // لمعرفة ما إذا كانت البيانات قيد التحميل
  const [error, setError] = useState(null); // لحفظ أي أخطاء تحدث أثناء الجلب

  useEffect(() => {
    // دالة لجلب الأقسام من الواجهة الخلفية
    const fetchDepartments = async () => {
      try {
        // قم بتغيير هذا الرابط إذا كانت الواجهة الخلفية تعمل على منفذ أو عنوان IP مختلف
        const response = await axios.get('http://127.0.0.1:5000/api/departments');
        setDepartments(response.data); // حفظ البيانات المستلمة
        setError(null); // مسح أي أخطاء سابقة
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('حدث خطأ أثناء جلب الأقسام. الرجاء المحاولة لاحقًا.'); // تعيين رسالة خطأ
      } finally {
        setLoading(false); // انتهاء التحميل بغض النظر عن النتيجة
      }
    };

    fetchDepartments(); // استدعاء الدالة عند تحميل المكون
  }, []); // [] يعني أن useEffect سيتم تشغيله مرة واحدة فقط عند تحميل المكون

  if (loading) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">أقسام البلدية</h2>
        <p className="text-xl text-blue-600">جارٍ تحميل الأقسام...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">أقسام البلدية</h2>
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  // إذا لم يكن هناك تحميل ولا أخطاء، اعرض الأقسام
  return (
    <div className="py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">أقسام البلدية</h2>
      {departments.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">لا توجد أقسام متاحة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <div key={department.id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{department.name}</h3>
              <p className="text-gray-700">{department.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DepartmentsPage;