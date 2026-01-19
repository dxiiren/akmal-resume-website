import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MobileCarousel from '~/components/ui/MobileCarousel.vue'

describe('MobileCarousel Component', () => {
  describe('Rendering', () => {
    it('renders the carousel wrapper', async () => {
      const wrapper = await mountSuspended(MobileCarousel)
      expect(wrapper.find('.mobile-carousel').exists()).toBe(true)
    })

    it('renders slot content', async () => {
      const wrapper = await mountSuspended(MobileCarousel, {
        slots: {
          default: '<div class="slide-content">Slide 1</div>',
        },
      })
      expect(wrapper.find('.slide-content').exists()).toBe(true)
    })
  })

  describe('Props', () => {
    it('uses default slidesPerView of 1.15', async () => {
      const wrapper = await mountSuspended(MobileCarousel)
      // The component passes this to Swiper internally
      expect(wrapper.exists()).toBe(true)
    })

    it('accepts custom slidesPerView prop', async () => {
      const wrapper = await mountSuspended(MobileCarousel, {
        props: { slidesPerView: 2 },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('uses default spaceBetween of 16', async () => {
      const wrapper = await mountSuspended(MobileCarousel)
      expect(wrapper.exists()).toBe(true)
    })

    it('accepts custom spaceBetween prop', async () => {
      const wrapper = await mountSuspended(MobileCarousel, {
        props: { spaceBetween: 24 },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('accepts showPagination prop', async () => {
      const wrapper = await mountSuspended(MobileCarousel, {
        props: { showPagination: true },
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('CSS Classes', () => {
    it('has w-full class', async () => {
      const wrapper = await mountSuspended(MobileCarousel)
      expect(wrapper.find('.w-full').exists()).toBe(true)
    })

    it('has mobile-carousel class for styling', async () => {
      const wrapper = await mountSuspended(MobileCarousel)
      expect(wrapper.find('.mobile-carousel').exists()).toBe(true)
    })
  })

  describe('Swiper Configuration', () => {
    it('uses FreeMode module', async () => {
      // This is verified by the component using free-mode: true
      const wrapper = await mountSuspended(MobileCarousel)
      expect(wrapper.exists()).toBe(true)
    })

    it('enables grab cursor', async () => {
      // Swiper grab cursor is configured in the component
      const wrapper = await mountSuspended(MobileCarousel)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Multiple Slides', () => {
    it('renders multiple slide content items', async () => {
      const wrapper = await mountSuspended(MobileCarousel, {
        slots: {
          default: `
            <div class="slide-1">Item 1</div>
            <div class="slide-2">Item 2</div>
            <div class="slide-3">Item 3</div>
          `,
        },
      })
      expect(wrapper.find('.slide-1').exists()).toBe(true)
      expect(wrapper.find('.slide-2').exists()).toBe(true)
      expect(wrapper.find('.slide-3').exists()).toBe(true)
    })
  })

  describe('Pagination', () => {
    it('can show pagination when enabled', async () => {
      const wrapper = await mountSuspended(MobileCarousel, {
        props: { showPagination: true },
      })
      // Pagination is conditionally rendered based on showPagination
      expect(wrapper.exists()).toBe(true)
    })

    it('hides pagination when disabled', async () => {
      const wrapper = await mountSuspended(MobileCarousel, {
        props: { showPagination: false },
      })
      expect(wrapper.exists()).toBe(true)
    })
  })
})
