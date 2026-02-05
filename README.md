# Portfolio Website

A modern, high-performance portfolio website built with Next.js 14, featuring an interactive geometric background with beam animations, glassmorphism design elements, and smooth Framer Motion transitions.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-purple?style=flat-square&logo=framer)

## Features

- **Interactive Geometric Background** - Large-scale hexagonal SVG grid with animated beam effects that respond to cursor proximity
- **Modern Dark Theme** - Deep navy/black gradient with cyan and purple accent colors
- **Glassmorphism UI** - Translucent cards and navigation with backdrop blur effects
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Page transitions and micro-interactions powered by Framer Motion
- **Bento Grid Projects** - Modern grid layout with spotlight hover effects
- **Centralized Data** - Easy-to-update portfolio content via a single configuration file

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, CSS variables, utilities
│   ├── layout.tsx           # Root layout with fonts and metadata
│   └── page.tsx             # Main page composition
├── components/
│   ├── GeometricBackground.tsx  # Interactive SVG hexagon grid with beams
│   ├── Navigation.tsx           # Glassmorphism navbar with mobile drawer
│   └── SpotlightCard.tsx        # Card with mouse-tracking spotlight effect
├── data/
│   └── portfolio-data.ts    # Centralized portfolio content configuration
├── hooks/
│   └── useMousePosition.ts  # Custom hook for mouse tracking
└── sections/
    ├── Hero.tsx             # Hero section with name and CTA buttons
    ├── About.tsx            # About section with experience timeline
    ├── Projects.tsx         # Bento grid project showcase
    ├── Skills.tsx           # Categorized skills display
    └── Contact.tsx          # Contact form and social links
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anees040/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Updating Portfolio Content

All portfolio content is managed in a single file: `src/data/portfolio-data.ts`

Edit this file to update:
- **Personal Information** - Name, role, bio, location, email
- **Social Links** - GitHub, LinkedIn, Twitter, etc.
- **Skills** - Categorized technical skills
- **Projects** - Title, description, tech stack, links
- **Experience** - Work history with company details
- **Education** - Academic background

### Customizing Colors

The color scheme is defined in `src/app/globals.css`:

```css
:root {
  --background: #0a0a0a;
  --accent-blue: #00d4ff;
  --accent-purple: #a855f7;
}
```

### Adding Project Images

Place project screenshots in the `public/projects/` directory and reference them in the portfolio data.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Performance

The portfolio is optimized for performance:

- SVG-based background animations (GPU-accelerated)
- Limited concurrent beam animations (max 5-7)
- Lazy-loaded sections with viewport detection
- Optimized font loading with `next/font`

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Anees040/portfolio-website)

### Other Platforms

Build the production bundle:
```bash
npm run build
```

The output will be in the `.next` directory, ready for deployment to any Node.js hosting platform.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by [Devin AI](https://devin.ai/), [Benjamin Rogers](https://www.benrogers.dev/), and [Furkan Cengiz](https://furkan-cengiz.com/)
- Background beam effect inspired by [Aceternity UI](https://ui.aceternity.com/)

---

Built with precision and passion.
