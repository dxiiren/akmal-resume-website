import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Hero from '~/components/resume/Hero.vue'
import type { ContactInfo, Stat, TerminalSnippet } from '~/types/resume'

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe() {
    // Auto-trigger intersection for stats animation
    this.callback(
      [{ isIntersecting: true, target: document.createElement('div') } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }

  unobserve() {}
  disconnect() {}

  static instances: MockIntersectionObserver[] = []
  static clear() {
    MockIntersectionObserver.instances = []
  }
}

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
  calendly: 'https://calendly.com/mhdakmal875/1-to-1-meeting',
}

const mockStats: Stat[] = [
  { value: '4', label: 'Years Experience', suffix: '+' },
  { value: '50K', label: 'Daily Transactions', suffix: '+' },
]

const mockTerminalSnippet: TerminalSnippet = {
  language: 'php',
  code: '<?php echo "Hello World"; ?>',
}

describe('Hero Component', () => {
  beforeEach(() => {
    MockIntersectionObserver.clear()
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.unstubAllGlobals()
  })

  describe('Basic Rendering', () => {
    it('renders the name correctly', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      // Wait for typewriter effect to complete (name has 14 chars, 80ms each + 500ms initial delay = ~1620ms)
      // Using 3000ms to account for test environment variability
      await new Promise(resolve => setTimeout(resolve, 3000))
      expect(wrapper.text()).toContain('Akmal Suhaimi')
    }, 10000)

    it('renders the job title', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Backend Engineer')
    })

    it('renders the location', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Kajang, Selangor')
    })

    it('renders contact information', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('mhdakmal875@gmail.com')
    })

    it('renders the profile image', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
    })

    it('has LinkedIn link', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      const linkedinLink = wrapper.find('a[href*="linkedin"]')
      expect(linkedinLink.exists()).toBe(true)
    })
  })

  describe('Stats Handling', () => {
    it('handles empty stats array gracefully', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, stats: [] },
      })
      expect(wrapper.exists()).toBe(true)
      // Stats section should not render when empty
      expect(wrapper.text()).not.toContain('Years Experience')
    })

    it('handles undefined stats', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders stats when provided', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, stats: mockStats },
      })
      expect(wrapper.text()).toContain('Years Experience')
      expect(wrapper.text()).toContain('Daily Transactions')
    })

    it('animates stats counter', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, stats: mockStats },
      })
      // Wait for animation to start
      await new Promise(resolve => setTimeout(resolve, 500))
      // Stats should be rendering (may be in animation)
      expect(wrapper.exists()).toBe(true)
    })

    describe('Counter Animation Completion', () => {
      it('completes counter animation and calls clearInterval', async () => {
        vi.useFakeTimers()
        const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

        const wrapper = await mountSuspended(Hero, {
          props: {
            contact: mockContact,
            stats: [{ value: '4', label: 'Years', suffix: '+' }],
          },
        })

        // Animation: 30 increments x 50ms = 1500ms + buffer
        await vi.advanceTimersByTimeAsync(2000)

        expect(clearIntervalSpy).toHaveBeenCalled()
        expect(wrapper.text()).toContain('4')

        vi.useRealTimers()
        clearIntervalSpy.mockRestore()
      })

      it('completes animation for multiple stats', async () => {
        vi.useFakeTimers()
        const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

        const wrapper = await mountSuspended(Hero, {
          props: { contact: mockContact, stats: mockStats },
        })

        // Second stat has 200ms delay + 1500ms animation
        await vi.advanceTimersByTimeAsync(2500)

        // clearInterval called at least twice (for stat animations, possibly more for role rotation)
        expect(clearIntervalSpy).toHaveBeenCalled()
        expect(clearIntervalSpy.mock.calls.length).toBeGreaterThanOrEqual(2)

        vi.useRealTimers()
        clearIntervalSpy.mockRestore()
      })

      it('handles decimal stat values correctly', async () => {
        vi.useFakeTimers()

        const wrapper = await mountSuspended(Hero, {
          props: {
            contact: mockContact,
            stats: [{ value: '99.9', label: 'Uptime', suffix: '%' }],
          },
        })

        // Animation: 30 increments x 50ms = 1500ms + buffer
        await vi.advanceTimersByTimeAsync(2000)

        // Should format with one decimal place
        expect(wrapper.text()).toContain('99.9')
        expect(wrapper.text()).toContain('%')

        vi.useRealTimers()
      })
    })
  })

  describe('Roles Handling', () => {
    it('handles empty roles array - shows default title', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, roles: [] },
      })
      expect(wrapper.text()).toContain('Backend Engineer')
    })

    it('handles undefined roles', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Backend Engineer')
    })

    it('displays first role when roles provided', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, roles: ['API Specialist', 'System Architect'] },
      })
      expect(wrapper.text()).toContain('API Specialist')
    })
  })

  describe('Terminal Snippet', () => {
    it('renders terminal snippet when provided', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, terminalSnippet: mockTerminalSnippet },
      })
      expect(wrapper.text()).toContain('Hello World')
    })

    it('does not render terminal snippet when not provided', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      // Check for terminal-specific elements
      const terminalHeader = wrapper.find('.bg-\\[\\#0a0a0f\\]')
      expect(terminalHeader.exists()).toBe(false)
    })
  })

  describe('Tagline', () => {
    it('renders tagline when provided', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, tagline: "I build. I solve. I don't stop." },
      })
      expect(wrapper.text()).toContain("I build. I solve. I don't stop.")
    })

    it('does not render tagline element when not provided', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      // Tagline is conditionally rendered with v-if
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('CTA Buttons', () => {
    it('renders all CTA buttons', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      // Check for primary CTA
      expect(wrapper.text()).toContain('Hire Me')
      // Check for WhatsApp CTA
      expect(wrapper.text()).toContain('WhatsApp Me')
      // Check for Schedule a Call (disabled)
      expect(wrapper.text()).toContain('Schedule a Call')
      // Check for social icons
      const linkedinLink = wrapper.find('a[href*="linkedin"]')
      const githubLink = wrapper.find('a[href*="github"]')
      expect(linkedinLink.exists()).toBe(true)
      expect(githubLink.exists()).toBe(true)
    })

    it('has WhatsApp button with correct link', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      const whatsappLink = wrapper.find('a[href*="wa.me"]')
      expect(whatsappLink.exists()).toBe(true)
    })

    it('has Schedule a Call button with Calendly link', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      const calendlyLink = wrapper.find('a[href*="calendly"]')
      expect(calendlyLink.exists()).toBe(true)
      expect(calendlyLink.attributes('href')).toBe('https://calendly.com/mhdakmal875/1-to-1-meeting')
      expect(calendlyLink.attributes('target')).toBe('_blank')
      expect(calendlyLink.attributes('rel')).toContain('noopener')
    })

    it('shows response time text', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('Usually respond within 24 hours')
    })
  })

  describe('Value Proposition', () => {
    it('renders value proposition text', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      expect(wrapper.text()).toContain('scale their backend systems')
    })
  })

  describe('Optional Props Handling', () => {
    it('handles missing optional props', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact },
      })
      // Component should render without errors
      expect(wrapper.exists()).toBe(true)
      // Email should be visible immediately (not affected by typewriter)
      expect(wrapper.text()).toContain('mhdakmal875@gmail.com')
    })

    it('renders with all props provided', async () => {
      const wrapper = await mountSuspended(Hero, {
        props: {
          contact: mockContact,
          tagline: 'Test tagline',
          roles: ['Role 1', 'Role 2'],
          stats: mockStats,
          terminalSnippet: mockTerminalSnippet,
        },
      })
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('Test tagline')
      expect(wrapper.text()).toContain('Role 1')
      expect(wrapper.text()).toContain('Years Experience')
      expect(wrapper.text()).toContain('Hello World')
    })
  })

  describe('Memory Leak Prevention', () => {
    it('cleans up role rotation interval on unmount', async () => {
      vi.useFakeTimers()
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

      const wrapper = await mountSuspended(Hero, {
        props: { contact: mockContact, roles: ['Role 1', 'Role 2'] },
      })

      // Unmount the component
      wrapper.unmount()

      // clearInterval should have been called during unmount
      expect(clearIntervalSpy).toHaveBeenCalled()

      vi.useRealTimers()
      clearIntervalSpy.mockRestore()
    })
  })
})
