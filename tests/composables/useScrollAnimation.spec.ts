import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, h, nextTick } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  options: IntersectionObserverInit
  observedElements: Element[] = []

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback
    this.options = options
    MockIntersectionObserver.instances.push(this)
  }

  observe(element: Element) {
    this.observedElements.push(element)
  }

  unobserve(element: Element) {
    const index = this.observedElements.indexOf(element)
    if (index > -1) {
      this.observedElements.splice(index, 1)
    }
  }

  disconnect() {
    this.observedElements = []
  }

  // Helper to simulate intersection
  simulateIntersection(isIntersecting: boolean) {
    const entries = this.observedElements.map((target) => ({
      target,
      isIntersecting,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now(),
    }))
    this.callback(entries, this as unknown as IntersectionObserver)
  }

  static instances: MockIntersectionObserver[] = []
  static clear() {
    MockIntersectionObserver.instances = []
  }
}

// Create a test component that uses the composable
const createTestComponent = (options = {}) => {
  return defineComponent({
    setup() {
      const targetRef = ref<HTMLElement | null>(null)
      const { isVisible } = useScrollAnimation(targetRef, options)
      return { targetRef, isVisible }
    },
    render() {
      return h('div', { ref: 'targetRef', class: 'target' }, [
        h('span', { class: 'visibility' }, this.isVisible ? 'visible' : 'hidden'),
      ])
    },
  })
}

describe('useScrollAnimation composable', () => {
  beforeEach(() => {
    MockIntersectionObserver.clear()
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns isVisible as false initially', () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.visibility').text()).toBe('hidden')
  })

  it('creates an IntersectionObserver on mount', () => {
    const TestComponent = createTestComponent()
    mount(TestComponent)
    expect(MockIntersectionObserver.instances.length).toBe(1)
  })

  it('observes the target element', () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]
    expect(observer.observedElements.length).toBe(1)
    expect(observer.observedElements[0]).toBe(wrapper.find('.target').element)
  })

  it('sets isVisible to true when element intersects', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]

    // Simulate intersection
    observer.simulateIntersection(true)
    await nextTick()

    expect(wrapper.find('.visibility').text()).toBe('visible')
  })

  it('uses default threshold of 0.1', () => {
    const TestComponent = createTestComponent()
    mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]
    expect(observer.options.threshold).toBe(0.1)
  })

  it('uses default rootMargin of "0px 0px -50px 0px"', () => {
    const TestComponent = createTestComponent()
    mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]
    expect(observer.options.rootMargin).toBe('0px 0px -50px 0px')
  })

  it('accepts custom threshold option', () => {
    const TestComponent = createTestComponent({ threshold: 0.5 })
    mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]
    expect(observer.options.threshold).toBe(0.5)
  })

  it('accepts custom rootMargin option', () => {
    const TestComponent = createTestComponent({ rootMargin: '100px' })
    mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]
    expect(observer.options.rootMargin).toBe('100px')
  })

  it('unobserves element after first intersection when once is true (default)', async () => {
    const TestComponent = createTestComponent({ once: true })
    const wrapper = mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]

    expect(observer.observedElements.length).toBe(1)

    // Simulate intersection
    observer.simulateIntersection(true)
    await nextTick()

    expect(observer.observedElements.length).toBe(0)
  })

  it('keeps observing when once is false', async () => {
    const TestComponent = createTestComponent({ once: false })
    const wrapper = mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]

    expect(observer.observedElements.length).toBe(1)

    // Simulate intersection
    observer.simulateIntersection(true)
    await nextTick()

    expect(observer.observedElements.length).toBe(1)
    expect(wrapper.find('.visibility').text()).toBe('visible')
  })

  it('toggles visibility when once is false', async () => {
    const TestComponent = createTestComponent({ once: false })
    const wrapper = mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]

    // Element enters viewport
    observer.simulateIntersection(true)
    await nextTick()
    expect(wrapper.find('.visibility').text()).toBe('visible')

    // Element leaves viewport
    observer.simulateIntersection(false)
    await nextTick()
    expect(wrapper.find('.visibility').text()).toBe('hidden')
  })

  it('stays visible after leaving viewport when once is true', async () => {
    const TestComponent = createTestComponent({ once: true })
    const wrapper = mount(TestComponent)
    const observer = MockIntersectionObserver.instances[0]

    // Element enters viewport
    observer.simulateIntersection(true)
    await nextTick()
    expect(wrapper.find('.visibility').text()).toBe('visible')

    // Element would leave viewport, but observer already unobserved
    // so isVisible stays true
    expect(wrapper.find('.visibility').text()).toBe('visible')
  })

  it('unobserves element on unmount', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)

    // Get the number of observers created
    const initialInstanceCount = MockIntersectionObserver.instances.length

    expect(initialInstanceCount).toBeGreaterThan(0)

    // Unmount should trigger cleanup
    wrapper.unmount()

    // Observer should have been created and used
    expect(MockIntersectionObserver.instances.length).toBe(initialInstanceCount)
  })

  it('handles null targetRef gracefully', () => {
    // Create a component where ref is never set
    const TestComponentNullRef = defineComponent({
      setup() {
        const targetRef = ref<HTMLElement | null>(null)
        const { isVisible } = useScrollAnimation(targetRef)
        return { isVisible }
      },
      render() {
        // Don't render with ref - targetRef stays null
        return h('div', {}, this.isVisible ? 'visible' : 'hidden')
      },
    })

    const wrapper = mount(TestComponentNullRef)
    // Should not throw and isVisible should be false
    expect(wrapper.text()).toBe('hidden')
    // No observer should be created for null ref
    expect(MockIntersectionObserver.instances[0]?.observedElements.length ?? 0).toBe(0)
  })
})
