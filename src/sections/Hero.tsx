"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-300">Available for opportunities</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-white">Hello World, I&apos;m</span>
          <br />
          <span className="gradient-text">Your Name</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Full Stack Developer crafting elegant solutions with modern web technologies.
          <br className="hidden md:block" />
          Transforming ideas into scalable, performant applications.
        </motion.p>

        {/* Code block decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-96"
        >
          <div className="glass rounded-xl p-4 text-left font-mono text-sm">
            <div className="text-purple-400">const developer = {"{"}</div>
            <div className="ml-4">
              <span className="text-cyan-400">name:</span>{" "}
              <span className="text-green-400">&quot;Your Name&quot;</span>,
            </div>
            <div className="ml-4">
              <span className="text-cyan-400">role:</span>{" "}
              <span className="text-green-400">&quot;Full Stack Developer&quot;</span>,
            </div>
            <div className="ml-4">
              <span className="text-cyan-400">skills:</span> [
              <span className="text-yellow-400">&quot;TypeScript&quot;</span>,{" "}
              <span className="text-yellow-400">&quot;React&quot;</span>,{" "}
              <span className="text-yellow-400">&quot;Node.js&quot;</span>],
            </div>
            <div className="ml-4">
              <span className="text-cyan-400">passion:</span>{" "}
              <span className="text-green-400">&quot;Building amazing experiences&quot;</span>
            </div>
            <div className="text-purple-400">{"}"}</div>
          </div>
        </motion.div>

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
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:your@email.com", label: "Email" },
            { icon: FileText, href: "/resume.pdf", label: "Resume" },
          ].map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
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
