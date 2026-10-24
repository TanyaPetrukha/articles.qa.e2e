import { Page, expect } from "@playwright/test";
import path from "path";

export const feedbackTestdata = [
  {
    id: 1,
    userInfo: {
      name: "fist user",
      email: "first@gm.com",
      message: "Знайшла помилку на сторінці статті.",
    },
    settings: {
      subject: "Повідомити про ваду",
      priority: "Високий",
      attachments: path.join(__dirname, "test-img.gif"),
      copy: true,
    },
    verify: async function (page: Page) {
      await expect(page.getByTestId("contact-success")).toBeVisible();
    },
  },
  {
    id: 2,
    userInfo: {
      name: "second user",
      email: "second@gm.com",
      message: "Маю питання щодо статті.",
    },
    settings: {
      copy: false,
    },
    verify: async function (page: Page) {
      await expect(page.getByTestId("contact-success")).toBeVisible();
    },
  },
  {
    id: 3,
    userInfo: {},
    settings: {
      subject: "Пропозиція функції",
      priority: "Низький",
      attachments: path.join(__dirname, "test-img.gif"),
      copy: true,
    },
    verify: async function (page: Page) {
      await expect(page.getByTestId("error-messages")).toBeVisible();
    },
  },
];
