// src/components/Testimonials.tsx
export default function Testimonials() {
  const testimonials = [
    { name: 'Priya Sharma', role: 'Patient • Lagos', text: '"Found a diagnostic centre near my home within minutes. The price negotiation feature saved me #50,000 on my blood tests. Highly recommended!"' },
    { name: 'City Health Labs', role: 'Diagnostic Centre • Hyderabad', text: '"The dashboard is incredibly easy to use. Managing appointments and responding to requests has never been simpler."' },
    { name: 'Rajesh Kumar', role: 'Patient • Lagos', text: '"The app made it so easy to compare prices across different centres. I got my MRI done at a great price with instant booking."' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Testimonials</h2>
          <p className="text-xl text-gray-600">Customer Experience that Speak for Themselves</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-gray-600">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
