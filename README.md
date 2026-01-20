# Akmal Suhaimi - Resume Website

A modern, responsive resume/portfolio website built with Nuxt 3, Vue 3, and Tailwind CSS. Features a terminal-inspired design with smooth animations and comprehensive test coverage.

## Live Demo

[https://akmal-resume-website.vercel.app](https://akmal-resume-website.vercel.app)

## Features

### Core Features
- Responsive design for all devices (mobile, tablet, desktop)
- Dark/Light mode toggle with system preference detection
- Smooth scroll navigation with animated header
- Terminal-inspired design elements throughout
- SEO optimized with Open Graph and Twitter Card support
- PWA ready with icons and manifest
- Password-protected CV download functionality

### Sections
- **Hero** - Animated typewriter name, rotating roles, value proposition, and social CTAs
- **Summary** - Professional pillars with animated cards
- **Skills** - Core stack highlight with categorized skill badges
- **Experience** - Timeline layout with company logos and impact metrics
- **Projects** - 3D tilt effect cards with type badges and tech stacks
- **Education** - Academic background with institution details
- **Certifications** - Professional certifications with provider logos
- **Testimonials** - LinkedIn recommendations with author info
- **Contact** - Multiple contact methods with CTA buttons

### Technical Highlights
- 3D card tilt effects on hover (Projects section)
- Intersection Observer-based scroll animations
- Mobile-optimized carousels using Swiper
- Memory leak prevention with proper cleanup
- Comprehensive test coverage (425+ tests)

## Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/)
- **UI:** [Vue 3](https://vuejs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix Vue](https://www.radix-vue.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide Vue](https://lucide.dev/)
- **Animations:** [VueUse](https://vueuse.org/)
- **Testing:** [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/akmal-resume-website.git

# Navigate to the project
cd akmal-resume-website

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Generate Static Site

```bash
npm run generate
```

## Testing

```bash
# Run unit tests
npm run test

# Run unit tests with UI
npm run test:ui

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run all tests
npm run test:all
```

## Project Structure

```
├── assets/
│   └── css/
│       └── tailwind.css        # Global styles, animations, CSS variables
├── components/
│   ├── layout/                 # Header, Footer
│   ├── resume/                 # Resume sections
│   │   ├── Hero.vue            # Main hero with typewriter effect
│   │   ├── Summary.vue         # Professional pillars
│   │   ├── Skills.vue          # Skills with core stack highlight
│   │   ├── Experience.vue      # Work experience timeline
│   │   ├── Projects.vue        # Projects with 3D tilt effect
│   │   ├── Education.vue       # Education section
│   │   ├── Certifications.vue  # Certifications grid
│   │   ├── Testimonials.vue    # LinkedIn testimonials
│   │   └── Contact.vue         # Contact methods
│   └── ui/                     # Reusable UI components (Button, Card, Badge, etc.)
├── composables/                # Vue composables (useScrollAnimation, useTypewriter)
├── data/
│   └── resume.ts               # Resume data (experience, skills, projects, etc.)
├── pages/                      # Nuxt pages
├── public/                     # Static assets (images, icons, fonts)
├── server/
│   ├── api/                    # API routes (CV download)
│   └── assets/                 # Server-side assets
├── tests/
│   ├── components/             # Component unit tests
│   │   ├── layout/             # Header, Footer tests
│   │   ├── resume/             # Resume section tests
│   │   └── ui/                 # UI component tests
│   ├── composables/            # Composable tests
│   ├── pages/                  # Page tests
│   └── server/                 # API endpoint tests
├── types/
│   └── resume.ts               # TypeScript interfaces
└── nuxt.config.ts              # Nuxt configuration
```

## Test Coverage

The project maintains comprehensive test coverage with 425+ unit tests covering:

- **Components**: All resume sections, UI components, layout components
- **Composables**: useScrollAnimation, useTypewriter
- **API Endpoints**: CV download with password validation
- **Edge Cases**: Empty arrays, missing props, error states

```bash
# Run tests with coverage report
npm run test:coverage
```

## License

MIT
