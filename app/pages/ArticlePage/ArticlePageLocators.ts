import { Locator } from "@playwright/test";
import { BaseLocator } from "../BaseLocator";

export class ArticlePageLocator extends BaseLocator {
  // article view
  readonly articleTitleLocator: Locator =
    this.page.getByTestId("article-title");
  readonly articleBodyLocator: Locator = this.page.getByTestId("article-body");

  // article editor
  readonly titleInputLocator: Locator = this.page.getByTestId("editor-title");
  readonly descriptionInputLocator: Locator =
    this.page.getByTestId("editor-description");
  readonly bodyInputLocator: Locator = this.page.getByTestId("editor-body");
  readonly tagsInputLocator: Locator = this.page.getByTestId("editor-tags");
  readonly publishButtonLocator: Locator = this.page.getByRole("button", {
    name: "Publish",
  });
}
