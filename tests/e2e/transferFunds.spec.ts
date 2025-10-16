import { test, expect } from "@playwright/test";
import { HomePage } from "../../PageObject/homePage";
import { RegisterPage } from "../../PageObject/registerPage";
import { LoginPanel } from "../../PageObject/loginPage";
import { OpenAccountPage } from "../../PageObject/openAccount";
import { TransferFundsPage } from "../../PageObject/transferFunds";
import { generateUser } from "../../testData/generateUser";

let home: HomePage;
let register: RegisterPage;
let panel: LoginPanel;
let openAccount: OpenAccountPage;
let transfer: TransferFundsPage;
let user: ReturnType<typeof generateUser>;

test.describe("Transfer Funds flow", () => {
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    register = new RegisterPage(page);
    panel = new LoginPanel(page);
    openAccount = new OpenAccountPage(page);
    transfer = new TransferFundsPage(page);
    user = generateUser();

    await page.goto("/");
  });

  test("Transfer between two accounts shows success banner @regression", async ({
    page,
  }) => {
    const user = generateUser();
    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const panel = new LoginPanel(page);
    const transfer = new TransferFundsPage(page);

    // Register new user
    await page.goto("/");
    await home.openRegister();
    await register.registerUser(user);
    await panel.checkIfLoggedIn();

    // Open Savings account
    await openAccount.openNew("SAVINGS");

    // Pefrorming transfer
    await transfer.makeTransfer(10);
  });
});