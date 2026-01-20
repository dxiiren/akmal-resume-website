import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Header from '~/components/layout/Header.vue'

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

describe('Header Component', () => {
  describe('Rendering', () => {
    it('renders the header element', async () => {
      const wrapper = await mountSuspended(Header)
      expect(wrapper.find('header').exists()).toBe(true)
    })

    it('renders the logo image with accessible link', async () => {
      const wrapper = await mountSuspended(Header)
      const logoLink = wrapper.find('a[aria-label="Akmal Suhaimi - Home"]')
      expect(logoLink.exists()).toBe(true)
      const logoImg = logoLink.find('img')
      expect(logoImg.exists()).toBe(true)
    })

    it('renders the logo link pointing to home', async () => {
      const wrapper = await mountSuspended(Header)
      const logoLink = wrapper.find('a[href="/"]')
      expect(logoLink.exists()).toBe(true)
    })

    it('has sticky positioning', async () => {
      const wrapper = await mountSuspended(Header)
      expect(wrapper.find('header').classes()).toContain('sticky')
      expect(wrapper.find('header').classes()).toContain('top-0')
    })

    it('has backdrop blur effect', async () => {
      const wrapper = await mountSuspended(Header)
      expect(wrapper.find('header').classes()).toContain('backdrop-blur')
    })
  })

  describe('Navigation Items', () => {
    it('renders all navigation items on desktop', async () => {
      const wrapper = await mountSuspended(Header)
      const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Testimonials', 'Contact']

      navItems.forEach((item) => {
        expect(wrapper.text()).toContain(item)
      })
    })

    it('renders navigation links with correct hrefs', async () => {
      const wrapper = await mountSuspended(Header)
      const expectedHrefs = ['#about', '#skills', '#experience', '#projects', '#education', '#testimonials', '#contact']

      expectedHrefs.forEach((href) => {
        const link = wrapper.find(`a[href="${href}"]`)
        expect(link.exists()).toBe(true)
      })
    })

    it('includes Testimonials in navigation items', async () => {
      const wrapper = await mountSuspended(Header)
      expect(wrapper.text()).toContain('Testimonials')
      const link = wrapper.find('a[href="#testimonials"]')
      expect(link.exists()).toBe(true)
    })

    it('has desktop navigation hidden on mobile', async () => {
      const wrapper = await mountSuspended(Header)
      const desktopNav = wrapper.find('nav.hidden.md\\:flex')
      expect(desktopNav.exists()).toBe(true)
    })
  })

  describe('Availability Status', () => {
    it('renders availability status on desktop', async () => {
      const wrapper = await mountSuspended(Header)
      expect(wrapper.text()).toContain('Available')
    })

    it('has green status indicator', async () => {
      const wrapper = await mountSuspended(Header)
      const statusIndicator = wrapper.find('.bg-green-500')
      expect(statusIndicator.exists()).toBe(true)
    })

    it('has pulsing animation on status', async () => {
      const wrapper = await mountSuspended(Header)
      const pulse = wrapper.find('.status-pulse')
      expect(pulse.exists()).toBe(true)
    })
  })

  describe('Mobile Menu', () => {
    it('renders mobile menu button', async () => {
      const wrapper = await mountSuspended(Header)
      // Find buttons in the mobile section
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('mobile menu is closed by default', async () => {
      const wrapper = await mountSuspended(Header)
      // Mobile nav should not be visible initially (uses v-if)
      const mobileNavs = wrapper.findAll('nav')
      // Should only have desktop nav, not mobile nav
      expect(mobileNavs.length).toBe(1)
    })

    it('opens mobile menu on button click', async () => {
      const wrapper = await mountSuspended(Header)
      // Find the last button which is the menu button (after ThemeToggle)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons[buttons.length - 1]

      await menuButton.trigger('click')
      await wrapper.vm.$nextTick()

      // After click, should have 2 navs (desktop + mobile)
      const navs = wrapper.findAll('nav')
      expect(navs.length).toBe(2)
    })

    it('closes mobile menu on second button click', async () => {
      const wrapper = await mountSuspended(Header)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons[buttons.length - 1]

      // Open menu
      await menuButton.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('nav').length).toBe(2)

      // Close menu
      await menuButton.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('nav').length).toBe(1)
    })

    it('renders mobile availability status', async () => {
      const wrapper = await mountSuspended(Header)
      // Find mobile availability badge
      const mobileAvailability = wrapper.findAll('.md\\:hidden')
      expect(mobileAvailability.length).toBeGreaterThan(0)
    })
  })

  describe('Scroll to Section', () => {
    it('calls scrollIntoView when nav link is clicked', async () => {
      const wrapper = await mountSuspended(Header)

      // Mock querySelector to return a mock element
      const mockElement = { scrollIntoView: vi.fn() }
      vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as unknown as Element)

      const aboutLink = wrapper.find('a[href="#about"]')
      await aboutLink.trigger('click')

      expect(document.querySelector).toHaveBeenCalledWith('#about')
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

      vi.restoreAllMocks()
    })

    it('closes mobile menu after navigation', async () => {
      const wrapper = await mountSuspended(Header)

      // Open mobile menu
      const buttons = wrapper.findAll('button')
      const menuButton = buttons[buttons.length - 1]
      await menuButton.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('nav').length).toBe(2)

      // Mock querySelector
      const mockElement = { scrollIntoView: vi.fn() }
      vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as unknown as Element)

      // Click a mobile nav link (second nav is mobile)
      const mobileNav = wrapper.findAll('nav')[1]
      const mobileNavLinks = mobileNav.findAll('a')
      if (mobileNavLinks.length > 0) {
        await mobileNavLinks[0].trigger('click')
      }

      // Menu should be closed
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('nav').length).toBe(1)

      vi.restoreAllMocks()
    })
  })

  describe('Styling', () => {
    it('has z-50 for proper stacking', async () => {
      const wrapper = await mountSuspended(Header)
      expect(wrapper.find('header').classes()).toContain('z-50')
    })

    it('has full width', async () => {
      const wrapper = await mountSuspended(Header)
      expect(wrapper.find('header').classes()).toContain('w-full')
    })

    it('has border bottom', async () => {
      const wrapper = await mountSuspended(Header)
      const headerClasses = wrapper.find('header').classes().join(' ')
      expect(headerClasses).toContain('border')
    })

    it('has container with proper padding', async () => {
      const wrapper = await mountSuspended(Header)
      const container = wrapper.find('.container')
      expect(container.exists()).toBe(true)
    })
  })

  describe('Terminal Branding', () => {
    it('renders terminal prompt in mobile nav', async () => {
      const wrapper = await mountSuspended(Header)

      // Open mobile menu
      const buttons = wrapper.findAll('button')
      const menuButton = buttons[buttons.length - 1]
      await menuButton.trigger('click')
      await wrapper.vm.$nextTick()

      // Check for terminal prompt in mobile nav
      expect(wrapper.text()).toContain('$')
    })

    it('has terminal styled class in mobile nav', async () => {
      const wrapper = await mountSuspended(Header)

      // Open mobile menu
      const buttons = wrapper.findAll('button')
      const menuButton = buttons[buttons.length - 1]
      await menuButton.trigger('click')
      await wrapper.vm.$nextTick()

      // Check for text-terminal class
      const html = wrapper.html()
      expect(html).toContain('text-terminal')
    })
  })
})
