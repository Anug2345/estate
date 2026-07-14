import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, Compass, MapPin, PhoneCall } from 'lucide-react';

export default function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('#home');

  useEffect(() => {
    const sections = ['#home', '#properties', '#why-us', '#agents', '#contact'];
    
    // Find valid elements existing in the DOM
    const elements = sections
      .map(id => document.querySelector(id))
      .filter((el): el is Element => el !== null);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px', // Focused active zone
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setActiveTab(href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabs = [
    { id: '#home', label: 'Base', icon: <Home className="w-4 h-4" /> },
    { id: '#properties', label: 'Estates', icon: <Compass className="w-4 h-4" /> },
    { id: '#agents', label: 'Brokers', icon: <MapPin className="w-4 h-4" /> },
    { id: '#contact', label: 'Consult', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-sm xl:hidden">
      {/* Dock glassmorphic body */}
      <div className="bg-[#111111]/85 backdrop-blur-md rounded-2xl border border-white/5 py-3.5 px-6 shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex justify-between items-center relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.id}
              onClick={(e) => handleNavClick(e, tab.id)}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer focus:outline-none relative py-1 px-3"
              aria-label={`Go to ${tab.label}`}
            >
              {/* Highlight background blob */}
              {isActive && (
                <motion.div
                  layoutId="active-mobile-tab-blob"
                  className="absolute inset-0 bg-[#C8A96A]/10 border border-[#C8A96A]/20 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}

              {/* Icon */}
              <div className={`transition-colors duration-300 ${isActive ? 'text-[#C8A96A]' : 'text-gray-400'}`}>
                {tab.icon}
              </div>

              {/* Label */}
              <span className={`text-[8px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                isActive ? 'text-white font-bold' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
