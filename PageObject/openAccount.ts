import { Page, Locator, expect } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;
  readonly linkOpenNew: Locator;
  readonly heading: Locator;
  readonly typeSelect: Locator;
  readonly openBtn: Locator;
  readonly rightPanel: Locator;
  readonly newAccountId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkOpenNew = page.getByRole('link', { name: 'Open New Account' });
    this.heading = page.getByRole('heading', { name: 'Open New Account' });
    this.typeSelect = page.locator('select#type');                  
    this.openBtn = page.locator('input[value="Open New Account"]'); 
    this.rightPanel = page.locator('#rightPanel');                  
    this.newAccountId = page.locator('#newAccountId');              
  }


  async goto() {
    await this.linkOpenNew.click();
   
    await this.page.waitForURL('**/openaccount.htm').catch(async () => {
      await this.linkOpenNew.click();
      await this.page.waitForURL('**/openaccount.htm');
    });
    await expect(this.heading).toBeVisible();
    await expect(this.typeSelect).toBeVisible();
  }

  async openNew(type: 'CHECKING' | 'SAVINGS' = 'CHECKING'): Promise<string> {
    await this.goto();

    const value = type === 'CHECKING' ? '0' : '1';
    await this.typeSelect.selectOption(value);
    await this.openBtn.click();

    await expect(this.rightPanel).toContainText('account is now open');

    const id = (await this.newAccountId.innerText()).trim();
    return id;
  }
}