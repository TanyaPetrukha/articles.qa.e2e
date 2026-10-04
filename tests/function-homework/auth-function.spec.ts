import { test, expect } from "@playwright/test";
import { registerUser, loginUser } from "./auth-action";

const UI_URL = "http://104.168.59.50/articles";
const API_URL = "http://104.168.59.50/api/users";

const username = `ttt+${new Date().getTime()}`;
const email = `ttt_email+${new Date().getTime()}@gmail.com`;
const password = "Test123!@#";

const usernameExist = `ttt_student+${new Date().getTime()}`;
const emailExist = `ttt_Student_email+${new Date().getTime()}@gmail.com`;
const emailNotExist = `ttt_+${new Date().getTime()}@gmail.com`;

test.beforeAll(async ({ request }) => {
  await request.post(API_URL, {
    data: {
      user: {
        username: usernameExist,
        email: emailExist,
        password: password,
      },
    },
  });
});

test.describe(
  "ART-001 Registration",
  { tag: ["@auth", "@registration"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${UI_URL}/register`);
    });

    test("01 user register successfully with unique credentials", async ({
      page,
    }) => {
      const myFeedTab = page.getByTestId("feed-tab-your");
      await registerUser(page, username, email, password, password);
      await expect(myFeedTab).toBeVisible();
    });

    test("02 registration form should show an error for an already registered email", async ({
      page,
    }) => {
      const error = page
        .getByTestId("error-messages")
        .getByText("body email або username вже зайняті");
      await registerUser(page, username, emailExist, password, password);
      await expect(error).toBeVisible();
    });

    test("03 registration form should show an error for empty email", async ({
      page,
    }) => {
      const error = page
        .getByTestId("error-messages")
        .getByText("email некоректний email");

      await registerUser(page, username, "", password, password);
      await expect(error).toBeVisible();
    });
  },
);

test.describe("ART-002 Login", { tag: ["@auth", "@login"] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${UI_URL}/login`);
  });

  test("01 user should log in successfully with valid credentials", async ({
    page,
  }) => {
    await loginUser(page, emailExist, password);
    await expect(page.getByTestId("feed-tab-your")).toBeVisible();
  });

  test("02 login form should show an error for an incorrect password", async ({
    page,
  }) => {
    const error = page
      .getByTestId("error-messages")
      .getByText("email or password неправильні");
    await loginUser(page, emailExist, "Newpass123!!!");
    await expect(error).toBeVisible();
  });

  test("03 login should reject a non-existing user", async ({ page }) => {
    const error = page
      .getByTestId("error-messages")
      .getByText("email or password неправильні");
    await loginUser(page, emailNotExist, password);
    await expect(error).toBeVisible();
  });
});
