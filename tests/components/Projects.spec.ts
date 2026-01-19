import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Projects from '~/components/resume/Projects.vue'
import type { Project } from '~/types/resume'

const mockProjects: Project[] = [
  {
    name: 'MyInvois LHDN E-Invoicing Integration',
    year: '2024',
    technologies: ['PHP', 'Laravel', 'LHDN API'],
    achievements: [
      'Integrated back-end APIs with Malaysia\'s LHDN e-Invoicing system',
    ],
  },
  {
    name: 'Jom Say Heart Healthcare Platform',
    year: '2023',
    technologies: ['Laravel', 'MySQL', 'RESTful API'],
    achievements: [
      'Designed comprehensive patient management system',
    ],
  },
]

describe('Projects Component', () => {
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
