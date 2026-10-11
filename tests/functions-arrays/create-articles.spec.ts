import { test, expect } from "@playwright/test";
import { registerUser, loginUser } from "../function-homework/auth-action";
import { createArticle, followAuthor } from "./articles.utils";

test(
  "FA-001 create  10 articles",
  { tag: ["@articles", "@regression"] },
  async ({ page, browser }) => {
    await page.goto(`${process.env.BASE_URL}/register`);

    const runId = Date.now();
    const username = `tatka+${runId}`;
    const email = `tatka+${runId}@gmail.com`;
    const password = "Test123!@#";

    await registerUser(page, username, email, password, password);

    const articleHeadlines: string[] = [];

    for (let i = 1; i <= 1; i++) {
      const newHeadline = `Headline TTT ${runId}-${i}`;
      await createArticle(page, newHeadline, "description", "body");
      articleHeadlines.push(newHeadline);
    }

    const context = await browser.newContext();
    const newPage = await context.newPage();

    await newPage.goto(`${process.env.BASE_URL}/login`);
    await loginUser(newPage, "olena@example.com", "password");

    await followAuthor(newPage);

    await newPage.getByTestId("nav-home").click();
    await newPage.getByTestId("feed-tab-your").click();

    for (const headline of articleHeadlines) {
      const article = newPage.getByRole("link", {
        name: headline,
      });

      if (await article.isVisible()) {
        continue;
      } else {
        await newPage.getByTestId("pagination-page-2").click();
        if (await article.isVisible()) {
          continue;
        } else {
          throw new Error(
            `Статтю "${headline}" не знайдено на першій і другій сторінках Your Feed`,
          );
        }
      }
    }
  },
);
