import { Locator } from "@playwright/test";
import { BaseLocator } from "../BaseLocator";

export class HomePageLocator extends BaseLocator {
  readonly yourFeedTabLocator: Locator = this.page.getByTestId("feed-tab-your");
  readonly globalFeedTabLocator: Locator =
    this.page.getByTestId("feed-tab-global");
  readonly articleCountLocator: Locator =
    this.page.getByTestId("feed-article-count");
  readonly popularTagsLocator: Locator = this.page.getByTestId("popular-tags");

  getTagPillLocatorByName = (tag: string) =>
    this.page.getByTestId(`tag-pill-${tag}`);
}
