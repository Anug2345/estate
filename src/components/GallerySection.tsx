import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Focus } from 'lucide-react';
import { GALLERY_DATA } from '../data';

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    window.document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    window.document.body.style.overflow = 'auto';
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? GALLERY_DATA.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === GALLERY_DATA.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-28 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden z-10 border-t border-b border-white/5">
      {/* Light subtle grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Visual Chronicles
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-white">
            Architectural Masterpieces
          </h2>
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {GALLERY_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative overflow-hidden rounded-3xl border border-white/5 cursor-pointer group ${item.spanClass}`}
              onClick={() => handleOpenLightbox(index)}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ 
                borderColor: 'rgba(200, 169, 106, 0.4)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-[#111111]/10 to-transparent opacity-65 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Gallery detail labels (Appear on bottom on hover) */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                <div>
                  <span className="font-mono text-[8px] text-[#C8A96A] tracking-widest uppercase block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-light text-white tracking-wide">
                    {item.title}
                  </h4>
                </div>
                
                {/* Expand icon indicator */}
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-[#C8A96A] group-hover:text-[#111111] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX DIALOG OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="lightbox-overlay"
            className="fixed inset-0 z-99999 bg-[#0b0b0b]/95 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
          >
            {/* Close control button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#C8A96A] transition-all cursor-pointer z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next navigation */}
            <button
              onClick={handleNext}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#C8A96A] transition-all cursor-pointer z-50"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Main Picture Center */}
            <motion.div
              id="lightbox-frame"
              className="relative max-w-4xl max-h-[75vh] w-full flex flex-col items-center justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing on clicking image itself
            >
              <img
                src={GALLERY_DATA[lightboxIndex].image}
                alt={GALLERY_DATA[lightboxIndex].title}
                className="max-w-full max-h-[70vh] rounded-2xl object-contain border border-white/10 shadow-2xl"
              />

              {/* Captions */}
              <div className="mt-6 text-center">
                <span className="font-mono text-[9px] text-[#C8A96A] tracking-[0.2em] uppercase font-bold">
                  {GALLERY_DATA[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-2xl font-light text-white mt-1">
                  {GALLERY_DATA[lightboxIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
