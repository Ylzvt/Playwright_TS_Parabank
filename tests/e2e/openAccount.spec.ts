import { test } from "@playwright/test";
import { HomePage } from "../../PageObject/homePage";
import { RegisterPage } from "../../PageObject/registerPage";
import { LoginPanel } from "../../PageObject/loginPage";
import { OpenAccountPage } from "../../PageObject/openAccount";
import { AccountsOverviewPage } from "../../PageObject/accountsOverview";
import { generateUser } from "../../testData/generateUser";

let home: HomePage;
let register: RegisterPage;
let panel: LoginPanel;
let open: OpenAccountPage;
let overview: AccountsOverviewPage;
let user: ReturnType<typeof generateUser>;

test.describe("Open new account flow", () => {
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    register = new RegisterPage(page);
    panel = new LoginPanel(page);
    open = new OpenAccountPage(page);
    overview = new AccountsOverviewPage(page);
    user = generateUser();

    await page.goto("/");
  });

  test("Open new CHECKING account and verify it appears in Accounts Overview @regression", async () => {
    // Register new user
    await home.openRegister();
    await register.registerUser(user);
    await panel.checkIfLoggedIn();
    
    // Open checkins account
    const newAccountId = await open.openNew("CHECKING");
    
    // Verify new account exists
    await overview.goto();
    await overview.expectAccountPresent(newAccountId);
  });

  test("Open new SAVINGS account and verify it appears in Accounts Overview @smoke", async () => {

    // Register another user
    await home.openRegister();
    await register.registerUser(user);
    
    // Create savings account
    const newAccountId = await open.openNew("SAVINGS");
    
    // Check if account exist 
    await overview.goto();
    await overview.expectAccountPresent(newAccountId);
  });
});