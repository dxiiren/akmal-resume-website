export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/seo',
  ],

  // Site configuration for SEO module
  site: {
    url: 'https://akmal-resume-website.vercel.app',
    name: 'Akmal Suhaimi - Backend Engineer',
    description: 'Backend Engineer with 4+ years of experience in PHP, Laravel, MySQL, and cloud-based systems.',
    defaultLocale: 'en',
  },

  // Robots configuration
  robots: {
    allow: ['/'],
    disallow: ['/download'],
    sitemap: 'https://akmal-resume-website.vercel.app/sitemap.xml',
  },

  // Sitemap configuration
  sitemap: {
    exclude: ['/download'],
    defaults: {
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  },

  // Disable og-image module due to dependency issues with unenv
  ogImage: {
    enabled: false,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      script: [
        {
          innerHTML: `(function(){var s=localStorage.getItem('color-mode');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s?JSON.parse(s):(p?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')})();`,
        },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Akmal Suhaimi - Backend Engineer',
      meta: [
        { name: 'description', content: 'Backend Engineer with 4+ years of experience in PHP, Laravel, MySQL, and cloud-based systems. Specializing in system architecture, API integrations, and scalable solutions.' },
        { name: 'keywords', content: 'Backend Engineer, PHP Developer, Laravel Developer, MySQL, API Integration, System Architecture, Malaysia, Akmal Suhaimi' },
        { name: 'author', content: 'Akmal Suhaimi' },
        { name: 'theme-color', content: '#1e40af' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Akmal Suhaimi - Backend Engineer' },
        { property: 'og:url', content: 'https://akmal-resume-website.vercel.app' },
        { property: 'og:title', content: 'Akmal Suhaimi - Backend Engineer' },
        { property: 'og:description', content: 'Backend Engineer with 4+ years of experience in PHP, Laravel, MySQL, and cloud-based systems.' },
        { property: 'og:image', content: 'https://akmal-resume-website.vercel.app/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Akmal Suhaimi - Backend Engineer' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Akmal Suhaimi - Backend Engineer' },
        { name: 'twitter:description', content: 'Backend Engineer with 4+ years of experience in PHP, Laravel, MySQL, and cloud-based systems.' },
        { name: 'twitter:image', content: 'https://akmal-resume-website.vercel.app/og-image.jpg' },
        { name: 'twitter:image:alt', content: 'Akmal Suhaimi - Backend Engineer' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: 'https://akmal-resume-website.vercel.app' },
        // Preconnect for fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  // Disable app manifest to fix dev.json 404 error
  experimental: {
    appManifest: false,
  },

  components: {
    dirs: [
      {
        path: '~/components/resume',
        prefix: 'Resume',
      },
      {
        path: '~/components/layout',
        prefix: 'Layout',
      },
      {
        path: '~/components/ui',
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  image: {
    quality: 80,
    format: ['avif', 'webp', 'jpg'],
  },

  // Route rules for caching
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/': { prerender: true },
    '/download': { headers: { 'cache-control': 'no-store' } },
    '/api/**': { headers: { 'cache-control': 'no-store' } },
  },

  // Nitro configuration for prerendering and compression
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: ['/download', '/api'],
    },
    compressPublicAssets: true,
  },
})
