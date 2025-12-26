import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gym-darker border-t border-gym-accent/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gym-accent rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gym-accent">Health N More</h3>
            </div>
            <p className="text-gym-light/70 leading-relaxed">
              Transform your body, transform your life with our state-of-the-art fitness facilities and expert trainers.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gym-light mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Timings', href: '#timings' },
                { name: 'Packages', href: '#packages' },
                { name: 'Services', href: '#services' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gym-light/70 hover:text-gym-accent transition-colors inline-flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gym-light mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gym-light/70">
                <svg className="w-5 h-5 text-gym-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a href="tel:8087575415" className="hover:text-gym-accent transition-colors">8087575415</a>
                  <span className="mx-1">/</span>
                  <a href="tel:8600181828" className="hover:text-gym-accent transition-colors">8600181828</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gym-light/70">
                <svg className="w-5 h-5 text-gym-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Owner: Nitesh Tayade</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gym-accent/10 pt-8">
          <p className="text-center text-gym-light/60 text-sm">
            &copy; {new Date().getFullYear()} Health N More Fitness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;