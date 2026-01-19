import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Akmal Suhaimi/)
  })

  test('displays hero section with name', async ({ page }) => {
    // Wait for typewriter effect
    await page.waitForTimeout(2000)
    await expect(page.locator('text=Akmal Suhaimi')).toBeVisible()
  })

  test('displays job title', async ({ page }) => {
    await expect(page.locator('text=Backend Engineer')).toBeVisible()
  })

  test('navigation scrolls to sections', async ({ page }) => {
    // Click on Skills navigation
    await page.click('a[href="#skills"]')

    // Check that skills section is in view
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
