import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

// Create a shared mock ref that we can control
const mockModeRef = ref('dark')

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  useColorMode: vi.fn(() => mockModeRef),
}))

describe('useColorMode Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset to default state
    mockModeRef.value = 'dark'
  })

  describe('isDark computed', () => {
    it('returns true when mode is dark', async () => {
      mockModeRef.value = 'dark'
      const { useColorMode } = await import('~/composables/useColorMode')
      const { isDark } = useColorMode()

      expect(isDark.value).toBe(true)
    })

    it('returns false when mode is light', async () => {
      mockModeRef.value = 'light'
      const { useColorMode } = await import('~/composables/useColorMode')
      const { isDark } = useColorMode()

      expect(isDark.value).toBe(false)
    })
  })

  describe('toggle function', () => {
    it('toggles from dark to light', async () => {
      mockModeRef.value = 'dark'
      const { useColorMode } = await import('~/composables/useColorMode')
      const { toggle, mode } = useColorMode()

      toggle()
      expect(mode.value).toBe('light')
    })

    it('toggles from light to dark', async () => {
      mockModeRef.value = 'light'
      const { useColorMode } = await import('~/composables/useColorMode')
      const { toggle, mode } = useColorMode()

      toggle()
      expect(mode.value).toBe('dark')
    })
  })

  describe('setMode function', () => {
    it('sets mode to light', async () => {
      mockModeRef.value = 'dark'
      const { useColorMode } = await import('~/composables/useColorMode')
      const { setMode, mode } = useColorMode()

      setMode('light')
      expect(mode.value).toBe('light')
    })

    it('sets mode to dark', async () => {
      mockModeRef.value = 'light'
      const { useColorMode } = await import('~/composables/useColorMode')
      const { setMode, mode } = useColorMode()

      setMode('dark')
      expect(mode.value).toBe('dark')
    })

    it('sets mode to auto', async () => {
      mockModeRef.value = 'dark'
      const { useColorMode } = await import('~/composables/useColorMode')
      const { setMode, mode } = useColorMode()

      setMode('auto')
      expect(mode.value).toBe('auto')
    })
  })

  describe('return values', () => {
    it('returns mode, isDark, toggle, and setMode', async () => {
      const { useColorMode } = await import('~/composables/useColorMode')
      const result = useColorMode()

      expect(result).toHaveProperty('mode')
      expect(result).toHaveProperty('isDark')
      expect(result).toHaveProperty('toggle')
      expect(result).toHaveProperty('setMode')
      expect(typeof result.toggle).toBe('function')
      expect(typeof result.setMode).toBe('function')
    })
  })
})
