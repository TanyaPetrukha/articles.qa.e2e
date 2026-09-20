import { test, expect } from "@playwright/test";

const { UI_URL, API_URL } = process.env;
const username = `ttt+${new Date().getTime()}`;
const email = `ttt_email+${new Date().getTime()}@gmail.com`;
const password = "Test123!@#";
const usernameExist = `ttt_student+${new Date().getTime()}`;
const emailExist = `ttt_Student_email+${new Date().getTime()}@gmail.com`;
const emailNotExist = `ttt_+${new Date().getTime()}@gmail.com`;

test.beforeAll(async ({ request }) => {
  await request.post(API_URL!, {
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
    test("01 user register successfully with unique credentials", async ({
      page,
    }) => {
      await page.goto(`${UI_URL!}/register`);
      await page.getByTestId("auth-username").fill(username);
      await page.getByTestId("auth-email").fill(email);
      await page.getByTestId("auth-password").fill(password);
      await page.getByTestId("register-confirm-password").fill(password);
      await page.getByTestId("register-newsletter").uncheck();
      await page.getByTestId("register-terms").check();
      await page.getByTestId("auth-submit").click();

      await expect(page.getByTestId("feed-tab-your")).toBeVisible();
    });

    test("02 registration form should show an error for an already registered email", async ({
      page,
    }) => {
      await page.goto(`${UI_URL!}/register`);
      await page.getByTestId("auth-username").fill(username);
      await page.getByTestId("auth-email").fill(emailExist);
      await page.getByTestId("auth-password").fill(password);
      await page.getByTestId("register-confirm-password").fill(password);
      await page.getByTestId("register-terms").check();
      await page.getByTestId("auth-submit").click();
      
      await expect(
        page
          .getByTestId("error-messages")
          .getByText("body email або username вже зайняті"),
      ).toBeVisible();
    });

    test("03 registration form should show an error for empty email", async ({
      page,
    }) => {
      await page.goto(`${UI_URL!}/register`);
      await page.getByTestId("auth-username").fill(username);
      await page.getByTestId("auth-email").fill("");
      await page.getByTestId("auth-password").fill(password);
      await page.getByTestId("register-confirm-password").fill(password);
      await page.getByTestId("register-terms").check();
      await page.getByTestId("auth-submit").click();

      await expect(
        page.getByTestId("error-messages").getByText("email некоректний email"),
      ).toBeVisible();
    });
  },
);

test.describe("ART-002 Login", { tag: ["@auth", "@login"] }, () => {
  test("01 user should log in successfully with valid credentials", async ({
    page,
  }) => {
    await page.goto(`${UI_URL!}/login`);
    await page.getByTestId("auth-email").fill(emailExist);
    await page.getByTestId("auth-password").fill(password);
    await page.getByTestId("auth-submit").click();

    await expect(page.getByTestId("feed-tab-your")).toBeVisible();
  });

  test("02 login form should show an error for an incorrect password", async ({
    page,
  }) => {
    await page.goto(`${UI_URL!}/login`);
    await page.getByTestId("auth-email").fill(emailExist);
    await page.getByTestId("auth-password").fill("Newpass123!!!");
    await page.getByTestId("auth-submit").click();

    await expect(
      page
        .getByTestId("error-messages")
        .getByText("email or password неправильні"),
    ).toBeVisible();
  });

  test("03 login should reject a non-existing user", async ({ page }) => {
    await page.goto(`${UI_URL!}/login`);
    await page.getByTestId("auth-email").fill(emailNotExist);
    await page.getByTestId("auth-password").fill(password);
    await page.getByTestId("auth-submit").click();

    await expect(
      page
        .getByTestId("error-messages")
        .getByText("email or password неправильні"),
    ).toBeVisible();
  });
});
