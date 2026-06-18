import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

import profileImg from '../assets/17616.jpg';
import animeImg from '../assets/profile_anime.png';

import { CinematicProfileReveal } from './CinematicProfileReveal';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isPictureOpen, setIsPictureOpen] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const handleProfileClick = () => {
    setIsPictureOpen(true);
    setHasRevealed(true);
  };

  const profileBtnRef = useRef(null);
  const animeWrapperRef = useRef(null);
  const animeImgRef = useRef(null);

  useEffect(() => {
    // Continuous subtle floating animation for the anime image
    const floatAnim = gsap.to(animeImgRef.current, {
      y: -3,
      x: 2,
      rotation: 1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      floatAnim.kill();
    };
  }, []);

  useEffect(() => {
    const btn = profileBtnRef.current;
    const wrapper = animeWrapperRef.current;
    if (!btn || !wrapper) return;

    const ctx = gsap.context(() => {});

    const handleMouseEnter = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.add(() => {
        gsap.to(wrapper, {
          clipPath: `circle(45px at ${x}px ${y}px)`,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    };

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.add(() => {
        gsap.to(wrapper, {
          clipPath: `circle(45px at ${x}px ${y}px)`,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    };

    const handleMouseLeave = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.add(() => {
        gsap.to(wrapper, {
          clipPath: `circle(0px at ${x}px ${y}px)`,
          duration: 0.3,
          ease: "power2.inOut",
          overwrite: "auto"
        });
      });
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

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
              ref={profileBtnRef}
              onClick={handleProfileClick}
              className="focus:outline-none hover:scale-105 transition-transform duration-300 relative rounded-full z-10 cursor-none"
              data-cursor={!hasRevealed ? "profile" : "hidden"}
              aria-label="View Profile Picture"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[var(--text-primary)]">
                {/* Original profile picture */}
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                {/* Anime profile picture wrapper */}
                <div 
                  ref={animeWrapperRef}
                  className={`absolute inset-0 pointer-events-none rounded-full overflow-hidden ${hasRevealed ? 'hidden' : ''}`}
                  style={{ clipPath: 'circle(0px at 50% 50%)' }}
                >
                  {/* Anime profile picture */}
                  <img 
                    ref={animeImgRef}
                    src={animeImg} 
                    alt="Profile Anime" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
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

    {/* Cinematic Profile Modal */}
    <AnimatePresence>
      {isPictureOpen && (
        <CinematicProfileReveal onClose={() => setIsPictureOpen(false)} />
      )}
    </AnimatePresence>
    </>
  );
}
