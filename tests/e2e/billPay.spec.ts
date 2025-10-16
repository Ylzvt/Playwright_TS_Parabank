import { test, expect } from '@playwright/test';
import { HomePage } from '../../PageObject/homePage';
import { RegisterPage } from '../../PageObject/registerPage';
import { LoginPanel } from '../../PageObject/loginPage';
import { OpenAccountPage } from '../../PageObject/openAccount';
import { BillPayPage } from '../../PageObject/billPayPage';
import { generateUser } from '../../testData/generateUser';
import users from '../../testData/users.json' assert { type: 'json' };

let home: HomePage;
let register: RegisterPage;
let panel: LoginPanel;
let openAccount: OpenAccountPage;
let billPay: BillPayPage;
let user: ReturnType<typeof generateUser>;

test.describe('Bill Payment flow', () => {
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    register = new RegisterPage(page);
    panel = new LoginPanel(page);
    openAccount = new OpenAccountPage(page);
    billPay = new BillPayPage(page);
    user = generateUser();
    await page.goto('/');
  });

  test('Pay bill using data using testData/users.json @smoke', async () => {
    // Register and login
    await home.openRegister();
    await register.registerUser(user);
    await panel.checkIfLoggedIn();

    // Create extra account to ensure fromAccount exists
    await openAccount.openNew('SAVINGS');

    // Get payee data from users.json
    const src = users[0];
    const payee = {
      name: `${src.firstName} ${src.lastName}`,
      address: src.address,
      city: src.city,
      state: src.state,
      zip: src.zip,
      phone: src.phone,
      account: src.phone,
      amount: 25,
    };

    //Execute payment
    const confirmation = await billPay.payBill(payee);
  });
});