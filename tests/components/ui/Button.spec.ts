import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Button } from '~/components/ui/button'
import { buttonVariants } from '~/components/ui/button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders a button element by default', async () => {
      const wrapper = await mountSuspended(Button)
      expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    })

    it('renders slot content', async () => {
      const wrapper = await mountSuspended(Button, {
        slots: {
          default: 'Click me',
        },
      })
      expect(wrapper.text()).toBe('Click me')
    })

    it('can render as a different element', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          as: 'a',
        },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    })
  })

  describe('Variants', () => {
    it('applies default variant classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          variant: 'default',
        },
      })
      expect(wrapper.classes()).toContain('bg-primary')
    })

    it('applies destructive variant classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          variant: 'destructive',
        },
      })
      expect(wrapper.classes()).toContain('bg-destructive')
    })

    it('applies outline variant classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          variant: 'outline',
        },
      })
      expect(wrapper.classes()).toContain('border')
    })

    it('applies secondary variant classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          variant: 'secondary',
        },
      })
      expect(wrapper.classes()).toContain('bg-secondary')
    })

    it('applies ghost variant classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          variant: 'ghost',
        },
      })
      expect(wrapper.classes().join(' ')).toContain('hover:bg-accent')
    })

    it('applies link variant classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          variant: 'link',
        },
      })
      expect(wrapper.classes()).toContain('underline-offset-4')
    })
  })

  describe('Sizes', () => {
    it('applies default size classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          size: 'default',
        },
      })
      expect(wrapper.classes()).toContain('h-10')
    })

    it('applies sm size classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          size: 'sm',
        },
      })
      expect(wrapper.classes()).toContain('h-9')
    })

    it('applies lg size classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          size: 'lg',
        },
      })
      expect(wrapper.classes()).toContain('h-11')
    })

    it('applies icon size classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          size: 'icon',
        },
      })
      expect(wrapper.classes()).toContain('h-10')
      expect(wrapper.classes()).toContain('w-10')
    })
  })

  describe('Custom Classes', () => {
    it('accepts custom class prop', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          class: 'custom-class',
        },
      })
      expect(wrapper.classes()).toContain('custom-class')
    })

    it('merges custom classes with variant classes', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          variant: 'default',
          class: 'custom-class',
        },
      })
      expect(wrapper.classes()).toContain('custom-class')
      expect(wrapper.classes()).toContain('bg-primary')
    })
  })

  describe('buttonVariants function', () => {
    it('returns default variant classes when no options provided', () => {
      const classes = buttonVariants()
      expect(classes).toContain('bg-primary')
      expect(classes).toContain('h-10')
    })

    it('returns correct variant classes', () => {
      const destructiveClasses = buttonVariants({ variant: 'destructive' })
      expect(destructiveClasses).toContain('bg-destructive')
    })

    it('returns correct size classes', () => {
      const lgClasses = buttonVariants({ size: 'lg' })
      expect(lgClasses).toContain('h-11')
    })

    it('combines variant and size', () => {
      const classes = buttonVariants({ variant: 'outline', size: 'sm' })
      expect(classes).toContain('border')
      expect(classes).toContain('h-9')
    })
  })

  describe('Base Styles', () => {
    it('has inline-flex display', async () => {
      const wrapper = await mountSuspended(Button)
      expect(wrapper.classes()).toContain('inline-flex')
    })

    it('has centered items', async () => {
      const wrapper = await mountSuspended(Button)
      expect(wrapper.classes()).toContain('items-center')
      expect(wrapper.classes()).toContain('justify-center')
    })

    it('has rounded corners', async () => {
      const wrapper = await mountSuspended(Button)
      expect(wrapper.classes()).toContain('rounded-md')
    })

    it('has focus styles', async () => {
      const wrapper = await mountSuspended(Button)
      const classString = wrapper.classes().join(' ')
      expect(classString).toContain('focus-visible:outline-none')
    })

    it('has disabled styles', async () => {
      const wrapper = await mountSuspended(Button)
      const classString = wrapper.classes().join(' ')
      expect(classString).toContain('disabled:pointer-events-none')
      expect(classString).toContain('disabled:opacity-50')
    })
  })
})
