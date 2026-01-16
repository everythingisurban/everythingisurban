import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Logo from './Logo';

const quotes = [
  "\"The city is not a problem to be solved, but a mystery to be lived.\" — Jane Jacobs",
  "\"We shape our buildings; thereafter they shape us.\" — Winston Churchill",
  "\"A house is a machine for living in.\" — Le Corbusier",
  "\"Architecture is the petrification of a cultural moment.\" — Jean Nouvel",
  "\"Design is intelligence made visible.\" — Alina Wheeler",
  "\"Order and complexity are twin sisters.\" — Rem Koolhaas"
];

const Hero: React.FC = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Select random quote on mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Staggered clip-path animation - Explicitly typed as Variants and used type casting for ease array to fix TypeScript errors
  const reveal: Variants = {
    hidden: { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 50 },
    visible: (i: number) => ({
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay: i * 0.15,
      },
    }),
  };

  // Typing animation variants
  const typeContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 1.2, // Wait for main title reveal
      }
    }
  };

  const typeChar = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } }
  };

  return (
    <section 
        className="relative h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden border-b border-black/10 dark:border-white/10 bg-urban-white dark:bg-urban-black transition-colors duration-500"
    >
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 z-0 bg-grid-pattern-light dark:bg-grid-pattern bg-[size:40px_40px] opacity-[0.05] pointer-events-none" />

      {/* Top Nav - Logo moved back to left */}
      <header className="relative z-10 flex justify-start items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 -ml-4 -mt-4">
           <Logo className="w-full h-full" />
        </div>
      </header>

      {/* Main Title Area */}
      <div className="relative z-10 mt-20 md:mt-0 flex flex-col items-start gap-2 max-w-5xl">
        
        <motion.div custom={0} initial="hidden" animate="visible" variants={reveal}>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-urban-black dark:text-urban-white">
            Everything
          </h1>
        </motion.div>
        
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
           <motion.div custom={1} initial="hidden" animate="visible" variants={reveal}>
             {/* 
                 Updated Styling for "IS":
                 - text-transparent: Makes the fill invisible.
                 - [-webkit-text-stroke:2px_#050505]: Explicitly sets black stroke for Light mode.
                 - dark:[-webkit-text-stroke:2px_#FAFAFA]: Explicitly sets white stroke for Dark mode.
             */}
             <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-transparent [-webkit-text-stroke:2px_#050505] dark:[-webkit-text-stroke:2px_#FAFAFA]">
               IS
             </h1>
           </motion.div>
           
           <motion.div custom={2} initial="hidden" animate="visible" variants={reveal} className="h-[2px] w-12 md:w-32 bg-urban-red self-center" />
           
           <motion.div custom={3} initial="hidden" animate="visible" variants={reveal}>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-urban-black dark:text-urban-white">
              URBAN
            </h1>
           </motion.div>
        </div>

        <motion.p 
          custom={4} 
          initial="hidden" 
          animate="visible" 
          variants={reveal}
          className="font-mono mt-8 text-sm md:text-base max-w-md text-urban-black/60 dark:text-urban-white/60 relative z-30"
        >
          // A digital archive exploring the intersection of concrete, code, and community.
        </motion.p>
        
        {/* Random Quote - Typing Animation */}
        {quote && (
           <motion.div 
             variants={typeContainer}
             initial="hidden"
             animate="visible"
             className="font-mono text-sm md:text-lg text-urban-red mt-6 max-w-2xl italic leading-relaxed relative z-30 min-h-[3.5rem]"
           >
             {quote.split("").map((char, index) => (
               <motion.span key={index} variants={typeChar}>
                 {char}
               </motion.span>
             ))}
             <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-2 h-4 bg-urban-red ml-1 align-middle"
             />
           </motion.div>
        )}
      </div>

      {/* Bottom Indicators */}
      <div className="relative z-10 flex justify-end items-end">
        {/* Right Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Vertical Text */}
          <span className="font-mono text-[10px] tracking-[0.2em] text-urban-black/40 dark:text-urban-white/40 uppercase [writing-mode:vertical-rl] rotate-180">
            Scroll To Explore
          </span>
          
          {/* Animated Line Container */}
          <div className="w-[1px] h-24 bg-black/10 dark:bg-white/10 relative overflow-hidden">
             <motion.div 
                className="absolute top-0 left-0 w-full h-1/2 bg-urban-red"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ 
                    duration: 2, 
                    ease: "linear", 
                    repeat: Infinity 
                }}
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;