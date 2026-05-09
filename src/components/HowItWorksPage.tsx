// src/components/HowItWorksPage.tsx
export default function HowItWorksPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            How DiagnoxixAI Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a patient seeking tests or a centre looking to grow, our platform makes healthcare connections seamless.
          </p>
        </div>

        {/* For Patients Detailed Flow */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              For <span className="text-blue-600">Patients</span>
            </h2>
            <p className="text-xl text-gray-600">Get the diagnostic tests you need in 4 simple steps</p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/images/icons/step1-icon.svg" alt="Search icon" className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -left-2 w-24 h-24 bg-blue-50 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Search & Create Request</h3>
                <p className="text-lg text-gray-600">
                  Search for diagnostic centres near you or browse by test type. Create a request with your preferred test, location, and budget. Set your maximum price and let centres compete for your business.
                </p>
              </div>
            </div>

            {/* Dashed Line */}
            <div className="flex justify-center">
              <div className="w-px h-16 border-l-2 border-dashed border-gray-300"></div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-8 flex-row-reverse">
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/images/icons/step2-icon.svg" alt="Compare icon" className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -left-2 w-24 h-24 bg-blue-50 rounded-full"></div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Compare & Negotiate</h3>
                <p className="text-lg text-gray-600">
                  Review offers from multiple centres. Compare prices, ratings, and availability. Negotiate directly or accept the best offer for instant booking.
                </p>
              </div>
            </div>

            {/* Dashed Line */}
            <div className="flex justify-center">
              <div className="w-px h-16 border-l-2 border-dashed border-gray-300"></div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/images/icons/step3-icon.svg" alt="Book icon" className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -left-2 w-24 h-24 bg-blue-50 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Book & Get Tested</h3>
                <p className="text-lg text-gray-600">
                  Confirm your booking and visit the centre at your scheduled time. Enjoy a hassle-free testing experience with verified professionals.
                </p>
              </div>
            </div>

            {/* Dashed Line */}
            <div className="flex justify-center">
              <div className="w-px h-16 border-l-2 border-dashed border-gray-300"></div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-8 flex-row-reverse">
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/images/icons/step3-icon.svg" alt="Results icon" className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -left-2 w-24 h-24 bg-blue-50 rounded-full"></div>
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Access Results & Review</h3>
                <p className="text-lg text-gray-600">
                  Receive secure digital results instantly. Rate your experience and help other patients make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* For Centres Section */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">For Diagnostic Centres</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Register & Verify</h3>
                <p className="text-gray-600">Sign up with your centre details. Our team verifies your credentials and certifications for trusted visibility.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Receive Real-Time Requests</h3>
                <p className="text-gray-600">Get instant patient requests for tests you offer. Review patient details and decide if you can fulfil the request.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Set Prices & Negotiate</h3>
                <p className="text-gray-600">Quote your prices or negotiate with patients. Manage your pricing strategy to stay competitive.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Grow Your Business</h3>
                <p className="text-gray-600">Build visibility, increase bookings, collect positive reviews, and expand your customer base.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
