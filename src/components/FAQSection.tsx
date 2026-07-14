import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#111111] transition-colors relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Inquiries
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white">
            Frequently Asked Inquiries
          </h2>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                className="border-b border-luxury-black/5 dark:border-white/5 pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-4 flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#C8A96A]">
                      0{idx + 1} //
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-light text-luxury-black dark:text-white group-hover:text-[#C8A96A] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="p-1 rounded-full text-[#777777] group-hover:text-[#C8A96A] group-hover:bg-luxury-bg dark:group-hover:bg-white/5 transition-all"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-14 pr-6 pb-4">
                        <span className="font-mono text-[8px] bg-[#C8A96A]/10 text-[#C8A96A] tracking-wider px-2.5 py-1.5 rounded-md mb-3 inline-block uppercase font-bold">
                          {faq.category} Policy
                        </span>
                        <p className="text-xs md:text-sm text-luxury-muted dark:text-gray-400 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
