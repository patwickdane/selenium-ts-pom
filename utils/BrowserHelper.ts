import { LoginPage } from '../pages/LoginPage';
import { Browser } from './Browser';

export class BrowserHelper {
  private static _instance: BrowserHelper;

  private constructor() {}

  public static getInstance() {
    if (!this._instance) {
      this._instance = new BrowserHelper();
    }

    return this._instance;
  }

  public async launchApp(browserType: string) {
    const browser = new Browser(browserType);
    const loginPage = new LoginPage(browser);
    await loginPage.visit();

    return { browser, loginPage };
  }
}
