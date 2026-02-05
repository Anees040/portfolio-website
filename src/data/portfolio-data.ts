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
    name: "Your Name", // e.g., "Anees Ahmed"
    role: "Full Stack Developer", // e.g., "Software Engineer", "Frontend Developer"
    tagline: "Building elegant solutions with modern web technologies", // Short one-liner
    bio: "I'm a passionate developer with X years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies. I love turning complex problems into simple, beautiful solutions.", // 2-3 sentences about yourself
    location: "Your City, Country", // e.g., "San Francisco, CA"
    email: "your@email.com", // Your professional email
    availableForWork: true, // Set to false if not looking for opportunities
  },

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/yourusername", // Your GitHub profile URL
      username: "yourusername",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourusername", // Your LinkedIn profile URL
      username: "yourusername",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/yourusername", // Your Twitter/X profile URL (optional)
      username: "yourusername",
    },
    // Add more social links as needed
  ],

  skills: [
    {
      category: "Frontend",
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "HTML/CSS" },
        // Add more frontend skills
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js" },
        { name: "Express" },
        { name: "Python" },
        { name: "REST APIs" },
        { name: "GraphQL" },
        // Add more backend skills
      ],
    },
    {
      category: "Database",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "MySQL" },
        // Add more database skills
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        { name: "Git" },
        { name: "Docker" },
        { name: "AWS" },
        { name: "CI/CD" },
        { name: "Linux" },
        // Add more DevOps/tools skills
      ],
    },
  ],

  projects: [
    {
      id: "project-1",
      title: "Project Name", // e.g., "E-Commerce Platform"
      description: "Short description of what this project does and its key features.", // 1-2 sentences
      longDescription: "More detailed description about the project, challenges solved, and impact.", // Optional: longer description
      techStack: ["React", "Node.js", "PostgreSQL", "AWS"], // Technologies used
      liveUrl: "https://yourproject.com", // Live demo URL (optional)
      githubUrl: "https://github.com/yourusername/project", // GitHub repo URL (optional)
      imageUrl: "/projects/project1.png", // Screenshot path (optional)
      featured: true, // Set to true for main projects to highlight
      year: "2024",
    },
    {
      id: "project-2",
      title: "Second Project",
      description: "Description of your second project.",
      techStack: ["Next.js", "TypeScript", "Prisma"],
      githubUrl: "https://github.com/yourusername/project2",
      featured: true,
      year: "2024",
    },
    {
      id: "project-3",
      title: "Third Project",
      description: "Description of your third project.",
      techStack: ["Python", "FastAPI", "Docker"],
      liveUrl: "https://project3.com",
      githubUrl: "https://github.com/yourusername/project3",
      featured: false,
      year: "2023",
    },
    // Add more projects as needed
  ],

  experience: [
    {
      company: "Company Name", // e.g., "Google", "Startup Inc."
      role: "Software Engineer", // Your job title
      period: "Jan 2024 - Present", // Employment period
      description: "Brief description of your responsibilities and achievements.", // Optional
      logo: "🏢", // Emoji or path to company logo
    },
    {
      company: "Previous Company",
      role: "Junior Developer",
      period: "Jun 2022 - Dec 2023",
      description: "What you did at this company.",
      logo: "💼",
    },
    // Add more experience entries
  ],

  education: [
    {
      institution: "University Name", // e.g., "MIT", "Stanford University"
      degree: "Bachelor's", // e.g., "Bachelor's", "Master's"
      field: "Computer Science", // e.g., "Computer Science", "Software Engineering"
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
