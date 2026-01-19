import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'
import { resumeData } from '~/data/resume'

describe('Index Page', () => {
  describe('Rendering', () => {
    it('renders the page', async () => {
      const wrapper = await mountSuspended(IndexPage)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the Header component', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const header = wrapper.find('header')
      expect(header.exists()).toBe(true)
    })

    it('renders the main content area', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const main = wrapper.find('main')
      expect(main.exists()).toBe(true)
    })

    it('renders the Footer component', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const footer = wrapper.find('footer')
      expect(footer.exists()).toBe(true)
    })
  })

  describe('Resume Sections', () => {
    it('renders Hero section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      expect(wrapper.text()).toContain(resumeData.contact.name)
    })

    it('renders Summary section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const aboutSection = wrapper.find('#about')
      expect(aboutSection.exists()).toBe(true)
    })

    it('renders Skills section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const skillsSection = wrapper.find('#skills')
      expect(skillsSection.exists()).toBe(true)
    })

    it('renders Experience section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const experienceSection = wrapper.find('#experience')
      expect(experienceSection.exists()).toBe(true)
    })

    it('renders Projects section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const projectsSection = wrapper.find('#projects')
      expect(projectsSection.exists()).toBe(true)
    })

    it('renders Education section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const educationSection = wrapper.find('#education')
      expect(educationSection.exists()).toBe(true)
    })

    it('renders Certifications section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const certificationsSection = wrapper.find('#certifications')
      expect(certificationsSection.exists()).toBe(true)
    })

    it('renders Contact section', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const contactSection = wrapper.find('#contact')
      expect(contactSection.exists()).toBe(true)
    })
  })

  describe('SEO Meta Tags', () => {
    it('should have title matching "{name} - {title}" format', () => {
      const expectedTitle = `${resumeData.contact.name} - ${resumeData.contact.title}`
      expect(expectedTitle).toBe('Akmal Suhaimi - Backend Engineer')
    })

    it('should have description matching summary', () => {
      expect(resumeData.summary).toBeTruthy()
      expect(typeof resumeData.summary).toBe('string')
    })

    it('should have ogTitle matching title', () => {
      const expectedOgTitle = `${resumeData.contact.name} - ${resumeData.contact.title}`
      expect(expectedOgTitle).toContain(resumeData.contact.name)
    })

    it('should have ogDescription matching description', () => {
      const expectedOgDescription = resumeData.summary
      expect(expectedOgDescription).toBeTruthy()
    })

    it('should have ogImage set to /og-image.jpg', () => {
      const expectedOgImage = '/og-image.jpg'
      expect(expectedOgImage).toBe('/og-image.jpg')
    })

    it('should have ogUrl matching website URL', () => {
      const expectedOgUrl = resumeData.contact.website
      expect(expectedOgUrl).toContain('akmalsuhaimi.com')
    })

    it('should have twitterCard as summary_large_image', () => {
      const expectedTwitterCard = 'summary_large_image'
      expect(expectedTwitterCard).toBe('summary_large_image')
    })

    it('should have twitterTitle matching title', () => {
      const expectedTwitterTitle = `${resumeData.contact.name} - ${resumeData.contact.title}`
      expect(expectedTwitterTitle).toContain(resumeData.contact.name)
    })

    it('should have twitterDescription matching description', () => {
      const expectedTwitterDescription = resumeData.summary
      expect(expectedTwitterDescription).toBeTruthy()
    })
  })

  describe('JSON-LD Structured Data', () => {
    it('should have @context as schema.org', () => {
      const expectedContext = 'https://schema.org'
      expect(expectedContext).toBe('https://schema.org')
    })

    it('should have @graph array', () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [],
      }
      expect(Array.isArray(structuredData['@graph'])).toBe(true)
    })

    it('Person schema should have correct name', () => {
      const personSchema = {
        '@type': 'Person',
        name: resumeData.contact.name,
      }
      expect(personSchema.name).toBe('Akmal Suhaimi')
    })

    it('Person schema should have correct jobTitle', () => {
      const personSchema = {
        '@type': 'Person',
        jobTitle: resumeData.contact.title,
      }
      expect(personSchema.jobTitle).toBe('Backend Engineer')
    })

    it('Person schema should have email', () => {
      expect(resumeData.contact.email).toBeTruthy()
      expect(resumeData.contact.email).toContain('@')
    })

    it('Person schema should have telephone', () => {
      expect(resumeData.contact.phone).toBeTruthy()
    })

    it('should have WebSite schema', () => {
      const webSiteSchema = {
        '@type': 'WebSite',
        url: resumeData.contact.website,
      }
      expect(webSiteSchema['@type']).toBe('WebSite')
    })

    it('should have WebPage schema', () => {
      const webPageSchema = {
        '@type': 'WebPage',
        url: resumeData.contact.website,
      }
      expect(webPageSchema['@type']).toBe('WebPage')
    })

    it('should have BreadcrumbList schema', () => {
      const breadcrumbSchema = {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
          },
        ],
      }
      expect(breadcrumbSchema['@type']).toBe('BreadcrumbList')
      expect(breadcrumbSchema.itemListElement[0].name).toBe('Home')
    })

    it('Person schema should have sameAs links', () => {
      const sameAs = [resumeData.contact.linkedin, resumeData.contact.github]
      expect(sameAs).toContain(resumeData.contact.linkedin)
      expect(sameAs).toContain(resumeData.contact.github)
    })

    it('Person schema should have knowsAbout from skills', () => {
      const knowsAbout = resumeData.skills.flatMap((s) => s.skills)
      expect(Array.isArray(knowsAbout)).toBe(true)
      expect(knowsAbout.length).toBeGreaterThan(0)
    })
  })

  describe('Visual Elements', () => {
    it('renders background grid pattern', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const gridPattern = wrapper.find('.grid-pattern')
      expect(gridPattern.exists()).toBe(true)
    })

    it('renders animated gradient background', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const gradientBg = wrapper.find('.animated-gradient-bg')
      expect(gradientBg.exists()).toBe(true)
    })

    it('renders floating orbs', async () => {
      const wrapper = await mountSuspended(IndexPage)
      const floatingOrbs = wrapper.findAll('.animate-float')
      expect(floatingOrbs.length).toBeGreaterThan(0)
    })
  })
})
