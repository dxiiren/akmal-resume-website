import { test, expect } from '@playwright/test'

test.describe('SEO - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Akmal Suhaimi - Backend Engineer/)
  })

  test('has meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('has Open Graph title', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /Akmal Suhaimi/)
  })

  test('has Open Graph description', async ({ page }) => {
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /.+/)
  })

  test('has Open Graph image', async ({ page }) => {
    const ogImage = page.locator('meta[property="og:image"]')
    await expect(ogImage).toHaveAttribute('content', /og-image/)
  })

  test('has Open Graph URL', async ({ page }) => {
    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', /.+/)
  })

  test('has Twitter card meta', async ({ page }) => {
    const twitterCard = page.locator('meta[name="twitter:card"]')
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image')
  })

  test('has Twitter title', async ({ page }) => {
    const twitterTitle = page.locator('meta[name="twitter:title"]')
    await expect(twitterTitle).toHaveAttribute('content', /Akmal Suhaimi/)
  })

  test('has JSON-LD structured data', async ({ page }) => {
    // Use the Nuxt schema.org generated script (more specific selector)
    const jsonLd = page.locator('script[type="application/ld+json"][data-nuxt-schema-org]')
    await expect(jsonLd).toBeAttached()

    const content = await jsonLd.textContent()
    expect(content).toContain('@context')
    expect(content).toContain('schema.org')
    expect(content).toContain('@graph')
    expect(content).toContain('Akmal Suhaimi')
  })

  test('JSON-LD contains WebSite schema', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"][data-nuxt-schema-org]')
    const content = await jsonLd.textContent()
    const data = JSON.parse(content || '{}')

    expect(data['@graph']).toBeDefined()
    const webSiteSchema = data['@graph'].find((item: any) => item['@type'] === 'WebSite')
    expect(webSiteSchema).toBeDefined()
    expect(webSiteSchema.name).toContain('Akmal Suhaimi')
  })

  test('JSON-LD contains WebPage schema', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"][data-nuxt-schema-org]')
    const content = await jsonLd.textContent()
    const data = JSON.parse(content || '{}')

    expect(data['@graph']).toBeDefined()
    const webPageSchema = data['@graph'].find((item: any) => item['@type'] === 'WebPage')
    expect(webPageSchema).toBeDefined()
    expect(webPageSchema.name).toContain('Akmal Suhaimi')
  })
})

test.describe('SEO - Download Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/download')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Download CV/)
  })

  test('has noindex meta tag', async ({ page }) => {
    const robotsMeta = page.locator('meta[name="robots"]')
    await expect(robotsMeta).toHaveAttribute('content', /noindex/)
  })

  test('has nofollow meta tag', async ({ page }) => {
    const robotsMeta = page.locator('meta[name="robots"]')
    await expect(robotsMeta).toHaveAttribute('content', /nofollow/)
  })

  test('download page is not crawlable', async ({ page }) => {
    const robotsMeta = page.locator('meta[name="robots"]')
    const content = await robotsMeta.getAttribute('content')
    expect(content).toContain('noindex')
    expect(content).toContain('nofollow')
  })
})
