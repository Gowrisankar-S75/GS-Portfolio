import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const experience = [
  {
    role: "Solution Engineer",
    company: "GammaStack",
    link: "https://www.gammastack.com",
    period: "Mar 2026 - Present",
    desc: [
      "Working on JavaScript-based technologies to develop and support scalable business solutions.",
      "Collaborating with cross-functional teams to deliver client-focused applications and features.",
      "Building and maintaining web applications while improving performance and user experience.",
      "Expanding expertise from Java/Spring Boot to the modern JavaScript ecosystem and full-stack development."
    ]
  },
  {
    role: "Software Development Intern",
    company: "Tap Academy",
    link: "https://thetapacademy.com",
    period: "Jun 2025 - Dec 2025",
    desc: [
      "Built and enhanced real-world software applications under mentor guidance.",
      "Gained hands-on experience in Java, Spring Boot, and Full-Stack Development.",
      "Applied Object-Oriented Programming principles and wrote clean, maintainable code.",
      "Participated in debugging, code reviews, and performance optimization."
    ]
  }
];

const education = [
  {
    degree: "Bachelor of Technology (B.Tech) in Artificial Intelligence and Data Science",
    school: "Bannari Amman Institute of Technology",
    link: "https://www.bitsathy.ac.in/department/artificial-intelligence-and-data-science/",
    period: "Nov 2021 - May 2025",
    location: "Sathyamangalam, Tamil Nadu",
    cgpa: "CGPA: 7",
    desc: [
      "Built a strong foundation in Artificial Intelligence, Machine Learning, Data Structures, Algorithms, Database Management Systems, and Software Engineering.",
      "Worked on academic and personal projects involving web development, backend development, and problem-solving.",
      "Developed analytical thinking and programming skills through hands-on coursework and project-based learning."
    ]
  },
  {
    degree: "Higher Secondary Education (Computer Science)",
    school: "Government Higher Secondary School, Seripalayam",
    link: "https://www.google.com/maps/place/Govt.+Hr.+Sec.+School/@10.7885094,77.0899529,811m/data=!3m1!1e3!4m6!3m5!1s0x3ba8494e2ecb765d:0x4738e662fdfef27a!8m2!3d10.7900969!4d77.0906623!16s%2Fg%2F11b6llzjcp?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
    period: "Jun 2020 - Mar 2021",
    location: "Coimbatore, Tamil Nadu",
    cgpa: "Score: 75%",
    desc: [
      "Studied Computer Science fundamentals, including programming concepts, computer applications, and logical problem-solving.",
      "Developed an early interest in technology and software development, which laid the foundation for pursuing engineering in Artificial Intelligence and Data Science."
    ]
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
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 decoration-[var(--accent-color)] transition-all duration-300">
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </span>
                  {Array.isArray(item.desc) ? (
                    <ul className="list-disc list-outside ml-4 text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed space-y-2">
                      {item.desc.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  )}
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
                  <span className="text-sm font-bold tracking-widest uppercase text-[var(--text-secondary)] block mb-1">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 decoration-[var(--accent-color)] transition-all duration-300">
                        {item.school}
                      </a>
                    ) : (
                      item.school
                    )}
                  </span>
                  {(item.location || item.cgpa) && (
                    <span className="text-xs font-semibold tracking-wider text-[var(--text-secondary)]/70 block mb-4 mt-1">
                      {item.location && <span>📍 {item.location}</span>}
                      {item.location && item.cgpa && <span className="mx-2">|</span>}
                      {item.cgpa && <span>{item.cgpa}</span>}
                    </span>
                  )}
                  {Array.isArray(item.desc) ? (
                    <ul className="list-disc list-outside ml-4 text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed space-y-2">
                      {item.desc.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
