// src/utils/helpers.js

// دالة لتوحيد أسماء الفئات
export const normalizeCategory = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('administr')) return 'إدارية';
  if (c.includes('social')) return 'اجتماعية';
  if (c.includes('develop')) return 'تنموية';
  if (c.includes('health') || c.includes('clean')) return 'صحة/نظافة';
  if (c.includes('other')) return 'أخرى';
  return cat || 'أخرى';
};
