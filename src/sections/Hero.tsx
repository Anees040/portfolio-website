"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText, Download } from "lucide-react";
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
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32"
    >
      {/* Main Content - Split Screen Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Availability Badge */}
            {personalInfo.availableForWork && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs ${
                  safeTheme === 'dark'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-green-50 border border-green-200 text-green-600'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Open to opportunities</span>
              </motion.div>
            )}

            {/* Greeting & Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-4"
            >
              <p className={`text-base md:text-lg mb-3 font-light tracking-wide ${
                safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-500'
              }`}>
                Hello World, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight">
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
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                safeTheme === 'dark'
                  ? 'bg-white/5 border border-white/10 text-cyan-400'
                  : 'bg-blue-50 border border-blue-200 text-blue-600'
              }`}>
                {personalInfo.role}
              </span>
            </motion.div>

            {/* Tagline/Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className={`text-base md:text-lg mb-8 max-w-lg font-light leading-relaxed ${
                safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-600'
              }`}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8"
            >
              <Link
                href="#projects"
                className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                  safeTheme === 'dark'
                    ? 'glass text-white hover:bg-white/10'
                    : 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 shadow-sm'
                }`}
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              {socialLinks.find(s => s.platform === "GitHub") && (
                <Link
                  href={socialLinks.find(s => s.platform === "GitHub")?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    safeTheme === 'dark'
                      ? 'glass text-gray-400 hover:text-white hover:border-cyan-500/50'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-blue-300 shadow-sm'
                  }`}
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
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    safeTheme === 'dark'
                      ? 'glass text-gray-400 hover:text-white hover:border-cyan-500/50'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-blue-300 shadow-sm'
                  }`}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              )}
              <Link
                href={`mailto:${personalInfo.email}`}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  safeTheme === 'dark'
                    ? 'glass text-gray-400 hover:text-white hover:border-cyan-500/50'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-blue-300 shadow-sm'
                }`}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  safeTheme === 'dark'
                    ? 'glass text-gray-400 hover:text-white hover:border-cyan-500/50'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-blue-300 shadow-sm'
                }`}
                aria-label="Resume"
              >
                <FileText className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Gradient glow behind image */}
              <div className={`absolute -inset-4 rounded-[2rem] blur-2xl opacity-60 ${
                safeTheme === 'dark'
                  ? 'bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-pink-500/30'
                  : 'bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20'
              }`} />
              
              {/* Image container - blob/soft square shape */}
              <div className={`relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2rem] overflow-hidden ${
                safeTheme === 'dark'
                  ? 'border-2 border-white/10 shadow-2xl shadow-cyan-500/10'
                  : 'border-2 border-zinc-200 shadow-2xl shadow-zinc-300/50'
              }`}>
                {/* Gradient border overlay */}
                <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 opacity-50 pointer-events-none" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
                
                {/* Profile Image */}
                <Image
                  src="/profile.jpg"
                  alt={personalInfo.name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`absolute -top-6 -right-6 w-12 h-12 rounded-full ${
                  safeTheme === 'dark'
                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20'
                    : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20'
                }`}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className={`absolute -bottom-4 -left-4 w-8 h-8 rounded-full ${
                  safeTheme === 'dark'
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20'
                    : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`flex flex-col items-center gap-2 ${
            safeTheme === 'dark' ? 'text-gray-500' : 'text-zinc-400'
          }`}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
