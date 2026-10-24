import { test } from "@playwright/test";
import { feedbackTestdata } from "./feedback-testdata";

const { BASE_URL, API_URL } = process.env;

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/contact`);
});

for (const data of feedbackTestdata) {
  test(`AR-01-${data.id} заповнення зворотньої форми`, async ({ page }) => {
    for (const key in data.userInfo) {
      await page.getByTestId(`contact-${key}`).fill(data.userInfo[key]);
    }

    if ("subject" in data.settings) {
      await page
        .getByTestId("contact-subject")
        .selectOption({ label: data.settings.subject });
    }

    if ("priority" in data.settings) {
      await page
        .getByRole("radio", {
          name: data.settings.priority,
        })
        .check();
    }

    if ("attachments" in data.settings) {
      await page
        .getByTestId("contact-attachments")
        .setInputFiles(data.settings.attachments);
    }

    const copyCheckbox = page.getByTestId("contact-copy-me");

    if (data.settings.copy) {
      await copyCheckbox.check();
    } else {
      await copyCheckbox.uncheck();
    }

    await page.getByTestId("contact-submit").click();

    await page.waitForResponse(`${API_URL}/feedback`);

    await data.verify(page);
  });
}
