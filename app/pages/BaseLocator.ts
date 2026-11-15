import { Locator, Page } from "@playwright/test";

export class BaseLocator {
  constructor(readonly page: Page) {}

  readonly pageTitleLocator: Locator = this.page.getByRole("heading", {
    level: 1,
  });
}
