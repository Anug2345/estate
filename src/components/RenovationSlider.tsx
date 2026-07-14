import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal } from 'lucide-react';
import { RENOVATION_IMAGES } from '../data';

export default function RenovationSlider() {
  const [sliderX, setSliderX] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderX(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      // For older devices or specific touch actions
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#111111] transition-colors relative overflow-hidden">
      {/* Light grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A96A08_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Heading */}
        <div className="text-center mb-16 relative">
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Evolution of Space
          </motion.span>
          <motion.h2
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-black dark:text-white mt-4 font-light tracking-tight"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            The Art of Metamorphosis
          </motion.h2>
          <motion.p
            className="text-xs md:text-sm text-luxury-muted dark:text-gray-400 max-w-xl mx-auto mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Witness the structural conversion of historic structures. Drag the slider to witness our before-and-after renovation of a mid-century pavilion kitchen.
          </motion.p>
        </div>

        {/* Slider Frame */}
        <motion.div
          id="renovation-slider-container"
          ref={containerRef}
          className="relative w-full aspect-[16/10] md:aspect-[16/9] max-h-[600px] rounded-2xl md:rounded-[24px] overflow-hidden select-none border border-luxury-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-luxury-black cursor-ew-resize"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          onPointerDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          data-cursor="drag"
        >
          {/* AFTER IMAGE (Bottom Layer - fully shown on left, masked on right) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={RENOVATION_IMAGES.after}
              alt="After Renovation"
              className="w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            {/* Tag badge */}
            <span className="absolute bottom-6 right-6 font-mono text-[10px] bg-luxury-black/80 backdrop-blur-md text-[#C8A96A] tracking-[0.25em] px-4 py-2 border border-[#C8A96A]/30 uppercase rounded-full select-none z-10">
              RECONSTRUCTED (AFTER)
            </span>
          </div>

          {/* BEFORE IMAGE (Top Layer - clipped dynamically) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75"
            style={{ width: `${sliderX}%` }}
          >
            {/* The image inside must be full size of container, not scaled by clipping */}
            <div className="absolute inset-0 h-full" style={{ width: containerWidth }}>
              <img
                src={RENOVATION_IMAGES.before}
                alt="Before Renovation"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ width: containerWidth }}
                loading="lazy"
              />
            </div>
            {/* Tag badge */}
            <span className="absolute bottom-6 left-6 font-mono text-[10px] bg-[#111111]/85 backdrop-blur-md text-white/70 tracking-[0.25em] px-4 py-2 border border-white/10 uppercase rounded-full select-none z-10 whitespace-nowrap">
              ORIGINAL STATE (BEFORE)
            </span>
          </div>

          {/* Drag Handle Bar and Knob */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C8A96A]/20 via-[#C8A96A] to-[#C8A96A]/20 cursor-ew-resize flex items-center justify-center z-20 pointer-events-none"
            style={{ left: `${sliderX}%` }}
          >
            {/* Floating Handle knob */}
            <div className="w-12 h-12 rounded-full bg-luxury-black/90 dark:bg-luxury-black border border-[#C8A96A] shadow-[0_0_15px_rgba(200,169,106,0.4)] flex items-center justify-center cursor-ew-resize pointer-events-auto active:scale-90 transition-transform duration-100">
              <MoveHorizontal className="w-4.5 h-4.5 text-[#C8A96A]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
