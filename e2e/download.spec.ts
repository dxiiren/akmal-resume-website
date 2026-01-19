import { test, expect } from '@playwright/test'

test.describe('Download Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/download')
  })

  test('download page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Download CV/)
  })

  test('displays password input', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]')
    await expect(passwordInput).toBeVisible()
  })

  test('displays download button', async ({ page }) => {
    await expect(page.locator('button:has-text("Download CV")')).toBeVisible()
  })

  test('shows error for empty password submission', async ({ page }) => {
    // Button should be disabled when password is empty
    const downloadButton = page.locator('button:has-text("Download CV")')
    await expect(downloadButton).toBeDisabled()
  })

  test('shows error for invalid password', async ({ page }) => {
    // Enter wrong password
    await page.fill('input[type="password"]', 'wrongpassword')

    // Click download button
    await page.click('button:has-text("Download CV")')

    // Wait for error message
    await expect(page.locator('text=Invalid password')).toBeVisible()
  })

  test('back to portfolio link works', async ({ page }) => {
    await page.click('text=Back to Portfolio')
    await expect(page).toHaveURL('/')
  })

  test('contact link is present', async ({ page }) => {
    const contactLink = page.locator('a[href="mailto:mhdakmal875@gmail.com"]')
    await expect(contactLink).toBeVisible()
  })
})
