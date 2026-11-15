import { Page } from "@playwright/test";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { ProfilePage } from "./ProfilePage/ProfilePage";
import { SettingsPage } from "./SettingsPage/SettingsPage";
import { ArticlePage } from "./ArticlePage/ArticlePage";

export class PageManager {
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;
  readonly registerPage: RegisterPage;
  readonly profilePage: ProfilePage;
  readonly settingsPage: SettingsPage;
  readonly articlePage: ArticlePage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.registerPage = new RegisterPage(page);
    this.profilePage = new ProfilePage(page);
    this.settingsPage = new SettingsPage(page);
    this.articlePage = new ArticlePage(page);
  }
}
