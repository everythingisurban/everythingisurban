
import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import type { UpdateCardProps } from '../types';
import { writings } from '../data/notes/index';

interface CardProps {
  item: UpdateCardProps;
}

const FlashlightCard: React.FC<CardProps> = ({ item }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => setOpacity(0);
  const Tag = item.link ? 'a' : 'div';
  const linkProps = item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Tag
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full min-h-[320px] w-full overflow-hidden bg-urban-light-gray dark:bg-urban-gray border border-black/10 dark:border-white/10 group cursor-pointer flex flex-col justify-between transition-colors duration-500"
      {...linkProps}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 42, 0, 0.15), transparent 40%)` }}
      />
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="inline-block px-2 py-1 text-[10px] font-mono font-bold text-urban-white bg-urban-black dark:text-urban-black dark:bg-urban-white">{item.category}</span>
            <span className="font-mono text-xs text-urban-black/40 dark:text-urban-white/40">{item.date}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-urban-black dark:text-urban-white group-hover:text-urban-red">{item.title}</h3>
          <p className="text-urban-black/60 dark:text-urban-white/60 text-sm font-mono line-clamp-3">{item.description}</p>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-dashed border-black/10">
          <ArrowUpRight className="w-5 h-5 text-urban-black/40 group-hover:text-urban-red transition-all" />
        </div>
      </div>
    </Tag>
  );
};

export const LatestNotes: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    writings.forEach(w => w.tags?.forEach(t => tags.add(t)));
    return ["ALL", ...Array.from(tags).sort()];
  }, []);

  const filteredWritings = useMemo(() => {
    const initial = selectedTag === "ALL" ? writings : writings.filter(w => w.tags?.includes(selectedTag));
    return isExpanded ? initial : initial.slice(0, 6); // 2 rows of 3
  }, [selectedTag, isExpanded]);

  return (
    <section className="py-24 px-6 md:px-12 bg-urban-white dark:bg-urban-black border-b border-black/10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-urban-black dark:text-urban-white">Latest <span className="text-urban-red">Notes</span></h2>
          <div className="flex flex-wrap gap-2 mt-6">
              {allTags.map(tag => (
                  <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 font-mono text-[10px] uppercase border transition-all ${selectedTag === tag ? 'bg-urban-red border-urban-red text-white' : 'border-black/10 text-urban-black/60 dark:text-urban-white/60'}`}>{tag}</button>
              ))}
          </div>
        </div>
        {!isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="px-6 py-3 border border-black/10 font-mono text-xs uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group"
          >
            Full archive <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 border border-black/10">
        <AnimatePresence mode="popLayout">
            {filteredWritings.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FlashlightCard item={item} /></motion.div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FlashlightCard;
