import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number; // ms
}

function CountUp({ end, suffix = '', duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration / 16); // 60fps frame calculations
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-serif">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    { id: 1, end: 2500, suffix: '+', label: 'Luxury Residences' },
    { id: 2, end: 1200, suffix: '+', label: 'Mandates Fulfilled' },
    { id: 3, end: 98, suffix: '%', label: 'Client Satisfaction' },
    { id: 4, end: 20, suffix: '+', label: 'Years Architectural Legacy' },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden z-10 border-t border-b border-white/5">
      {/* Light subtle contour overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 text-center">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="flex flex-col relative group"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Highlight background flash */}
              <div className="absolute -inset-4 bg-white/[0.01] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none" />

              <span className="text-4xl md:text-5xl lg:text-6xl text-[#C8A96A] font-light tracking-wide mb-3 block">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </span>
              <span className="font-mono text-[9px] text-gray-400 tracking-[0.2em] uppercase max-w-[150px] mx-auto leading-relaxed">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
