import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Contact from '~/components/resume/Contact.vue'
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

describe('Contact Component', () => {
  it('renders email link', async () => {
    const wrapper = await mountSuspended(Contact, {
      props: { contact: mockContact },
    })
    const emailLink = wrapper.find('a[href*="mailto"]')
    expect(emailLink.exists()).toBe(true)
  })

  it('renders phone number', async () => {
    const wrapper = await mountSuspended(Contact, {
      props: { contact: mockContact },
    })
    expect(wrapper.text()).toContain('19-535-7250')
  })

  it('renders LinkedIn link', async () => {
    const wrapper = await mountSuspended(Contact, {
      props: { contact: mockContact },
    })
    const linkedinLink = wrapper.find('a[href*="linkedin"]')
    expect(linkedinLink.exists()).toBe(true)
  })

  it('has the section title', async () => {
    const wrapper = await mountSuspended(Contact, {
      props: { contact: mockContact },
    })
    expect(wrapper.text()).toContain('Contact')
  })
})
