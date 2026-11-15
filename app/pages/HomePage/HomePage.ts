import { BasePage } from "../BasePage";
import { HomePageLocator } from "./HomePageLocators";

export class HomePage extends BasePage {
  readonly locators: HomePageLocator = new HomePageLocator(this.page);

  async openYourFeed() {
    await this.locators.yourFeedTabLocator.click();
  }

  async openGlobalFeed() {
    await this.locators.globalFeedTabLocator.click();
  }

  async filterByTag(tag: string) {
    await this.locators.getTagPillLocatorByName(tag).click();
  }
}
