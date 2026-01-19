<script setup lang="ts">
import { resumeData } from '~/data/resume'
import Hero from '~/components/resume/Hero.vue'
import Summary from '~/components/resume/Summary.vue'
import Skills from '~/components/resume/Skills.vue'
import Experience from '~/components/resume/Experience.vue'
import Projects from '~/components/resume/Projects.vue'
import Education from '~/components/resume/Education.vue'
import Certifications from '~/components/resume/Certifications.vue'
import Contact from '~/components/resume/Contact.vue'
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

// SEO Meta
useSeoMeta({
  title: `${resumeData.contact.name} - ${resumeData.contact.title}`,
  description: resumeData.summary,
  ogTitle: `${resumeData.contact.name} - ${resumeData.contact.title}`,
  ogDescription: resumeData.summary,
  ogImage: '/og-image.jpg',
  ogUrl: resumeData.contact.website,
  twitterCard: 'summary_large_image',
  twitterTitle: `${resumeData.contact.name} - ${resumeData.contact.title}`,
  twitterDescription: resumeData.summary,
})

// Enhanced Structured Data for SEO using @graph
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          // Person Schema
          {
            '@type': 'Person',
            '@id': `${resumeData.contact.website}/#person`,
            name: resumeData.contact.name,
            givenName: 'Akmal',
            familyName: 'Suhaimi',
            jobTitle: resumeData.contact.title,
            url: resumeData.contact.website,
            email: resumeData.contact.email,
            telephone: resumeData.contact.phone,
            image: {
              '@type': 'ImageObject',
              url: `${resumeData.contact.website}/images/profile.jpg`,
              width: '400',
              height: '400',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kajang',
              addressRegion: 'Selangor',
              addressCountry: 'MY',
            },
            worksFor: {
              '@type': 'Organization',
              name: 'Yoprint Software Sdn Bhd',
              url: 'https://yoprint.com',
            },
            alumniOf: [
              {
                '@type': 'EducationalOrganization',
                name: 'Innovative University College (IUC)',
              },
              {
                '@type': 'EducationalOrganization',
                name: 'Mara University of Technology (UiTM)',
              },
            ],
            sameAs: [
              resumeData.contact.linkedin,
              resumeData.contact.github,
            ],
            knowsAbout: resumeData.skills.flatMap(s => s.skills),
          },
          // WebSite Schema
          {
            '@type': 'WebSite',
            '@id': `${resumeData.contact.website}/#website`,
            url: resumeData.contact.website,
            name: `${resumeData.contact.name} - ${resumeData.contact.title}`,
            description: 'Personal portfolio and resume website',
            publisher: {
              '@id': `${resumeData.contact.website}/#person`,
            },
            inLanguage: 'en-US',
          },
          // WebPage Schema
          {
            '@type': 'WebPage',
            '@id': `${resumeData.contact.website}/#webpage`,
            url: resumeData.contact.website,
            name: `${resumeData.contact.name} - ${resumeData.contact.title}`,
            description: resumeData.summary,
            isPartOf: {
              '@id': `${resumeData.contact.website}/#website`,
            },
            about: {
              '@id': `${resumeData.contact.website}/#person`,
            },
            inLanguage: 'en-US',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
          },
          // BreadcrumbList Schema
          {
            '@type': 'BreadcrumbList',
            '@id': `${resumeData.contact.website}/#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: resumeData.contact.website,
              },
            ],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Grid background pattern -->
    <div class="fixed inset-0 -z-10 grid-pattern opacity-30" />

    <!-- Animated gradient mesh background -->
    <div class="fixed inset-0 -z-10 animated-gradient-bg opacity-50" />

    <!-- Floating background orbs - crimson themed -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div class="absolute top-3/4 right-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl animate-float animation-delay-500" />
      <div class="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/3 rounded-full blur-2xl animate-pulse-glow animation-delay-300" />
    </div>

    <Header />
    <main>
      <Hero
        :contact="resumeData.contact"
        :tagline="resumeData.tagline"
        :roles="resumeData.roles"
        :stats="resumeData.stats"
        :terminal-snippet="resumeData.terminalSnippet"
      />
      <Summary
        :summary="resumeData.summary"
        :about-me="resumeData.aboutMe"
      />
      <Skills :skills="resumeData.skills" />
      <Experience :experience="resumeData.experience" />
      <Projects :projects="resumeData.projects" />
      <Education :education="resumeData.education" />
      <Certifications :certifications="resumeData.certifications" />
      <Contact :contact="resumeData.contact" />
    </main>
    <Footer
      :name="resumeData.contact.name"
      :linkedin="resumeData.contact.linkedin"
      :email="resumeData.contact.email"
      :github="resumeData.contact.github"
      :whatsapp="resumeData.contact.whatsapp"
    />
  </div>
</template>
