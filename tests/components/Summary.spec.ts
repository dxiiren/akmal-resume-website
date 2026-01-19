import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Summary from '~/components/resume/Summary.vue'

const mockSummary = 'Backend Engineer with 4+ years of experience designing, integrating, and maintaining production-grade backend systems.'

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
})
