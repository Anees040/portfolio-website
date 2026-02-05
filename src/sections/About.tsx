"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Calendar } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { useTheme } from "@/components/ThemeProvider";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

const experiences = [
  {
    company: "Company Name",
    role: "Flutter Developer",
    period: "Jan 2024 - Present",
    logo: "🏢",
  },
  {
    company: "Previous Company",
    role: "Mobile Developer",
    period: "Nov 2022 - Jan 2024",
    logo: "💼",
  },
];

const education = {
  school: "Your University",
  degree: "Bachelor of Computer Science",
  period: "2018 - 2023",
  logo: "🎓",
};

export default function About() {
  const { theme } = useTheme();
  const safeTheme = theme || "dark";
  const { personalInfo } = PORTFOLIO_DATA;

  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-600'}`}>
            A passionate developer with a love for creating impactful solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <SpotlightCard className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-3xl">
                  👋
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {personalInfo.name}
                  </h3>
                  <p className={safeTheme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}>
                    {personalInfo.role}
                  </p>
                  <div className={`flex items-center gap-2 text-sm mt-1 ${safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-500'}`}>
                    <MapPin className="w-4 h-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>
              
              <p className={`leading-relaxed mb-4 ${safeTheme === 'dark' ? 'text-gray-300' : 'text-zinc-600'}`}>
                {personalInfo.bio}
              </p>
            </SpotlightCard>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "2+", label: "Years Experience" },
                { value: "15+", label: "Projects Completed" },
                { value: "200+", label: "GitHub Contributions" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-xl p-4 text-center ${
                    safeTheme === 'dark' 
                      ? 'glass' 
                      : 'bg-white border border-zinc-200 shadow-sm'
                  }`}
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className={`text-xs mt-1 ${safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-500'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience & Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Work Experience */}
            <SpotlightCard className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className={safeTheme === 'dark' ? 'w-5 h-5 text-cyan-400' : 'w-5 h-5 text-blue-600'} />
                <h3 className={`text-xl font-bold ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Work Experience
                </h3>
              </div>
              
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                      safeTheme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-zinc-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      safeTheme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-zinc-100'
                    }`}>
                      {exp.logo}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {exp.company}
                      </h4>
                      <p className={`text-sm ${safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-500'}`}>
                        {exp.role}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${safeTheme === 'dark' ? 'text-gray-500' : 'text-zinc-400'}`}>
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>

            {/* Education */}
            <SpotlightCard className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className={safeTheme === 'dark' ? 'w-5 h-5 text-purple-400' : 'w-5 h-5 text-purple-600'} />
                <h3 className={`text-xl font-bold ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Education
                </h3>
              </div>
              
              <div className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                safeTheme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-zinc-50'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  safeTheme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-zinc-100'
                }`}>
                  {education.logo}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${safeTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {education.school}
                  </h4>
                  <p className={`text-sm ${safeTheme === 'dark' ? 'text-gray-400' : 'text-zinc-500'}`}>
                    {education.degree}
                  </p>
                </div>
                <div className={`flex items-center gap-1 text-xs ${safeTheme === 'dark' ? 'text-gray-500' : 'text-zinc-400'}`}>
                  <Calendar className="w-3 h-3" />
                  {education.period}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
