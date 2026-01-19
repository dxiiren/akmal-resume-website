import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Education from '~/components/resume/Education.vue'
import type { Education as EducationType } from '~/types/resume'

const mockEducation: EducationType[] = [
  {
    degree: 'Bachelor of Business Administration (Honours)',
    institution: 'Innovative University College (IUC)',
    location: 'Petaling Jaya, Selangor',
    period: 'Oct 2025 – Present',
  },
  {
    degree: 'Diploma in Computer Science',
    institution: 'Mara University of Technology (UiTM)',
    location: 'Kuala Terengganu, Terengganu',
    period: 'Sept 2020 – Feb 2023',
    cgpa: '3.86',
  },
]

describe('Education Component', () => {
  it('renders degree names', async () => {
    const wrapper = await mountSuspended(Education, {
      props: { education: mockEducation },
    })
    expect(wrapper.text()).toContain('Bachelor of Business Administration')
    expect(wrapper.text()).toContain('Diploma in Computer Science')
  })

  it('renders institution names', async () => {
    const wrapper = await mountSuspended(Education, {
      props: { education: mockEducation },
    })
    expect(wrapper.text()).toContain('Innovative University College')
    expect(wrapper.text()).toContain('Mara University of Technology')
  })

  it('renders CGPA when available', async () => {
    const wrapper = await mountSuspended(Education, {
      props: { education: mockEducation },
    })
    expect(wrapper.text()).toContain('3.86')
  })

  it('renders period', async () => {
    const wrapper = await mountSuspended(Education, {
      props: { education: mockEducation },
    })
    expect(wrapper.text()).toContain('Oct 2025 – Present')
  })

  it('has the section title', async () => {
    const wrapper = await mountSuspended(Education, {
      props: { education: mockEducation },
    })
    expect(wrapper.text()).toContain('Education')
  })
})
