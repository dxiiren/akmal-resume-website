import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Badge } from '~/components/ui/badge'
import { badgeVariants } from '~/components/ui/badge'

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders a div element', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('renders slot content', async () => {
      const wrapper = await mountSuspended(Badge, {
        slots: {
          default: 'Badge Text',
        },
      })
      expect(wrapper.text()).toBe('Badge Text')
    })
  })

  describe('Variants', () => {
    it('applies default variant classes', async () => {
      const wrapper = await mountSuspended(Badge, {
        props: {
          variant: 'default',
        },
      })
      expect(wrapper.classes()).toContain('bg-primary')
    })

    it('applies secondary variant classes', async () => {
      const wrapper = await mountSuspended(Badge, {
        props: {
          variant: 'secondary',
        },
      })
      expect(wrapper.classes()).toContain('bg-secondary')
    })

    it('applies destructive variant classes', async () => {
      const wrapper = await mountSuspended(Badge, {
        props: {
          variant: 'destructive',
        },
      })
      expect(wrapper.classes()).toContain('bg-destructive')
    })

    it('applies outline variant classes', async () => {
      const wrapper = await mountSuspended(Badge, {
        props: {
          variant: 'outline',
        },
      })
      expect(wrapper.classes()).toContain('text-foreground')
    })
  })

  describe('Custom Classes', () => {
    it('accepts custom class prop', async () => {
      const wrapper = await mountSuspended(Badge, {
        props: {
          class: 'custom-class',
        },
      })
      expect(wrapper.classes()).toContain('custom-class')
    })

    it('merges custom classes with variant classes', async () => {
      const wrapper = await mountSuspended(Badge, {
        props: {
          variant: 'default',
          class: 'extra-padding',
        },
      })
      expect(wrapper.classes()).toContain('extra-padding')
      expect(wrapper.classes()).toContain('bg-primary')
    })
  })

  describe('badgeVariants function', () => {
    it('returns default variant classes when no options provided', () => {
      const classes = badgeVariants()
      expect(classes).toContain('bg-primary')
    })

    it('returns correct variant classes for secondary', () => {
      const classes = badgeVariants({ variant: 'secondary' })
      expect(classes).toContain('bg-secondary')
    })

    it('returns correct variant classes for destructive', () => {
      const classes = badgeVariants({ variant: 'destructive' })
      expect(classes).toContain('bg-destructive')
    })

    it('returns correct variant classes for outline', () => {
      const classes = badgeVariants({ variant: 'outline' })
      expect(classes).toContain('text-foreground')
    })
  })

  describe('Base Styles', () => {
    it('has inline-flex display', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('inline-flex')
    })

    it('has centered items', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('items-center')
    })

    it('has rounded-full border radius', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('rounded-full')
    })

    it('has border', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('border')
    })

    it('has correct padding', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('px-2.5')
      expect(wrapper.classes()).toContain('py-0.5')
    })

    it('has correct font size', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('text-xs')
    })

    it('has semibold font weight', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('font-semibold')
    })

    it('has transition for colors', async () => {
      const wrapper = await mountSuspended(Badge)
      expect(wrapper.classes()).toContain('transition-colors')
    })

    it('has focus styles', async () => {
      const wrapper = await mountSuspended(Badge)
      const classString = wrapper.classes().join(' ')
      expect(classString).toContain('focus:outline-none')
    })
  })
})
