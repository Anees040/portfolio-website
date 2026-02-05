"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import { useTheme } from "@/components/ThemeProvider";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Mobile",
    skills: [
      { name: "Flutter", icon: "💙" },
      { name: "Dart", icon: "🎯" },
      { name: "Android", icon: "🤖" },
      { name: "iOS", icon: "🍎" },
      { name: "GetX", icon: "⚡" },
      { name: "Provider", icon: "📦" },
      { name: "BLoC", icon: "🧱" },
      { name: "Riverpod", icon: "🌊" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Firebase", icon: "🔥" },
      { name: "REST APIs", icon: "🔗" },
      { name: "Node.js", icon: "⬢" },
      { name: "Python", icon: "🐍" },
      { name: "MySQL", icon: "🐬" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Supabase", icon: "⚡" },
    ],
  },
  {
    name: "UI/UX",
    skills: [
      { name: "Material Design", icon: "🎨" },
      { name: "Cupertino", icon: "📱" },
      { name: "Animations", icon: "✨" },
      { name: "Responsive UI", icon: "📐" },
      { name: "Figma", icon: "🎯" },
      { name: "Custom Widgets", icon: "🔧" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "📦" },
      { name: "VS Code", icon: "💻" },
      { name: "Android Studio", icon: "🤖" },
      { name: "Xcode", icon: "🔨" },
      { name: "Postman", icon: "📮" },
      { name: "CI/CD", icon: "🔄" },
    ],
  },
  {
    name: "Practices",
    skills: [
      { name: "Clean Architecture", icon: "🏗️" },
      { name: "SOLID Principles", icon: "✅" },
      { name: "TDD", icon: "🧪" },
      { name: "Code Review", icon: "👀" },
      { name: "Agile/Scrum", icon: "📋" },
      { name: "Performance", icon: "⚡" },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { theme } = useTheme();
  const safeTheme = theme || "dark";

  return (
    <section id="skills" className="section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-600'}`}>
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === index
                  ? "text-white"
                  : safeTheme === 'dark' 
                    ? "text-gray-400 hover:text-white" 
                    : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {activeCategory === index && (
                <motion.span
                  layoutId="activeSkill"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <SpotlightCard className="p-4">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="text-3xl">{skill.icon}</span>
                    <span className={`text-sm font-medium ${safeTheme === 'dark' ? 'text-gray-300' : 'text-zinc-700'}`}>
                      {skill.name}
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
