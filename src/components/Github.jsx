import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code as GitIcon, Star, GitFork, BookOpen } from 'lucide-react';

export function Github() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data in case GitHub API rate limits or user has no repos
  const fallbackRepos = [
    { name: "Awesome-Project", description: "A really cool open source tool.", stargazers_count: 120, forks_count: 45, html_url: "#" },
    { name: "Portfolio-React", description: "My modern portfolio built with React 19.", stargazers_count: 35, forks_count: 12, html_url: "#" },
    { name: "CLI-Tool", description: "A fast CLI written in Go.", stargazers_count: 89, forks_count: 22, html_url: "#" }
  ];

  useEffect(() => {
    // In a real app, replace 'octocat' with your actual github username
    fetch('https://api.github.com/users/octocat/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos(fallbackRepos);
        }
        setLoading(false);
      })
      .catch(() => {
        setRepos(fallbackRepos);
        setLoading(false);
      });
  }, []);

  return (
    <section id="github" className="py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <GitIcon size={32} />
            GitHub Activity
          </h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.slice(0, 6).map((repo, idx) => (
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white dark:bg-[var(--card-bg)] border border-slate-200 dark:border-[var(--border-color)] p-6 rounded-2xl hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="text-indigo-500 mt-1" size={20} />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">{repo.name}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-gray-400 mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                  <span className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={16} /> {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
