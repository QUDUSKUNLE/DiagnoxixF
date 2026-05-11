// src/components/ContactUsPage.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement actual form submission to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Contact Info Cards */}
          <div className="bg-blue-50 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
            <p className="text-gray-600">
              Lagos, Nigeria<br />
              <span className="text-sm">Expanding across Africa</span>
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:support@diagnoxix.com" className="text-blue-600 hover:underline">support@diagnoxix.com</a><br />
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+2347071461496" className="text-blue-600 hover:underline">+234 (0) 707 146 1496</a><br />
              <span className="text-sm">Mon-Fri, 9AM-5PM WAT</span>
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 p-12 rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                <p className="text-green-700 text-sm mt-1">We'll get back to you shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              {/* Type Field */}
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="patient">Patient Support</option>
                  <option value="centre">Diagnostic Centre Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="bug">Report a Bug</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                How do I sign up as a patient?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Download the DiagnoxixAI app or visit our website and click "Get Started". Follow the sign-up process to create your account and start searching for diagnostic tests in your area.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                How do I register my diagnostic centre?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Visit our "Join as a Diagnostic Center" page and complete the registration form. Our team will verify your credentials and set up your centre profile to start receiving patient requests.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                What payment methods do you accept?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                We accept all major credit/debit cards, bank transfers, and mobile money payments. All transactions are secure and encrypted.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                How is my personal data protected?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                We use industry-standard encryption and comply with all relevant data protection regulations including GDPR and local healthcare privacy laws to keep your information secure.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                Can I cancel or reschedule a booking?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Yes! You can cancel or reschedule your booking up to 24 hours before the appointment. Visit the booking details in your account to make changes.
              </p>
            </details>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-blue-900 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers on DiagnoxixAI today.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up as Patient
            </Link>
            <Link
              href="/for-centres"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors border border-white"
            >
              Join as a Centre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
