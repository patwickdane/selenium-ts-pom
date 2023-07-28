import { expect } from 'chai';
import { describe, it } from 'mocha';
import { LoginPageInterface } from '../../pages/LoginPage';
import { Browser } from '../../utils/Browser';
import { BrowserHelper } from '../../utils/BrowserHelper';

export const TC02 = (browserType: string) =>
  describe('TC02 - User Log-in', () => {
    let browser: Browser;
    let loginPage: LoginPageInterface;
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    const invalidUsername = 'wrong';
    const invalidPassword = 'user';

    beforeEach(async () => {
      const { browser: newBrowser, loginPage: newLoginPage } =
        await BrowserHelper.getInstance().launchApp(browserType);

      browser = newBrowser;
      loginPage = newLoginPage;
    });

    afterEach(async () => {
      await browser.close();
    });

    describe('successful log-in', () => {
      it('successfully logs in when correct credentials are used', async () => {
        await loginPage.enterUsername(validUsername);
        await loginPage.enterPassword(validPassword);
        await loginPage.submitLogin();
        const currentURL = await loginPage.getCurrentUrl();
        const expectedURL = 'https://www.saucedemo.com/inventory.html';

        expect(currentURL).to.equal(expectedURL);
      });
    });

    describe('failed log-in', () => {
      it('stays on the login page if invalid credentials are used', async () => {
        await loginPage.enterUsername(invalidUsername);
        await loginPage.enterPassword(invalidPassword);
        await loginPage.submitLogin();

        const currentURL = await loginPage.getCurrentUrl();
        const expectedURL = 'https://www.saucedemo.com/';

        expect(currentURL).to.equal(expectedURL);
      });

      it('shows error message when incorrect credentials are used ', async () => {
        await loginPage.enterUsername(invalidUsername);
        await loginPage.enterPassword(invalidPassword);
        await loginPage.submitLogin();

        const errorMessageContainer =
          await loginPage.getErrorMessageContainer();
        expect(await errorMessageContainer.isDisplayed()).to.be.true;

        const errorMessage = await loginPage.getErrorMessageText();
        const expectedErrorMessage =
          'Epic sadface: Username and password do not match any user in this service';

        expect(errorMessage).to.equal(expectedErrorMessage);
      });
    });
  });
