import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Experience from '~/components/resume/Experience.vue'
import type { Experience as ExperienceType } from '~/types/resume'

const mockExperience: ExperienceType[] = [
  {
    title: 'Backend Engineer',
    company: 'Yoprint Software Sdn Bhd',
    period: 'Jun 2025 – Present',
    location: 'Claymont, Delaware, United States',
    workMode: 'Remote',
    impactMetric: '95% data mismatch reduction',
    link: 'https://www.yoprint.com/',
    logo: '/images/logos/yoprint.png',
    achievements: [
      'Architected and delivered a custom Shopify integration',
      'Introduced test-driven development practices',
    ],
  },
  {
    title: 'Backend Developer',
    company: 'Biztory Cloud Sdn Bhd',
    duration: '1 Year 4 Months',
    period: 'Feb 2024 – May 2025',
    location: 'Puchong, Selangor',
    workMode: 'Remote',
    impactMetric: '50K+ daily transactions',
    achievements: [
      'Joined during an ongoing migration from monolithic architecture to microservices',
    ],
  },
  {
    title: 'Junior Developer',
    company: 'Test Company',
    period: '2022 – 2023',
    location: 'Remote',
    workMode: 'Remote',
    achievements: ['Basic work'],
  },
]

describe('Experience Component', () => {
  describe('Basic Rendering', () => {
    it('renders job titles', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      expect(wrapper.text()).toContain('Backend Engineer')
      expect(wrapper.text()).toContain('Backend Developer')
    })

    it('renders company names', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      expect(wrapper.text()).toContain('Yoprint Software Sdn Bhd')
      expect(wrapper.text()).toContain('Biztory Cloud Sdn Bhd')
    })

    it('renders work period', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      expect(wrapper.text()).toContain('Jun 2025 – Present')
    })

    it('renders achievements', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      expect(wrapper.text()).toContain('Shopify integration')
      expect(wrapper.text()).toContain('test-driven development')
    })

    it('has the section title', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      expect(wrapper.text()).toContain('Experience')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty experience array', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [] },
      })
      expect(wrapper.exists()).toBe(true)
      // Should still render section title
      expect(wrapper.text()).toContain('Experience')
    })

    it('handles single experience entry', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[0]] },
      })
      expect(wrapper.text()).toContain('Yoprint Software')
    })
  })

  describe('Optional Duration', () => {
    it('renders optional duration when provided', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[1]] },
      })
      expect(wrapper.text()).toContain('1 Year 4 Months')
    })

    it('renders without duration when not provided', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[0]] }, // No duration
      })
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('Backend Engineer')
    })
  })

  describe('Company Logo', () => {
    it('renders optional logo when provided', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[0]] },
      })
      const img = wrapper.find('img[src="/images/logos/yoprint.png"]')
      expect(img.exists()).toBe(true)
    })

    it('renders fallback icon when logo not provided', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[2]] }, // No logo
      })
      // Should render an SVG icon instead
      const icons = wrapper.findAll('svg')
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe('Impact Metric', () => {
    it('renders impact metric badge', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[0]] },
      })
      expect(wrapper.text()).toContain('95% data mismatch reduction')
    })

    it('does not render impact metric when not provided', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[2]] }, // No impact metric
      })
      expect(wrapper.text()).not.toContain('data mismatch')
    })
  })

  describe('Company Link', () => {
    it('renders company link when provided', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[0]] },
      })
      const link = wrapper.find('a[href="https://www.yoprint.com/"]')
      expect(link.exists()).toBe(true)
    })

    it('does not link company when link not provided', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: [mockExperience[2]] }, // No link
      })
      // Company name should not be a link
      const companyLink = wrapper.find('a[href*="company"]')
      expect(companyLink.exists()).toBe(false)
    })
  })

  describe('Layout', () => {
    it('has section id for navigation', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      const section = wrapper.find('#experience')
      expect(section.exists()).toBe(true)
    })

    it('applies scroll animation classes', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      const html = wrapper.html()
      expect(html).toContain('opacity-0')
    })

    it('renders work mode badge', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      expect(wrapper.text()).toContain('Remote')
    })

    it('renders location', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      expect(wrapper.text()).toContain('Claymont, Delaware')
    })
  })

  describe('Animation Delays', () => {
    it('applies animation delays to timeline items', async () => {
      const wrapper = await mountSuspended(Experience, {
        props: { experience: mockExperience },
      })
      const html = wrapper.html()
      // Animation delay classes should be present
      expect(html).toContain('animation-delay')
    })
  })
})
