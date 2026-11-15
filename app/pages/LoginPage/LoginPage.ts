import { BasePage } from "../BasePage";
import { LoginPageLocator } from "./LoginPageLocators";

export class LoginPage extends BasePage {
  readonly path = "/login";
  readonly locators: LoginPageLocator = new LoginPageLocator(this.page);

  async fillEmail(email: string) {
    await this.locators.emailInputLocator.fill(email);
  }

  async fillPassword(password: string) {
    await this.locators.passwordInputLocator.fill(password);
  }

  async submit() {
    await this.locators.submitButtonLocator.click();
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async gotoRegister() {
    await this.locators.registerLinkLocator.click();
  }

  async getErrorMessages() {
    return this.locators.errorMessagesLocator.innerText();
  }
}
