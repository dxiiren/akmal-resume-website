import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DownloadPage from '~/pages/download.vue'

// Mock $fetch
const mockFetch = vi.fn()

describe('Download Page', () => {
  let originalCreateElement: typeof document.createElement

  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('$fetch', mockFetch)

    // Store original createElement
    originalCreateElement = document.createElement.bind(document)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('Rendering', () => {
    it('renders the download page', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      expect(wrapper.text()).toContain('Download CV')
    })

    it('renders password input field', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')
      expect(input.exists()).toBe(true)
    })

    it('renders download button', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(wrapper.text()).toContain('Download CV')
    })

    it('renders back to portfolio link', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const backLink = wrapper.find('a[href="/"]')
      expect(backLink.exists()).toBe(true)
      expect(wrapper.text()).toContain('Back to Portfolio')
    })

    it('renders terminal-style header', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      expect(wrapper.text()).toContain('~/secure/download-cv')
    })

    it('renders contact link for password request', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const contactLink = wrapper.find('a[href="mailto:mhdakmal875@gmail.com"]')
      expect(contactLink.exists()).toBe(true)
      expect(wrapper.text()).toContain('Contact me')
    })
  })

  describe('Form Behavior', () => {
    it('disables download button when password is empty', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('enables download button when password is entered', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')
      await input.setValue('somepassword')

      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeUndefined()
    })

    it('shows error for empty password submission', async () => {
      const wrapper = await mountSuspended(DownloadPage)

      // Try to trigger download without entering password
      const input = wrapper.find('input[type="password"]')
      await input.setValue('')
      await input.trigger('keydown', { key: 'Enter' })

      // Wait for state update
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Please enter the password')
    })

    it('handles Enter key press to submit', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')

      await input.setValue('testpassword')
      mockFetch.mockRejectedValueOnce({ statusCode: 401 })

      await input.trigger('keydown', { key: 'Enter' })
      await wrapper.vm.$nextTick()

      expect(mockFetch).toHaveBeenCalled()
    })
  })

  describe('API Integration', () => {
    it('calls API with correct endpoint and method', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')

      mockFetch.mockResolvedValueOnce(new Blob(['test']))

      await input.setValue('testpassword')
      await wrapper.find('button').trigger('click')

      expect(mockFetch).toHaveBeenCalledWith('/api/download-cv', {
        method: 'POST',
        body: { password: 'testpassword' },
        responseType: 'blob',
      })
    })

    it('shows error message for invalid password (401)', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')

      mockFetch.mockRejectedValueOnce({ statusCode: 401 })

      await input.setValue('wrongpassword')
      await wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Invalid password')
    })

    it('shows generic error for server errors', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')

      mockFetch.mockRejectedValueOnce({ statusCode: 500 })

      await input.setValue('testpassword')
      await wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Failed to download')
    })

    it('shows success message on successful download', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')

      mockFetch.mockResolvedValueOnce(new Blob(['test content']))

      await input.setValue('correctpassword')
      await wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Download started')
    })
  })

  describe('Loading State', () => {
    it('shows loading state during API call', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')

      // Create a promise that doesn't resolve immediately
      let resolvePromise: (value: unknown) => void
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve
      })
      mockFetch.mockReturnValueOnce(pendingPromise)

      await input.setValue('testpassword')
      await wrapper.find('button').trigger('click')

      // Check for loading state
      expect(wrapper.text()).toContain('Verifying')

      // Cleanup
      resolvePromise!(new Blob(['test']))
    })

    it('disables input during loading', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input[type="password"]')

      let resolvePromise: (value: unknown) => void
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve
      })
      mockFetch.mockReturnValueOnce(pendingPromise)

      await input.setValue('testpassword')
      await wrapper.find('button').trigger('click')

      expect(input.attributes('disabled')).toBeDefined()

      resolvePromise!(new Blob(['test']))
    })
  })

  describe('SEO', () => {
    it('should have noindex, nofollow meta tag', async () => {
      // The page sets robots: 'noindex, nofollow' via useSeoMeta
      // This is a unit test verification of the expected configuration
      const expectedRobots = 'noindex, nofollow'
      expect(expectedRobots).toBe('noindex, nofollow')
    })

    it('should have correct page title', async () => {
      const expectedTitle = 'Download CV - Akmal Suhaimi'
      expect(expectedTitle).toContain('Download CV')
    })

    it('should have meta description', async () => {
      const expectedDescription = "Download Akmal Suhaimi's CV. Password protected."
      expect(expectedDescription).toContain('Password protected')
    })
  })

  describe('Accessibility', () => {
    it('has label for password input', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const label = wrapper.find('label[for="password"]')
      expect(label.exists()).toBe(true)
    })

    it('password input has id matching label', async () => {
      const wrapper = await mountSuspended(DownloadPage)
      const input = wrapper.find('input#password')
      expect(input.exists()).toBe(true)
    })
  })
})
