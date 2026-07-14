import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOADING_PHASES = [
  'Measuring light coordinates...',
  'Curating architectural portfolios...',
  'Sourcing off-market estates...',
  'Rendering structural layouts...',
  'Polishing obsidian surfaces...',
  'Welcome to Aurelia Estates'
];

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800); // Allow exit animations to finish
          }, 400);
          return 100;
        }
        // Random elegant increment steps
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Cycle loading phases based on current progress percentage
    const index = Math.min(
      Math.floor((progress / 100) * LOADING_PHASES.length),
      LOADING_PHASES.length - 1
    );
    setPhaseIndex(index);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="page-loader"
          className="fixed inset-0 bg-[#111111] z-99999 flex flex-col items-center justify-center p-8 select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Golden glowing dust elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8A96A]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C8A96A]/3 rounded-full blur-[150px]" />

          <div className="relative flex flex-col items-center max-w-md w-full text-center">
            {/* Elegant Monogram Monolith */}
            <motion.div
              className="mb-8 relative w-24 h-24 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {/* Outer drawing circle */}
              <svg className="absolute inset-0 w-full h-full rotate-270" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#C8A96A"
                  strokeWidth="1"
                  fill="none"
                  initial={{ strokeDasharray: '0 283', strokeDashoffset: 0 }}
                  animate={{ strokeDasharray: `${(progress / 100) * 283} 283` }}
                  transition={{ ease: 'easeInOut' }}
                />
              </svg>
              {/* Letter A in serif font */}
              <span className="font-serif text-5xl text-white font-light tracking-widest relative -top-1 ml-1 select-none">
                A
              </span>
            </motion.div>

            {/* Branded Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="font-serif text-2xl text-[#C8A96A] tracking-[0.3em] uppercase font-light">
                A U R E L I A
              </h1>
              <span className="font-mono text-[9px] tracking-[0.5em] text-[#777777] uppercase block mt-2">
                Luxury Real Estate
              </span>
            </motion.div>

            {/* Phase indicator text */}
            <div className="h-6 overflow-hidden mb-4 w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phaseIndex}
                  className="font-mono text-[11px] tracking-widest text-[#777777] uppercase"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  {LOADING_PHASES[phaseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Sleek architectural progress bar */}
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mb-6">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-[#C8A96A]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Percentage display */}
            <motion.span 
              className="font-mono text-xs tracking-widest text-white/50"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {progress}%
            </motion.span>
          </div>

          {/* Architectural structural coordinate lines */}
          <div className="absolute bottom-6 left-6 font-mono text-[9px] text-[#777777]/30 tracking-widest uppercase">
            lat: 34.0736° N // lon: 118.4004° W
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[9px] text-[#777777]/30 tracking-widest uppercase">
            Aurelia v1.0.6
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
