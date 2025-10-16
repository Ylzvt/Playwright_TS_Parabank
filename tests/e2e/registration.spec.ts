import { test, expect } from "@playwright/test";
import { HomePage } from "../../PageObject/homePage";
import { RegisterPage } from "../../PageObject/registerPage";
import { LoginPanel } from "../../PageObject/loginPage";
import { generateUser } from "../../testData/generateUser";

test.describe("@auth Registration", () => {
  test("Register new user @smoke", async ({ page }) => {
    const user = generateUser();

    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const panel = new LoginPanel(page);

    await page.goto('/')
    await home.openRegister();
    await register.registerUser(user);
    await panel.checkIfLoggedIn();
  });

  test("Login negative: wrong password  @regression", async ({page,}) => {
    const home = new HomePage(page);

    await page.goto('/')
    await home.login("nonexistent_user", "wrong");
    await expect(home.errorMessage).toContainText('An internal error has occurred and has been logged.');
  });

  test("Login positive with newly created user @smoke", async ({ page }) => {
    const user = generateUser();

    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const panel = new LoginPanel(page);

    await page.goto('/')
    await home.openRegister();
    await register.registerUser(user);
    await panel.checkIfLoggedIn();

    // Log out and log back in with the same creds
    await panel.logoutNow();
    await panel.login(user.username, user.password);
    await expect(panel.logoutbtn, 'Log Out btn should appear').toBeVisible({ timeout: 10000 });
    
   });
});
