import { expect, Locator, Page } from "@playwright/test";

export class LoginPanel {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly logoutbtn: Locator;
  readonly welcomeBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input.button[value="Log In"]');
    this.errorMessage = page.locator(".error");
    this.logoutbtn = page.getByRole("link", { name: "Log Out" });
    this.welcomeBanner = page.locator("#rightPanel");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async checkIfLoggedIn() {
    await expect(this.logoutbtn, "Log Out btn should appear").toBeVisible();
    await expect(this.welcomeBanner).toContainText(
      " Your account was created successfully. You are now logged in."
    );
  }

  async logoutNow() {
    if (await this.logoutbtn.isVisible()) {
      await this.logoutbtn.click();
      await expect(this.loginButton).toBeVisible();
    }
  }
}