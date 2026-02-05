"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  span?: string;
}

const projects: Project[] = [
  {
    title: "Flutter E-Commerce App",
    description:
      "Full-featured mobile e-commerce application with payment integration, cart management, and real-time order tracking.",
    tags: ["Flutter", "Dart", "Firebase", "Stripe"],
    github: "https://github.com/Anees040",
    live: "https://example.com",
    featured: true,
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Task Management App",
    description:
      "Cross-platform task and project management app with real-time sync and team collaboration features.",
    tags: ["Flutter", "GetX", "Firebase"],
    github: "https://github.com/Anees040",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Weather Forecast App",
    description:
      "Beautiful weather app with location-based forecasts, animated widgets, and multiple theme support.",
    tags: ["Flutter", "REST API", "Provider"],
    github: "https://github.com/Anees040",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Social Media App",
    description:
      "Instagram-like social app with stories, posts, likes, comments, and real-time messaging.",
    tags: ["Flutter", "Firebase", "BLoC"],
    github: "https://github.com/Anees040",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Crypto Portfolio Tracker",
    description:
      "Real-time cryptocurrency portfolio tracker with price alerts and detailed analytics.",
    tags: ["Flutter", "CoinGecko API", "Charts"],
    github: "https://github.com/Anees040",
    span: "lg:col-span-1 lg:row-span-1",
  },
];

export default function Projects() {
  const { theme } = useTheme();
  const safeTheme = theme || "dark";
  const { socialLinks } = PORTFOLIO_DATA;
  const githubUrl = socialLinks.find(s => s.platform === "GitHub")?.url || "https://github.com/Anees040";

  return (
    <section id="projects" className="section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-600'}`}>
            A showcase of my work, side projects, and experiments
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-fr">
          {projects.map((project, index) => (
            <SpotlightCard
              key={project.title}
              className={`group ${project.span || ""}`}
              spotlightColor={
                project.featured
                  ? safeTheme === 'dark' ? "rgba(168, 85, 247, 0.15)" : "rgba(124, 58, 237, 0.08)"
                  : safeTheme === 'dark' ? "rgba(0, 212, 255, 0.15)" : "rgba(37, 99, 235, 0.08)"
              }
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full p-6 flex flex-col"
              >
                {/* Project image placeholder */}
                {project.featured && (
                  <div className={`relative mb-6 rounded-xl overflow-hidden aspect-video ${
                    safeTheme === 'dark' 
                      ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10' 
                      : 'bg-gradient-to-br from-blue-500/5 to-purple-500/5'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-50">📱</div>
                    </div>
                    {/* Hover overlay */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      safeTheme === 'dark' 
                        ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent' 
                        : 'bg-gradient-to-t from-white/60 via-transparent to-transparent'
                    }`} />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className={`text-xl font-bold transition-colors ${
                      safeTheme === 'dark' 
                        ? 'text-white group-hover:text-cyan-400' 
                        : 'text-zinc-900 group-hover:text-blue-600'
                    }`}>
                      {project.title}
                    </h3>
                    <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ${
                      safeTheme === 'dark' 
                        ? 'text-gray-500 group-hover:text-cyan-400' 
                        : 'text-zinc-400 group-hover:text-blue-600'
                    }`} />
                  </div>
                  
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-md ${
                          safeTheme === 'dark' 
                            ? 'bg-white/5 text-gray-300 border border-white/10' 
                            : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className={`flex items-center gap-3 pt-4 border-t ${
                  safeTheme === 'dark' ? 'border-white/10' : 'border-zinc-200'
                }`}>
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        safeTheme === 'dark' 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </Link>
                  )}
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        safeTheme === 'dark' 
                          ? 'text-gray-400 hover:text-cyan-400' 
                          : 'text-zinc-500 hover:text-blue-600'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              safeTheme === 'dark' 
                ? 'glass text-gray-300 hover:text-white hover:border-cyan-500/30' 
                : 'bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:text-zinc-900 hover:border-blue-300'
            }`}
          >
            <Github className="w-5 h-5" />
            <span>View All on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
