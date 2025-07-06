
import Layout from "@/components/layout/Layout";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Get in touch with our healthcare team for consultations, questions, or support
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're here to help with your healthcare needs. Contact us through any of the 
                methods below, and our team will respond promptly.
              </p>

              <div className="space-y-6">
                {/* Office Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-garrison-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Office Location</h3>
                    <p className="text-gray-600">Kampala, Uganda</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-garrison-red rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone Numbers</h3>
                    <div className="space-y-1">
                      <a href="tel:+256745101519" className="text-garrison-teal hover:text-garrison-teal-dark transition-colors block">
                        +256 745 101 519 (Main)
                      </a>
                      <a href="tel:+256761281222" className="text-gray-600 hover:text-garrison-teal transition-colors block">
                        +256 761 281 222 (Alternative)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-garrison-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
                    <a href="mailto:garrisonhealth147@gmail.com" className="text-garrison-teal hover:text-garrison-teal-dark transition-colors">
                      garrisonhealth147@gmail.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-garrison-red rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Operating Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Emergency consultations only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Consultation */}
              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick WhatsApp Consultation</h3>
                <p className="text-gray-600 mb-4">
                  For immediate health consultations, chat with Immaculate Nakamya on WhatsApp
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <a 
                    href="https://wa.me/256745101519?text=Hello%20Immaculate,%20I%20need%20a%20health%20consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start WhatsApp Chat
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="garrison-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-transparent"
                        placeholder="+256 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="consultation">Health Consultation</option>
                      <option value="information">Medical Information Request</option>
                      <option value="appointment">Appointment Booking</option>
                      <option value="feedback">Feedback or Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-transparent resize-vertical"
                      placeholder="Please describe your inquiry or health concern..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full garrison-btn-primary">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-garrison-red to-garrison-red-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Emergency Contact</h2>
          <p className="text-xl text-white/90 mb-8">
            For urgent health concerns or emergencies, contact us immediately
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-garrison-red hover:bg-gray-100 font-semibold px-8 py-4">
              <a href="tel:+256745101519">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Call: +256 745 101 519
              </a>
            </Button>
            <Button asChild className="bg-white/20 hover:bg-white/30 text-white border border-white font-semibold px-8 py-4">
              <a 
                href="https://wa.me/256745101519?text=EMERGENCY:%20I%20need%20immediate%20health%20assistance"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Emergency WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
