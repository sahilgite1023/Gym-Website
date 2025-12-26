import React from 'react';

const Services = ({ content }) => {
  const serviceIcons = {
    0: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    1: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    2: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-gym-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gym-light mb-4">
            Our Services
          </h2>
          <p className="text-gym-light/70 text-lg">Comprehensive fitness solutions for your success</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {content.map((service, index) => (
            <div 
              key={index} 
              className="group bg-gym-darker border border-gym-accent/20 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-gym-accent/40 hover:shadow-xl hover:shadow-gym-accent/10 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gym-accent/10 rounded-xl flex items-center justify-center text-gym-accent mb-5 group-hover:scale-110 transition-transform">
                {serviceIcons[index] || serviceIcons[0]}
              </div>
              
              <h3 className="text-2xl font-bold text-gym-accent mb-3">{service.name}</h3>
              <div className="text-xl font-semibold text-gym-light mb-4">{service.price}</div>
              <p className="text-gym-light/80 leading-relaxed mb-6 line-clamp-3">{service.description}</p>
              
              <a 
                href={`https://wa.me/918087575415?text=Hi! I'd like to enquire about *${service.name}* (${service.price}). ${service.description}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3 px-6 bg-gym-accent/10 text-gym-accent border-2 border-gym-accent rounded-xl font-bold hover:bg-gym-accent hover:text-white transition-all group-hover:scale-105"
              >
                Enquire Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;