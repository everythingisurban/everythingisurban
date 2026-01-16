
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, X, ArrowDown } from 'lucide-react';
import type { Book } from '../types';
import { books } from '../data/books/index';

const Library: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [isExpanded, setIsExpanded] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    books.forEach(book => book.tags?.forEach(tag => tags.add(tag)));
    return ["ALL", ...Array.from(tags).sort()];
  }, []);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const results = books.filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(q) || 
                              b.reflection.toLowerCase().includes(q) ||
                              b.author.toLowerCase().includes(q);
        const matchesTag = selectedTag === "ALL" || b.tags?.includes(selectedTag);
        return matchesSearch && matchesTag;
    });
    return isExpanded ? results : results.slice(0, 8); // 2 rows of 4
  }, [searchQuery, selectedTag, isExpanded]);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col gap-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-urban-red text-white rounded-md">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-urban-black dark:text-urban-white">The Bookshelf</h2>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-64 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-urban-black/40 dark:text-urban-white/40 group-focus-within:text-urban-red transition-colors" />
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH..."
                  className="w-full bg-urban-light-gray dark:bg-urban-black border border-black/20 dark:border-white/20 py-3 pl-12 pr-4 font-mono text-sm uppercase text-urban-black dark:text-urban-white focus:outline-none focus:border-urban-red transition-all"
              />
              </div>
              {!isExpanded && (
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="px-6 py-3 border border-black/10 font-mono text-xs uppercase hover:bg-urban-red hover:text-white hover:border-urban-red transition-all flex items-center gap-2 group"
                >
                  Show All <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </button>
              )}
            </div>
        </div>
        <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 font-mono text-[10px] uppercase border transition-all duration-300 ${
                        selectedTag === tag 
                        ? 'bg-urban-red border-urban-red text-white shadow-md' 
                        : 'border-black/10 dark:border-white/10 text-urban-black/60 dark:text-urban-white/60 hover:bg-urban-red hover:text-white'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        <AnimatePresence mode='popLayout'>
            {filteredBooks.map((book) => (
            <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedBook(book)}
                className="group cursor-pointer flex flex-col gap-3"
            >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-urban-light-gray dark:bg-urban-gray border border-black/10 dark:border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-r from-black/20 z-20" />
                    {book.cover && <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-urban-white/90 dark:from-urban-black/90 to-transparent opacity-90" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end items-start z-10">
                        <span className="font-mono text-[10px] text-urban-red mb-1 border border-urban-red px-1 rounded-sm">{book.year}</span>
                        <h3 className="font-black text-xl uppercase leading-none text-urban-black dark:text-urban-white tracking-tighter line-clamp-3">{book.title}</h3>
                        <p className="font-mono text-xs text-urban-black/60 dark:text-urban-white/60 mt-1 truncate w-full">{book.author}</p>
                    </div>
                </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBook(null)} className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-sm" />
            <motion.div layoutId={`book-card-${selectedBook.id}`} className="relative w-full max-w-4xl bg-urban-white dark:bg-urban-black border border-black/20 dark:border-white/20 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
                <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 z-50 p-2 bg-urban-black/10 rounded-full hover:bg-urban-red hover:text-white transition-colors"><X size={20} /></button>
                <div className="w-full md:w-1/3 relative h-64 md:h-auto border-r border-black/10">
                    <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover grayscale contrast-125" />
                </div>
                <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                    <h2 className="text-3xl font-black uppercase mb-4 text-urban-black dark:text-urban-white">{selectedBook.title}</h2>
                    <p className="font-serif leading-relaxed text-urban-black/90 dark:text-urban-white/90">{selectedBook.reflection}</p>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Library;
