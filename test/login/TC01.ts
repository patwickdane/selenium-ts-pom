import { expect } from 'chai';
import { after, describe, it } from 'mocha';
import { WebElement } from 'selenium-webdriver';
import { LoginPageInterface } from '../../pages/LoginPage';
import { Browser } from '../../utils/Browser';
import { BrowserHelper } from '../../utils/BrowserHelper';

export const TC01 = (browserType: string) =>
  describe('TC01 - Landing Page', () => {
    let browser: Browser;
    let loginPage: LoginPageInterface;

    before(async () => {
      const { browser: newBrowser, loginPage: newLoginPage } =
        await BrowserHelper.getInstance().launchApp(browserType);

      browser = newBrowser;
      loginPage = newLoginPage;
    });

    after(async () => {
      await browser.close();
    });

    it('displays logo', async () => {
      const logo: WebElement = await loginPage.getLogo();

      expect(await logo.isDisplayed()).to.be.true;
    });
  });
