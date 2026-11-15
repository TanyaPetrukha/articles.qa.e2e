import { test, expect } from "./fixtures/fixtures";
import { faker } from "@faker-js/faker";

test(
  "AR-002 change avatar via settings UI",
  { tag: ["@user", "@regression"] },
  async ({ createdUser, pages }) => {
    const avatarUrl = faker.image.avatar();
    const { homePage, profilePage, settingsPage } = pages;

    await test.step("browser is authorized as created user", async () => {
      await homePage.open();

      await expect(homePage.header.profileLinkLocator).toHaveText(
        createdUser.username,
      );
    });

    await test.step("open settings", async () => {
      await homePage.header.gotoProfile();
      await profilePage.gotoEditProfile();

      await expect(settingsPage.locators.usernameInputLocator).toHaveValue(
        createdUser.username,
      );
      await expect(settingsPage.locators.emailInputLocator).toHaveValue(
        createdUser.email,
      );
    });

    await test.step("change avatar and save", async () => {
      await settingsPage.fillImageUrl(avatarUrl);

      await expect(
        settingsPage.locators.avatarPreviewImageLocator,
      ).toHaveAttribute("src", avatarUrl);

      await settingsPage.saveSettings();

      await expect(profilePage.header.profileAvatarLocator).toHaveAttribute(
        "src",
        avatarUrl,
      );
    });

    await test.step("after reload URL and avatar are persisted", async () => {
      await pages.profilePage.page.reload();

      await expect(profilePage.header.profileAvatarLocator).toHaveAttribute(
        "src",
        avatarUrl,
      );

      await profilePage.header.gotoProfile();
      await profilePage.gotoEditProfile();

      await expect(settingsPage.locators.imageUrlInputLocator).toHaveValue(
        avatarUrl,
      );
      await expect(
        settingsPage.locators.avatarPreviewImageLocator,
      ).toHaveAttribute("src", avatarUrl);
    });
  },
);
