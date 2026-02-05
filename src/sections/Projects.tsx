"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import Link from "next/link";

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
    title: "Developer Job Portal",
    description:
      "Job portal for companies looking to hire developers. Filter by experience, location and skills. Companies can subscribe to message developers and view their information.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Project Management App",
    description:
      "Full-featured project management application with real-time updates and team collaboration.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce solution with payment integration and inventory management.",
    tags: ["Next.js", "Stripe", "Prisma"],
    github: "https://github.com",
    live: "https://example.com",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Real-time Chat App",
    description:
      "WebSocket-based chat application with end-to-end encryption and file sharing.",
    tags: ["TypeScript", "Socket.io", "Redis"],
    github: "https://github.com",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "AI Content Generator",
    description:
      "AI-powered content generation tool using GPT models for marketing copy.",
    tags: ["Python", "FastAPI", "OpenAI"],
    github: "https://github.com",
    live: "https://example.com",
    span: "lg:col-span-1 lg:row-span-1",
  },
];

export default function Projects() {
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
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
                  ? "rgba(168, 85, 247, 0.15)"
                  : "rgba(0, 212, 255, 0.15)"
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
                  <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-50">🚀</div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
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
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
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
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-gray-300 hover:text-white hover:border-cyan-500/30 transition-all duration-300"
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
