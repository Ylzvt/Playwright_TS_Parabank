import { Page, Locator, expect } from "@playwright/test";

export class TransferFundsPage {
  readonly page: Page;
  readonly btnTransferFunds: Locator;
  readonly heading: Locator;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferButton: Locator;
  readonly successPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnTransferFunds = page.getByRole("link", { name: "Transfer Funds" });
    this.heading = page.getByRole("heading", { name: "Transfer Funds" });
    this.amountInput = page.locator("input#amount");
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.toAccountSelect = page.locator('select[name="toAccountId"]');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.successPanel = page.locator("#rightPanel");
  }

  async goto() {
    await this.btnTransferFunds.click();
    await expect(this.heading).toBeVisible();
    await expect(this.amountInput).toBeVisible();
  }

  async makeTransfer(amount: number) {
    await this.goto();
    await this.amountInput.fill(String(amount));
    await this.transferButton.click();
    await expect(this.page.locator("#rightPanel")).toContainText(
      "Transfer Complete!"
    );
  }
}