import { test, expect } from '@playwright/test'

// Desktop viewport tests
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

    // Mobile menu button container should be hidden on desktop
    // Use the menu icon button specifically (has Menu or X icon)
    const mobileMenuContainer = page.locator('.md\\:hidden').filter({ has: page.locator('button') })
    await expect(mobileMenuContainer).toBeHidden()
  })

  test('certifications show as grid on desktop', async ({ page }) => {
    await page.goto('/')

    // Desktop grid should be visible
    const desktopGrid = page.locator('#certifications .hidden.sm\\:block')
    await expect(desktopGrid).toBeVisible()
  })
})

// Mobile viewport tests - use viewport instead of devices to avoid worker issues
test.describe('Responsive Design - Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } }) // iPhone 12 dimensions

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/')

    // Mobile menu button should be visible (the hamburger menu, not theme toggle)
    // Look for the button that contains Menu icon within the mobile area
    const menuButton = page.locator('.md\\:hidden button').last()
    await expect(menuButton).toBeVisible()
  })

  test('mobile menu button is clickable', async ({ page }) => {
    await page.goto('/')

    // Find the menu button (last button in the mobile header area)
    const menuButton = page.locator('header .md\\:hidden button').last()
    await expect(menuButton).toBeVisible()

    // Click should not throw an error
    await menuButton.click()

    // The button should still be visible after clicking
    await expect(menuButton).toBeVisible()
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

    // Mobile availability badge should be visible - use exact text match
    await expect(page.getByText('Available', { exact: true })).toBeVisible()
  })
})

// Tablet viewport tests
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
