import { test, expect, devices } from '@playwright/test'

test.describe('Responsive Design - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('desktop navigation is visible', async ({ page }) => {
    await page.goto('/')

    // Desktop nav should be visible
    const desktopNav = page.locator('nav.hidden.md\\:flex')
    await expect(desktopNav).toBeVisible()
  })

  test('mobile menu button is hidden on desktop', async ({ page }) => {
    await page.goto('/')

    // Mobile menu button should be hidden (has md:hidden class container)
    const mobileMenuArea = page.locator('.md\\:hidden button')
    await expect(mobileMenuArea).toBeHidden()
  })

  test('certifications show as grid on desktop', async ({ page }) => {
    await page.goto('/')

    // Desktop grid should be visible
    const desktopGrid = page.locator('#certifications .hidden.sm\\:block')
    await expect(desktopGrid).toBeVisible()
  })
})

test.describe('Responsive Design - Mobile', () => {
  test.use({ ...devices['iPhone 12'] })

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/')

    // Mobile menu button should be visible
    const menuButton = page.locator('button').filter({ has: page.locator('svg') }).first()
    await expect(menuButton).toBeVisible()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/')

    // Click menu button to open
    const menuButton = page.locator('button').first()
    await menuButton.click()

    // Mobile nav should appear
    await expect(page.locator('nav.border-t')).toBeVisible()

    // Click again to close
    await menuButton.click()

    // Mobile nav should be hidden
    await expect(page.locator('nav.border-t')).toBeHidden()
  })

  test('certifications show as carousel on mobile', async ({ page }) => {
    await page.goto('/')

    // Scroll to certifications section
    await page.locator('#certifications').scrollIntoViewIfNeeded()

    // Mobile carousel should be visible
    const mobileCarousel = page.locator('#certifications .sm\\:hidden')
    await expect(mobileCarousel).toBeVisible()
  })

  test('mobile availability badge is visible', async ({ page }) => {
    await page.goto('/')

    // Mobile availability badge should be visible
    await expect(page.locator('text=Available')).toBeVisible()
  })
})

test.describe('Responsive Design - Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('layout adapts to tablet size', async ({ page }) => {
    await page.goto('/')

    // Page should load without errors
    await expect(page.locator('main')).toBeVisible()
  })

  test('skills grid adapts to tablet', async ({ page }) => {
    await page.goto('/')

    // Skills section should be visible
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeVisible()
  })
})
