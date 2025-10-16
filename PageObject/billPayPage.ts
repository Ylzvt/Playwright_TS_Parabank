import { Page, Locator, expect } from "@playwright/test";

export class BillPayPage {
  readonly page: Page;

  readonly btnBillPay: Locator;
  readonly heading: Locator;
  readonly payeeName: Locator;
  readonly payeeAddress: Locator;
  readonly payeeCity: Locator;
  readonly payeeState: Locator;
  readonly payeeZip: Locator;
  readonly payeePhone: Locator;
  readonly payeeAccount: Locator;
  readonly verifyAccount: Locator;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly sendPaymentBtn: Locator;
  readonly rightPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnBillPay = page.getByRole("link", { name: "Bill Pay" });
    this.heading = page.getByRole("heading", { name: "Bill Payment Service" });

    this.payeeName = page.locator('input[name="payee.name"]');
    this.payeeAddress = page.locator('input[name="payee.address.street"]');
    this.payeeCity = page.locator('input[name="payee.address.city"]');
    this.payeeState = page.locator('input[name="payee.address.state"]');
    this.payeeZip = page.locator('input[name="payee.address.zipCode"]');
    this.payeePhone = page.locator('input[name="payee.phoneNumber"]');

    this.payeeAccount = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccount = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');

    this.sendPaymentBtn = page.locator('input[value="Send Payment"]');
    this.rightPanel = page.locator("#rightPanel");
  }

  async goto() {
    await this.btnBillPay.click();
    await expect(this.heading).toBeVisible();
    await expect(this.amountInput).toBeVisible();
  }

  async payBill(opts: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    account: string;
    amount: number;
  }) {
    await this.goto();

    await this.payeeName.fill(opts.name);
    await this.payeeAddress.fill(opts.address);
    await this.payeeCity.fill(opts.city);
    await this.payeeState.fill(opts.state);
    await this.payeeZip.fill(opts.zip);
    await this.payeePhone.fill(opts.phone);

    await this.payeeAccount.fill(opts.account);
    await this.verifyAccount.fill(opts.account);
    await this.amountInput.fill(String(opts.amount));
    await this.fromAccountSelect.selectOption({ index: 0 });

    await this.sendPaymentBtn.click();
    await expect(this.rightPanel).toContainText("Bill Payment Complete");
    return await this.rightPanel.textContent();
  }
}