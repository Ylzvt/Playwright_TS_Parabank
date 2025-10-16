import { Page, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async registerUser(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }) {
    await this.page.fill('input[name="customer.firstName"]', data.firstName);
    await this.page.fill('input[name="customer.lastName"]', data.lastName);
    await this.page.fill('input[name="customer.address.street"]', data.address);
    await this.page.fill('input[name="customer.address.city"]', data.city);
    await this.page.fill('input[name="customer.address.state"]', data.state);
    await this.page.fill('input[name="customer.address.zipCode"]', data.zip);
    await this.page.fill('input[name="customer.phoneNumber"]', data.phone);
    await this.page.fill('input[name="customer.ssn"]', data.ssn);
    await this.page.fill('input[name="customer.username"]', data.username);
    await this.page.fill('input[name="customer.password"]', data.password);
    await this.page.fill('input[name="repeatedPassword"]', data.password);
    await this.page.click('input[value="Register"]');
    await expect(this.page.locator("#rightPanel")).toContainText(
      "Your account was created successfully"
    );
  }
}