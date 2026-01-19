import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Footer from '~/components/layout/Footer.vue'

const defaultProps = {
  name: 'Akmal Suhaimi',
  linkedin: 'https://www.linkedin.com/in/akmal-suhaimi',
  email: 'mhdakmal875@gmail.com',
  github: 'https://github.com/dxiiren',
  whatsapp: 'https://wa.me/60195357250',
}

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('renders the footer element', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.find('footer').exists()).toBe(true)
    })

    it('renders the name in copyright', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.text()).toContain('Akmal Suhaimi')
    })

    it('renders current year in copyright', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const currentYear = new Date().getFullYear()
      expect(wrapper.text()).toContain(currentYear.toString())
    })
  })

  describe('Quote Section', () => {
    it('renders the inspirational quote', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.text()).toContain("The best code is the one that doesn't need to exist")
    })

    it('renders the quote attribution', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.text()).toContain('— Akmal Suhaimi')
    })

    it('renders blockquote element', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const blockquote = wrapper.find('blockquote')
      expect(blockquote.exists()).toBe(true)
    })
  })

  describe('CTA Section', () => {
    it('renders "Ready to build" text', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.text()).toContain('Ready to build something impactful')
    })

    it('renders "Let\'s Build Together" button', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.text()).toContain("Let's Build Together")
    })

    it('has email link in primary CTA', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const emailLink = wrapper.find('a[href="mailto:mhdakmal875@gmail.com"]')
      expect(emailLink.exists()).toBe(true)
    })

    it('renders "Download CV" button', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.text()).toContain('Download CV')
    })

    it('has download link pointing to /download', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const downloadLink = wrapper.find('a[href="/download"]')
      expect(downloadLink.exists()).toBe(true)
    })
  })

  describe('Social Links', () => {
    it('renders LinkedIn link when provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const linkedinLink = wrapper.find('a[href="https://www.linkedin.com/in/akmal-suhaimi"]')
      expect(linkedinLink.exists()).toBe(true)
    })

    it('renders GitHub link when provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const githubLink = wrapper.find('a[href="https://github.com/dxiiren"]')
      expect(githubLink.exists()).toBe(true)
    })

    it('renders WhatsApp link when provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const whatsappLink = wrapper.find('a[href="https://wa.me/60195357250"]')
      expect(whatsappLink.exists()).toBe(true)
    })

    it('renders email social link when provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const emailLinks = wrapper.findAll('a[href^="mailto:"]')
      expect(emailLinks.length).toBeGreaterThan(0)
    })

    it('does not render LinkedIn link when not provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: { ...defaultProps, linkedin: undefined },
      })
      const linkedinLink = wrapper.find('a[aria-label="LinkedIn"]')
      expect(linkedinLink.exists()).toBe(false)
    })

    it('does not render GitHub link when not provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: { ...defaultProps, github: undefined },
      })
      const githubLink = wrapper.find('a[aria-label="GitHub"]')
      expect(githubLink.exists()).toBe(false)
    })

    it('does not render WhatsApp link when not provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: { ...defaultProps, whatsapp: undefined },
      })
      const whatsappLink = wrapper.find('a[aria-label="WhatsApp"]')
      expect(whatsappLink.exists()).toBe(false)
    })

    it('does not render email social link when not provided', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: { ...defaultProps, email: undefined },
      })
      const emailLink = wrapper.find('a[aria-label="Email"]')
      expect(emailLink.exists()).toBe(false)
    })

    it('social links open in new tab', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const socialLinks = wrapper.findAll('a[target="_blank"]')
      expect(socialLinks.length).toBeGreaterThan(0)
    })

    it('social links have rel="noopener noreferrer"', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const socialLinks = wrapper.findAll('a[rel="noopener noreferrer"]')
      expect(socialLinks.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('has aria-labels on social links', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })

      const linkedinLink = wrapper.find('a[aria-label="LinkedIn"]')
      const githubLink = wrapper.find('a[aria-label="GitHub"]')
      const whatsappLink = wrapper.find('a[aria-label="WhatsApp"]')
      const emailLink = wrapper.find('a[aria-label="Email"]')

      expect(linkedinLink.exists()).toBe(true)
      expect(githubLink.exists()).toBe(true)
      expect(whatsappLink.exists()).toBe(true)
      expect(emailLink.exists()).toBe(true)
    })
  })

  describe('Terminal Branding', () => {
    it('renders terminal icon', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      // Terminal icon should be present
      const terminalText = wrapper.text()
      expect(terminalText).toContain('$')
    })

    it('renders terminal-style messages', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.text()).toContain('echo')
      expect(wrapper.text()).toContain('Made with dedication and caffeine')
    })

    it('renders terminal cursor', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      const cursor = wrapper.find('.animate-terminal-blink')
      expect(cursor.exists()).toBe(true)
    })
  })

  describe('Styling', () => {
    it('has border top', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.find('footer').classes()).toContain('border-t')
    })

    it('has container', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.find('.container').exists()).toBe(true)
    })

    it('has proper padding', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: defaultProps,
      })
      expect(wrapper.find('footer').classes()).toContain('py-12')
    })
  })

  describe('Props Handling', () => {
    it('accepts only name prop', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: { name: 'Test Name' },
      })
      expect(wrapper.text()).toContain('Test Name')
    })

    it('handles empty strings for optional props', async () => {
      const wrapper = await mountSuspended(Footer, {
        props: {
          name: 'Test',
          linkedin: '',
          email: '',
          github: '',
          whatsapp: '',
        },
      })
      // Should not render social links with empty strings (v-if checks)
      expect(wrapper.find('a[aria-label="LinkedIn"]').exists()).toBe(false)
    })
  })
})
