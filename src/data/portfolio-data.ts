// Portfolio Data Configuration
// Fill in your personal information below

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  availableForWork: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  username?: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
  logo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  logo?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

// ============================================
// FILL IN YOUR INFORMATION BELOW
// ============================================

export const PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Muhammad Anees",
    role: "Flutter Developer",
    tagline: "Crafting beautiful cross-platform mobile experiences with Flutter & Dart",
    bio: "I'm a passionate Flutter Developer specializing in building high-performance, cross-platform mobile applications. With expertise in Flutter, Dart, Firebase, and Node.js backend services, I create seamless user experiences that work flawlessly on both iOS and Android.",
    location: "Pakistan",
    email: "aneesashfaq040@gmail.com",
    availableForWork: true,
  },

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/Anees040",
      username: "Anees040",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/muhammad-anees",
      username: "muhammad-anees",
    },
  ],

  skills: [
    {
      category: "Mobile Development",
      skills: [
        { name: "Flutter" },
        { name: "Dart" },
        { name: "iOS" },
        { name: "Android" },
        { name: "Responsive UI" },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js" },
        { name: "Express" },
        { name: "REST APIs" },
        { name: "Firebase" },
        { name: "Cloud Functions" },
      ],
    },
    {
      category: "Database",
      skills: [
        { name: "Firebase Firestore" },
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "SQLite" },
      ],
    },
    {
      category: "Tools & DevOps",
      skills: [
        { name: "Git & GitHub" },
        { name: "Firebase" },
        { name: "CI/CD" },
        { name: "App Store Deploy" },
        { name: "Play Store Deploy" },
      ],
    },
  ],

  projects: [
    {
      id: "project-1",
      title: "Flutter Mobile App",
      description: "A cross-platform mobile application built with Flutter showcasing modern UI/UX patterns and state management.",
      techStack: ["Flutter", "Dart", "Firebase", "Provider"],
      githubUrl: "https://github.com/Anees040/project1",
      featured: true,
      year: "2025",
    },
    {
      id: "project-2",
      title: "E-Commerce App",
      description: "Full-featured e-commerce mobile app with payment integration and real-time inventory updates.",
      techStack: ["Flutter", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/Anees040/project2",
      featured: true,
      year: "2024",
    },
    {
      id: "project-3",
      title: "Chat Application",
      description: "Real-time messaging app with Firebase backend and push notifications.",
      techStack: ["Flutter", "Firebase", "Cloud Messaging"],
      githubUrl: "https://github.com/Anees040/project3",
      featured: false,
      year: "2024",
    },
    // Add more projects as needed
  ],

  experience: [
    {
      company: "Company Name",
      role: "Flutter Developer",
      period: "Jan 2024 - Present",
      description: "Building cross-platform mobile applications with Flutter.",
      logo: "📱",
    },
    {
      company: "Previous Company",
      role: "Mobile Developer",
      period: "Jun 2022 - Dec 2023",
      description: "Developed and maintained Flutter applications.",
      logo: "💼",
    },
    // Add more experience entries
  ],

  education: [
    {
      institution: "Your University",
      degree: "Bachelor's",
      field: "Computer Science",
      period: "2018 - 2022",
      logo: "🎓",
    },
    // Add more education entries if needed
  ],
};

// ============================================
// INSTRUCTIONS
// ============================================
/*
1. Replace all placeholder values above with your actual information
2. For projects: Add screenshots to /public/projects/ folder
3. For skills: Add or remove skills based on your expertise
4. For experience: List your work history in reverse chronological order
5. For education: Include your degrees and certifications

WHAT I NEED FROM YOU:
- Your full name
- Your professional title/role
- A short bio (2-3 sentences)
- Your location
- Your email
- Social media URLs (GitHub, LinkedIn, Twitter, etc.)
- List of your technical skills (categorized)
- Details about 3-5 of your best projects
- Your work experience
- Your education background
*/
