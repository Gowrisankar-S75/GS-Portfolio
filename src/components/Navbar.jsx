import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import profileImg from '../assets/17616.jpg';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isPictureOpen, setIsPictureOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
    <nav className="fixed w-full z-50 top-0 left-0 bg-[var(--bg-color)]/90 dark:bg-[var(--bg-color)]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0 flex items-center gap-3">
            <button 
              onClick={() => setIsPictureOpen(true)}
              className="focus:outline-none hover:scale-105 transition-transform duration-300"
              aria-label="View Profile Picture"
            >
              <img src={profileImg} alt="Profile" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[var(--text-primary)]" />
            </button>
            <a href="#home" className="text-2xl font-bold tracking-widest uppercase font-display text-[var(--text-primary)] hidden sm:block hover:text-[var(--accent-color)] transition-colors">
              Gowrisankar
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative px-1 py-2 text-sm font-semibold tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--accent-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 text-[var(--text-primary)]"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 text-[var(--text-primary)]"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--text-primary)] hover:opacity-70 transition-opacity"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg-secondary)] border-b border-black/5 dark:border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold font-display tracking-widest uppercase text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    {/* Picture Modal */}
    <AnimatePresence>
      {isPictureOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setIsPictureOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsPictureOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <img 
              src={profileImg} 
              alt="Gowrisankar Full Profile" 
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
