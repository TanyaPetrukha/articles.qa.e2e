import { test, expect } from "@playwright/test";

test("прийняття та зміна cookies", async ({ page, context }) => {
  const newValue = "changed by Tanya";

  await page.goto("https://www.zara.com/es/en/");
  await page.getByRole("button", { name: "Accept All Cookies" }).click();
  await expect(page.getByRole("dialog", { name: "Privacy" })).toBeHidden();

  const cookiesBefore = await context.cookies();
  expect(cookiesBefore.length).toBeGreaterThan(0);

  const cookieToChange = cookiesBefore[0];

  const updatedCookies = cookiesBefore.map((cookie) => {
    const isTarget =
      cookie.name === cookieToChange.name &&
      cookie.domain === cookieToChange.domain &&
      cookie.path === cookieToChange.path;

    if (isTarget) {
      return { ...cookie, value: newValue };
    }

    return cookie;
  });

  await context.clearCookies();
  await context.addCookies(updatedCookies);

  const cookiesAfter = await context.cookies();

  const cookie = cookiesAfter.find(
    (cookie) =>
      cookie.name === cookieToChange.name &&
      cookie.domain === cookieToChange.domain &&
      cookie.path === cookieToChange.path,
  );

  expect(cookie).toBeDefined();
  expect(cookie?.value).toBe(newValue);
});
