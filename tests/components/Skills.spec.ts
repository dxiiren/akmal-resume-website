import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Skills from '~/components/resume/Skills.vue'
import type { SkillCategory } from '~/types/resume'

const mockSkills: SkillCategory[] = [
  { category: 'Languages', skills: ['PHP', 'JavaScript', 'Python'] },
  { category: 'Back-End', skills: ['Laravel', 'CodeIgniter'] },
  { category: 'Database', skills: ['MySQL'] },
]

describe('Skills Component', () => {
  describe('Basic Rendering', () => {
    it('renders skill categories', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      expect(wrapper.text()).toContain('Languages')
      expect(wrapper.text()).toContain('Back-End')
    })

    it('renders individual skills', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      expect(wrapper.text()).toContain('PHP')
      expect(wrapper.text()).toContain('JavaScript')
      expect(wrapper.text()).toContain('Laravel')
    })

    it('has the section title', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      expect(wrapper.text()).toContain('Skills')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty skills array', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: [] },
      })
      expect(wrapper.exists()).toBe(true)
      // Should still render section title
      expect(wrapper.text()).toContain('Skills')
    })

    it('handles single skill category', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: [{ category: 'Languages', skills: ['PHP'] }] },
      })
      expect(wrapper.text()).toContain('Languages')
      expect(wrapper.text()).toContain('PHP')
    })

    it('handles category with single skill', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: [{ category: 'Test', skills: ['SingleSkill'] }] },
      })
      expect(wrapper.text()).toContain('SingleSkill')
    })
  })

  describe('Core Stack Highlighting', () => {
    it('highlights core stack skills (Laravel, PHP, MySQL)', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      // Core stack section should be visible
      expect(wrapper.text()).toContain('core_stack')
      // Check for highlighted core skills
      expect(wrapper.text()).toContain('Laravel')
      expect(wrapper.text()).toContain('PHP')
      expect(wrapper.text()).toContain('MySQL')
    })

    it('renders core stack highlight section', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      // Look for the core stack indicator
      expect(wrapper.text()).toContain('core_stack')
    })
  })

  describe('Terminal Style Elements', () => {
    it('renders terminal command prompt', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      expect(wrapper.text()).toContain('cat skills.json')
    })

    it('renders terminal-style headers for cards', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      // Terminal dots should exist
      const dots = wrapper.findAll('.rounded-full')
      expect(dots.length).toBeGreaterThan(0)
    })

    it('renders category filename in terminal header', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      // Categories are converted to lowercase with dashes
      expect(wrapper.text()).toContain('languages.json')
      expect(wrapper.text()).toContain('back-end.json')
    })
  })

  describe('Layout', () => {
    it('has section id for navigation', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      const section = wrapper.find('#skills')
      expect(section.exists()).toBe(true)
    })

    it('applies scroll animation classes', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      const html = wrapper.html()
      expect(html).toContain('opacity-0')
    })

    it('renders mobile carousel container', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      // Mobile carousel should be hidden on desktop (md:hidden)
      const mobileContainer = wrapper.find('.md\\:hidden')
      expect(mobileContainer.exists()).toBe(true)
    })

    it('renders desktop grid container', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      // Desktop grid should be hidden on mobile
      const desktopGrid = wrapper.find('.hidden.md\\:grid')
      expect(desktopGrid.exists()).toBe(true)
    })
  })

  describe('Animation Delays', () => {
    it('applies animation delays to cards', async () => {
      const wrapper = await mountSuspended(Skills, {
        props: { skills: mockSkills },
      })
      const html = wrapper.html()
      // Animation delay classes should be present
      expect(html).toContain('animation-delay')
    })
  })
})
