import { test as base, expect, request } from "@playwright/test";
import { UsersController } from "../../../app/controllers/UsersController.controller";
import { createLocalStorage } from "./StorageHelper";
import { userRegisterData } from "../users.data";

type MyFixtures = {
  token: string;
  login: void;
};

const test = base.extend<MyFixtures>({
  token: async ({}, use) => {
    const context = await request.newContext({});
    const usersController = new UsersController(context);
    const response = await usersController.createUser(userRegisterData);
    const text = await response.text();
    const json = await response.json();

    const token = json.user.token;

    await use(token);
  },

  login: async ({ context, token }, use) => {
    const localStorage = createLocalStorage(token);
    await context.setStorageState(localStorage);

    await use();
  },

  request: async ({ token }, use) => {
    const context = await request.newContext({
      extraHTTPHeaders: {
        authorization: "Token " + token,
      },
    });

    await use(context);
    await context.dispose();
  },
});

export {test, expect}
