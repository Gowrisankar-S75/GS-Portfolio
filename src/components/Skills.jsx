import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Backend Development",
    skills: ["Node.js", "Express", "Java", "Spring Boot", "RESTful APIs", "WebSockets", "gRPC"],
    bentoClass: "md:col-span-2 bg-[var(--dark-contrast)] text-[var(--dark-contrast-text)]",
    tagClass: "bg-white/10 hover:bg-[var(--accent-color)] hover:text-white border-white/10"
  },
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
    bentoClass: "md:col-span-1 bg-[var(--bg-secondary)] border-2 border-black/5 dark:border-white/5",
    tagClass: "bg-black/5 dark:bg-white/5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] border-transparent"
  },
  {
    title: "Tools & Practices",
    skills: ["Git", "Docker", "Jest", "Agile", "CI/CD", "GitHub Actions"],
    bentoClass: "md:col-span-1 bg-[var(--bg-secondary)] border-2 border-black/5 dark:border-white/5",
    tagClass: "bg-black/5 dark:bg-white/5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] border-transparent"
  },
  {
    title: "Databases & Cloud",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Hibernate", "Redis", "AWS"],
    bentoClass: "md:col-span-2 bg-[var(--accent-color)] text-white",
    tagClass: "bg-black/10 hover:bg-black hover:text-white border-transparent"
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-[var(--bg-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-wide text-[var(--text-primary)] mb-4">
            Technical Arsenal
          </h2>
          <div className="w-24 h-2 bg-[var(--accent-color)]"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } }
              }}
              whileHover={{ scale: 1.02 }}
              className={`p-8 md:p-10 rounded-none transition-transform duration-300 ${category.bentoClass}`}
            >
              <h3 className="text-3xl font-display uppercase tracking-widest mb-8">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className={`px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase border transition-colors duration-300 cursor-default ${category.tagClass}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
