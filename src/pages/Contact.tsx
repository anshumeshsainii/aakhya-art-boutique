
import { useState } from 'react';
import { ArtworkData } from '../types/artwork';
import artworkData from '../data/artworks.json';

const Contact = () => {
  const [data] = useState<ArtworkData>(artworkData as ArtworkData);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    artworkType: 'portrait'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `
Hello ${data.artist.name},

I'm interested in commissioning artwork. Here are the details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Artwork Type: ${formData.artworkType}

Message:
${formData.message}

Looking forward to discussing this further!
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917379340224?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 royal-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop&crop=center')`
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl mt-4">Let's create something beautiful together</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-playfair font-bold text-royal-purple mb-6">
                Commission Request
              </h2>
              <p className="text-gray-700 mb-8">
                Fill out the form below to discuss your custom artwork requirements. 
                I'll get back to you within 24 hours to discuss your vision.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent"
                    />
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
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="artworkType" className="block text-sm font-medium text-gray-700 mb-2">
                      Artwork Type
                    </label>
                    <select
                      id="artworkType"
                      name="artworkType"
                      value={formData.artworkType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                      <option value="abstract">Abstract</option>
                      <option value="floral">Floral</option>
                      <option value="custom">Custom Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Family Portrait Commission"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your vision, preferred size, timeline, and any specific requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent"
                  ></textarea>
                </div>

                <button type="submit" className="w-full gold-button text-lg py-4">
                  Send via WhatsApp
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-playfair font-bold text-royal-purple mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 royal-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                      <a
                        href="https://wa.me/917379340224"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-royal-purple hover:text-royal-gold transition-colors"
                      >
                        +91 {data.artist.phone}
                      </a>
                      <p className="text-sm text-gray-600">Preferred for quick responses</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 royal-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <a
                        href={`mailto:${data.artist.email}`}
                        className="text-royal-purple hover:text-royal-gold transition-colors"
                      >
                        {data.artist.email}
                      </a>
                      <p className="text-sm text-gray-600">For detailed inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 royal-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Social Media</h4>
                      <div className="space-y-1">
                        <a
                          href={`https://instagram.com/${data.artist.socialMedia.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-royal-purple hover:text-royal-gold transition-colors"
                        >
                          {data.artist.socialMedia.instagram}
                        </a>
                        <a
                          href={`https://facebook.com/${data.artist.socialMedia.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-royal-purple hover:text-royal-gold transition-colors"
                        >
                          Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-royal-purple text-white rounded-lg p-8">
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  Commission Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="bg-royal-gold text-royal-purple w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-semibold mb-1">Initial Consultation</h4>
                      <p className="text-gray-200 text-sm">Discuss your vision, size, timeline, and budget</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-royal-gold text-royal-purple w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-semibold mb-1">Concept & Sketches</h4>
                      <p className="text-gray-200 text-sm">Initial sketches and concept approval</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-royal-gold text-royal-purple w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-semibold mb-1">Creation Process</h4>
                      <p className="text-gray-200 text-sm">Regular updates during artwork creation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-royal-gold text-royal-purple w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-semibold mb-1">Final Delivery</h4>
                      <p className="text-gray-200 text-sm">Professional packaging and safe delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
