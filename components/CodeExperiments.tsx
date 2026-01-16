
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlashlightCard from './FlashlightCard';
import { Terminal, Github, ArrowDown } from 'lucide-react';
import { experiments } from '../data/experiments/index';

const CodeExperiments: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedExps = isExpanded ? experiments : experiments.slice(0, 6);

  return (
    <section className="py-24 px-6 md:px-12 bg-urban-white dark:bg-urban-black border-b border-black/10 relative overflow-hidden transition-colors duration-500">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-grid-pattern opacity-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="flex items-center gap-4">
                <div className="p-3 border border-black/20 text-urban-red transform rotate-3"><Terminal size={24} /></div>
                <h2 className="text-4xl md:text-5xl font-black uppercase text-urban-black dark:text-urban-white">The Lab</h2>
            </div>
            {!isExpanded && experiments.length > 6 && (
                <button 
                onClick={() => setIsExpanded(true)}
                className="px-6 py-3 border border-black/10 font-mono text-xs uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group"
                >
                Expand Lab <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {displayedExps.map((item) => (
                    <motion.div 
                        key={item.id} 
                        layout 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                    >
                        <FlashlightCard item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        <div className="mt-12 p-6 border border-black/10 bg-black/5 dark:bg-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-urban-black dark:text-urban-white">
            <div className="flex items-center gap-4"><Github className="w-6 h-6" /><span className="font-mono text-sm uppercase">Check full repos on GitHub</span></div>
            <a href="https://github.com" target="_blank" className="font-bold text-urban-red hover:underline">github.com/everything-is-urban</a>
        </div>
    </section>
  );
};

export default CodeExperiments;
