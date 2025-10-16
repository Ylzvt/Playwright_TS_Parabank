import { Page, Locator, expect } from '@playwright/test';

export class AccountsOverviewPage {
  readonly page: Page;
  readonly linkOverview: Locator;
  readonly heading: Locator;
  readonly table: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkOverview = page.getByRole('link', { name: 'Accounts Overview' });
    this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.table = page.locator('#accountTable');          // основная таблица
    this.rows  = this.table.locator('tbody tr');         // строки со счетами
  }

  /** Навигация на страницу обзора счетов */
  async goto() {
    await this.linkOverview.click();
    await this.page.waitForURL('**/overview.htm').catch(async () => {
      await this.linkOverview.click();
      await this.page.waitForURL('**/overview.htm');
    });
    await expect(this.heading).toBeVisible();
    await expect(this.table).toBeVisible();
  }

  /** Проверить, что в таблице присутствует счёт с указанным ID */
  async expectAccountPresent(accountId: string) {
    await this.goto();
    await expect(this.table).toContainText(accountId);
  }

  /** Вернуть список всех ID счетов, отображённых в таблице */
  async getAccountIds(): Promise<string[]> {
    await this.goto();
    const links = this.rows.locator('td a[href*="activity.htm?"]'); // ссылки на аккаунт
    const texts = await links.allTextContents();
    return texts.map(t => t.trim()).filter(Boolean);
  }

  /** Открыть страницу активности конкретного счёта */
  async openAccountById(accountId: string) {
    await this.goto();
    await this.page.getByRole('link', { name: accountId }).click();
    await this.page.waitForURL(`**/activity.htm?**accountId=${accountId}`);
    await expect(this.page.getByRole('heading', { name: 'Account Activity' })).toBeVisible();
  }
}