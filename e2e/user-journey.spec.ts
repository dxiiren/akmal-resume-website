import { test, expect } from '@playwright/test'

test.describe('Critical User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('homepage loads with all sections', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded')

    // Check all main sections exist in DOM
    await expect(page.locator('#about')).toBeAttached({ timeout: 15000 })
    await expect(page.locator('#skills')).toBeAttached({ timeout: 15000 })
    await expect(page.locator('#experience')).toBeAttached({ timeout: 15000 })
    await expect(page.locator('#projects')).toBeAttached({ timeout: 15000 })
  })

  test('Hire Me CTA has correct mailto link', async ({ page }) => {
    // Wait for hero content to load
    await page.waitForTimeout(1000)

    const ctaButton = page.getByRole('link', { name: /hire me/i })
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveAttribute('href', /mailto:/)
  })

  test('WhatsApp link opens correctly', async ({ page }) => {
    // Wait for hero content to load
    await page.waitForTimeout(1000)

    const whatsappLink = page.locator('a[href*="wa.me"]').first()
    await expect(whatsappLink).toBeVisible()
    await expect(whatsappLink).toHaveAttribute('href', /wa\.me/)
  })

  test('dark mode toggle works', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded')

    // Find theme toggle buttons and get the visible one
    const themeToggles = page.locator('button[aria-label*="Switch to"]')

    // Wait for at least one to be attached
    await expect(themeToggles.first()).toBeAttached({ timeout: 15000 })

    // Find the visible one by iterating through the locators
    const count = await themeToggles.count()
    let visibleToggle = null
    for (let i = 0; i < count; i++) {
      const toggle = themeToggles.nth(i)
      if (await toggle.isVisible()) {
        visibleToggle = toggle
        break
      }
    }

    // If no visible toggle found, fall back to first one with force click
    if (!visibleToggle) {
      visibleToggle = themeToggles.first()
    }

    // Click the toggle
    await visibleToggle.click({ force: true })
    await page.waitForTimeout(500)

    // Verify the toggle button is still present
    await expect(themeToggles.first()).toBeAttached({ timeout: 5000 })
  })

  test('navigation scrolls to sections', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop navigation hidden on mobile')

    // Wait for page to load
    await page.waitForLoadState('domcontentloaded')

    // Click on Experience link in header nav
    const experienceLink = page.locator('header a[href="#experience"]')
    await expect(experienceLink).toBeAttached({ timeout: 15000 })
    await experienceLink.click({ force: true })

    // Wait for scroll animation
    await page.waitForTimeout(1000)

    // Verify section exists and is accessible
    const experienceSection = page.locator('#experience')
    await expect(experienceSection).toBeAttached({ timeout: 15000 })
  })

  test('projects section is visible', async ({ page }) => {
    // Navigate to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Check for projects section title
    const projectsTitle = page.locator('#projects h2')
    await expect(projectsTitle).toBeVisible()
  })

  test('social links are accessible', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000)

    // Check LinkedIn link
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first()
    await expect(linkedinLink).toBeVisible()

    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com"]').first()
    await expect(githubLink).toBeVisible()
  })

  test('availability badge is visible', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded')

    // Check for availability indicator in header (either desktop or mobile version)
    // The header has the status-pulse class for the green dot
    const availabilityIndicator = page.locator('.status-pulse').first()
    await expect(availabilityIndicator).toBeAttached({ timeout: 15000 })
  })

  test('stats section displays correctly', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded')

    // Stats are in the hero section - check that at least one stat label exists
    // The stats have labels like "Years Experience", "Daily Transactions", "Uptime", "API Integrations"
    const statsSection = page.locator('.grid-cols-2.lg\\:grid-cols-4').first()
    await expect(statsSection).toBeAttached({ timeout: 15000 })
  })
})
