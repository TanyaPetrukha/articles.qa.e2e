import { BasePage } from "../BasePage";
import { ProfilePageLocator } from "./ProfilePageLocators";

export class ProfilePage extends BasePage {
  readonly path = "/profile";
  readonly locators: ProfilePageLocator = new ProfilePageLocator(this.page);

  async openByUsername(username: string) {
    await this.page.goto(`${process.env.BASE_URL}${this.path}/${username}`);
  }

  async gotoEditProfile() {
    await this.locators.editProfileLinkLocator.click();
  }

  async gotoMyArticles() {
    await this.locators.myArticlesTabLocator.click();
  }

  async gotoFavoritedArticles() {
    await this.locators.favoritedArticlesTabLocator.click();
  }

  async getUsername() {
    return this.locators.usernameLocator.innerText();
  }
}
