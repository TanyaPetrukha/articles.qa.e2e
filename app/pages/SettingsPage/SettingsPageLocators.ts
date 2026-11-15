import { Locator } from "@playwright/test";
import { BaseLocator } from "../BaseLocator";

export class SettingsPageLocator extends BaseLocator {
  readonly formLocator: Locator = this.page.getByTestId("settings-form");

  // Avatar
  readonly avatarPreviewLocator: Locator = this.page.getByTestId(
    "settings-avatar-preview",
  );
  readonly avatarPreviewImageLocator: Locator =
    this.avatarPreviewLocator.locator("img");
  readonly avatarFileInputLocator: Locator = this.page.getByTestId(
    "settings-avatar-file",
  );
  readonly imageUrlInputLocator: Locator =
    this.page.getByTestId("settings-image");

  // Profile
  readonly usernameInputLocator: Locator =
    this.page.getByTestId("settings-username");
  readonly bioInputLocator: Locator = this.page.getByTestId("settings-bio");
  readonly emailInputLocator: Locator = this.page.getByTestId("settings-email");
  readonly passwordInputLocator: Locator =
    this.page.getByTestId("settings-password");

  // Preferences
  readonly languageSelectLocator: Locator =
    this.page.getByTestId("settings-language");
  readonly notifyCommentsCheckboxLocator: Locator = this.page.getByTestId(
    "settings-notify-comments",
  );
  readonly notifyFollowsCheckboxLocator: Locator = this.page.getByTestId(
    "settings-notify-follows",
  );
  readonly notifyWeeklyCheckboxLocator: Locator = this.page.getByTestId(
    "settings-notify-weekly",
  );

  // Actions
  readonly resetButtonLocator: Locator =
    this.page.getByTestId("settings-reset");
  readonly saveButtonLocator: Locator = this.page.getByRole("button", {
    name: "Save settings",
  });
  readonly logoutButtonLocator: Locator =
    this.page.getByTestId("logout-button");
}
