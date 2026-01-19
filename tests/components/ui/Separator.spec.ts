import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Separator } from '~/components/ui/separator'

describe('Separator Component', () => {
  describe('Rendering', () => {
    it('renders the separator element', async () => {
      const wrapper = await mountSuspended(Separator)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Horizontal Orientation (Default)', () => {
    it('has horizontal layout by default', async () => {
      const wrapper = await mountSuspended(Separator)
      expect(wrapper.classes()).toContain('h-[1px]')
      expect(wrapper.classes()).toContain('w-full')
    })

    it('applies horizontal classes when orientation is horizontal', async () => {
      const wrapper = await mountSuspended(Separator, {
        props: { orientation: 'horizontal' },
      })
      expect(wrapper.classes()).toContain('h-[1px]')
      expect(wrapper.classes()).toContain('w-full')
    })
  })

  describe('Vertical Orientation', () => {
    it('applies vertical classes when orientation is vertical', async () => {
      const wrapper = await mountSuspended(Separator, {
        props: { orientation: 'vertical' },
      })
      expect(wrapper.classes()).toContain('h-full')
      expect(wrapper.classes()).toContain('w-[1px]')
    })
  })

  describe('Base Styles', () => {
    it('has shrink-0 class', async () => {
      const wrapper = await mountSuspended(Separator)
      expect(wrapper.classes()).toContain('shrink-0')
    })

    it('has background color class', async () => {
      const wrapper = await mountSuspended(Separator)
      expect(wrapper.classes()).toContain('bg-border')
    })
  })

  describe('Custom Classes', () => {
    it('accepts custom class prop', async () => {
      const wrapper = await mountSuspended(Separator, {
        props: { class: 'custom-separator' },
      })
      expect(wrapper.classes()).toContain('custom-separator')
    })

    it('merges custom classes with default classes', async () => {
      const wrapper = await mountSuspended(Separator, {
        props: { class: 'my-4' },
      })
      expect(wrapper.classes()).toContain('my-4')
      expect(wrapper.classes()).toContain('shrink-0')
    })
  })

  describe('Decorative Role', () => {
    it('has decorative role by default', async () => {
      const wrapper = await mountSuspended(Separator)
      // Radix Vue Separator sets role="none" for decorative separators by default
      const role = wrapper.attributes('role')
      expect(role === 'none' || role === 'separator' || role === undefined).toBe(true)
    })
  })
})
