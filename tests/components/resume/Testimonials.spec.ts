import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Testimonials from '~/components/resume/Testimonials.vue'
import type { Testimonial } from '~/types/resume'

const mockTestimonials: Testimonial[] = [
  {
    quote: 'This is an amazing developer with great skills.',
    author: 'John Doe',
    role: 'Senior Manager',
    company: 'Tech Corp',
    relationship: "was John's mentor",
    date: 'January 2024',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
  },
  {
    quote: 'Excellent problem-solving abilities.',
    author: 'Jane Smith',
    role: 'CTO',
  },
]

describe('Testimonials Component', () => {
  describe('Rendering', () => {
    it('renders section title', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('Testimonials')
    })

    it('renders terminal command prompt', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('cat recommendations.txt')
    })

    it('renders testimonial quote', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('amazing developer with great skills')
    })

    it('renders author name', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('John Doe')
    })

    it('renders author role', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('Senior Manager')
    })

    it('renders relationship when provided', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain("was John's mentor")
    })

    it('renders date when provided', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('January 2024')
    })

    it('renders LinkedIn link when provided', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      const linkedinLink = wrapper.find('a[href*="linkedin"]')
      expect(linkedinLink.exists()).toBe(true)
    })

    it('does not render LinkedIn link when not provided', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: [mockTestimonials[1]] },
      })
      const linkedinLink = wrapper.find('a[href*="linkedin"]')
      expect(linkedinLink.exists()).toBe(false)
    })
  })

  describe('Empty State', () => {
    it('handles empty testimonials array', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: [] },
      })
      expect(wrapper.text()).toContain('No testimonials available')
    })

    it('shows empty state icon', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: [] },
      })
      // Should render the Quote icon in empty state
      const svgElements = wrapper.findAll('svg')
      expect(svgElements.length).toBeGreaterThan(0)
    })
  })

  describe('Styling', () => {
    it('has section id for navigation', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      const section = wrapper.find('#testimonials')
      expect(section.exists()).toBe(true)
    })

    it('applies scroll animation classes', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      // The component uses opacity-0 initially for animation
      const html = wrapper.html()
      expect(html).toContain('opacity-0')
    })

    it('renders terminal-style header for cards', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('testimonial-1.md')
    })
  })

  describe('Author Avatar', () => {
    it('renders initials when no image provided', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      // John Doe should show "JD" initials
      expect(wrapper.text()).toContain('JD')
    })

    it('renders image when provided', async () => {
      const testimonialWithImage: Testimonial[] = [
        {
          quote: 'Great work!',
          author: 'Test User',
          role: 'Developer',
          image: '/test-image.jpg',
        },
      ]
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: testimonialWithImage },
      })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('/test-image.jpg')
    })
  })

  describe('Multiple Testimonials', () => {
    it('renders all testimonials', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      expect(wrapper.text()).toContain('John Doe')
      expect(wrapper.text()).toContain('Jane Smith')
    })

    it('renders correct number of cards', async () => {
      const wrapper = await mountSuspended(Testimonials, {
        props: { testimonials: mockTestimonials },
      })
      // Should have testimonial-1.md and testimonial-2.md
      expect(wrapper.text()).toContain('testimonial-1.md')
      expect(wrapper.text()).toContain('testimonial-2.md')
    })
  })
})
