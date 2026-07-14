import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Calendar, ArrowUp, ArrowUpRight } from 'lucide-react';

// Import Modular Components
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertySection from './components/PropertySection';
import PropertySpotlight from './components/PropertySpotlight';
import AboutSection from './components/AboutSection';
import RenovationSlider from './components/RenovationSlider';
import VideoShowcase from './components/VideoShowcase';
import InteractiveMap from './components/InteractiveMap';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import AgentSection from './components/AgentSection';
import TestimonialSection from './components/TestimonialSection';
import GallerySection from './components/GallerySection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import NewsletterPopup from './components/NewsletterPopup';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll Progress Engine
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Theme Synchronizer
  useEffect(() => {
    // Check local preferences
    const isDarkSaved = localStorage.getItem('aurelia_theme') === 'dark';
    setIsDarkMode(isDarkSaved);
    if (isDarkSaved) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aurelia_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aurelia_theme', 'light');
    }
  };

  // Scroll Listener for CTA / Back-to-top buttons
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = () => {
    // Focus search input and scroll to collection
    const searchInput = document.querySelector('input[placeholder*="e.g. Pavilion"]');
    if (searchInput) {
      const section = document.querySelector('#properties');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        (searchInput as HTMLInputElement).focus();
      }, 600);
    }
  };

  const handleOpenBooking = () => {
    const contactForm = document.querySelector('#contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Page Loader */}
      <PageLoader onComplete={() => setIsLoading(false)} />

      {/* 2. Custom Cursor (Enabled on large desktop screens only) */}
      <CustomCursor />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            id="main-scroller"
            className="flex flex-col min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Scroll Progress Bar */}
            <motion.div
              id="scroll-progress-bar"
              className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#C8A96A] z-9999 origin-left"
              style={{ scaleX }}
            />

            {/* Floating Navigation */}
            <Navbar
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              onSearchClick={handleOpenSearch}
              onBookViewingClick={handleOpenBooking}
            />

            {/* Narrative Sections */}
            <main className="flex-grow">
              {/* Hero Showcase */}
              <Hero />

              {/* Properties Grid with Filters */}
              <PropertySection />

              {/* Property of the Week Spotlight */}
              <PropertySpotlight />

              {/* Split About Section & Why Choose Us */}
              <AboutSection />

              {/* Renovation Interactive Before/After slider */}
              <RenovationSlider />

              {/* Video Storytelling Showcase */}
              <VideoShowcase />

              {/* Interactive Blueprint Map */}
              <InteractiveMap />

              {/* Counting Milestones */}
              <StatsSection />

              {/* Elite Services Grid */}
              <ServicesSection />

              {/* Senior Brokers Schedulers */}
              <AgentSection />

              {/* Appraisals & Testimonials carousel */}
              <TestimonialSection />

              {/* Masonry Picture Gallery & Lightbox */}
              <GallerySection />

              {/* Beautiful Expandable FAQ Accordions */}
              <FAQSection />

              {/* Contact Mandates Form */}
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />

            {/* Mobile Bottom Navigation Bar */}
            <MobileBottomNav />

            {/* Scroll-Triggered Engagement Membership Popup */}
            <NewsletterPopup />

            {/* Sticky Floating CTA & Back-to-top widgets */}
            <AnimatePresence>
              {showScrollTop && (
                <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 flex flex-col gap-3">
                  
                  {/* Sticky Viewing Booking CTA */}
                  <motion.button
                    onClick={handleOpenBooking}
                    className="bg-[#C8A96A] text-[#111111] hover:bg-[#B59556] py-3.5 px-5 rounded-full flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-[0_8px_25px_rgba(200,169,106,0.35)] cursor-pointer"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Book A Viewing</span>
                  </motion.button>

                  {/* Back to top button */}
                  <motion.button
                    onClick={scrollToTop}
                    className="w-11 h-11 rounded-full bg-luxury-black dark:bg-[#1a1a1a] border border-white/10 hover:border-[#C8A96A] text-white hover:text-[#C8A96A] flex items-center justify-center shadow-2xl transition-all cursor-pointer self-end"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ y: -3 }}
                    aria-label="Scroll back to top"
                  >
                    <ArrowUp className="w-4.5 h-4.5" />
                  </motion.button>

                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
