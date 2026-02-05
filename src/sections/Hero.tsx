"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export default function Hero() {
  const { personalInfo, socialLinks } = PORTFOLIO_DATA;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Badge */}
        {personalInfo.availableForWork && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-300">Available for opportunities</span>
          </motion.div>
        )}

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-lg md:text-xl text-gray-400 mb-2 font-light tracking-wide">
            Hello World, I&apos;m
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text">
            {personalInfo.name}
          </h1>
        </motion.div>

        {/* Role Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6"
        >
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium">
            {personalInfo.role}
          </span>
        </motion.div>

        {/* Subtitle/Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="#projects"
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
          >
            View My Work
          </Link>
          <Link
            href="#contact"
            className="group px-8 py-4 glass rounded-full font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:scale-105 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.find(s => s.platform === "GitHub") && (
            <Link
              href={socialLinks.find(s => s.platform === "GitHub")?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
          )}
          {socialLinks.find(s => s.platform === "LinkedIn") && (
            <Link
              href={socialLinks.find(s => s.platform === "LinkedIn")?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          )}
          <Link
            href={`mailto:${personalInfo.email}`}
            className="p-3 glass rounded-full text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
            aria-label="Resume"
          >
            <FileText className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
