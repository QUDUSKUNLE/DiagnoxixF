// src/components/WhyChooseUs.tsx
export default function WhyChooseUs() {
  const features = [
    { title: 'Real-Time Matching', desc: 'Patients and centres connect instantly—no long waits.' },
    { title: 'Transparent Pricing', desc: 'See prices upfront or negotiate fairly before booking.' },
    { title: 'Dual-Role Flexibility', desc: 'One app. Switch between Patient and Centre mode anytime.' },
    { title: 'Trusted Reviews', desc: 'Bidirectional ratings promote accountability and quality.' },
    { title: 'Secure Records', desc: 'Your medical data is encrypted and safely stored.' },
    { title: 'Location-Based Discovery', desc: 'Find the nearest available diagnostic services in seconds.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why DiagnoxixAI</h2>
          <p className="text-xl text-gray-600">Not just another healthcare app</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
