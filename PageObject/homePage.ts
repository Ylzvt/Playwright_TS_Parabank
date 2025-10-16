import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  goto(arg0: string) {
    throw new Error("Method not implemented.");
  }
  readonly page: Page;
  readonly loginPanel: Locator;
  readonly registerBtn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPanel = page.locator("#leftPanel");
    this.registerBtn = page.getByRole("link", { name: "Register" });
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.errorMessage = page.locator("#rightPanel .error");
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async openRegister() {
    await this.registerBtn.click();
  }
}