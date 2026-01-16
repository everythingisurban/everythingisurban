import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  const items = ["CODING", "ARCHITECTURE", "RESEARCH", "URBANIZATION", "ENTROPY", "DESIGN"];

  return (
    <div className="relative flex overflow-hidden border-y border-black/20 dark:border-white/20 bg-urban-white dark:bg-urban-white text-urban-black dark:text-urban-black py-6 select-none">
      {/* Gradient Masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-urban-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-urban-white to-transparent" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }} 
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex">
            {items.map((text, idx) => (
              <span key={idx} className="text-5xl md:text-7xl font-black uppercase tracking-tighter mx-10 flex items-center">
                {text}
                <span className="w-3 h-3 bg-urban-red rounded-full ml-10" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;