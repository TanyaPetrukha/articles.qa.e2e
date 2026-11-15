import { test as base, expect, request } from "@playwright/test";
import { UsersController } from "../../../app/controllers/UsersController.controller";
import { createLocalStorage } from "./StorageHelper";
import { generateUser } from "../users.data";
import { PageManager } from "../../../app/pages/PageManager";

type CreatedUser = {
  email: string;
  username: string;
  password: string;
  token: string;
};

type MyFixtures = {
  createdUser: CreatedUser;
  token: string;
  login: void;
  pages: PageManager;
};

const test = base.extend<MyFixtures>({
  pages: async ({ page }, use) => {
    const pages = new PageManager(page);
    await use(pages);
  },

  createdUser: async ({}, use) => {
    const apiContext = await request.newContext();
    const usersController = new UsersController(apiContext);
    const userData = generateUser();

    const response = await usersController.createUser(userData);

    const json = await response.json();
    const token = json.user.token;

    await apiContext.dispose();
    await use({ ...userData.user, token });
  },

  token: async ({ createdUser }, use) => {
    await use(createdUser.token);
  },

  login: [
    async ({ context, token }, use) => {
      const localStorage = createLocalStorage(token);
      await context.setStorageState(localStorage);

      await use();
    },
    {
      auto: true,
    },
  ],
});

export { test, expect };
