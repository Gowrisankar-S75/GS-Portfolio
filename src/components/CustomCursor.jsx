import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring) return;

    // Set initial positions to center screen to avoid jumping from top-left (0,0)
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(text, { xPercent: -50, y: 10 });

    // GSAP quickTo for ultra-smooth 60fps movement
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    let currentMode = 'normal';

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check if hovering over profile trigger
      const isProfile = target.closest('[data-cursor="profile"]');
      if (isProfile) {
        if (currentMode !== 'anime') {
          currentMode = 'anime';
          text.innerText = 'Profile';
          gsap.to(ring, {
            opacity: 1,
            width: 80,
            height: 80,
            borderColor: 'rgba(255,255,255,0.5)',
            backgroundColor: 'rgba(0,0,0,0.2)',
            mixBlendMode: 'normal',
            backdropFilter: 'blur(4px)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          gsap.to(dot, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          gsap.to(text, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        return;
      }

      // Check if hovering over an element that should hide the cursor
      const isHidden = target.closest('[data-cursor="hidden"]');
      if (isHidden) {
        if (currentMode !== 'hidden') {
          currentMode = 'hidden';
          gsap.to(ring, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          gsap.to(dot, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          gsap.to(text, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        return;
      }

      // Check if hovering over standard links/buttons
      const isInteractive = target.closest('a, button, [role="button"]') || target.classList.contains('cursor-pointer');
      if (isInteractive) {
        if (currentMode !== 'hover') {
          currentMode = 'hover';
          gsap.to(ring, {
            opacity: 1,
            width: 60,
            height: 60,
            borderColor: 'white',
            backgroundColor: 'white',
            boxShadow: 'none',
            mixBlendMode: 'difference',
            backdropFilter: 'none',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          gsap.to(dot, {
            opacity: 1,
            width: 0,
            height: 0,
            backgroundColor: 'white',
            mixBlendMode: 'difference',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          gsap.to(text, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
        return;
      }

      // Default normal mode
      if (currentMode !== 'normal') {
        currentMode = 'normal';
        gsap.to(ring, {
          opacity: 1,
          width: 40,
          height: 40,
          borderColor: 'white',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          mixBlendMode: 'difference',
          backdropFilter: 'none',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        gsap.to(dot, {
          opacity: 1,
          width: 12,
          height: 12,
          backgroundColor: 'white',
          mixBlendMode: 'difference',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        gsap.to(text, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: 'power2.in',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Disable on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block border-2 border-white transition-colors duration-100"
        style={{
          width: '40px',
          height: '40px',
          mixBlendMode: 'difference',
          willChange: 'transform, width, height, border-color, background-color, box-shadow'
        }}
      >
        {/* Subtitle text below the cursor */}
        <div
          ref={textRef}
          className="absolute left-1/2 whitespace-nowrap pointer-events-none text-[10px] font-display font-bold tracking-widest text-[#ff7a47] uppercase opacity-0"
          style={{
            top: 'calc(100% + 16px)',
            textShadow: '0 0 8px rgba(255, 87, 34, 0.8)'
          }}
        >
          Anime Mode Activated ⚡
        </div>
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block bg-white"
        style={{
          width: '12px',
          height: '12px',
          mixBlendMode: 'difference',
          willChange: 'transform, width, height, background-color'
        }}
      />
    </>
  );
}
