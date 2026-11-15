import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class HeaderComponent extends BaseComponent {
  readonly headerLocator: Locator = this.page.getByTestId("app-header");
  readonly homeLinkLocator: Locator = this.page.getByTestId("nav-home");
  readonly signInLinkLocator: Locator = this.page.getByTestId("nav-sign-in");
  readonly signUpLinkLocator: Locator = this.page.getByTestId("nav-sign-up");
  readonly newArticleLinkLocator: Locator =
    this.page.getByTestId("nav-new-article");
  readonly profileLinkLocator: Locator = this.page.getByTestId("nav-profile");
  readonly profileAvatarLocator: Locator =
    this.profileLinkLocator.locator("img");
  readonly themeToggleLocator: Locator = this.page.getByTestId("theme-toggle");

  async gotoHome() {
    await this.homeLinkLocator.click();
  }

  async gotoSignIn() {
    await this.signInLinkLocator.click();
  }

  async gotoSignUp() {
    await this.signUpLinkLocator.click();
  }

  async gotoNewArticle() {
    await this.newArticleLinkLocator.click();
  }

  async gotoProfile() {
    await this.profileLinkLocator.click();
  }

  async toggleTheme() {
    await this.themeToggleLocator.click();
  }

  async getUsername() {
    return this.profileLinkLocator.innerText();
  }
}
