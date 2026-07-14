import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Phone, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSearchClick: () => void;
  onBookViewingClick: () => void;
}

const MENU_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Properties', href: '#properties' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ isDarkMode, toggleDarkMode, onSearchClick, onBookViewingClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
          isScrolled
            ? 'bg-[#111111]/85 dark:bg-[#111111]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.2)] border-b border-white/5 py-3'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Left */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="font-serif text-2xl md:text-3xl font-light text-white tracking-[0.2em] group-hover:text-[#C8A96A] transition-colors">
              AURELIA
            </span>
            <div className="w-1.5 h-1.5 bg-[#C8A96A] rounded-full group-hover:scale-150 transition-transform duration-300" />
          </a>

          {/* Menu Center (Desktop only) */}
          <ul className="hidden xl:flex items-center gap-8">
            {MENU_ITEMS.map((item) => (
              <li key={item.label} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-[11px] font-medium tracking-[0.25em] text-white/80 group-hover:text-white uppercase transition-colors py-2 block"
                >
                  {item.label}
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A96A] transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-white/80 hover:text-[#C8A96A] hover:bg-white/5 rounded-full transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 animate-[spin_40s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Search Toggle */}
            <button
              onClick={onSearchClick}
              className="p-2 text-white/80 hover:text-[#C8A96A] hover:bg-white/5 rounded-full transition-all cursor-pointer"
              aria-label="Search properties"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Phone Consult button (Desktop only) */}
            <a
              href="tel:+2348141972357"
              className="hidden lg:flex items-center gap-2 border border-white/10 hover:border-[#C8A96A]/60 bg-white/5 hover:bg-[#C8A96A]/10 px-4 py-2 rounded-full transition-all group cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A96A] group-hover:animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] text-white font-medium uppercase">
                +234 814 197 2357
              </span>
            </a>

            {/* Book Viewing Button */}
            <button
              onClick={onBookViewingClick}
              className="hidden md:block bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_4px_14px_rgba(200,169,106,0.3)] cursor-pointer"
            >
              Reserve Consultation
            </button>

            {/* Mobile Menu Icon (Beautiful Morphing Hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden z-50 p-2.5 text-white hover:text-[#C8A96A] hover:bg-white/5 rounded-full transition-all cursor-pointer flex items-center justify-center relative"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5 relative">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="w-5.5 h-[1.5px] bg-white rounded-full block origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="w-5.5 h-[1.5px] bg-[#C8A96A] rounded-full block"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="w-5.5 h-[1.5px] bg-white rounded-full block origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Collapsible Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-[#0c0c0c]/98 backdrop-blur-2xl flex flex-col justify-between pt-32 pb-12 px-8 md:px-16 xl:hidden"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 140 }}
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Subtle glow circles for high-end depth */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#C8A96A]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Nav List */}
            <nav className="relative my-auto z-10 w-full">
              <ul className="flex flex-col gap-6 pl-4 md:pl-8">
                {MENU_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ 
                      delay: index * 0.08 + 0.15, 
                      duration: 0.6, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="font-serif text-3xl md:text-5xl text-white hover:text-[#C8A96A] tracking-wider transition-colors duration-300 inline-block relative group py-2"
                    >
                      <span>{item.label}</span>
                      <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#C8A96A] transition-all duration-300 group-hover:w-full" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>


            {/* Mobile Footer */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/5 pt-6 gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] tracking-widest text-[#777777] uppercase">
                  Private Brokerage
                </span>
                <a href="mailto:gomezanu@gmail.com" className="font-mono text-[11px] tracking-wider text-white hover:text-[#C8A96A] mt-1">
                  gomezanu@gmail.com
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+2348141972357"
                  className="flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-full"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span className="text-[10px] tracking-[0.15em] text-white font-mono">
                    +234 814 197 2357
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
