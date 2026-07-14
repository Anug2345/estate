import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    // Auto slide timer
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  // Variants for slide animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section id="testimonials" className="py-28 px-6 md:px-12 bg-luxury-bg dark:bg-[#151515] transition-colors relative overflow-hidden z-10">
      {/* Background circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C8A96A]/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Verified Appraisals
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white">
            Client Testimonials
          </h2>
        </div>

        {/* Testimonial Carousel frame */}
        <div className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 p-8 md:p-12 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative w-full"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#C8A96A]/10 stroke-[1.5]" />

              {/* Quote Rating */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8A96A] text-[#C8A96A]" />
                ))}
              </div>

              {/* Quote Content */}
              <blockquote className="font-serif text-lg md:text-xl text-luxury-black dark:text-white font-light leading-relaxed mb-8">
                "{current.quote}"
              </blockquote>

              {/* Client Profile details */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-luxury-black/5">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-serif text-sm font-medium text-luxury-black dark:text-white block">
                    {current.name}
                  </span>
                  <span className="font-mono text-[9px] text-[#777777] uppercase tracking-widest mt-0.5 block">
                    {current.role} — {current.company}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 flex items-center justify-center text-[#777777] hover:text-[#C8A96A] hover:border-[#C8A96A] hover:bg-luxury-bg shadow-lg transition-all transform active:scale-90 z-20 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 flex items-center justify-center text-[#777777] hover:text-[#C8A96A] hover:border-[#C8A96A] hover:bg-luxury-bg shadow-lg transition-all transform active:scale-90 z-20 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {TESTIMONIALS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? 'w-8 bg-[#C8A96A]' : 'w-2 bg-luxury-black/10 dark:bg-white/10'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
