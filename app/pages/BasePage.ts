import { Page } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";

export class BasePage {
  readonly header: HeaderComponent;

  constructor(readonly page: Page) {
    this.header = new HeaderComponent(this.page);
  }

  async open() {
    await this.page.goto(`${process.env.BASE_URL}`);
  }
}
