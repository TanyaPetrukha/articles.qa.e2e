import { BasePage } from "../BasePage";
import { ArticlePageLocator } from "./ArticlePageLocators";

export type ArticleFormData = {
  title: string;
  description: string;
  body: string;
};

export class ArticlePage extends BasePage {
  readonly path = "/article";
  readonly locators: ArticlePageLocator = new ArticlePageLocator(this.page);

  async openBySlug(slug: string) {
    await this.page.goto(`${process.env.BASE_URL}${this.path}/${slug}`);
  }

  async getTitle() {
    return this.locators.articleTitleLocator.innerText();
  }

  async fillTitle(title: string) {
    await this.locators.titleInputLocator.fill(title);
  }

  async fillDescription(description: string) {
    await this.locators.descriptionInputLocator.fill(description);
  }

  async fillBody(body: string) {
    await this.locators.bodyInputLocator.fill(body);
  }

  async fillArticleForm({ title, description, body }: ArticleFormData) {
    await this.fillTitle(title);
    await this.fillDescription(description);
    await this.fillBody(body);
  }

  async publish() {
    await this.locators.publishButtonLocator.click();
  }
}
