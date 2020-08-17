import { AppPage } from './app.po';
import { browser, element, by, ElementFinder } from 'protractor';

const expectedTitle = 'UserRegistration';

describe('App pages', () => {

  describe('Initial page', () => {
    beforeAll(() => browser.get(''));

    let page: AppPage;

    beforeEach(() => {
      page = new AppPage();
    });

    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    const expectedViewNames = ['Dashboard', 'Welcome', 'Registration'];
    it(`has views ${expectedViewNames}`, () => {
      const viewNames = page.getPageElts().navElts.map((el: ElementFinder) => el.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has dashboard as the active view', () => {
      expect(page.getPageElts().appDashboard.isPresent()).toBeTruthy();
    });

  });

  describe('Dashboard page tests', () => {
    beforeAll(() => browser.get(''));

    let page: AppPage;

    beforeEach(() => {
      page = new AppPage();
    });

    const dashboardTitle = 'Dashboard';
    it(`should display '${dashboardTitle}' title`, () => {
      page.navigateTo();
      expect(page.getTitleText()).toEqual(dashboardTitle);
    });

    it('should click button and route to registration page', () => {
      page.navigateTo();
      const registerBtn = page.getPageElts().registerBtn.get(0);
      expect(registerBtn.getText()).toEqual('Go to registration');
      registerBtn.click();
      browser.waitForAngular();

      expect(page.getPageElts().registrationPage.isPresent()).toBeTruthy();
    });

  });

  describe('Welcome page tests', () => {
    beforeAll(() => browser.get('/welcome'));

    let page: AppPage;

    beforeEach(() => {
      page = new AppPage();
    });

    const welcomePageTitle = 'Welcome';
    const welcomePageMessage = 'Welcome to the user registration application!';

    it(`should display '${welcomePageTitle}' title`, () => {
      expect(page.getTitleText()).toEqual(welcomePageTitle);
    });

    it(`should display '${welcomePageMessage}' message`, () => {
      expect(page.getContentText()).toEqual(welcomePageMessage);
    });

  });

  describe('Registration page tests', () => {
    beforeAll(() => browser.get('/registration'));

    let page: AppPage;

    beforeEach(() => {
      page = new AppPage();
    });

    const registrationPageTitle = 'Register User';

    it(`should display '${registrationPageTitle}' title`, () => {
      expect(page.getTitleText()).toEqual(registrationPageTitle);
    });

    it(`should display form fields`, () => {
      page.waitForForm();
      const form = element.all(by.css('.registration-form')).first();

      const firstNameLabel = page.getLabelField(form, 'first_name');
      expect(firstNameLabel).toEqual('First name');
      const firstNameInput = page.getInputField(form, 'first_name');
      expect(firstNameInput.isPresent()).toBeTruthy();

      const middleNameLabel = page.getLabelField(form, 'middle_name');
      expect(middleNameLabel).toEqual('Middle name');
      const middleNameInput = page.getInputField(form, 'middle_name');
      expect(middleNameInput.isPresent()).toBeTruthy();

      const lastNameLabel = page.getLabelField(form, 'last_name');
      expect(lastNameLabel).toEqual('Last name');
      const lastNameInput = page.getInputField(form, 'last_name');
      expect(lastNameInput.isPresent()).toBeTruthy();

      const emailLabel = page.getLabelField(form, 'email');
      expect(emailLabel).toEqual('Email');
      const emailInput = page.getInputField(form, 'email');
      expect(emailInput.isPresent()).toBeTruthy();

      const mobileNumberLabel = page.getLabelField(form, 'phone_number');
      expect(mobileNumberLabel).toEqual('Mobile number');
      const mobileNumberInput = page.getInputField(form, 'phone_number');
      expect(mobileNumberInput.isPresent()).toBeTruthy();

      const passwordLabel = page.getLabelField(form, 'password');
      expect(passwordLabel).toEqual('Password');
      const passwordInput = page.getInputField(form, 'password');
      expect(passwordInput.isPresent()).toBeTruthy();
    });

    it('should not display any errors upon render', () => {
      page.waitForForm();
      const errorMessages = element.all(by.css('.form-group .text-danger'));
      expect(errorMessages.isPresent()).toBeFalsy();
      const errorInputs = element.all(by.css('input.is-invalid'));
      expect(errorInputs.isPresent()).toBeFalsy();
    });

    it('should display errors on invalid input', () => {
      page.waitForForm();
      const form = element.all(by.css('.registration-form')).first();

      const emailInput = page.getInputField(form, 'email');
      emailInput.sendKeys('test');
      expect(emailInput.getAttribute('class')).toMatch('ng-invalid');
      expect(emailInput.getAttribute('class')).toMatch('is-invalid');
      const emailWrapper = element.all(by.css('.form-group.email')).first();
      const errorMessage = emailWrapper.element(by.css('.text-danger'));
      expect(errorMessage.isPresent()).toBeTruthy();
    });

    it('should disable submit button on invalid input', () => {
      page.waitForForm();
      const form = element.all(by.css('.registration-form')).first();

      const emailInput = page.getInputField(form, 'email');
      emailInput.clear();
      const phoneInput = page.getInputField(form, 'phone_number');
      phoneInput.sendKeys('phone');
      const submit = element.all(by.css('form button[type=submit]')).first();
      expect(submit.getAttribute('disabled')).toBeTruthy();
    });

    it('should redirect to welcome page on successfull submit', () => {
      page.waitForForm();
      const form = element.all(by.css('.registration-form')).first();

      const firstNameInput = page.getInputField(form, 'first_name');
      firstNameInput.sendKeys('John');

      const middleNameInput = page.getInputField(form, 'middle_name');
      middleNameInput.sendKeys('D');

      const lastNameInput = page.getInputField(form, 'last_name');
      lastNameInput.sendKeys('Doe');

      const emailInput = page.getInputField(form, 'email');
      emailInput.clear();
      emailInput.sendKeys('johndoe@test.com');

      const mobileNumberInput = page.getInputField(form, 'phone_number');
      mobileNumberInput.clear();
      mobileNumberInput.sendKeys(123456789);

      const passwordInput = page.getInputField(form, 'password');
      passwordInput.sendKeys('123123aA');

      const submit = element.all(by.css('form button[type=submit]')).first();

      expect(submit.getAttribute('disabled')).toBeNull();
      submit.click();

      browser.waitForAngular();

      expect(page.getPageElts().welcomePage.isPresent()).toBeTruthy();
    });

  });

});
