import { Page, expect } from "@playwright/test";

export async function createArticle(
  page: Page,
  headline: string,
  description: string,
  body: string,
) {
  await page.getByRole("link", { name: "NEW ARTICLE" }).click();
  await page.getByTestId("editor-title").fill(headline);
  await page.getByTestId("editor-description").fill(description);
  await page.getByTestId("editor-body").fill(body);
  await page.getByTestId("editor-tags").fill("tatka");
  await page.getByRole("button", { name: "Publish" }).click();
}

export async function followAuthor(page: Page) {
  await page.getByTestId("tag-pill-tatka").click();
  await page.getByTestId("preview-title").first().click();

  const followButton = page.getByTestId("article-follow-button");
  const buttonText = await followButton.innerText();

  if (buttonText.startsWith("+ Follow")) {
    await followButton.click();
    await expect(followButton).toContainText("Unfollow");
  }
}
