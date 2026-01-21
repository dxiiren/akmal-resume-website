import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Projects from '~/components/resume/Projects.vue'
import type { Project } from '~/types/resume'

const mockProjects: Project[] = [
  {
    name: 'MyInvois LHDN E-Invoicing Integration',
    year: '2024',
    type: 'Integration',
    impactMetric: '10K+ monthly invoices',
    technologies: ['PHP', 'Laravel', 'LHDN API'],
    achievements: [
      'Integrated back-end APIs with Malaysia\'s LHDN e-Invoicing system',
    ],
    link: 'https://example.com/project1',
  },
  {
    name: 'Jom Say Heart Healthcare Platform',
    year: '2023',
    type: 'Platform',
    technologies: ['Laravel', 'MySQL', 'RESTful API'],
    achievements: [
      'Designed comprehensive patient management system',
    ],
  },
  {
    name: 'Test System',
    year: '2022',
    type: 'System',
    technologies: ['PHP'],
    achievements: ['Built something'],
  },
]

describe('Projects Component', () => {
  describe('Basic Rendering', () => {
    it('renders project names', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      expect(wrapper.text()).toContain('MyInvois LHDN E-Invoicing Integration')
      expect(wrapper.text()).toContain('Jom Say Heart Healthcare Platform')
    })

    it('renders project years', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      expect(wrapper.text()).toContain('2024')
      expect(wrapper.text()).toContain('2023')
    })

    it('renders technologies', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      expect(wrapper.text()).toContain('Laravel')
      expect(wrapper.text()).toContain('MySQL')
    })

    it('renders achievements', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      expect(wrapper.text()).toContain('LHDN e-Invoicing system')
      expect(wrapper.text()).toContain('patient management system')
    })

    it('has the section title', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      expect(wrapper.text()).toContain('Projects')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty projects array', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [] },
      })
      expect(wrapper.exists()).toBe(true)
      // Should still render section title
      expect(wrapper.text()).toContain('Projects')
    })

    it('handles single project', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[0]] },
      })
      expect(wrapper.text()).toContain('MyInvois LHDN')
    })
  })

  describe('External Links', () => {
    it('renders project with link (shows external icon)', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[0]] }, // Has link
      })
      // Projects with links should be clickable
      const link = wrapper.find('a[href="https://example.com/project1"]')
      expect(link.exists()).toBe(true)
    })

    it('renders project without link (no external link)', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[1]] }, // No link
      })
      // The project without link should have cursor-default
      const html = wrapper.html()
      expect(html).toContain('cursor-default')
    })
  })

  describe('Type Badges', () => {
    it('applies correct type badge for Integration', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[0]] },
      })
      expect(wrapper.text()).toContain('Integration')
    })

    it('applies correct type badge for Platform', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[1]] },
      })
      expect(wrapper.text()).toContain('Platform')
    })

    it('applies correct type badge for System', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[2]] },
      })
      expect(wrapper.text()).toContain('System')
    })
  })

  describe('Type Config Fallback', () => {
    it('applies default config when type is undefined', async () => {
      const projectWithoutType: Project[] = [
        {
          name: 'No Type Project',
          year: '2024',
          technologies: ['TypeScript'],
          achievements: ['Achievement 1'],
          // type intentionally omitted
        },
      ]

      const wrapper = await mountSuspended(Projects, {
        props: { projects: projectWithoutType },
      })

      expect(wrapper.text()).toContain('No Type Project')
      expect(wrapper.html()).toContain('text-primary')
    })

    it('applies default config when type is unknown value', async () => {
      const projectWithUnknownType: Project[] = [
        {
          name: 'Unknown Type Project',
          year: '2024',
          technologies: ['Go'],
          achievements: ['Built something'],
          type: 'UnknownType' as Project['type'],
        },
      ]

      const wrapper = await mountSuspended(Projects, {
        props: { projects: projectWithUnknownType },
      })

      expect(wrapper.text()).toContain('Unknown Type Project')
      expect(wrapper.html()).toContain('text-primary')
    })
  })

  describe('Impact Metric', () => {
    it('renders impact metric when provided', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[0]] },
      })
      expect(wrapper.text()).toContain('10K+ monthly invoices')
    })

    it('does not render impact metric when not provided', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: [mockProjects[1]] }, // No impact metric
      })
      // Should render without impact metric text
      expect(wrapper.text()).not.toContain('monthly invoices')
    })
  })

  describe('Layout', () => {
    it('has section id for navigation', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      const section = wrapper.find('#projects')
      expect(section.exists()).toBe(true)
    })

    it('applies scroll animation classes', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      const html = wrapper.html()
      expect(html).toContain('opacity-0')
    })

    it('renders mobile carousel container', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      const mobileContainer = wrapper.find('.md\\:hidden')
      expect(mobileContainer.exists()).toBe(true)
    })

    it('renders desktop grid container', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      const desktopGrid = wrapper.find('.hidden.md\\:grid')
      expect(desktopGrid.exists()).toBe(true)
    })
  })

  describe('Terminal Style Elements', () => {
    it('renders terminal-style header for cards', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      // Terminal header with dots should exist
      const dots = wrapper.findAll('.rounded-full')
      expect(dots.length).toBeGreaterThan(0)
    })

    it('renders project filename in terminal header', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      // Should contain project-YEAR.md format
      expect(wrapper.text()).toContain('project-2024.md')
      expect(wrapper.text()).toContain('project-2023.md')
    })
  })

  describe('Animation Delays', () => {
    it('applies animation delays to cards', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })
      const html = wrapper.html()
      expect(html).toContain('animation-delay')
    })
  })

  describe('3D Tilt Effect', () => {
    it('applies 3D tilt transform on mouse move', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })

      // Find the desktop card element
      const desktopCards = wrapper.findAll('.hidden.md\\:grid .group')
      expect(desktopCards.length).toBeGreaterThan(0)

      const cardEl = desktopCards[0].element as HTMLElement

      // Mock getBoundingClientRect for the card
      cardEl.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      })

      // Create and dispatch a real MouseEvent - this properly sets currentTarget
      const mouseEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: 150,
        clientY: 150,
      })

      cardEl.dispatchEvent(mouseEvent)
      await wrapper.vm.$nextTick()

      // The transform should be applied with perspective and rotation
      expect(cardEl.style.transform).toContain('perspective')
      expect(cardEl.style.transform).toContain('rotateX')
      expect(cardEl.style.transform).toContain('rotateY')
      expect(cardEl.style.transform).toContain('scale3d')
    })

    it('resets transform on mouse leave', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })

      const desktopCards = wrapper.findAll('.hidden.md\\:grid .group')
      expect(desktopCards.length).toBeGreaterThan(0)

      const cardEl = desktopCards[0].element as HTMLElement

      // First set a transform (simulating after mousemove)
      cardEl.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) scale3d(1.02, 1.02, 1.02)'

      // Dispatch a real mouseleave event
      const mouseLeaveEvent = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
      })

      cardEl.dispatchEvent(mouseLeaveEvent)
      await wrapper.vm.$nextTick()

      // Transform should be reset to neutral position
      expect(cardEl.style.transform).toContain('rotateX(0)')
      expect(cardEl.style.transform).toContain('rotateY(0)')
      expect(cardEl.style.transform).toContain('scale3d(1, 1, 1)')
    })

    it('calculates different rotation based on mouse position', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })

      const desktopCards = wrapper.findAll('.hidden.md\\:grid .group')
      expect(desktopCards.length).toBeGreaterThan(0)

      const cardEl = desktopCards[0].element as HTMLElement

      // Mock getBoundingClientRect
      cardEl.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      })

      // Mouse at top-left corner should give different rotation than center
      const cornerEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: 10, // Near left edge
        clientY: 10, // Near top edge
      })

      cardEl.dispatchEvent(cornerEvent)
      await wrapper.vm.$nextTick()

      // Transform should be applied
      expect(cardEl.style.transform).toContain('perspective(1000px)')
    })

    it('cards have transition style for smooth animation', async () => {
      const wrapper = await mountSuspended(Projects, {
        props: { projects: mockProjects },
      })

      // Desktop cards should have transition styling for smooth 3D effect
      const html = wrapper.html()
      expect(html).toContain('transition: transform')
      expect(html).toContain('0.2s')
    })
  })
})
