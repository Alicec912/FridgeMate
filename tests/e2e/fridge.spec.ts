import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test("adds an item and keeps it after a reload", async ({ page }) => {
  await page.getByRole("link", { name: "Add", exact: true }).click();
  await page.getByLabel("Food name").fill("Milk");
  await page.getByLabel("Use by").fill("2099-12-31");
  await page.getByRole("button", { name: "Save item" }).click();

  await expect(page.getByRole("heading", { name: "Milk" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Milk" })).toBeVisible();
});

test("shows an expired item in alerts and lets the user remove it", async ({ page }) => {
  await page.getByRole("link", { name: "Add", exact: true }).click();
  await page.getByLabel("Food name").fill("Old yoghurt");
  await page.getByLabel("Use by").fill("2020-01-01");
  await page.getByRole("button", { name: "Save item" }).click();

  await expect(page.getByText(/days overdue/).first()).toBeVisible();
  await page.getByRole("link", { name: "Alerts" }).click();
  await expect(page.getByRole("heading", { name: "Old yoghurt" })).toBeVisible();

  await page.getByRole("button", { name: "Remove" }).first().click();
  await expect(page.getByRole("heading", { name: "Old yoghurt" })).toHaveCount(0);
});

test("switches language and preserves the preference", async ({ page }) => {
  await page.getByRole("link", { name: "Settings" }).click();
  await page.getByRole("button", { name: "中文" }).click();
  await expect(page.getByRole("heading", { name: "设置" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("heading", { name: "设置" })).toBeVisible();
});
