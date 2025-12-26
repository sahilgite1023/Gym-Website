import React from 'react';

const Contact = ({ content }) => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gym-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gym-light mb-4">
            Contact Us
          </h2>
          <p className="text-gym-light/70 text-lg">Get in touch - we'd love to hear from you</p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info & CTA */}
            <div className="space-y-6">
              <div className="bg-gym-darker border border-gym-accent/20 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gym-accent mb-6">Get In Touch</h3>
                <p className="text-gym-light/80 mb-6">
                  Owned by: <span className="font-bold text-gym-light">{content.owner}</span>
                </p>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gym-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gym-light font-semibold mb-2">Phone Numbers</p>
                      {content.phones.map((phone, index) => (
                        <a 
                          key={index} 
                          href={`tel:${phone}`} 
                          className="text-gym-accent hover:text-orange-500 transition-colors block text-lg"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gym-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gym-light font-semibold mb-2">Address</p>
                      <p className="text-gym-light/80 mb-2">{content.address}</p>
                      <a 
                        href="https://www.google.com/maps?q=19.993031,73.786399"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gym-accent hover:text-orange-500 font-medium transition-colors"
                      >
                        View on Google Maps
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Connect CTAs */}
              <div className="bg-gradient-to-br from-gym-accent to-orange-600 rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform?</h3>
                <p className="mb-6 text-white/90">Contact us now to start your fitness journey</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="https://wa.me/918087575415?text=Hi! I would like to get in touch with Health N More Fitness. Please assist me." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-gym-dark py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                  
                  <a 
                    href={`tel:${content.phones[0]}`} 
                    className="bg-white/10 backdrop-blur-sm text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gym-darker border border-gym-accent/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gym-accent mb-6">Find Us</h3>
              <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden border-2 border-gym-accent/30">
                <iframe
                  src="https://www.google.com/maps?q=19.993031,73.786399&hl=es;z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gym Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;