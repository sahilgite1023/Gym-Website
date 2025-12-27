import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['timings', 'packages', 'services', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Timings', href: '#timings' },
    { name: 'Packages', href: '#packages' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gym-dark/95 backdrop-blur-md shadow-lg' 
        : 'bg-gym-dark/80'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gym-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-bold text-gym-light">Health N More</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeSection === link.href.substring(1)
                    ? 'text-gym-accent bg-gym-accent/10'
                    : 'text-gym-light hover:text-gym-accent hover:bg-gym-accent/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            {/* <Link 
              to="/admin/login" 
              className="ml-4 px-4 py-2 bg-gym-accent/10 text-gym-accent border border-gym-accent/30 rounded-lg font-medium hover:bg-gym-accent hover:text-white transition-all"
            >
              Admin
            </Link> */}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gym-light hover:bg-gym-accent/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <nav className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  activeSection === link.href.substring(1)
                    ? 'text-gym-accent bg-gym-accent/10'
                    : 'text-gym-light hover:text-gym-accent hover:bg-gym-accent/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            {/* <Link 
              to="/admin/login" 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 bg-gym-accent/10 text-gym-accent border border-gym-accent/30 rounded-lg font-medium hover:bg-gym-accent hover:text-white transition-all text-center"
            >
              Admin Login
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;