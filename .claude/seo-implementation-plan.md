# SEO Implementation Plan for Akmal Resume Website

## Overview

This plan provides a comprehensive SEO implementation strategy for the Nuxt 3 resume website following industry best practices.

**Current State:**
- Framework: Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS
- Pages: `/` (homepage), `/download` (password-protected CV)
- `@nuxtjs/seo` module installed but NOT activated
- Basic meta tags exist, but incomplete

---

## Phase 1: Technical SEO Foundation

### 1.1 Activate @nuxtjs/seo Module

**File:** `nuxt.config.ts`

Add `@nuxtjs/seo` to modules array and configure site settings:

```typescript
modules: [
  '@nuxtjs/tailwindcss',
  '@nuxt/image',
  '@nuxtjs/seo',  // ADD THIS
],

site: {
  url: 'https://akmalsuhaimi.com',
  name: 'Akmal Suhaimi - Backend Engineer',
  description: 'Backend Engineer with 4+ years of experience in PHP, Laravel, and cloud-based systems.',
  defaultLocale: 'en',
},
```

### 1.2 Configure robots.txt

**File:** `nuxt.config.ts`

```typescript
robots: {
  allow: '/',
  disallow: ['/download', '/api/'],
  sitemap: 'https://akmalsuhaimi.com/sitemap.xml',
},
```

### 1.3 Configure Sitemap

**File:** `nuxt.config.ts`

```typescript
sitemap: {
  exclude: ['/download'],
  defaults: {
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
},
```

---

## Phase 2: Complete Meta Tags

### 2.1 Global Meta Configuration

**File:** `nuxt.config.ts`

Update `app.head` section:

```typescript
app: {
  head: {
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1',
    title: 'Akmal Suhaimi - Backend Engineer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { name: 'author', content: 'Akmal Suhaimi' },
      { name: 'theme-color', content: '#1e40af' },
      { name: 'keywords', content: 'backend engineer, PHP developer, Laravel developer, software engineer Malaysia, Akmal Suhaimi, API developer, Vue.js, MySQL, AWS' },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Akmal Suhaimi - Backend Engineer' },
      { property: 'og:title', content: 'Akmal Suhaimi - Backend Engineer' },
      { property: 'og:description', content: 'Backend Engineer with 4+ years of experience in PHP, Laravel, and cloud-based systems.' },
      { property: 'og:url', content: 'https://akmalsuhaimi.com' },
      { property: 'og:image', content: 'https://akmalsuhaimi.com/images/og-image.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Akmal Suhaimi - Backend Engineer Portfolio' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Akmal Suhaimi - Backend Engineer' },
      { name: 'twitter:description', content: 'Backend Engineer with 4+ years of experience in PHP, Laravel, and cloud-based systems.' },
      { name: 'twitter:image', content: 'https://akmalsuhaimi.com/images/og-image.jpg' },
      { name: 'twitter:image:alt', content: 'Akmal Suhaimi - Backend Engineer Portfolio' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
  },
},
```

---

## Phase 3: Structured Data (Schema.org)

### 3.1 Enhanced JSON-LD Markup

**File:** `pages/index.vue`

Replace existing `useHead()` structured data with comprehensive schemas:

```typescript
useHead({
  script: [
    // Person Schema
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://akmalsuhaimi.com/#person',
        name: resumeData.contact.name,
        givenName: 'Akmal',
        familyName: 'Suhaimi',
        jobTitle: resumeData.contact.title,
        description: resumeData.summary,
        url: resumeData.contact.website,
        email: `mailto:${resumeData.contact.email}`,
        telephone: resumeData.contact.phone,
        image: {
          '@type': 'ImageObject',
          url: 'https://akmalsuhaimi.com/images/profile.jpg',
          width: '400',
          height: '400',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kajang',
          addressRegion: 'Selangor',
          postalCode: '43000',
          addressCountry: 'MY',
        },
        sameAs: [
          resumeData.contact.linkedin,
          resumeData.contact.github,
          resumeData.contact.website,
        ],
        knowsAbout: resumeData.skills.flatMap(s => s.skills),
        worksFor: {
          '@type': 'Organization',
          name: 'Yoprint Software Sdn Bhd',
        },
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Mara University of Technology (UiTM)',
          },
        ],
      }),
    },
    // WebSite Schema
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://akmalsuhaimi.com/#website',
        url: 'https://akmalsuhaimi.com',
        name: 'Akmal Suhaimi - Backend Engineer Portfolio',
        description: 'Professional portfolio and resume of Akmal Suhaimi, Backend Engineer.',
        publisher: { '@id': 'https://akmalsuhaimi.com/#person' },
        inLanguage: 'en-US',
      }),
    },
    // WebPage Schema
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://akmalsuhaimi.com/#webpage',
        url: 'https://akmalsuhaimi.com',
        name: 'Akmal Suhaimi - Backend Engineer',
        description: resumeData.summary,
        isPartOf: { '@id': 'https://akmalsuhaimi.com/#website' },
        about: { '@id': 'https://akmalsuhaimi.com/#person' },
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: 'en-US',
      }),
    },
    // BreadcrumbList Schema
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://akmalsuhaimi.com',
          },
        ],
      }),
    },
  ],
})
```

---

## Phase 4: Static Assets

### 4.1 Create OG Image

**File:** `public/images/og-image.jpg`

Create a 1200x630 pixel image containing:
- Name: "Akmal Suhaimi"
- Title: "Backend Engineer"
- Tagline: "I build. I solve. I don't stop."
- Brand colors (crimson/slate theme)

### 4.2 Create Favicon Set

**Files to create in `public/`:**
- `favicon.ico` (32x32)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

### 4.3 Create Web App Manifest

**File:** `public/site.webmanifest`

```json
{
  "name": "Akmal Suhaimi - Backend Engineer",
  "short_name": "Akmal Suhaimi",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1e40af",
  "background_color": "#0f172a",
  "display": "standalone"
}
```

---

## Phase 5: Performance Optimization

### 5.1 Image Optimization

**File:** `nuxt.config.ts`

```typescript
image: {
  quality: 80,
  format: ['avif', 'webp', 'jpg'],
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },
},
```

### 5.2 Route Rules & Caching

**File:** `nuxt.config.ts`

```typescript
routeRules: {
  '/': { prerender: true },
  '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  '/images/**': { headers: { 'cache-control': 'public, max-age=86400' } },
  '/download': { ssr: true, prerender: false },
},

nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true,
  },
  compressPublicAssets: true,
},
```

---

## Critical Files to Modify

| File | Changes |
|------|---------|
| `nuxt.config.ts` | Add @nuxtjs/seo module, site config, robots, sitemap, meta tags, route rules |
| `pages/index.vue` | Enhanced structured data (Person, WebSite, WebPage, BreadcrumbList schemas) |
| `public/images/og-image.jpg` | Create OG image (1200x630) |
| `public/site.webmanifest` | Create web app manifest |
| `public/` | Add favicon set |

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Add `@nuxtjs/seo` to modules in nuxt.config.ts
- [ ] Configure `site` object with URL and metadata
- [ ] Configure `robots` rules
- [ ] Configure `sitemap` generation

### Phase 2: Meta Tags
- [ ] Add `htmlAttrs.lang` attribute
- [ ] Add keywords meta tag
- [ ] Add complete Open Graph tags
- [ ] Add complete Twitter Card tags
- [ ] Add favicon link tags
- [ ] Add preconnect links for fonts

### Phase 3: Structured Data
- [ ] Enhance Person schema with full details
- [ ] Add WebSite schema
- [ ] Add WebPage schema
- [ ] Add BreadcrumbList schema

### Phase 4: Static Assets
- [ ] Create OG image (1200x630)
- [ ] Create favicon set (ico, png variants)
- [ ] Create site.webmanifest

### Phase 5: Performance
- [ ] Configure image optimization with AVIF
- [ ] Add route rules for caching
- [ ] Enable prerendering and compression

---

## Verification

After implementation, validate using:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
5. **Google PageSpeed Insights**: https://pagespeed.web.dev/
6. **Lighthouse** (Chrome DevTools) - Target SEO score: 100

---

## Keywords Strategy

**Primary Keywords:**
- Backend Engineer Malaysia
- Akmal Suhaimi
- PHP Laravel Developer
- Software Engineer Portfolio

**Secondary Keywords:**
- Backend Developer Selangor
- Laravel Expert Malaysia
- API Integration Developer
- AWS Developer Malaysia
