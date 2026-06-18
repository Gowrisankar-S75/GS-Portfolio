import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Howl } from 'howler';
import { X, Code2, Database, Globe } from 'lucide-react';
import profileImg from '../assets/17616.jpg';
import animeImg from '../assets/profile_anime.png';

const GLASS_BREAK_URL = 'https://actions.google.com/sounds/v1/impacts/crash.ogg';

export function CinematicProfileReveal({ onClose }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const glassSound = useRef(null);
  const animationFrame = useRef(null);

  const profileContainerRef = useRef(null);
  const animeWrapperRef = useRef(null);
  const animeImgRef = useRef(null);

  // Canvas State Variables
  const canvasState = useRef({
    showTypography: false,
    showTrails: false,
    imageX: window.innerWidth / 2,
    imageY: -1000,
    shards: [],
    typographyOffset: 0,
    particles: []
  });

  useEffect(() => {
    glassSound.current = new Howl({ 
      src: [GLASS_BREAK_URL], 
      volume: 1.0,
      html5: true // Force HTML5 audio to prevent autoplay blocking issues
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasState.current.imageY = window.innerHeight / 2;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { width: W, height: H } = canvas;
      const state = canvasState.current;

      // Draw background typography
      if (state.showTypography) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.font = 'bold 80px "Bebas Neue", sans-serif';
        if (W > 768) ctx.font = 'bold 120px "Bebas Neue", sans-serif';
        ctx.textAlign = 'left';
        state.typographyOffset -= 1;
        if (state.typographyOffset < -2000) state.typographyOffset = 0;
        
        const texts = ["BACKEND DEVELOPER", "MERN STACK DEVELOPER", "JAVA DEVELOPER", "OPEN SOURCE CONTRIBUTOR"];
        texts.forEach((text, i) => {
          const y = (i + 1) * (H / 5);
          ctx.fillText(text.repeat(10), state.typographyOffset + (i % 2 === 0 ? 0 : -500), y);
        });
      }

      // Draw speed trails
      if (state.showTrails) {
        ctx.beginPath();
        ctx.moveTo(state.imageX, state.imageY);
        ctx.lineTo(state.imageX, state.imageY - 600);
        ctx.strokeStyle = 'rgba(255, 87, 34, 0.5)'; // Accent color trail
        ctx.lineWidth = 8;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#FF5722';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(state.imageX - 30, state.imageY);
        ctx.lineTo(state.imageX - 30, state.imageY - 400);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(state.imageX + 30, state.imageY);
        ctx.lineTo(state.imageX + 30, state.imageY - 400);
        ctx.stroke();
      }

      // Draw Glass Shards
      if (state.shards.length > 0) {
        ctx.shadowBlur = 0;
        state.shards.forEach(shard => {
          if (shard.type === 'line') {
            ctx.beginPath();
            ctx.moveTo(shard.path[0].x, shard.path[0].y);
            for(let i=1; i<shard.path.length; i++) {
              ctx.lineTo(shard.path[i].x, shard.path[i].y);
            }
            ctx.strokeStyle = `rgba(255, 255, 255, ${shard.alpha})`;
            ctx.lineWidth = shard.thickness;
            ctx.stroke();
          } else if (shard.type === 'poly') {
            ctx.beginPath();
            ctx.moveTo(shard.path[0].x, shard.path[0].y);
            for(let i=1; i<shard.path.length; i++) {
              ctx.lineTo(shard.path[i].x, shard.path[i].y);
            }
            ctx.closePath();
            ctx.fillStyle = `rgba(200, 240, 255, ${shard.alpha})`;
            ctx.fill();
          } else if (shard.type === 'dust') {
            ctx.beginPath();
            ctx.arc(shard.x, shard.y, shard.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${shard.alpha})`;
            ctx.fill();
          }
          
          shard.alpha -= 0.003; // Fade over time
        });
        state.shards = state.shards.filter(s => s.alpha > 0);
      }

      // Draw Particles
      if (state.particles.length > 0) {
        state.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.01;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 87, 34, ${p.alpha})`; // Accent color
          ctx.fill();
        });
        state.particles = state.particles.filter(p => p.alpha > 0);
      }

      animationFrame.current = requestAnimationFrame(render);
    };
    render();

    // GSAP Timeline
    const tl = gsap.timeline();

    // 1. Fade in container with dark backdrop blur
    tl.fromTo(containerRef.current, 
      { opacity: 0, backdropFilter: 'blur(0px)' }, 
      { opacity: 1, backdropFilter: 'blur(16px)', duration: 0.3 }
    );

    // 2. Glowing Text
    tl.fromTo(textRef.current, 
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' }, 
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out" }
    );

    // 3. Start background typography
    tl.call(() => { canvasState.current.showTypography = true; });

    // 4. Image entrance with trails
    tl.call(() => { canvasState.current.showTrails = true; });
    
    // Animate the actual DOM image AND the canvas tracking state
    const isMobile = window.innerWidth < 768;
    tl.fromTo(profileContainerRef.current,
      { y: '-80vh', rotation: -1440, scale: 0.2, opacity: 0 },
      { y: '0vh', rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power4.in",
        onUpdate: function() {
          if (profileContainerRef.current) {
            const rect = profileContainerRef.current.getBoundingClientRect();
            canvasState.current.imageX = rect.left + rect.width / 2;
            canvasState.current.imageY = rect.top + rect.height / 2;
          }
        }
      }
    );

    // 5. Impact (Glass Break)
    tl.call(() => {
      canvasState.current.showTrails = false;
      glassSound.current.play();

      // Screen shake
      gsap.to(containerRef.current, {
        x: () => Math.random() * 20 - 10,
        y: () => Math.random() * 20 - 10,
        duration: 0.05,
        yoyo: true,
        repeat: 7,
        onComplete: () => gsap.set(containerRef.current, { x: 0, y: 0 })
      });

      // Generate realistic spiderweb glass shards
      const W = canvas.width;
      const H = canvas.height;
      const shards = [];
      const originX = W/2;
      const originY = H/2 - (isMobile ? 0 : 50); // Offset based on where image lands

      const numRadials = Math.floor(Math.random() * 8) + 14; // 14-22 major radial cracks
      const radials = [];

      for(let i=0; i<numRadials; i++) {
        const baseAngle = (Math.PI * 2 / numRadials) * i + (Math.random() * 0.5 - 0.25);
        let currentX = originX;
        let currentY = originY;
        const maxLen = Math.random() * 600 + 300;
        let dist = 0;
        let currentAngle = baseAngle;
        
        const path = [{x: currentX, y: currentY, dist: 0}];

        // Create jagged segments for the radial crack
        while (dist < maxLen) {
          const step = Math.random() * 40 + 20; // 20-60px segments
          currentAngle += (Math.random() - 0.5) * 0.3; // Slight direction change
          dist += step;
          currentX += Math.cos(currentAngle) * step;
          currentY += Math.sin(currentAngle) * step;
          path.push({x: currentX, y: currentY, dist});
        }
        radials.push({ path, baseAngle });
        
        shards.push({ type: 'line', path, alpha: Math.random() * 0.5 + 0.5, thickness: Math.random() * 2 + 1 });
      }

      // Add transverse (spiderweb) cracks
      for(let i=0; i<radials.length; i++) {
        const radA = radials[i].path;
        const radB = radials[(i+1) % radials.length].path;
        
        const numConnections = Math.floor(Math.random() * 5) + 3;
        for(let j=0; j<numConnections; j++) {
           const targetDist = Math.random() * 400 + 30; // Distance from center
           
           // Find nearest point on RadA and RadB
           const ptA = radA.find(p => p.dist > targetDist) || radA[radA.length-1];
           const ptB = radB.find(p => p.dist > targetDist) || radB[radB.length-1];
           
           if (ptA && ptB) {
             const cx = (ptA.x + ptB.x) / 2 + (Math.random()-0.5)*30;
             const cy = (ptA.y + ptB.y) / 2 + (Math.random()-0.5)*30;
             shards.push({
               type: 'line', 
               path: [ptA, {x: cx, y: cy}, ptB], 
               alpha: Math.random() * 0.5 + 0.3,
               thickness: Math.random() * 1.5 + 0.2
             });
             
             // Sub-fractures
             if (Math.random() > 0.5) {
               const cx2 = (ptA.x + cx) / 2 + (Math.random()-0.5)*15;
               const cy2 = (ptA.y + cy) / 2 + (Math.random()-0.5)*15;
               shards.push({
                 type: 'line',
                 path: [ptA, {x: cx2, y: cy2}, {x: cx, y: cy}],
                 alpha: Math.random() * 0.4 + 0.2,
                 thickness: 0.5
               });
             }

             // Glass refraction polygons
             if (Math.random() > 0.8) {
                shards.push({
                  type: 'poly',
                  path: [{x: originX, y: originY}, ptA, {x: cx, y: cy}, ptB],
                  alpha: Math.random() * 0.15 + 0.05
                });
             }
           }
        }
      }

      // Center impact dust
      for(let i=0; i<40; i++) {
        shards.push({
           type: 'dust',
           x: originX + (Math.random()-0.5)*80,
           y: originY + (Math.random()-0.5)*80,
           size: Math.random() * 4 + 1,
           alpha: Math.random() * 0.8 + 0.2
        });
      }

      canvasState.current.shards = shards;

      // Generate burst particles
      const particles = [];
      for(let i=0; i<50; i++) {
        particles.push({
          x: originX, y: originY,
          vx: (Math.random() - 0.5) * 30,
          vy: (Math.random() - 0.5) * 30,
          size: Math.random() * 5 + 1,
          alpha: 1
        });
      }
      canvasState.current.particles = particles;
    });

    // 6. Stop rotation, portrait transform
    tl.to(profileContainerRef.current, {
      scale: isMobile ? 1.2 : 1.5,
      y: isMobile ? '-15vh' : '-10vh',
      boxShadow: '0px 0px 50px rgba(255, 87, 34, 0.5)',
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Fade out background text
    tl.to(textRef.current, { opacity: 0, duration: 0.5 }, "-=0.8");

    // 7. Hero Card Reveal
    tl.fromTo(cardRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    return () => {
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener('resize', updateSize);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // Continuous subtle floating animation for the anime image
    const floatAnim = gsap.to(animeImgRef.current, {
      y: -5,
      x: 3,
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
    const btn = profileContainerRef.current;
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

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[101]" />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-[105] text-white/50 hover:text-white transition-colors"
      >
        <X size={40} />
      </button>

      {/* Glowing Background Text */}
      <h1 
        ref={textRef} 
        className="absolute text-5xl md:text-8xl font-display font-bold text-white tracking-widest z-[102] text-center px-4"
        style={{ textShadow: '0 0 40px rgba(255, 87, 34, 0.8)' }}
      >
        GOWRISANKAR
      </h1>

      {/* Animated Profile Image Container */}
      <div 
        ref={profileContainerRef}
        className="relative z-[103] cursor-none rounded-full"
        data-cursor="profile"
        style={{ opacity: 0 }} // Hidden initially
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[var(--accent-color)]">
          {/* Original Profile Image */}
          <img
            ref={imageRef}
            src={profileImg}
            alt="Gowrisankar"
            className="w-full h-full object-cover"
          />
          {/* Anime profile picture wrapper */}
          <div 
            ref={animeWrapperRef}
            className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
            style={{ clipPath: 'circle(0px at 50% 50%)' }}
          >
            {/* Anime profile picture */}
            <img 
              ref={animeImgRef}
              src={animeImg} 
              alt="Gowrisankar Anime" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div 
        ref={cardRef}
        className="absolute bottom-10 md:bottom-16 z-[104] bg-slate-900/50 backdrop-blur-xl border border-[var(--accent-color)]/30 p-6 md:p-8 rounded-3xl max-w-lg w-[90%] flex flex-col items-center shadow-[0_0_50px_rgba(255,87,34,0.15)]"
        style={{ opacity: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-wider mb-2">GOWRISANKAR</h2>
        <p className="text-[var(--accent-color)] font-semibold uppercase tracking-widest text-xs md:text-sm mb-6">Software Engineer</p>
        
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-4 text-slate-300">
            <Code2 className="text-[var(--accent-color)] flex-shrink-0" size={24} />
            <span className="text-sm md:text-base">Java • Spring Boot • MERN Stack</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Database className="text-[var(--accent-color)] flex-shrink-0" size={24} />
            <span className="text-sm md:text-base">PostgreSQL • MongoDB • Redis</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Globe className="text-[var(--accent-color)] flex-shrink-0" size={24} />
            <span className="text-sm md:text-base">Open Source Enthusiast</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
