// src/components/HowItWorks.tsx
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple steps to better healthcare</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Patients */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">For Patients</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Search Tests Nearby</h4>
                  <p className="text-gray-600">Find diagnostic centres based on location, test type, price, and availability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Compare & Negotiate</h4>
                  <p className="text-gray-600">See prices upfront or make an offer—choose what works for you.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Book & Get Results</h4>
                  <p className="text-gray-600">Confirm instantly, track appointments, and access records in one place.</p>
                </div>
              </div>
            </div>
            <Link href="/signup" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Sign Up as a Patient
            </Link>
          </div>
          {/* For Centres */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">For Diagnostic Centres</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Receive Patient Requests</h4>
                  <p className="text-gray-600">Get real-time requests from nearby patients.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Set Your Price</h4>
                  <p className="text-gray-600">Accept, decline, or counter-offer based on your availability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Grow Your Business</h4>
                  <p className="text-gray-600">Increase visibility, manage bookings, and build trust through reviews.</p>
                </div>
              </div>
            </div>
            <Link href="/join" className="mt-8 inline-block border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
              Join as a Diagnostic Centre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
