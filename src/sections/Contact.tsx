"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { useTheme } from "@/components/ThemeProvider";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { personalInfo, socialLinks } = PORTFOLIO_DATA;
  const { theme } = useTheme();
  
  // Safe theme fallback for SSR
  const safeTheme = theme || "dark";
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStatus("submitting");
    
    try {
      // Using Formspree for form submission - replace YOUR_FORMSPREE_ID with your actual Formspree form ID
      // Sign up at https://formspree.io and create a form to get your ID
      const response = await fetch(`https://formspree.io/f/YOUR_FORMSPREE_ID`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setStatus("error");
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl transition-all ${
    safeTheme === 'dark'
      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50'
      : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50'
  } focus:outline-none`;

  const labelClass = `block text-sm font-medium mb-2 ${
    safeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

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
          <p className={`max-w-2xl mx-auto ${safeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
              <h3 className={`text-xl font-bold mb-6 ${safeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Let&apos;s work together
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    safeTheme === 'dark'
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20'
                      : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                  }`}>
                    <Mail className={`w-5 h-5 ${safeTheme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${safeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                    <Link
                      href={`mailto:${personalInfo.email}`}
                      className={`transition-colors ${
                        safeTheme === 'dark' ? 'text-white hover:text-cyan-400' : 'text-gray-900 hover:text-blue-500'
                      }`}
                    >
                      {personalInfo.email}
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    safeTheme === 'dark'
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20'
                      : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                  }`}>
                    <MapPin className={`w-5 h-5 ${safeTheme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${safeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                    <p className={safeTheme === 'dark' ? 'text-white' : 'text-gray-900'}>{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={`mt-8 pt-6 border-t ${safeTheme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                <p className={`text-sm mb-4 ${safeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Connect with me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                        safeTheme === 'dark'
                          ? 'glass text-gray-400 hover:text-cyan-400'
                          : 'bg-gray-100 text-gray-500 hover:text-blue-500 hover:bg-gray-200'
                      }`}
                      aria-label={social.platform}
                    >
                      {social.platform === "GitHub" && <Github className="w-5 h-5" />}
                      {social.platform === "LinkedIn" && <Linkedin className="w-5 h-5" />}
                    </Link>
                  ))}
                  <Link
                    href={`mailto:${personalInfo.email}`}
                    className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                      safeTheme === 'dark'
                        ? 'glass text-gray-400 hover:text-purple-400'
                        : 'bg-gray-100 text-gray-500 hover:text-purple-500 hover:bg-gray-200'
                    }`}
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </Link>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.name ? 'border-red-500/50' : ''}`}
                    placeholder="Your name"
                    disabled={status === "submitting"}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.email ? 'border-red-500/50' : ''}`}
                    placeholder="your@email.com"
                    disabled={status === "submitting"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    placeholder="Tell me about your project..."
                    disabled={status === "submitting"}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">Message sent successfully! I&apos;ll get back to you soon.</p>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">Failed to send message. Please try again or email me directly.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-center mt-16 pt-8 border-t ${safeTheme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}
        >
          <p className={`text-sm ${safeTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
