import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO_VIDEO_URL, HERO_FALLBACK_IMAGE } from '../data';

// Custom springy particle count for ambient floating effects
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 20,
  delay: Math.random() * -10,
}));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  // Robustly handle autoplay and loop on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.play().catch((err) => {
        console.log("Video autoplay interrupted/blocked:", err);
      });
    }
  }, []);

  // Parallax effects on scroll (smoothed with spring physics to prevent lag/stutter)
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 120, mass: 0.5 });
  const videoY = useTransform(smoothScrollY, [0, 800], [0, 200]);
  const textY = useTransform(smoothScrollY, [0, 800], [0, -100]);
  const opacity = useTransform(smoothScrollY, [0, 600], [1, 0]);

  const handleScrollDown = () => {
    const target = document.querySelector('#properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[105vh] flex items-center justify-center overflow-hidden bg-luxury-black text-white"
    >
      {/* Cinematic Background Video with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: videoY }}
      >
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full sm:object-cover max-sm:object-contain object-center sm:scale-102 max-sm:scale-100"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={HERO_FALLBACK_IMAGE}
            alt="Luxury architecture background"
            className="w-full h-full sm:object-cover max-sm:object-contain object-center sm:scale-102 max-sm:scale-100"
          />
        )}
        {/* Editorial Dark Vignette & Gradient Overlay (Reduced darkness for a clearer, brighter video presentation) */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/15 to-luxury-black/25" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_30%,#111111_80%) opacity-35" />
      </motion.div>

      {/* Grid line architectural styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Vertical Decoration - Editorial Aesthetic */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 pointer-events-none z-20">
        <div className="w-[1px] h-24 bg-white/15" />
        <div className="rotate-90 origin-center whitespace-nowrap text-[8px] font-mono uppercase tracking-[0.5em] text-[#C8A96A] font-bold">
          AURELIA REAL ESTATE
        </div>
        <div className="w-[1px] h-24 bg-white/15" />
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 pointer-events-none z-20">
        <div className="w-[1px] h-24 bg-white/15" />
        <div className="rotate-90 origin-center whitespace-nowrap text-[8px] font-mono uppercase tracking-[0.5em] text-white/30">
          AWARDS NOMINEE MXXVI
        </div>
        <div className="w-[1px] h-24 bg-white/15" />
      </div>

      {/* Ambient Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#C8A96A]/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [-40, 40],
              x: [-20, 20],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 flex flex-col xl:flex-row xl:items-center justify-between gap-16 z-10">
        
        {/* Copy Column */}
        <motion.div 
          className="max-w-2xl text-left"
          style={{ y: textY, opacity }}
        >
          {/* Subtle Golden Tag */}
          <motion.div
            className="inline-flex items-center gap-2 border border-[#C8A96A]/30 bg-[#C8A96A]/10 px-4 py-1.5 rounded-full mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#C8A96A] uppercase font-bold">
              Private Architectural Brokerage
            </span>
          </motion.div>

          {/* Large Title - Word reveal */}
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-6">
            <span className="block overflow-hidden h-fit">
              <motion.span
                className="block text-white"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Aesthetics of
              </motion.span>
            </span>
            <span className="block overflow-hidden h-fit">
              <motion.span
                className="block text-[#C8A96A] italic font-normal"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Pure Form.
              </motion.span>
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            className="text-xs md:text-sm lg:text-base text-gray-400 font-light leading-relaxed max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Representing residential masterpieces where architectural significance meets bespoke craftsmanship. Curated for the design-centric collector.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <a
              href="#properties"
              className="bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] px-8 py-4 rounded-full text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_10px_30px_rgba(200,169,106,0.35)] hover:shadow-[0_10px_35px_rgba(200,169,106,0.5)] cursor-pointer"
            >
              Explore Properties
            </a>
            <a
              href="#contact"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#C8A96A]/60 px-8 py-4 rounded-full text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              Book Consultation
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Glass Stats Column (Desktop) */}
        <div className="flex flex-col gap-5 self-center xl:self-end pb-12 w-full max-w-xs ml-auto">
          {[
            { metric: '1,500+', label: 'Luxury Homes Sourced', delay: 0.9 },
            { metric: '98%', label: 'Satisfied Ultra-HNW Clients', delay: 1.0 },
            { metric: '$2.4B+', label: 'Volume Acquired', delay: 1.1 },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 border border-white/5 backdrop-blur-md p-6 rounded-2xl flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative group overflow-hidden"
              initial={{ opacity: 0, x: 50, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: stat.delay, duration: 0.8 }}
              style={{
                y: idx === 0 ? -10 : idx === 2 ? 10 : 0
              }}
              whileHover={{ 
                y: idx === 0 ? -15 : idx === 2 ? 5 : -5,
                borderColor: 'rgba(200, 169, 106, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Golden shimmering glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C8A96A]/3 to-transparent -translate-x-full group-hover:animate-shimmer" />

              <span className="font-serif text-3xl md:text-4xl text-[#C8A96A] font-light tracking-wide block mb-1">
                {stat.metric}
              </span>
              <span className="font-mono text-[9px] text-gray-400 tracking-[0.15em] uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer gap-2"
        style={{ opacity }}
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-gray-500">Scroll</span>
        <motion.div
          className="w-5 h-9 rounded-full border border-white/10 flex justify-center p-1.5 relative"
          animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(200,169,106,0.5)', 'rgba(255,255,255,0.1)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {/* Mouse scroll wheel dot */}
          <motion.div
            className="w-1 h-1.5 bg-[#C8A96A] rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
