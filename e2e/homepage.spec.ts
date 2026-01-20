import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Akmal Suhaimi/)
  })

  test('displays hero section with name', async ({ page }) => {
    // Wait for typewriter effect and check for the hero section
    await page.waitForTimeout(2000)
    // Use the hero section title which contains the typewriter name
    const heroSection = page.locator('#about')
    await expect(heroSection).toBeVisible()
  })

  test('displays job title', async ({ page }) => {
    // The hero rotates through roles, so check for any role with terminal prefix format
    // Roles include: Backend Engineer, System Architect, Problem Solver, Tech Lead
    const rolePattern = /\$ (Backend Engineer|System Architect|Problem Solver|Tech Lead)_/
    await expect(page.getByText(rolePattern)).toBeVisible()
  })

  test('navigation scrolls to sections', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Navigation links hidden on mobile')

    await page.click('a[href="#skills"]')
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeInViewport()
  })

  test('all main sections are present', async ({ page }) => {
    const sections = ['#about', '#skills', '#experience', '#projects', '#education', '#contact']

    for (const section of sections) {
      await expect(page.locator(section)).toBeVisible()
    }
  })
})
