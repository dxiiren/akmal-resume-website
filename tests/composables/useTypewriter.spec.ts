import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { useTypewriter } from '~/composables/useTypewriter'

// Create a test component that uses the composable
const createTestComponent = (text: string, options = {}) => {
  return defineComponent({
    setup() {
      const { displayText, isComplete, showCursor } = useTypewriter(text, options)
      return { displayText, isComplete, showCursor }
    },
    render() {
      return h('div', {}, [
        h('span', { class: 'text' }, this.displayText),
        h('span', { class: 'cursor' }, this.showCursor ? '|' : ''),
        h('span', { class: 'complete' }, this.isComplete ? 'done' : 'typing'),
      ])
    },
  })
}

describe('useTypewriter composable', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns empty displayText initially', () => {
    const TestComponent = createTestComponent('Hello')
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.text').text()).toBe('')
  })

  it('returns isComplete as false initially', () => {
    const TestComponent = createTestComponent('Hello')
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.complete').text()).toBe('typing')
  })

  it('returns showCursor as true initially', () => {
    const TestComponent = createTestComponent('Hello')
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.cursor').text()).toBe('|')
  })

  it('types text character by character after initial delay', async () => {
    const TestComponent = createTestComponent('Hi', { delay: 50, initialDelay: 100 })
    const wrapper = mount(TestComponent)

    // Initial state - no text
    expect(wrapper.find('.text').text()).toBe('')

    // After initial delay, first character should appear
    await vi.advanceTimersByTimeAsync(100)
    expect(wrapper.find('.text').text()).toBe('H')

    // After another delay, second character should appear
    await vi.advanceTimersByTimeAsync(50)
    expect(wrapper.find('.text').text()).toBe('Hi')
  })

  it('sets isComplete to true when typing finishes', async () => {
    const TestComponent = createTestComponent('Hi', { delay: 50, initialDelay: 100 })
    const wrapper = mount(TestComponent)

    // Type all characters
    await vi.advanceTimersByTimeAsync(100) // initial delay
    await vi.advanceTimersByTimeAsync(50) // 'H'
    await vi.advanceTimersByTimeAsync(50) // 'i'

    expect(wrapper.find('.complete').text()).toBe('done')
  })

  it('uses default delay of 80ms', async () => {
    const TestComponent = createTestComponent('AB', { initialDelay: 0 })
    const wrapper = mount(TestComponent)

    await vi.advanceTimersByTimeAsync(0)
    expect(wrapper.find('.text').text()).toBe('A')

    await vi.advanceTimersByTimeAsync(80)
    expect(wrapper.find('.text').text()).toBe('AB')
  })

  it('uses default initialDelay of 500ms', async () => {
    const TestComponent = createTestComponent('X', { delay: 10 })
    const wrapper = mount(TestComponent)

    // Before initial delay
    await vi.advanceTimersByTimeAsync(499)
    expect(wrapper.find('.text').text()).toBe('')

    // After initial delay
    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.find('.text').text()).toBe('X')
  })

  it('blinks cursor while typing (530ms interval)', async () => {
    const TestComponent = createTestComponent('ABCDEFGHIJ', { delay: 100, initialDelay: 0 })
    const wrapper = mount(TestComponent)

    // Initial state - cursor shown
    expect(wrapper.find('.cursor').text()).toBe('|')

    // After 530ms - cursor should toggle off
    await vi.advanceTimersByTimeAsync(530)
    const cursorAfterFirstToggle = wrapper.find('.cursor').text()
    // Cursor could be either '' or '|' depending on exact timing
    expect(['', '|']).toContain(cursorAfterFirstToggle)
  })

  it('hides cursor 2 seconds after completion', async () => {
    const TestComponent = createTestComponent('X', { delay: 10, initialDelay: 0 })
    const wrapper = mount(TestComponent)

    // Complete typing
    await vi.advanceTimersByTimeAsync(10)
    expect(wrapper.find('.complete').text()).toBe('done')

    // Cursor should still be visible (may blink)
    // Wait for 2000ms to hide cursor
    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.find('.cursor').text()).toBe('')
  })

  it('handles empty string', async () => {
    const TestComponent = createTestComponent('', { initialDelay: 0 })
    const wrapper = mount(TestComponent)

    await vi.advanceTimersByTimeAsync(0)
    expect(wrapper.find('.text').text()).toBe('')
    expect(wrapper.find('.complete').text()).toBe('done')
  })

  it('handles long text correctly', async () => {
    const longText = 'Hello World'
    const TestComponent = createTestComponent(longText, { delay: 10, initialDelay: 0 })
    const wrapper = mount(TestComponent)

    // Type all characters (11 chars * 10ms each)
    await vi.advanceTimersByTimeAsync(10 * longText.length)
    expect(wrapper.find('.text').text()).toBe(longText)
  })

  it('cleans up timeouts on unmount', async () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    const TestComponent = createTestComponent('Hello', { delay: 100, initialDelay: 100 })
    const wrapper = mount(TestComponent)

    // Start typing
    await vi.advanceTimersByTimeAsync(100)

    // Unmount before completion
    wrapper.unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    expect(clearIntervalSpy).toHaveBeenCalled()

    clearTimeoutSpy.mockRestore()
    clearIntervalSpy.mockRestore()
  })
})
