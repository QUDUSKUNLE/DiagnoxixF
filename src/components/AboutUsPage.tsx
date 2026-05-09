// src/components/AboutUsPage.tsx
export default function AboutUsPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">About DiagnoxixAI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing healthcare access through innovative technology and transparent connections.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize access to diagnostic healthcare by connecting patients with verified diagnostic centres through a transparent, real-time marketplace that prioritizes trust, affordability, and convenience.
              </p>
              <p className="text-lg text-gray-600">
                We believe that quality healthcare shouldn't be a privilege. Our platform empowers patients to make informed decisions while helping diagnostic centres grow their businesses efficiently.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Healthcare for All</h3>
                <p className="text-gray-600">Making diagnostic services accessible to everyone, everywhere.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-20">
          <div className="bg-blue-900 text-white p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-xl max-w-3xl mx-auto">
                To become the leading healthcare marketplace in Nigeria and beyond, where patients can seamlessly access diagnostic services and centres can thrive through transparent, technology-driven connections.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Trust & Security</h3>
              <p className="text-gray-600">We prioritize data protection and verified partnerships to ensure safe healthcare experiences.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">Clear pricing, honest communication, and fair negotiations for all stakeholders.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">Leveraging technology to solve real healthcare challenges and improve access.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate professionals behind DiagnoxixAI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">John Doe</h3>
              <p className="text-blue-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600">Healthcare industry veteran with 15+ years experience.</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jane Smith</h3>
              <p className="text-blue-600 mb-2">CTO</p>
              <p className="text-gray-600">Tech innovator focused on healthcare technology solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Michael Johnson</h3>
              <p className="text-blue-600 mb-2">Medical Director</p>
              <p className="text-gray-600">Ensuring medical accuracy and compliance in all our services.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 p-12 rounded-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a patient seeking better healthcare access or a diagnostic centre looking to grow, DiagnoxixAI is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Get Started Today
            </a>
            <a href="/contact" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
