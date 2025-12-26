import React from 'react';

const Packages = ({ content }) => {
  return (
    <section id="packages" className="py-16 md:py-24 bg-gym-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gym-light mb-4">
            Membership Packages
          </h2>
          <p className="text-gym-light/70 text-lg">Choose the plan that fits your goals</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {content.map((pkg, index) => {
            const isPopular = index === 1; // Mark the middle package as popular
            return (
              <div 
                key={index} 
                className={`relative group bg-gym-dark border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-105 ${
                  isPopular 
                    ? 'border-gym-accent shadow-xl shadow-gym-accent/20 lg:scale-105' 
                    : 'border-gym-accent/20 hover:border-gym-accent/40 hover:shadow-lg hover:shadow-gym-accent/10'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gym-accent to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gym-accent mb-2">{pkg.name}</h3>
                  <div className="text-4xl md:text-5xl font-bold text-gym-light">{pkg.price}</div>
                </div>
                
                <ul className="space-y-3 mb-8 min-h-[180px]">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gym-light">
                      <svg className="w-5 h-5 text-gym-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={`https://wa.me/918087575415?text=Hi! I'm interested in the *${pkg.name}* package (${pkg.price}). Please provide more details.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block w-full py-3.5 px-6 rounded-xl font-bold text-center transition-all ${
                    isPopular
                      ? 'bg-gym-accent text-white hover:bg-orange-600 shadow-lg shadow-gym-accent/30'
                      : 'bg-gym-accent/10 text-gym-accent border-2 border-gym-accent hover:bg-gym-accent hover:text-white'
                  }`}
                >
                  Join Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;