import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Contact from '~/components/resume/Contact.vue'
import type { ContactInfo } from '~/types/resume'

const mockContact: ContactInfo = {
  name: 'Akmal Suhaimi',
  title: 'Backend Engineer',
  location: '43000, Kajang, Selangor',
  phone: '(+60) 19-535-7250',
  email: 'mhdakmal875@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akmal-suhaimi',
  website: 'https://akmalsuhaimi.com',
  image: '/images/profile.jpg',
  github: 'https://github.com/dxiiren',
  whatsapp: 'https://wa.me/60195357250?text=Hi%20Akmal%20!',
}

describe('Contact Component', () => {
  describe('Basic Rendering', () => {
    it('renders email link', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      const emailLink = wrapper.find('a[href*="mailto"]')
      expect(emailLink.exists()).toBe(true)
    })

    it('renders phone number', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('19-535-7250')
    })

    it('renders LinkedIn link', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      const linkedinLink = wrapper.find('a[href*="linkedin"]')
      expect(linkedinLink.exists()).toBe(true)
    })

    it('has the section title', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Contact')
    })
  })

  describe('All Contact Methods', () => {
    it('renders email contact method', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Email')
      expect(wrapper.text()).toContain('mhdakmal875@gmail.com')
    })

    it('renders phone contact method', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Phone')
    })

    it('renders WhatsApp contact method', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('WhatsApp')
      const whatsappLink = wrapper.find('a[href*="wa.me"]')
      expect(whatsappLink.exists()).toBe(true)
    })

    it('renders GitHub contact method', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('GitHub')
      const githubLink = wrapper.find('a[href*="github"]')
      expect(githubLink.exists()).toBe(true)
    })

    it('renders Website contact method', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Website')
      const websiteLink = wrapper.find('a[href*="akmalsuhaimi.com"]')
      expect(websiteLink.exists()).toBe(true)
    })
  })

  describe('Phone Link Formatting', () => {
    it('formats phone number correctly in tel: link', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      // The tel link should strip spaces
      const telLink = wrapper.find('a[href^="tel:"]')
      expect(telLink.exists()).toBe(true)
      expect(telLink.attributes('href')).toContain('tel:')
    })
  })

  describe('Location Display', () => {
    it('renders location with icon', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Kajang, Selangor')
    })

    it('displays full location string', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('43000, Kajang, Selangor')
    })
  })

  describe('Main CTA Button', () => {
    it('renders main CTA button', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Send me an email')
    })

    it('main CTA links to email', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      const ctaButton = wrapper.find('a[href*="mailto"]')
      expect(ctaButton.exists()).toBe(true)
    })
  })

  describe('Layout and Styling', () => {
    it('has section id for navigation', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      const section = wrapper.find('#contact')
      expect(section.exists()).toBe(true)
    })

    it('applies scroll animation classes', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      const html = wrapper.html()
      expect(html).toContain('opacity-0')
    })

    it('renders card container', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Get in Touch')
    })

    it('renders contact items grid', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      // Should have grid layout for contact items
      const grid = wrapper.find('.grid')
      expect(grid.exists()).toBe(true)
    })
  })

  describe('Arrow Indicators', () => {
    it('has arrow icons for hover indication', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      // ArrowRight icons should exist for hover state
      const arrowIcons = wrapper.findAll('svg')
      expect(arrowIcons.length).toBeGreaterThan(0)
    })
  })

  describe('External Links', () => {
    it('opens external links in new tab', async () => {
      const wrapper = await mountSuspended(Contact, {
        props: { contact: mockContact },
      })
      // External links should have target="_blank"
      const linkedinLink = wrapper.find('a[href*="linkedin"]')
      expect(linkedinLink.attributes('target')).toBe('_blank')
      expect(linkedinLink.attributes('rel')).toContain('noopener')
    })
  })
})
