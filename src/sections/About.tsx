"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Calendar } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const experiences = [
  {
    company: "Company Name",
    role: "Software Engineer",
    period: "Jan 2024 - Present",
    logo: "🏢",
  },
  {
    company: "Previous Company",
    role: "Software Engineer",
    period: "Nov 2022 - Jan 2024",
    logo: "💼",
  },
  {
    company: "Another Company",
    role: "Software Developer",
    period: "Feb 2022 - Nov 2022",
    logo: "🚀",
  },
];

const education = {
  school: "Your University",
  degree: "Bachelor of Computer Science",
  period: "2018 - 2023",
  logo: "🎓",
};

export default function About() {
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
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
                  <h3 className="text-2xl font-bold text-white">Your Name</h3>
                  <p className="text-cyan-400">Full Stack Developer</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>Your Location</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                I&apos;m a Software Engineer with{" "}
                <span className="text-white font-semibold">X years of experience</span>,
                currently working on building scalable systems and solving
                complex challenges across various products.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                I hold a{" "}
                <span className="text-white font-semibold">
                  Bachelor&apos;s degree in Computer Science
                </span>{" "}
                and I&apos;m passionate about exploring new technologies and
                building products that make a difference.
              </p>
            </SpotlightCard>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "X+", label: "Years Experience" },
                { value: "XX+", label: "Projects Completed" },
                { value: "XXX+", label: "GitHub Contributions" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
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
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Work Experience</h3>
              </div>
              
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-2xl">
                      {exp.logo}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{exp.company}</h4>
                      <p className="text-sm text-gray-400">{exp.role}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
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
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-2xl">
                  {education.logo}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{education.school}</h4>
                  <p className="text-sm text-gray-400">{education.degree}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
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
