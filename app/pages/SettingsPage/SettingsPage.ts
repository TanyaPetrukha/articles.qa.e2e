import { BasePage } from "../BasePage";
import { SettingsPageLocator } from "./SettingsPageLocators";

export type SettingsLanguage = "uk" | "en" | "pl";

export class SettingsPage extends BasePage {
  readonly path = "/settings";
  readonly locators: SettingsPageLocator = new SettingsPageLocator(this.page);

  async fillImageUrl(url: string) {
    await this.locators.imageUrlInputLocator.fill(url);
  }

  async uploadAvatar(filePath: string) {
    await this.locators.avatarFileInputLocator.setInputFiles(filePath);
  }

  async fillUsername(username: string) {
    await this.locators.usernameInputLocator.fill(username);
  }

  async fillBio(bio: string) {
    await this.locators.bioInputLocator.fill(bio);
  }

  async fillEmail(email: string) {
    await this.locators.emailInputLocator.fill(email);
  }

  async fillPassword(password: string) {
    await this.locators.passwordInputLocator.fill(password);
  }

  async selectLanguage(language: SettingsLanguage) {
    await this.locators.languageSelectLocator.selectOption(language);
  }

  async setNotifyComments(isEnabled: boolean) {
    await this.locators.notifyCommentsCheckboxLocator.setChecked(isEnabled);
  }

  async setNotifyFollows(isEnabled: boolean) {
    await this.locators.notifyFollowsCheckboxLocator.setChecked(isEnabled);
  }

  async setNotifyWeekly(isEnabled: boolean) {
    await this.locators.notifyWeeklyCheckboxLocator.setChecked(isEnabled);
  }

  async reset() {
    await this.locators.resetButtonLocator.click();
  }

  async saveSettings() {
    await this.locators.saveButtonLocator.click();
  }

  async logout() {
    await this.locators.logoutButtonLocator.click();
  }

  async getImageUrl() {
    return this.locators.imageUrlInputLocator.inputValue();
  }

  async getAvatarPreviewSrc() {
    return this.locators.avatarPreviewImageLocator.getAttribute("src");
  }
}
