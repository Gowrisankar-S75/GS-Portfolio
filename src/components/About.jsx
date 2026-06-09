import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const experience = [
  {
    role: "Senior Full Stack Engineer",
    company: "Tech Corp",
    period: "2021 - Present",
    desc: "Led the development of scalable microservices, improving platform performance by 40%."
  },
  {
    role: "Software Developer",
    company: "Innovate Solutions",
    period: "2018 - 2021",
    desc: "Built responsive web applications and managed database migrations."
  }
];

const education = [
  {
    degree: "M.S. Computer Science",
    school: "University of Technology",
    period: "2016 - 2018",
    desc: "Focus on distributed systems and advanced algorithms."
  },
  {
    degree: "B.S. Information Technology",
    school: "State University",
    period: "2012 - 2016",
    desc: "Graduated with honors. Core focus on software engineering."
  }
];

export function About() {
  return (
    <section id="about" className="py-24 bg-[var(--bg-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-wide text-[var(--text-primary)] mb-4">
            Credentials
          </h2>
          <div className="w-24 h-2 bg-[var(--accent-color)] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-[var(--dark-contrast)] text-[var(--dark-contrast-text)] rounded-none">
                <Briefcase size={28} />
              </div>
              <h3 className="text-3xl font-display uppercase tracking-widest text-[var(--text-primary)]">
                Experience
              </h3>
            </div>
            
            <div className="space-y-12">
              {experience.map((item, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-black/10 dark:border-white/10 group hover:border-[var(--accent-color)] transition-colors duration-300">
                  <div className="absolute w-4 h-4 bg-[var(--bg-color)] border-2 border-[var(--accent-color)] rounded-full -left-[9px] top-1 group-hover:bg-[var(--accent-color)] transition-colors duration-300"></div>
                  <span className="text-sm font-bold tracking-widest uppercase text-[var(--accent-color)] block mb-2">
                    {item.period}
                  </span>
                  <h4 className="text-2xl font-display uppercase tracking-wider text-[var(--text-primary)] mb-1">
                    {item.role}
                  </h4>
                  <span className="text-sm font-bold tracking-widest uppercase text-[var(--text-secondary)] block mb-4">
                    {item.company}
                  </span>
                  <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-[var(--dark-contrast)] text-[var(--dark-contrast-text)] rounded-none">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-3xl font-display uppercase tracking-widest text-[var(--text-primary)]">
                Education
              </h3>
            </div>
            
            <div className="space-y-12">
              {education.map((item, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-black/10 dark:border-white/10 group hover:border-[var(--accent-color)] transition-colors duration-300">
                  <div className="absolute w-4 h-4 bg-[var(--bg-color)] border-2 border-[var(--accent-color)] rounded-full -left-[9px] top-1 group-hover:bg-[var(--accent-color)] transition-colors duration-300"></div>
                  <span className="text-sm font-bold tracking-widest uppercase text-[var(--accent-color)] block mb-2">
                    {item.period}
                  </span>
                  <h4 className="text-2xl font-display uppercase tracking-wider text-[var(--text-primary)] mb-1">
                    {item.degree}
                  </h4>
                  <span className="text-sm font-bold tracking-widest uppercase text-[var(--text-secondary)] block mb-4">
                    {item.school}
                  </span>
                  <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
