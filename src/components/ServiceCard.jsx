// src/components/ServiceCard.jsx
import React from 'react';

function ServiceCard({ service }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-gray-100 transition-transform hover:scale-105 duration-300">
      <div>
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">{service.name}</h3>
        <p className="text-gray-700 text-base mb-3">{service.description}</p>
      </div>
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        {service.required_documents && (
          <p><span className="font-semibold">المستندات المطلوبة:</span> {service.required_documents}</p>
        )}
        {service.steps && (
          <p><span className="font-semibold">الخطوات:</span> {service.steps}</p>
        )}
        {service.fees !== undefined && service.fees !== null && (
          <p>
            <span className="font-semibold">الرسوم:</span>{' '}
            {typeof service.fees === 'number'
              ? service.fees.toLocaleString('ar-DZ', { style: 'currency', currency: 'DZD' })
              : service.fees}
          </p>
        )}
        {service.working_hours && (
          <p><span className="font-semibold">ساعات العمل:</span> {service.working_hours}</p>
        )}
      </div>
    </div>
  );
}

export default ServiceCard;
