import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Skills from '~/components/resume/Skills.vue'
import type { SkillCategory } from '~/types/resume'

const mockSkills: SkillCategory[] = [
  { category: 'Languages', skills: ['PHP', 'JavaScript', 'Python'] },
  { category: 'Back-End', skills: ['Laravel', 'CodeIgniter'] },
]

describe('Skills Component', () => {
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
