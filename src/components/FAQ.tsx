// src/components/FAQ.tsx
'use client';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: 'How do I find diagnostic centres near me?', answer: 'Use our location-based search to find centres within your area.' },
    { question: 'Can I negotiate price with diagnostic centres?', answer: 'Yes, our platform allows direct price negotiation.' },
    { question: 'How do I access my test results?', answer: 'Results are securely stored and accessible via your dashboard.' },
    { question: 'What if I need to cancel or reschedule?', answer: 'Contact the centre directly through the app for changes.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find answers to common questions</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <button
                className="w-full text-left font-semibold text-gray-900 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span>{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && <p className="mt-4 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
