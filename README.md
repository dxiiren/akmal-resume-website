# Akmal Suhaimi - Resume Website

A modern, responsive resume/portfolio website built with Nuxt 3, Vue 3, and Tailwind CSS.

## Live Demo

[https://akmal-resume-website.vercel.app](https://akmal-resume-website.vercel.app)

## Features

- Responsive design for all devices
- Dark/Light mode toggle with system preference detection
- Smooth scroll navigation
- Terminal-inspired design elements
- SEO optimized with Open Graph and Twitter Card support
- PWA ready with icons and manifest
- CV download functionality

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
│       └── tailwind.css      # Global styles and CSS variables
├── components/
│   ├── layout/               # Header, Footer
│   ├── resume/               # Resume sections (Hero, Skills, Experience, etc.)
│   └── ui/                   # Reusable UI components
├── composables/              # Vue composables
├── pages/                    # Nuxt pages
├── public/                   # Static assets
├── server/                   # Server API routes
└── nuxt.config.ts            # Nuxt configuration
```

## License

MIT
