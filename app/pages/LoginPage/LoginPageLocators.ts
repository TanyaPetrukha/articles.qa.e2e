import { Locator } from "@playwright/test";
import { BaseLocator } from "../BaseLocator";

export class LoginPageLocator extends BaseLocator {
  readonly formLocator: Locator = this.page.getByTestId("auth-form");
  readonly emailInputLocator: Locator = this.page.getByTestId("auth-email");
  readonly passwordInputLocator: Locator =
    this.page.getByTestId("auth-password");
  readonly submitButtonLocator: Locator = this.page.getByTestId("auth-submit");
  readonly registerLinkLocator: Locator = this.page
    .getByRole("main")
    .getByRole("link", { name: "Register" });
  readonly errorMessagesLocator: Locator =
    this.page.getByTestId("error-messages");
}
