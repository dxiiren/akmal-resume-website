import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Hero from '~/components/resume/Hero.vue'
import type { ContactInfo } from '~/types/resume'

const mockContact: ContactInfo = {
  name: 'Akmal Suhaimi',
  title: 'Backend Engineer',
  location: '43000, Kajang, Selangor',
  phone: '(+60) 19-535-7250',
  email: 'mhdakmal875@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akmal-suhaimi',
  website: 'https://akmalsuhaimi.com',
  image: '/images/profile.jpg',
  github: 'https://github.com/dxiiren',
  whatsapp: 'https://wa.me/60195357250?text=Hi%20Akmal%20!',
}

describe('Hero Component', () => {
  it('renders the name correctly', async () => {
    const wrapper = await mountSuspended(Hero, {
      props: { contact: mockContact },
    })
    // Wait for typewriter effect to complete (name has 14 chars, 80ms each + 500ms initial delay = ~1620ms)
    // Using 3000ms to account for test environment variability
    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(wrapper.text()).toContain('Akmal Suhaimi')
  }, 10000)

  it('renders the job title', async () => {
    const wrapper = await mountSuspended(Hero, {
      props: { contact: mockContact },
    })
    expect(wrapper.text()).toContain('Backend Engineer')
  })

  it('renders the location', async () => {
    const wrapper = await mountSuspended(Hero, {
      props: { contact: mockContact },
    })
    expect(wrapper.text()).toContain('Kajang, Selangor')
  })

  it('renders contact information', async () => {
    const wrapper = await mountSuspended(Hero, {
      props: { contact: mockContact },
    })
    expect(wrapper.text()).toContain('mhdakmal875@gmail.com')
  })

  it('renders the profile image', async () => {
    const wrapper = await mountSuspended(Hero, {
      props: { contact: mockContact },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
  })

  it('has LinkedIn link', async () => {
    const wrapper = await mountSuspended(Hero, {
      props: { contact: mockContact },
    })
    const linkedinLink = wrapper.find('a[href*="linkedin"]')
    expect(linkedinLink.exists()).toBe(true)
  })
})
