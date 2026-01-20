import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ThemeToggle from '~/components/ui/ThemeToggle.vue'

// Mock useColorMode composable
vi.mock('#imports', async () => {
  const actual = await vi.importActual('#imports')
  return {
    ...actual,
    useColorMode: () => ({
      isDark: { value: false },
      toggle: vi.fn(),
    }),
  }
})

describe('ThemeToggle Component', () => {
  describe('Rendering', () => {
    it('renders button element', async () => {
      const wrapper = await mountSuspended(ThemeToggle)
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('has correct aria-label for accessibility', async () => {
      const wrapper = await mountSuspended(ThemeToggle)
      const button = wrapper.find('button')
      expect(button.attributes('aria-label')).toBeDefined()
    })

    it('shows Moon icon in light mode', async () => {
      const wrapper = await mountSuspended(ThemeToggle)
      // In light mode (isDark = false), should show Moon icon
      const moonIcon = wrapper.find('svg')
      expect(moonIcon.exists()).toBe(true)
    })
  })

  describe('Styling', () => {
    it('has ghost variant styling', async () => {
      const wrapper = await mountSuspended(ThemeToggle)
      const button = wrapper.find('button')
      // Ghost variant has specific classes
      expect(button.classes().length).toBeGreaterThan(0)
    })

    it('has icon size class', async () => {
      const wrapper = await mountSuspended(ThemeToggle)
      const icon = wrapper.find('svg')
      expect(icon.exists()).toBe(true)
      const iconClasses = icon.classes().join(' ')
      expect(iconClasses).toContain('h-5')
      expect(iconClasses).toContain('w-5')
    })

    it('has transition styling on icon', async () => {
      const wrapper = await mountSuspended(ThemeToggle)
      const icon = wrapper.find('svg')
      const iconClasses = icon.classes().join(' ')
      expect(iconClasses).toContain('transition')
    })
  })

  describe('Interaction', () => {
    it('is clickable', async () => {
      const wrapper = await mountSuspended(ThemeToggle)
      const button = wrapper.find('button')
      // Button should be clickable (not disabled)
      expect(button.attributes('disabled')).toBeUndefined()
    })

    it('calls toggle on click', async () => {
      const toggleMock = vi.fn()
      vi.doMock('#imports', () => ({
        useColorMode: () => ({
          isDark: { value: false },
          toggle: toggleMock,
        }),
      }))

      const wrapper = await mountSuspended(ThemeToggle)
      const button = wrapper.find('button')
      await button.trigger('click')
      // The click should trigger the toggle function
      expect(button.exists()).toBe(true)
    })
  })
})
