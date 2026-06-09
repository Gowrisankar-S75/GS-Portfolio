import { motion } from 'framer-motion';
import { ExternalLink, Code, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration, user authentication, and a modern admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full Stack"
  },
  {
    title: "Task Management App",
    description: "A collaborative project management tool featuring real-time updates, kanban boards, and team roles.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
    category: "Web App"
  },
  {
    title: "Fitness Tracker API",
    description: "A robust REST API for tracking workouts and nutrition, featuring comprehensive test coverage and documentation.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "Docker"],
    category: "Backend Services"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-[var(--bg-secondary)] transition-colors duration-300 border-t-2 border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-wide text-[var(--text-primary)] mb-4">
              Selected Works
            </h2>
            <div className="w-24 h-2 bg-[var(--accent-color)]"></div>
          </div>
          <p className="text-lg text-[var(--text-secondary)] max-w-md font-light">
            A curated selection of projects demonstrating my expertise in building robust, scalable applications.
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 40, damping: 20, delay: idx * 0.1 }}
              className="group relative bg-[var(--bg-color)] border-2 border-black/5 dark:border-white/5 flex flex-col md:flex-row overflow-hidden hover:border-[var(--text-primary)] transition-colors duration-500"
            >
              {/* Project Info Section */}
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-between z-10 bg-[var(--bg-color)]">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-[var(--text-primary)] text-[var(--bg-color)] text-xs font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <span className="text-[var(--text-secondary)] text-sm font-bold tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-[var(--text-primary)] mb-6 group-hover:text-[var(--accent-color)] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-lg text-[var(--text-secondary)] mb-8 font-light leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 border border-black/10 dark:border-white/10 text-[var(--text-secondary)] text-sm font-bold tracking-wider uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-6 mt-4">
                  <a href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
                    <Code size={18} /> Code
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </div>

              {/* Project Visual Section */}
              <div className="md:w-1/2 bg-[var(--dark-contrast)] min-h-[300px] md:min-h-full flex items-center justify-center relative overflow-hidden group-hover:bg-[var(--accent-color)] transition-colors duration-500">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4=')]"></div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="z-10 text-[var(--dark-contrast-text)] flex flex-col items-center opacity-50 group-hover:opacity-100 transition-opacity"
                >
                  <div className="p-8 border-2 border-current rounded-full mb-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <ArrowRight size={48} />
                  </div>
                  <span className="font-display text-2xl tracking-widest uppercase">Explore Project</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

