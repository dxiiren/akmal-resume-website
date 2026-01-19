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
    achievements: [
      'Joined during an ongoing migration from monolithic architecture to microservices',
    ],
  },
]

describe('Experience Component', () => {
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
