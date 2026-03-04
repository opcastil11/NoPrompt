'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/constants';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {FAQS.map((faq, idx) => (
        <div key={idx} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-2/30 transition-colors cursor-pointer"
          >
            <span className="text-sm font-medium pr-4">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${
                openIndex === idx ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-4 animate-fade-in">
              <p className="text-sm text-muted">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
