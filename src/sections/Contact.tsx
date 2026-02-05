"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    color: "hover:text-cyan-400",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:your@email.com",
    color: "hover:text-purple-400",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let&apos;s connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <SpotlightCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Let&apos;s work together
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <Link
                      href="mailto:your@email.com"
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      your@email.com
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">Your City, Country</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 glass rounded-xl text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SpotlightCard className="p-6">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Your Name. Built with Next.js & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
