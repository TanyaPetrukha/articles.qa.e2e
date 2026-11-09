import { test, expect } from "@playwright/test";
import { UsersController } from "../../app/controllers/UsersController.controller";
import { userRegisterData } from "./users.data";

test(
  `AR-001-registration via API`,
  { tag: ["@user", "@smoke", "@regression"] },
  async ({ request }) => {
    const usersController = new UsersController(request);

    const response = await usersController.createUser(userRegisterData);

    const body = await response.json();
    expect(body.user.token).toBeDefined();
  },
);
