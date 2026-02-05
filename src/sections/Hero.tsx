"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { useTheme } from "@/components/ThemeProvider";

export default function Hero() {
  const { personalInfo, socialLinks } = PORTFOLIO_DATA;
  const { theme } = useTheme();
  
  // Safe theme fallback for SSR
  const safeTheme = theme || "dark";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 ${
            safeTheme === 'dark' ? 'border-cyan-500/30' : 'border-blue-500/30'
          } shadow-lg ${
            safeTheme === 'dark' ? 'shadow-cyan-500/20' : 'shadow-blue-500/20'
          }`}>
            {/* Replace src with your actual profile image */}
            <div className={`w-full h-full flex items-center justify-center text-4xl ${
              safeTheme === 'dark' ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
            }`}>
              <span>👨‍💻</span>
            </div>
            {/* Uncomment when you have a profile image:
            <Image
              src="/profile.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
              priority
            />
            */}
          </div>
        </motion.div>

        {/* Availability Badge - Subtle */}
        {personalInfo.availableForWork && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs ${
              safeTheme === 'dark'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-green-500/10 border border-green-500/20 text-green-600'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Open to opportunities</span>
          </motion.div>
        )}

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-4"
        >
          <p className={`text-base md:text-lg mb-2 font-light tracking-wide ${
            safeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            safeTheme === 'dark'
              ? 'bg-white/5 border border-white/10 text-cyan-400'
              : 'bg-blue-500/10 border border-blue-500/20 text-blue-600'
          }`}>
            {personalInfo.role}
          </span>
        </motion.div>

        {/* Subtitle/Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed ${
            safeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
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
