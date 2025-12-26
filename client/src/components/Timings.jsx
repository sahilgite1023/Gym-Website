import React from 'react';

const Timings = ({ content }) => {
  return (
    <section id="timings" className="py-16 md:py-24 bg-gym-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gym-light mb-4">
            Gym Timings
          </h2>
          <p className="text-gym-light/70 text-lg">Find the perfect time to train</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Men's Timings */}
          <div className="group bg-gym-darker border border-gym-accent/20 rounded-2xl p-6 md:p-8 hover:border-gym-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-gym-accent/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gym-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gym-accent">Men's Timings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gym-dark/60 rounded-xl border border-gym-accent/10">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-gym-light font-medium">Morning</span>
                </div>
                <span className="text-gym-accent font-bold text-lg">{content.men.morning}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gym-dark/60 rounded-xl border border-gym-accent/10">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="text-gym-light font-medium">Evening</span>
                </div>
                <span className="text-gym-accent font-bold text-lg">{content.men.evening}</span>
              </div>
            </div>
          </div>
          
          {/* Women's Timings */}
          <div className="group bg-gym-darker border border-gym-accent/20 rounded-2xl p-6 md:p-8 hover:border-gym-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-gym-accent/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gym-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gym-accent">Women's Timings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gym-dark/60 rounded-xl border border-gym-accent/10">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-gym-light font-medium">Afternoon</span>
                </div>
                <span className="text-gym-accent font-bold text-lg">{content.women.afternoon}</span>
              </div>
              <div className="h-[72px] flex items-center justify-center text-gym-light/40 text-sm border border-dashed border-gym-accent/10 rounded-xl">
                More slots available on request
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timings;