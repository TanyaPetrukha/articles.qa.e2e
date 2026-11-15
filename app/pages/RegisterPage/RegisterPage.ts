import { BasePage } from "../BasePage";
import { RegisterPageLocator, RegisterSource } from "./RegisterPageLocators";

export class RegisterPage extends BasePage {
  readonly path = "/register";
  readonly locators: RegisterPageLocator = new RegisterPageLocator(this.page);

  async fillUsername(username: string) {
    await this.locators.usernameInputLocator.fill(username);
  }

  async fillEmail(email: string) {
    await this.locators.emailInputLocator.fill(email);
  }

  async fillPassword(password: string) {
    await this.locators.passwordInputLocator.fill(password);
  }

  async fillConfirmPassword(password: string) {
    await this.locators.confirmPasswordInputLocator.fill(password);
  }

  async selectCountry(country: string) {
    await this.locators.countrySelectLocator.selectOption({ label: country });
  }

  async chooseSource(source: RegisterSource) {
    await this.locators.getSourceRadioLocatorByValue(source).check();
  }

  async setNewsletter(isSubscribed: boolean) {
    await this.locators.newsletterCheckboxLocator.setChecked(isSubscribed);
  }

  async setTerms(isAccepted: boolean) {
    await this.locators.termsCheckboxLocator.setChecked(isAccepted);
  }

  async submit() {
    await this.locators.submitButtonLocator.click();
  }

  async gotoSignIn() {
    await this.locators.signInLinkLocator.click();
  }

  async getErrorMessages() {
    return this.locators.errorMessagesLocator.innerText();
  }
}
