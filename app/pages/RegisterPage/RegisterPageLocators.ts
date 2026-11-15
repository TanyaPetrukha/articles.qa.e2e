import { Locator } from "@playwright/test";
import { BaseLocator } from "../BaseLocator";

export type RegisterSource = "search" | "friend" | "social" | "course";

export class RegisterPageLocator extends BaseLocator {
  readonly formLocator: Locator = this.page.getByTestId("auth-form");
  readonly usernameInputLocator: Locator =
    this.page.getByTestId("auth-username");
  readonly emailInputLocator: Locator = this.page.getByTestId("auth-email");
  readonly passwordInputLocator: Locator =
    this.page.getByTestId("auth-password");
  readonly confirmPasswordInputLocator: Locator = this.page.getByTestId(
    "register-confirm-password",
  );
  readonly countrySelectLocator: Locator =
    this.page.getByTestId("register-country");
  readonly newsletterCheckboxLocator: Locator = this.page.getByTestId(
    "register-newsletter",
  );
  readonly termsCheckboxLocator: Locator =
    this.page.getByTestId("register-terms");
  readonly submitButtonLocator: Locator = this.page.getByTestId("auth-submit");
  readonly signInLinkLocator: Locator = this.page
    .getByRole("main")
    .getByRole("link", { name: "Sign in" });
  readonly errorMessagesLocator: Locator =
    this.page.getByTestId("error-messages");

  getSourceRadioLocatorByValue = (source: RegisterSource) =>
    this.page.getByTestId(`register-source-${source}`);
}
