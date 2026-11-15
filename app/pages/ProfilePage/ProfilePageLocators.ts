import { Locator } from "@playwright/test";
import { BaseLocator } from "../BaseLocator";

export class ProfilePageLocator extends BaseLocator {
  readonly usernameLocator: Locator = this.page.getByTestId("profile-username");
  readonly editProfileLinkLocator: Locator = this.page.getByRole("link", {
    name: "Edit profile",
  });
  readonly myArticlesTabLocator: Locator =
    this.page.getByTestId("profile-tab-my");
  readonly favoritedArticlesTabLocator: Locator = this.page.getByTestId(
    "profile-tab-favorited",
  );
  readonly emptyArticlesLocator: Locator =
    this.page.getByTestId("article-list-empty");
}
