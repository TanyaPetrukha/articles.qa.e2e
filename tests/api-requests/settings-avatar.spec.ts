import { test, expect } from "./fixtures/fixtures";
import path from "path";

test(
  "AR-002 change avatar via settings UI",
  { tag: ["@user", "@regression"] },
  async ({ page, login, request }) => {
    const avatar = path.join(__dirname, "avatar-img.gif");
    const headerAvatar = page.getByTestId("nav-profile").locator("img");
    const settingsPreview = page
      .getByTestId("settings-avatar-preview")
      .locator("img");

    await test.step("browser is authorized as created user", async () => {
      await page.goto(process.env.BASE_URL!);
      await expect(page.getByTestId("nav-profile")).toBeVisible();
    });

    await test.step("open settings", async () => {
      await page.getByTestId("nav-profile").click();
      await page.getByRole("link", { name: "Edit profile" }).click();
    });

    await test.step("change avatar and save", async () => {
      await page.getByTestId("settings-avatar-file").setInputFiles(avatar);
      await expect(settingsPreview).toHaveAttribute("src", /^data:image\//);

      await page.getByRole("button", { name: "Save settings" }).click();
    });

    await test.step("after reload URL and avatar are persisted", async () => {
      await page.reload();
      await expect(headerAvatar).toHaveAttribute("src", /^data:image\//);
    });
  },
);
