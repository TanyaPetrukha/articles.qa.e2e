import { test, expect } from "../api-requests/fixtures/fixtures";
import {
  generateArticleForm,
  generateRouteTitle,
  mockedArticle,
} from "./article.data";

test(
  "RM-001 route.continue replaces article title before sending to server",
  { tag: ["@articles", "@route"] },
  async ({ page, pages }) => {
    const { homePage, articlePage } = pages;
    const articleForm = generateArticleForm();
    const routeTitle = generateRouteTitle();

    await test.step("register route for POST /api/articles", async () => {
      await page.route("**/api/articles", async (route) => {
        const request = route.request();

        if (request.method() !== "POST") {
          await route.continue();
          return;
        }

        const payload = request.postDataJSON();
        payload.article.title = routeTitle;

        await route.continue({
          postData: JSON.stringify(payload),
          headers: request.headers(),
          method: request.method(),
          url: request.url(),
        });
      });
    });

    await test.step("publish and check the title from request", async () => {
      await homePage.open();
      await homePage.header.gotoNewArticle();
      await articlePage.fillArticleForm(articleForm);
      await articlePage.publish();
      await expect(articlePage.locators.articleTitleLocator).toHaveText(
        routeTitle,
      );
      await expect(articlePage.locators.articleTitleLocator).not.toHaveText(
        articleForm.title,
      );
    });
  },
);

test(
  "RM-002 route.fulfill returns prepared articles list",
  { tag: ["@articles", "@route"] },
  async ({ page, pages }) => {
    const { homePage } = pages;

    await test.step("register route for GET /api/articles?...", async () => {
      await page.route("**/api/articles?**", async (route) => {
        await route.fulfill({
          json: { articles: [mockedArticle], articlesCount: 1 },
          status: 200,
        });
      });
    });

    await test.step("open home page with articles list", async () => {
      await homePage.open();
    });

    await test.step("only mocked article is displayed", async () => {
      await expect(homePage.locators.articlePreviewLocator).toHaveCount(1);
      await expect(
        homePage.locators.getPreviewTitleLocatorByArticle(
          homePage.locators.articlePreviewLocator,
        ),
      ).toHaveText(mockedArticle.title);
    });
  },
);
