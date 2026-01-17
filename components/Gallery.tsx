
import React, { useState, useEffect66
              } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ArrowDown, ExternalLink } from 'lucide-react';
import { galleryItems } from '../data/gallery/index';
import type { GalleryItem } from '../types';

const MapModal: React.FC<{ item: GalleryItem; onClose: () => void }> = ({ item, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-urban-white/95 dark:bg-urban-black/95 backdrop-blur-md"
  >
    <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-urban-red hover:text-white transition-colors z-[70]">
      <X size={24} />
    </button>
    
    <div className="w-full max-w-6xl h-full flex flex-col md:flex-row gap-8">
      {/* Visual */}
      <div className="w-full md:w-2/3 h-1/2 md:h-auto border border-black/10 relative group">
        <img src={item.src} alt={item.title} className="w-full h-full object-cover grayscale contrast-125" />
        <div className="absolute top-4 left-4 bg-urban-black text-urban-white px-3 py-1 font-mono text-xs">
          COORD // {item.coordinates.lat.toFixed(4)}, {item.coordinates.lng.toFixed(4)}
        </div>
      </div>
      
      {/* Data & Map */}
      <div className="flex-1 flex flex-col gap-8">
        <div>
          <span className="font-mono text-xs text-urban-red uppercase">{item.location} // {item.date}</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">{item.title}</h2>
          <p className="font-mono text-sm opacity-60 mt-4 leading-relaxed">{item.description}</p>
        </div>

        {/* Minimal Map UI */}
        <div className="flex-1 bg-urban-light-gray dark:bg-urban-gray border border-black/10 relative overflow-hidden flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            {/* Minimal Map Marker Interaction */}
            <div className="relative z-10 text-center space-y-4 p-8">
               <div className="inline-block p-4 border border-urban-red text-urban-red animate-pulse">
                  <MapPin size={32} />
               </div>
               <p className="font-mono text-[10px] uppercase tracking-widest text-urban-black/40 dark:text-urban-white/40">
                  GEOSPATIAL POSITION ESTABLISHED
               </p>
               <a 
                 href={`https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}`} 
                 target="_blank" 
                 className="inline-flex items-center gap-2 font-mono text-xs border-b border-black/20 pb-1 hover:text-urban-red hover:border-urban-red transition-all"
               >
                  OPEN EXTERNAL SATELLITE <ExternalLink size={12} />
               </a>
            </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Gallery: React.FC  = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

      // Enhanced close handler to clear hover states
  const handleCloseModal = () => {
    // Blur any focused elements
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // Force remove any stuck pseudo-classes by triggering reflow
    document.body.offsetHeight;
    
    setSelectedItem(null);
  };

  // Disable body scroll and clean up hover states when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'auto';
    } else {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
    };
  }, [selectedItem]);
    
    // 2 rows of 3 = 6 items
    const displayedItems = isExpanded ? galleryItems : galleryItems.slice(0, 6);

    return (
        <section className="py-24 px-6 md:px-12 bg-urban-white dark:bg-urban-black transition-colors duration-500 border-b border-black/10">
             <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase text-urban-black dark:text-urban-white">Visual <span className="text-urban-red">Log</span></h2>
                  <p className="font-mono text-xs opacity-50 mt-2 uppercase">// Photographic research into urban textures and structural entropy.</p>
                </div>
                {!isExpanded && galleryItems.length > 6 && (
                   <button 
                     onClick={() => setIsExpanded(true)}
                     className="px-6 py-3 border border-black/10 font-mono text-xs uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group"
                   >
                     Load Full Archive <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                   </button>
                )}
             </div>

             <div className="grid                md:grid-cols-2 lg:grid-cols-3 gap-6 ${selectedItem ? 'pointer-events-none' : ''}">>
                <AnimatePresence mode="popLayout">
                    {displayedItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="relative group overflow-hidden cursor-pointer aspect-square bg-urban-light-gray dark:bg-urban-gray border border-black/5"
                            onClick={() => setSelectedItem(item)}
                        >
                            <img 
                                src={item.src} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-urban-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                            
                            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <span className="font-mono text-[10px] text-urban-red uppercase mb-1">{item.location}</span>
                                <h3 className="font-black text-xl text-white uppercase leading-none">{item.title}</h3>
                                <div className="mt-4 flex items-center gap-2 text-white/60 font-mono text-[10px]">
                                   <MapPin size={10} /> {item.coordinates.lat.toFixed(2)}, {item.coordinates.lng.toFixed(2)}
                                </div>
                            </div>

                            <div className="absolute top-4 left-4 bg-urban-black text-urban-white text-[10px] font-mono px-2 py-1 z-10">
                                {item.id.toUpperCase()}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
             </div>

             <AnimatePresence>
                {selectedItem && (
        <MapModal item={selectedItem} onClose={handleCloseModal} />                )}
             </AnimatePresence>
        </section>
    )
}

export default Gallery;
