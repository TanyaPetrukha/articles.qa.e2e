import { Page } from "@playwright/test";

export class BaseComponent {
  constructor(readonly page: Page) {}
}
