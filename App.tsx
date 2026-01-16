import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import { LatestNotes } from './components/FlashlightCard';
import CodeExperiments from './components/CodeExperiments';
import Library from './components/Library';
import Gallery from './components/Gallery';
import YouTubeSection from './components/YouTubeSection';
import Contact from './components/Contact';
import Logo from './components/Logo';
import { Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-urban-white dark:bg-urban-black text-urban-black dark:text-urban-white selection:bg-urban-red selection:text-white transition-colors duration-500">
      
      {/* Theme Toggle Fixed */}
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-urban-white/80 dark:bg-urban-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-urban-white" />
        ) : (
          <Moon className="w-5 h-5 text-urban-black" />
        )}
      </button>

      <Hero />
      
      <main>
        
        <LatestNotes />
        
        <Library />

        <Gallery />
        
        <CodeExperiments />
        
        <YouTubeSection />

        <Contact />
      </main>

      <footer className="border-t border-black/10 dark:border-white/10 p-6 md:p-12 flex flex-col md:flex-row justify-between items-end bg-urban-light-gray dark:bg-urban-gray transition-colors duration-500">
        <div className="flex flex-col gap-4">
            <div className="w-24 h-24">
              <Logo className="w-full h-full" />
            </div>
            <div>
              <p className="font-mono text-xs text-urban-black/50 dark:text-urban-white/50">© 2024. ALL RIGHTS RESERVED.</p>
            </div>
        </div>
        <div className="flex gap-8 mt-8 md:mt-0 font-mono text-sm">
            <a href="#" className="hover:text-urban-red transition-colors">TWITTER</a>
            <a href="#" className="hover:text-urban-red transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-urban-red transition-colors">LINKEDIN</a>
        </div>
      </footer>
    </div>
  );
};

export default App;