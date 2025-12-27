import React from 'react';

const Hero = ({ content }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gym-darker/95 via-gym-dark/90 to-gym-darker/95"></div>
        {/* Animated blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gym-accent rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-gym-accent rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-gym-accent rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gym-accent/10 border border-gym-accent/30 rounded-full px-4 py-2 mb-6 fade-in">
            <span className="w-2 h-2 bg-gym-accent rounded-full animate-pulse"></span>
            <span className="text-gym-accent text-sm font-semibold">Premium Fitness Center</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gym-light mb-6 leading-tight slide-in-left">
            {content.title}
            <span className="block text-gym-accent mt-2">Fitness</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gym-light/90 mb-10 max-w-2xl slide-in-right leading-relaxed">
            {content.subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto slide-in-left">
            <a 
              href="https://wa.me/918087575415?text=Hi! I'm interested in joining *Health N More Fitness*. Please share membership details." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary text-base sm:text-lg px-8 py-4 shadow-xl shadow-gym-accent/30 hover:shadow-2xl hover:shadow-gym-accent/40 transition-all group"
            >
              <span className="flex items-center justify-center gap-2">
                {content.ctaText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a 
              href="#packages" 
              className="btn bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/30 text-base sm:text-lg px-8 py-4"
            >
              View Packages
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 w-full max-w-2xl fade-in">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gym-accent mb-1">500+</div>
              <div className="text-xs sm:text-sm text-gym-light/70">Active Members</div>
            </div>
            <div className="text-center border-x border-gym-light/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gym-accent mb-1">9+</div>
              <div className="text-xs sm:text-sm text-gym-light/70">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gym-accent mb-1">50+</div>
              <div className="text-xs sm:text-sm text-gym-light/70">Equipment</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-gym-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;