import { test, expect } from '@playwright/test';

test('user registration flow', async ({ page }) => {
  await page.goto('/register');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Test123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/verify-email');
});
