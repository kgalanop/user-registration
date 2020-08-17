import { browser, by, element, ExpectedConditions, ElementFinder } from 'protractor';

export class AppPage {

  getPageElts() {
    const navElts = element.all(by.css('app-root nav a'));

    return {
      navElts,

      appDashboard: element(by.css('app-root app-dashboard-page')),
      registerBtn: element.all(by.css('app-root app-dashboard-page .btn.btn-primary')),

      welcomePage: element(by.css('app-root app-welcome-page')),

      registrationPage: element(by.css('app-root app-registration-page')),
    };
  }

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getContentText() {
    return element(by.css('app-root .content')).getText() as Promise<string>;
  }

  getLabelField(elm: ElementFinder, field: string) {
    return elm.element(by.css(`label[for=${field}]`)).getText();
  }

  getInputField(elm: ElementFinder, field: string) {
    return elm.element(by.css(`input[name=${field}]`));
  }

  waitForForm() {
    const form = element.all(by.css('.registration-form'));
    browser.wait(ExpectedConditions.presenceOf(form.first()), 8000);
  }

}
