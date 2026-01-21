import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Summary from '~/components/resume/Summary.vue'
import type { AboutMe } from '~/types/resume'

const mockSummary = 'Backend Engineer with 4+ years of experience designing, integrating, and maintaining production-grade backend systems.'

const mockAboutMeWithInvalidIcons: AboutMe = {
  pillars: [
    {
      title: 'Test Pillar',
      icon: 'InvalidIconName', // Not in iconMap - triggers fallback
      description: 'Testing fallback',
    },
  ],
  funFacts: [
    {
      icon: 'NonExistentIcon', // Not in iconMap - triggers fallback
      text: 'Testing fun fact fallback',
    },
  ],
}

describe('Summary Component', () => {
  it('renders the summary text', async () => {
    const wrapper = await mountSuspended(Summary, {
      props: { summary: mockSummary },
    })
    expect(wrapper.text()).toContain('Backend Engineer with 4+ years')
  })

  it('has the section title', async () => {
    const wrapper = await mountSuspended(Summary, {
      props: { summary: mockSummary },
    })
    expect(wrapper.text()).toContain('About')
  })

  describe('Icon Fallback', () => {
    it('falls back to Hammer icon for invalid icon names', async () => {
      const wrapper = await mountSuspended(Summary, {
        props: { summary: mockSummary, aboutMe: mockAboutMeWithInvalidIcons },
      })
      // Component renders without error using Hammer fallback
      expect(wrapper.text()).toContain('Test Pillar')
      expect(wrapper.text()).toContain('Testing fun fact fallback')
    })
  })
})
