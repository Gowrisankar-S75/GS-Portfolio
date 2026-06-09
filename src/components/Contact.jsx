import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="relative pt-32 pb-10 bg-[var(--dark-contrast)] text-[var(--dark-contrast-text)] overflow-hidden rounded-t-[3rem] mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Massive Typography CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <p className="text-[var(--accent-color)] font-bold tracking-widest uppercase mb-6 text-sm">
            Have a project in mind?
          </p>
          <h2 className="text-[10vw] sm:text-[8rem] md:text-[10rem] font-display leading-none uppercase tracking-normal mb-8 hover:text-[var(--accent-color)] transition-colors duration-500 cursor-default">
            LET'S BUILD<br />SOMETHING.
          </h2>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:hello@gowrisankar.dev"
            className="group flex items-center justify-between px-10 py-5 bg-[var(--accent-color)] text-white rounded-full font-bold tracking-widest uppercase hover:bg-white hover:text-[var(--dark-contrast)] transition-colors duration-300 shadow-xl shadow-[var(--accent-color)]/20"
          >
            <span>hello@gowrisankar.dev</span>
            <span className="ml-6 p-2 border border-current rounded-full group-hover:bg-[var(--dark-contrast)] group-hover:text-white group-hover:border-transparent transition-colors duration-300">
              <ArrowUpRight size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
          </motion.a>
        </motion.div>

        {/* 4-Column Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-16 border-t border-white/10">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display uppercase tracking-widest mb-6">Gowrisankar</h3>
            <p className="text-white/60 font-light max-w-sm leading-relaxed mb-6">
              A software engineer dedicated to crafting premium, robust, and scalable digital experiences. Let's create the future together.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Socials</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group flex items-center gap-3 text-white/80 hover:text-[var(--accent-color)] transition-colors font-medium">
                  <span className="p-1.5 border border-white/20 rounded-full group-hover:border-[var(--accent-color)] transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 text-white/80 hover:text-[var(--accent-color)] transition-colors font-medium">
                  <span className="p-1.5 border border-white/20 rounded-full group-hover:border-[var(--accent-color)] transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 text-white/80 hover:text-[var(--accent-color)] transition-colors font-medium">
                  <span className="p-1.5 border border-white/20 rounded-full group-hover:border-[var(--accent-color)] transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Location</h4>
            <p className="text-white/80 font-medium leading-relaxed">
              Based in India,<br />
              Available for remote work worldwide.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-sm font-bold tracking-widest uppercase text-white/40">
          <p>&copy; {year} GOWRISANKAR. ALL RIGHTS RESERVED.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-2">
            Built with <span className="text-[var(--accent-color)]">React</span> & Tailwind
          </p>
        </div>
      </div>
    </section>
  );
}
