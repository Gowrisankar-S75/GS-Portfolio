import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Decorative accent element */}
      <div className="absolute top-0 right-0 w-[40vw] h-screen bg-[var(--dark-contrast)] hidden lg:block z-0 transform origin-top-right skew-x-[-10deg] opacity-5 dark:opacity-50"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column - Massive Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block px-4 py-1 border-2 border-[var(--text-primary)] rounded-full text-sm font-bold tracking-widest uppercase">
                Software Engineer
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[12vw] sm:text-8xl md:text-9xl font-display leading-[0.85] tracking-normal uppercase text-[var(--text-primary)] mb-6"
            >
              BUILDING<br />
              <span className="text-[var(--accent-color)]">DIGITAL</span><br />
              REALITIES
            </motion.h1>
          </div>

          {/* Right Column - Details and CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-10 lg:border-l-2 lg:border-[var(--text-primary)]/10">
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 leading-relaxed font-light"
            >
              I am Gowrisankar, a developer specializing in crafting scalable, reliable, and premium digital platforms. Let's create something extraordinary.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group flex items-center justify-between px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-color)] rounded-full sm:rounded-none font-bold tracking-widest uppercase hover:bg-[var(--accent-color)] transition-colors duration-300"
              >
                <span>View Work</span>
                <span className="ml-4 p-1.5 border border-current rounded-full group-hover:bg-white group-hover:text-[var(--accent-color)] transition-colors duration-300">
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/GOWRISANKAR_SDE.pdf"
                className="flex items-center justify-center px-8 py-4 border-2 border-[var(--text-primary)] text-[var(--text-primary)] rounded-full sm:rounded-none font-bold tracking-widest uppercase hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-colors duration-300"
              >
                <Download size={20} className="mr-3" />
                Resume
              </motion.a>
            </motion.div>

            {/* Quick Stats or Tags */}
            <motion.div variants={itemVariants} className="mt-16 flex gap-8">
              <div>
                <p className="text-4xl font-display text-[var(--accent-color)]">1+</p>
                <p className="text-sm tracking-widest uppercase text-[var(--text-secondary)] font-bold mt-1">Years Exp</p>
              </div>
              <div>
                <p className="text-4xl font-display text-[var(--accent-color)]">10+</p>
                <p className="text-sm tracking-widest uppercase text-[var(--text-secondary)] font-bold mt-1">Projects</p>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

