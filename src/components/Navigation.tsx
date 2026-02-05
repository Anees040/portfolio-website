"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Code2, Mail, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  
  // Safe theme fallback for SSR
  const safeTheme = theme || "dark";

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for blur effect (0 to 1, maxes at 200px scroll)
      const progress = Math.min(window.scrollY / 200, 1);
      setScrollProgress(progress);

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

  // Dynamic styles based on scroll
  const blurAmount = 8 + scrollProgress * 12; // 8px to 20px
  const bgOpacity = 0.5 + scrollProgress * 0.3; // 0.5 to 0.8
  const borderOpacity = 0.1 + scrollProgress * 0.1; // 0.1 to 0.2

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        style={{
          top: scrollProgress > 0.5 ? "8px" : "16px",
          transition: "top 0.3s ease",
        }}
      >
        <div
          className="rounded-full px-2 py-2 transition-all duration-300"
          style={{
            backgroundColor: safeTheme === 'dark' 
              ? `rgba(17, 17, 17, ${bgOpacity})`
              : `rgba(255, 255, 255, ${bgOpacity})`,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            border: `1px solid ${safeTheme === 'dark' 
              ? `rgba(255, 255, 255, ${borderOpacity})`
              : `rgba(0, 0, 0, ${borderOpacity})`}`,
          }}
        >
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.href.substring(1)
                      ? safeTheme === 'dark' ? "text-white" : "text-gray-900"
                      : safeTheme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-full border ${
                        safeTheme === 'dark'
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30"
                          : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </li>
            ))}
            
            {/* Theme Toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className={`relative p-2 rounded-full transition-all duration-300 ${
                  safeTheme === 'dark' 
                    ? "text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10" 
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-600/10"
                }`}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: safeTheme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {safeTheme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.div>
              </button>
            </li>
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <div className="fixed top-4 right-4 z-50 md:hidden flex items-center gap-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={toggleTheme}
          className="p-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor: safeTheme === 'dark' 
              ? `rgba(17, 17, 17, 0.7)`
              : `rgba(255, 255, 255, 0.7)`,
            backdropFilter: "blur(12px)",
            border: `1px solid ${safeTheme === 'dark' 
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"}`,
          }}
          aria-label="Toggle theme"
        >
          {safeTheme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor: safeTheme === 'dark' 
              ? `rgba(17, 17, 17, 0.7)`
              : `rgba(255, 255, 255, 0.7)`,
            backdropFilter: "blur(12px)",
            border: `1px solid ${safeTheme === 'dark' 
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"}`,
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={`w-6 h-6 ${safeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${safeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-64 z-40 md:hidden"
            style={{
              backgroundColor: safeTheme === 'dark' 
                ? "rgba(17, 17, 17, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              borderLeft: `1px solid ${safeTheme === 'dark' 
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"}`,
            }}
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
                          ? safeTheme === 'dark'
                            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30"
                            : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-900 border border-blue-500/20"
                          : safeTheme === 'dark'
                            ? "text-gray-400 hover:text-white hover:bg-white/5"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
