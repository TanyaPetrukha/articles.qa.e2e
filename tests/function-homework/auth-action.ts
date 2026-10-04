import { Page } from "@playwright/test";

export async function registerUser(
  page: Page,
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  const usernameField = page.getByTestId("auth-username");
  const emailField = page.getByTestId("auth-email");
  const passwordField = page.getByTestId("auth-password");
  const confirmPasswordField = page.getByTestId("register-confirm-password");
  const sendNewsCheckbox = page.getByTestId("register-newsletter");
  const registerTermsCheckbox = page.getByTestId("register-terms");
  const submitBtn = page.getByTestId("auth-submit");

  await usernameField.fill(username);
  await emailField.fill(email);
  await passwordField.fill(password);
  await confirmPasswordField.fill(confirmPassword);
  await sendNewsCheckbox.uncheck();
  await registerTermsCheckbox.check();
  await submitBtn.click();
}

export async function loginUser(page: Page, email: string, password: string) {
  const emailField = page.getByTestId("auth-email");
  const passwordField = page.getByTestId("auth-password");
  const submitBtn = page.getByTestId("auth-submit");

  await emailField.fill(email);
  await passwordField.fill(password);
  await submitBtn.click();
}
