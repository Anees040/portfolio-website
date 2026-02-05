"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Code2, Mail } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div className="glass rounded-full px-2 py-2">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.href.substring(1)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden glass p-3 rounded-full"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-64 z-40 md:hidden glass"
          >
            <nav className="flex flex-col h-full pt-20 px-6">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeSection === item.href.substring(1)
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
