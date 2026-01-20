import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Certifications from '~/components/resume/Certifications.vue'
import type { Certification } from '~/types/resume'

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe() {}
  unobserve() {}
  disconnect() {}

  simulateIntersection(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting, target: document.createElement('div') } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }

  static instances: MockIntersectionObserver[] = []
  static clear() {
    MockIntersectionObserver.instances = []
  }
}

const mockCertifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect',
    provider: 'Amazon Web Services',
    year: '2023',
  },
  {
    name: 'Google Cloud Professional',
    provider: 'Google',
    year: '2022',
  },
  {
    name: 'Laravel Certified Developer',
    provider: 'Laravel',
    year: '2021',
  },
  {
    name: 'Vue.js Certification',
    provider: 'Vue School',
    year: '2020',
  },
]

describe('Certifications Component', () => {
  beforeEach(() => {
    MockIntersectionObserver.clear()
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Rendering', () => {
    it('renders the certifications section', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      expect(wrapper.find('#certifications').exists()).toBe(true)
    })

    it('renders the section title', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      expect(wrapper.text()).toContain('Certifications & Training')
    })

    it('renders all certifications', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })

      mockCertifications.forEach((cert) => {
        expect(wrapper.text()).toContain(cert.name)
      })
    })

    it('renders certification providers', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })

      mockCertifications.forEach((cert) => {
        expect(wrapper.text()).toContain(cert.provider)
      })
    })

    it('renders certification years', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })

      mockCertifications.forEach((cert) => {
        expect(wrapper.text()).toContain(cert.year)
      })
    })
  })

  describe('Layout', () => {
    it('renders mobile carousel container', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const mobileContainer = wrapper.find('.sm\\:hidden')
      expect(mobileContainer.exists()).toBe(true)
    })

    it('renders desktop grid container', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const desktopGrid = wrapper.find('.hidden.sm\\:block')
      expect(desktopGrid.exists()).toBe(true)
    })

    it('desktop grid has 2 columns', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const grid = wrapper.find('.sm\\:grid-cols-2')
      expect(grid.exists()).toBe(true)
    })
  })

  describe('Cards', () => {
    it('renders Card components for each certification', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      // Each certification appears twice (mobile + desktop), so at least the count should match
      const cards = wrapper.findAllComponents({ name: 'Card' })
      expect(cards.length).toBeGreaterThanOrEqual(mockCertifications.length)
    })

    it('renders Award icon for each certification', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      // Award icons should be present
      const awardIcons = wrapper.findAll('.bg-primary\\/10')
      expect(awardIcons.length).toBeGreaterThan(0)
    })

    it('renders Badge with year', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const badges = wrapper.findAllComponents({ name: 'Badge' })
      expect(badges.length).toBeGreaterThan(0)
    })
  })

  describe('Animations', () => {
    it('has animation delay classes', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const html = wrapper.html()
      expect(html).toContain('animation-delay')
    })

    it('applies different animation delays to cards', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const delays = ['animation-delay-100', 'animation-delay-200', 'animation-delay-300', 'animation-delay-400']
      const html = wrapper.html()

      delays.forEach((delay) => {
        expect(html).toContain(delay)
      })
    })

    it('cards have opacity-0 initially for animation', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const desktopCards = wrapper.findAll('.hidden.sm\\:block .opacity-0')
      expect(desktopCards.length).toBeGreaterThan(0)
    })
  })

  describe('Hover Effects', () => {
    it('cards have hover-lift class', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const hoverCards = wrapper.findAll('.hover-lift')
      expect(hoverCards.length).toBeGreaterThan(0)
    })

    it('has gradient overlay on hover', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const gradientOverlay = wrapper.find('.bg-gradient-to-br')
      expect(gradientOverlay.exists()).toBe(true)
    })
  })

  describe('Background Decorations', () => {
    it('renders background decoration elements', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      const blurElements = wrapper.findAll('.blur-3xl')
      expect(blurElements.length).toBe(2)
    })
  })

  describe('Empty State', () => {
    it('handles empty certifications array', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: [] },
      })
      expect(wrapper.find('#certifications').exists()).toBe(true)
    })
  })

  describe('Mobile Layout', () => {
    it('mobile section renders cards in list format', async () => {
      const wrapper = await mountSuspended(Certifications, {
        props: { certifications: mockCertifications },
      })
      // Check mobile container exists with space-y-3 class
      const mobileContainer = wrapper.find('.sm\\:hidden.space-y-3')
      expect(mobileContainer.exists()).toBe(true)
    })
  })
})
