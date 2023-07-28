import { By, WebElement } from 'selenium-webdriver';
import { Brandable, Loginable, Visitable } from '../interfaces/interfaces';
import { Browser } from '../utils/Browser';

export interface LoginPageInterface extends Visitable, Loginable, Brandable {}

export class LoginPage implements LoginPageInterface {
  private _browser: Browser;
  private _url: string = 'https://www.saucedemo.com';
  private _usernameFieldSelector = By.css('input#user-name');
  private _passwordFieldSelector = By.css('input#password');
  private _loginButtonSelector = By.css('input#login-button');
  private _logoSelector = By.css('.login_logo');
  private _errorMessageSelector = By.css('div.error-message-container.error');

  constructor(browser: Browser) {
    this._browser = browser;
  }

  public async visit() {
    await this._browser.goTo(this._url);
  }

  public async getLogo(): Promise<WebElement> {
    return await this._browser.getElement(this._logoSelector);
  }

  public async enterPassword(password: string) {
    await this._browser.enterTextInInputField(
      this._passwordFieldSelector,
      password
    );
  }

  public async enterUsername(username: string) {
    await this._browser.enterTextInInputField(
      this._usernameFieldSelector,
      username
    );
  }

  public async submitLogin() {
    await this._browser.clickElement(this._loginButtonSelector);
  }

  public async getCurrentUrl(): Promise<string> {
    return await this._browser.getCurrentUrl();
  }

  public async getErrorMessageContainer(): Promise<WebElement> {
    return await this._browser.getElement(this._errorMessageSelector);
  }

  public async getErrorMessageText(): Promise<string> {
    const errorMessageContainer = await this._browser.getElement(
      this._errorMessageSelector
    );

    return await errorMessageContainer.getText();
  }
}
