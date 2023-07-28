import { Builder, By, WebDriver, WebElement } from 'selenium-webdriver';
import {
  ElementActionable,
  Selector,
  UrlOpenable,
  WindowActionable,
} from '../interfaces/interfaces';

interface BrowserInterface
  extends UrlOpenable,
    ElementActionable,
    WindowActionable {}

export class Browser implements BrowserInterface {
  private _driver: WebDriver;

  constructor(name: string) {
    // this._driver = new Builder().forBrowser(name).build();
    this._driver = new Builder().forBrowser(name).build();
  }

  public async goTo(url: string) {
    await this._driver.get(url);
  }

  public async close() {
    await this._driver.quit();
  }

  public async getElement(selector: Selector) {
    if (typeof selector === 'string') {
      return await this._driver.findElement(By.css(selector));
    } else {
      return await this._driver.findElement(selector);
    }
  }

  public async getAllElements(selector: string) {
    if (typeof selector === 'string') {
      return await this._driver.findElements(By.css(selector));
    } else {
      return await this._driver.findElements(selector);
    }
  }

  public async forceWait(seconds: number = 5000) {
    await this._driver.wait(() => false, seconds);
  }

  public async clickElement(targetElement: Selector | WebElement) {
    let element: WebElement;
    if (targetElement instanceof WebElement) {
      element = targetElement as WebElement;
    } else {
      element = await this.getElement(targetElement);
    }

    await element.click();
    return element;
  }

  public async enterTextInInputField(
    inputFieldSelector: Selector,
    text: string
  ) {
    const inputField = await this.clickElement(inputFieldSelector);
    await inputField.sendKeys(text);

    return inputField;
  }

  public async getCurrentUrl() {
    return await this._driver.getCurrentUrl();
  }
}
