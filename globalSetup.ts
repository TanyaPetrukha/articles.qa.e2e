import { FullConfig, chromium, expect } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const { BASE_URL, EMAIL, PASSWORD } = process.env;

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/login`);
    await page.getByTestId("auth-email").fill(EMAIL!);
    await page.getByTestId("auth-password").fill(PASSWORD!);
    await page.getByTestId("auth-submit").click();

    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("qa-dojo.token")))
      .toBeTruthy();

    await context.storageState({ path: ".auth/user.json" });
  } finally {
    await browser.close();
  }
}
