import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Timings from '../components/Timings';
import Packages from '../components/Packages';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import api from '../utils/api';

const Home = () => {
  const [content, setContent] = useState({
    hero: {
      title: "Health N More Fitness",
      subtitle: "Transform Your Body, Transform Your Life",
      ctaText: "Join Now"
    },
    timings: {
      men: {
        morning: "6:00 AM – 10:00 AM",
        evening: "5:00 PM – 10:00 PM"
      },
      women: {
        afternoon: "11:00 AM – 4:00 PM"
      }
    },
    packages: [
      { name: "One Day", price: "₹100", features: ["1 Day Access", "Basic Equipment"] },
      { name: "1 Month", price: "₹700", features: ["30 Days Access", "All Equipment", "Locker"] },
      { name: "3 Months", price: "₹1800", features: ["90 Days Access", "All Equipment", "Locker", "Free WiFi"] },
      { name: "6 Months", price: "₹3000", features: ["180 Days Access", "All Equipment", "Locker", "Free WiFi", "Free Trial PT Session"] },
      { name: "Yearly", price: "₹5500", features: ["365 Days Access", "All Equipment", "Locker", "Free WiFi", "Free Trial PT Session", "Discount on Services"] }
    ],
    services: [
      { name: "Personal Training", price: "₹300 (One Day Trial)", description: "Experience personalized training with our certified trainers." },
      { name: "Per Month Personal Training", price: "₹9000", description: "Consistent guidance and customized workout plans." },
      { name: "Steam Bath", price: "₹100", description: "Relax and detoxify after your workout." },
      { name: "Massage", price: "Available", description: "Recover and relax with our professional massage services." },
      { name: "Diet Plan", price: "₹2000", description: "Customized nutrition plans by our experts." }
    ],
    contact: {
      owner: "Nitesh Tayade",
      phones: ["8087575415", "8600181828"],
      address: "Location: 19.993031, 73.786399"
    }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Use default content if API fails
    }
  };

  return (
    <div className="min-h-screen bg-gym-darker">
      <Header />
      <main>
        <Hero content={content.hero} />
        <Timings content={content.timings} />
        <Packages content={content.packages} />
        <Services content={content.services} />
        <Gallery />
        <Contact content={content.contact} />
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${content.contact.phones[0]}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default Home;