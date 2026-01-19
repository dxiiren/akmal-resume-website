import { useColorMode as useVueUseColorMode } from '@vueuse/core'

export function useColorMode() {
  const mode = useVueUseColorMode({
    selector: 'html',
    attribute: 'class',
    storageKey: 'color-mode',
    initialValue: 'dark',
  })

  const isDark = computed(() => mode.value === 'dark')

  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  function setMode(value: 'light' | 'dark' | 'auto') {
    mode.value = value
  }

  return {
    mode,
    isDark,
    toggle,
    setMode,
  }
}
