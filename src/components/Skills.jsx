import { motion } from 'framer-motion';

import { FaNodeJs, FaJava, FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaDocker, FaAws, FaServer, FaInfinity, FaSync } from 'react-icons/fa';
import { SiExpress, SiSpringboot, SiTailwindcss, SiJest, SiGithubactions, SiMysql, SiPostgresql, SiMongodb, SiHibernate, SiRedis, SiJavascript, SiSocketdotio } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const skillCategories = [
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: <FaNodeJs size={18} /> },
      { name: "Express", icon: <SiExpress size={18} /> },
      { name: "Java", icon: <FaJava size={18} /> },
      { name: "Spring Boot", icon: <SiSpringboot size={18} /> },
      { name: "RESTful APIs", icon: <TbApi size={18} /> },
      { name: "WebSockets", icon: <SiSocketdotio size={18} /> },
      { name: "gRPC", icon: <FaServer size={18} /> }
    ],
    bentoClass: "md:col-span-2 bg-[var(--dark-contrast)] text-[var(--dark-contrast-text)]",
    tagClass: "bg-white/10 hover:bg-[var(--accent-color)] hover:text-white border-white/10"
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: <FaHtml5 size={18} /> },
      { name: "CSS", icon: <FaCss3Alt size={18} /> },
      { name: "JavaScript", icon: <SiJavascript size={18} /> },
      { name: "React.js", icon: <FaReact size={18} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={18} /> }
    ],
    bentoClass: "md:col-span-1 bg-[var(--bg-secondary)] border-2 border-black/5 dark:border-white/5",
    tagClass: "bg-black/5 dark:bg-white/5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] border-transparent"
  },
  {
    title: "Tools & Practices",
    skills: [
      { name: "Git", icon: <FaGitAlt size={18} /> },
      { name: "Docker", icon: <FaDocker size={18} /> },
      { name: "Jest", icon: <SiJest size={18} /> },
      { name: "Agile", icon: <FaSync size={18} /> },
      { name: "CI/CD", icon: <FaInfinity size={18} /> },
      { name: "GitHub Actions", icon: <SiGithubactions size={18} /> }
    ],
    bentoClass: "md:col-span-1 bg-[var(--bg-secondary)] border-2 border-black/5 dark:border-white/5",
    tagClass: "bg-black/5 dark:bg-white/5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] border-transparent"
  },
  {
    title: "Databases & Cloud",
    skills: [
      { name: "MySQL", icon: <SiMysql size={18} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
      { name: "MongoDB", icon: <SiMongodb size={18} /> },
      { name: "Hibernate", icon: <SiHibernate size={18} /> },
      { name: "Redis", icon: <SiRedis size={18} /> },
      { name: "AWS", icon: <FaAws size={18} /> }
    ],
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
              className={`p-8 md:p-10 rounded-2xl transition-transform duration-300 ${category.bentoClass}`}
            >
              <h3 className="text-3xl font-display uppercase tracking-widest mb-8">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => (
                  <span
                    key={skill.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold tracking-wider uppercase border transition-colors duration-300 cursor-default ${category.tagClass}`}
                  >
                    {skill.icon}
                    {skill.name}
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
