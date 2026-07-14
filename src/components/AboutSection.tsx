import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { CheckCircle2, ShieldCheck, TrendingUp, Users, Globe2, Sparkles, Landmark } from 'lucide-react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 80 });
  const yParallax = useTransform(smoothProgress, [0, 1], [-60, 60]);

  const features = [
    'Verified Private Listings',
    'Certified Design Valuations',
    'Exclusive Off-Market Sourcing',
    'Bespoke Investment Audits',
    'Absolute Privacy Discretion',
  ];

  const cards = [
    {
      id: 1,
      title: 'Architectural Jewels',
      icon: <Landmark className="w-6 h-6 text-[#C8A96A]" />,
      desc: 'Sourcing residential monuments representing pure organic, brutalist, and modern design legacies.',
    },
    {
      id: 2,
      title: 'Investment Forecasts',
      icon: <TrendingUp className="w-6 h-6 text-[#C8A96A]" />,
      desc: 'In-house advisory conducting yield projections, asset optimization, and trust configurations.',
    },
    {
      id: 3,
      title: 'Trusted Sovereignty',
      icon: <Users className="w-6 h-6 text-[#C8A96A]" />,
      desc: 'Representing sovereign families and private partners under ironclad non-disclosure guidelines.',
    },
    {
      id: 4,
      title: 'Global Connectivity',
      icon: <Globe2 className="w-6 h-6 text-[#C8A96A]" />,
      desc: 'Vast proprietary database spanning major luxury nodes like Beverly Hills, New York, Malibu, Paris, and Monaco.',
    },
  ];

  return (
    <>
      {/* ABOUT SECTION */}
      <section id="about" ref={sectionRef} className="py-28 px-6 md:px-12 bg-white dark:bg-[#111111] transition-colors relative overflow-hidden z-10">
        {/* Abstract background vector line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-black/5 dark:via-white/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-5 relative">
              {/* Decorative back gold frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#C8A96A]/20 rounded-3xl -z-10 pointer-events-none" />
              
              <motion.div
                className="rounded-3xl overflow-hidden aspect-[3/4] relative shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-luxury-black/5 dark:border-white/5 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                style={{ y: yParallax }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                  alt="Modern architectural lines"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />
                
                {/* Micro statistic overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 dark:bg-black/25 backdrop-blur-md p-5 border border-white/15 rounded-2xl">
                  <span className="font-mono text-[9px] tracking-widest text-[#C8A96A] uppercase block mb-1">FOUNDED IN MONACO</span>
                  <p className="font-serif text-lg text-white font-light">Elegance and absolute discretion since 2012.</p>
                </div>
              </motion.div>
            </div>

            {/* Right Copy Block */}
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4">
                Corporate Legacy
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white mb-6 leading-tight">
                Experience Excellence <br />in <span className="italic text-[#C8A96A] font-normal">Private Brokerage</span>
              </h2>
              
              <p className="text-xs md:text-sm text-luxury-muted dark:text-gray-400 font-light leading-relaxed mb-8 max-w-xl">
                Aurelia represents the pinnacle of premium residential consulting. Our curated team of architectural scholars and fiscal strategists operates under the highest standards of integrity, sourcing unique design icons that offer both physical sanctuary and solid capital protection.
              </p>

              {/* Checklist Features */}
              <div className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/30 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-[#C8A96A]" />
                    </div>
                    <span className="text-xs font-mono tracking-wider text-luxury-black dark:text-gray-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Founder Signature Quote */}
              <div className="flex items-center gap-5 border-t border-luxury-black/5 dark:border-white/5 pt-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-luxury-black/5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Alessia Vance Signature"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-serif italic text-sm text-luxury-black dark:text-white block">"We do not sell properties. We orchestrate architectural inheritances."</span>
                  <span className="font-mono text-[9px] text-[#777777] uppercase tracking-widest mt-1 block">Alessia Vance — CEO & Founder</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (Bento Cards Section) */}
      <section id="why-us" className="py-28 px-6 md:px-12 bg-luxury-bg dark:bg-[#151515] transition-colors relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4">
              Why Choose Aurelia
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white">
              Privileges of the Partnership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                className="bg-white dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 p-8 rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.015)] relative group overflow-hidden transition-all duration-500"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.01,
                  borderColor: 'rgba(200, 169, 106, 0.3)',
                  boxShadow: '0 20px 40px rgba(200, 169, 106, 0.05)'
                }}
              >
                {/* Glowing ring */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8A96A]/2 rounded-bl-[100px] group-hover:scale-150 transition-transform duration-500" />
                
                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-[#C8A96A]/10 border border-[#C8A96A]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  {card.icon}
                </div>

                <h3 className="font-serif text-xl font-light text-luxury-black dark:text-white mb-4">
                  {card.title}
                </h3>

                <p className="text-[11px] text-luxury-muted dark:text-gray-400 leading-relaxed font-light">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
