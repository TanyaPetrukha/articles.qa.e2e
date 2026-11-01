import { test, expect } from "@playwright/test";

test.describe("logged-in user", () => {
  test.use({ storageState: ".auth/user.json" });

  test(
    "SS-001 shows user name in nav after login",
    { tag: ["@profile", "@smoke"] },
    async ({ page }) => {
      await page.goto(process.env.BASE_URL!);
      await expect(page.getByTestId("nav-profile")).toHaveText("olena");
    },
  );

  test(
    "SS-002 publishes new article with title shown on its page",
    { tag: ["@articles", "@regression"] },
    async ({ page }) => {
      const runId = Date.now();
      const headline = `Headline TTT ${runId}`;

      await page.goto(process.env.BASE_URL!);
      await page.getByRole("link", { name: "NEW ARTICLE" }).click();
      await page.getByTestId("editor-title").fill(headline);
      await page.getByTestId("editor-description").fill("description");
      await page.getByTestId("editor-body").fill("body");
      await page.getByRole("button", { name: "Publish" }).click();

      await expect(page.getByTestId("article-title")).toHaveText(headline);
    },
  );
});

test.describe("anonymous user", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test(
    "SS-001 shows sign-in link for anonymous user",
    { tag: ["@profile", "@smoke"] },
    async ({ page }) => {
      await page.goto(process.env.BASE_URL!);
      await expect(page.getByTestId("nav-sign-in")).toBeVisible();
    },
  );
});
