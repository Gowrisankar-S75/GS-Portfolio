import { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import gsap from 'gsap';
import { Howl } from 'howler';

const THUNDER_URL = 'https://actions.google.com/sounds/v1/weather/thunder_crack.ogg';
const CHIME_URL = 'https://actions.google.com/sounds/v1/science_fiction/sweep_down.ogg'; // Sweep down / morning chime substitute

export function CinematicThemeTransition() {
  const { transitionState, setTransitionState, commitThemeChange } = useContext(ThemeContext);
  const canvasRef = useRef(null);

  const thunderSound = useRef(null);
  const chimeSound = useRef(null);

  useEffect(() => {
    thunderSound.current = new Howl({ src: [THUNDER_URL], volume: 0.7 });
    chimeSound.current = new Howl({ src: [CHIME_URL], volume: 0.5 });
  }, []);

  useEffect(() => {
    if (transitionState === 'idle') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to cover screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width;
    const H = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    if (transitionState === 'to-dark') {
      thunderSound.current.play();

      const tl = gsap.timeline({
        onComplete: () => {
          setTransitionState('idle');
          ctx.clearRect(0, 0, W, H);
        }
      });

      // Darken sky
      let overlay = { alpha: 0 };
      tl.to(overlay, { 
        alpha: 0.9, 
        duration: 0.5, 
        onUpdate: () => {
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = `rgba(10, 15, 30, ${overlay.alpha})`;
          ctx.fillRect(0, 0, W, H);
        } 
      });

      const drawLightningBolt = () => {
        ctx.beginPath();
        let x = W * (0.2 + Math.random() * 0.6);
        let y = 0;
        ctx.moveTo(x, y);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.random() * 4 + 2;
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#38bdf8';
        
        while (y < H) {
          let nextX = x + (Math.random() - 0.5) * 200;
          let nextY = y + Math.random() * 100 + 30;
          ctx.lineTo(nextX, nextY);
          
          // Branching logic
          if (Math.random() > 0.6) {
            let bx = nextX;
            let by = nextY;
            ctx.moveTo(bx, by);
            for(let i=0; i<5; i++) {
              bx += (Math.random() - 0.5) * 150;
              by += Math.random() * 80 + 20;
              ctx.lineTo(bx, by);
            }
            ctx.moveTo(nextX, nextY); // Return to main path
          }
          x = nextX;
          y = nextY;
        }
        ctx.stroke();
      };

      // Strobe 1: Initial crack
      tl.call(() => {
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.fillRect(0, 0, W, H);
        drawLightningBolt();
      });
      tl.to({}, { duration: 0.05 }); // Tiny pause to hold the flash
      
      // Blackout
      tl.call(() => {
        ctx.fillStyle = `rgba(10, 15, 30, 0.95)`;
        ctx.fillRect(0, 0, W, H);
      });
      tl.to({}, { duration: 0.1 }); // Pause in darkness

      // Strobe 2: Massive multi-strike
      tl.call(() => {
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.fillRect(0, 0, W, H);
        drawLightningBolt();
        drawLightningBolt(); // Second concurrent bolt
        
        // Commit CSS theme change instantly on the biggest flash
        commitThemeChange('dark');
      });
      tl.to({}, { duration: 0.08 }); // Hold the massive flash slightly longer

      // Fade out to reveal new dark theme with ambient particles
      let flash = { alpha: 1 };
      tl.to(flash, {
        alpha: 0,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: () => {
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = `rgba(10, 15, 30, ${flash.alpha})`;
          ctx.fillRect(0, 0, W, H);

          // Render subtle blue/purple particles fading out
          for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            const px = Math.random() * W;
            const py = Math.random() * H;
            ctx.arc(px, py, Math.random() * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${flash.alpha * Math.random()})`;
            ctx.fill();
          }
        }
      });

    } else if (transitionState === 'to-light') {
      chimeSound.current.play();

      const tl = gsap.timeline({
        onComplete: () => {
          // Change to light mode when screen is completely covered
          commitThemeChange('light');
          setTransitionState('idle');
          ctx.clearRect(0, 0, W, H);
        }
      });

      // Smooth light expansion from center
      let sun = { radius: 0 };
      const maxRadius = Math.sqrt(Math.pow(W/2, 2) + Math.pow(H/2, 2)) * 1.2;
      
      // Initialize some burst particles
      let particles = [];
      for(let i=0; i<40; i++) {
        particles.push({
          x: W/2,
          y: H/2,
          vx: (Math.random() - 0.5) * 15,
          vy: (Math.random() - 0.5) * 15,
          size: Math.random() * 4 + 1
        });
      }

      tl.to(sun, {
        radius: maxRadius,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          ctx.clearRect(0, 0, W, H);
          
          let gradient = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, sun.radius);
          gradient.addColorStop(0, '#F5F5F0'); // Match exactly the light theme bg
          gradient.addColorStop(0.8, '#F5F5F0');
          gradient.addColorStop(0.95, 'rgba(255, 255, 255, 1)'); // Bright leading edge
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(W/2, H/2, sun.radius, 0, Math.PI * 2);
          ctx.fill();

          // Draw particles bursting
          const progress = sun.radius / maxRadius;
          for(let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255, 215, 0, ${1 - progress})`;
            ctx.fill();
          }
        }
      });
    }

  }, [transitionState, commitThemeChange, setTransitionState]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-[99999] transition-opacity duration-300 ${transitionState === 'idle' ? 'opacity-0' : 'opacity-100'}`}
    />
  );
}
