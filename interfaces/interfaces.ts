import { By, WebElement } from 'selenium-webdriver';

export type Selector = By | string;

export interface UrlOpenable {
  goTo(url: string): Promise<void>;
  getCurrentUrl(): Promise<string>;
}

export interface Visitable extends Pick<UrlOpenable, 'getCurrentUrl'> {
  visit(): Promise<void>;
}

export interface FormValidatable {
  getErrorMessageText(): Promise<string>;
  getErrorMessageContainer(): Promise<WebElement>;
}

export interface Loginable extends FormValidatable {
  enterUsername(username: string): Promise<void>;
  enterPassword(password: string): Promise<void>;
  submitLogin(): Promise<void>;
}

export interface Brandable {
  getLogo(): Promise<WebElement>;
}

export interface ElementActionable {
  getElement(selector: Selector): Promise<WebElement>;
  getAllElements(selector: Selector): Promise<WebElement[]>;
  clickElement(targetElement: Selector | WebElement): Promise<WebElement>;
  enterTextInInputField(
    inputFieldSelector: Selector,
    text: string
  ): Promise<WebElement>;
}

export interface WindowActionable {
  close(): Promise<void>;
}
