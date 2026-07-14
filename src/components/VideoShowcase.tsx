import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Play, X, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { SHOWCASE_VIDEO_URL, SHOWCASE_FALLBACK_IMAGE } from '../data';

export default function VideoShowcase() {
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  // Scroll parallax for deep spatial effect (smoothed with spring physics)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120, mass: 0.5 });
  const videoY = useTransform(smoothProgress, [0, 1], [-80, 80]);
  const textScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const handleOpenCinema = () => {
    setIsPlayingFull(true);
    window.document.body.style.overflow = 'hidden';
  };

  const handleCloseCinema = () => {
    setIsPlayingFull(false);
    window.document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section
        id="showcase"
        ref={sectionRef}
        className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-luxury-black text-white"
      >
        {/* Parallax background video */}
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
          style={{ y: videoY, opacity }}
        >
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center"
            >
              <source src={SHOWCASE_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={SHOWCASE_FALLBACK_IMAGE}
              alt="Luxury pool exterior"
              className="w-full h-full object-cover object-center"
            />
          )}
          {/* Subtle elegant dark cover overlays */}
          <div className="absolute inset-0 bg-[#111111]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/30" />
        </motion.div>

        {/* Cinematic Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4rem] pointer-events-none" />

        {/* Concentrated content */}
        <motion.div
          className="relative text-center max-w-2xl px-6 z-10 flex flex-col items-center"
          style={{ scale: textScale }}
        >
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Spatial Narratives
          </motion.span>

          <motion.h2
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Every Home <br />Tells A Story
          </motion.h2>

          {/* Glowing Play Trigger knob */}
          <motion.button
            onClick={handleOpenCinema}
            className="w-20 h-20 rounded-full bg-white/10 hover:bg-[#C8A96A] text-white hover:text-[#111111] flex items-center justify-center border border-white/25 hover:border-[#C8A96A] shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(200,169,106,0.4)] transition-all duration-500 hover:scale-110 cursor-pointer"
            whileInView={{ scale: [0.95, 1, 0.95], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            aria-label="Play architectural film"
            data-cursor="play"
          >
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </motion.button>
        </motion.div>

        {/* Ambient coordinate branding */}
        <div className="absolute bottom-6 left-12 font-mono text-[8px] text-white/30 tracking-widest hidden md:block">
          REEL NO. 04 // SPECTRAL CHROMATIC LIGHT
        </div>
      </section>

      {/* FULL SCREEN CINEMATIC VIDEOLIGHTBOX OVERLAY */}
      <AnimatePresence>
        {isPlayingFull && (
          <motion.div
            id="cinema-overlay"
            className="fixed inset-0 bg-[#0a0a0a] z-99999 flex flex-col items-center justify-center p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close trigger */}
            <button
              onClick={handleCloseCinema}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#C8A96A] border border-white/10 flex items-center justify-center transition-all cursor-pointer z-50"
              aria-label="Exit Cinema"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Canvas Container */}
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5">
              <video
                ref={fullVideoRef}
                autoPlay
                controls
                src={SHOWCASE_VIDEO_URL}
                className="w-full h-full object-cover"
              />

              {/* Float settings indicator */}
              <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-widest bg-black/70 border border-white/10 px-4 py-2 rounded-full text-[#C8A96A]">
                CINEMATIC ASPECT 16:9 // DOLBY SPATIAL AUDIO
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
