import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { RegistrationFormFieldComponent } from '../registration-form-field/registration-form-field.component';
import { RegistrationFormService } from '../../services';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectionStrategy } from '@angular/core';
import { RegistrationField, FieldValidation } from '../../models';
import { INPUT_TYPES } from '../../registration.constants';
import { ShowHidePasswordDirective } from 'src/app/shared/directives';

const fieldInfo: RegistrationField = {
  type: 'text',
  name: 'middle_name',
  label: 'Middle name',
  required: false,
  validations: [
  {
    name: 'minlength',
    message: 'Must be more than 3 characters.',
    value: 4
  },
  {
    name: 'maxlength',
    message: 'Must be less than 11 characters.',
    value: 10
  }]
};

describe('RegistrationFormFieldComponent', () => {
  let component: RegistrationFormFieldComponent;
  let fixture: ComponentFixture<RegistrationFormFieldComponent>;
  let registrationFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        RegistrationFormFieldComponent,
        ShowHidePasswordDirective
      ],
      providers: [ RegistrationFormService ]
    })
    .overrideComponent(RegistrationFormFieldComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormFieldComponent);
    component = fixture.componentInstance;
    registrationFormService = TestBed.inject(RegistrationFormService);

    component.fieldInfo = fieldInfo;
    const form = registrationFormService.fieldsToForm([fieldInfo]);
    component.control = form.get(fieldInfo.name);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the proper label', () => {
    const label = fixture.debugElement.nativeElement.querySelector('label');
    expect(label.textContent).toEqual(fieldInfo.label);
  });

  it('should display the proper input name', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('name')).toEqual(fieldInfo.name);
  });

  it('should display the proper input type', () => {
    const fieldTypes = ['text', 'email', 'phone', 'password'];
    fieldTypes.forEach((type: 'text' | 'email' | 'phone' | 'password') => {
      component.fieldInfo.type = type;
      fixture.detectChanges();
      const inputType = INPUT_TYPES[type] ? INPUT_TYPES[type] : type;
      const input = fixture.debugElement.nativeElement.querySelector('input');
      expect(input.getAttribute('type')).toEqual(inputType);
    });
  });

  it('should set required if field is required', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('required')).toBeNull();

    component.fieldInfo.required = true;
    fixture.detectChanges();
    expect(input.getAttribute('required')).toEqual('');
  });

  it('should show error if value not set for required field', () => {
    component.fieldInfo.required = true;
    component.control.setValue('');
    component.control.markAsTouched();

    fixture.detectChanges();
    expect(component.control.hasError('required')).toBeTruthy();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('class')).toMatch('is-invalid');
    expect(input.getAttribute('class')).toMatch('ng-invalid');
    const errorMessage = fixture.debugElement.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent.trim()).toEqual('Required field');
  });

  it('should show error for minvalue validation', () => {
    const minValueValidation: FieldValidation = fieldInfo.validations.find((validation) => validation.name === 'minlength');
    const testString = 'testvalueDoe';

    component.control.setValue(testString.substring(0, +minValueValidation.value - 1));
    component.control.markAsTouched();
    fixture.detectChanges();

    expect(component.control.hasError('minlength')).toBeTruthy();
    expect(component.control.errors.minlength).toEqual(minValueValidation.value);

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('class')).toMatch('is-invalid');
    expect(input.getAttribute('class')).toMatch('ng-invalid');
    const errorMessage = fixture.debugElement.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent.trim()).toEqual(minValueValidation.message);

    component.control.setValue(testString.substring(0, +minValueValidation.value));
    component.control.markAsTouched();
    fixture.detectChanges();

    checkFieldValid();
  });

  it('should show error for maxValue validation', () => {
    const maxValueValidation: FieldValidation = fieldInfo.validations.find((validation) => validation.name === 'maxlength');
    const testString = 'testvalueDoe';

    component.control.setValue(testString.substring(0, +maxValueValidation.value + 1));
    component.control.markAsTouched();
    fixture.detectChanges();

    expect(component.control.hasError('maxlength')).toBeTruthy();
    expect(component.control.errors.maxlength).toEqual(maxValueValidation.value );

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('class')).toMatch('is-invalid');
    expect(input.getAttribute('class')).toMatch('ng-invalid');
    const errorMessage = fixture.debugElement.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent.trim()).toEqual(maxValueValidation.message);

    component.control.setValue(testString.substring(0, +maxValueValidation.value));
    component.control.markAsTouched();
    fixture.detectChanges();

    checkFieldValid();
  });

  it('should show error for regex validation', () => {
    const errorString = '@#%$$%#53445';
    const correctString = 'sdfdsgdfgdfg';

    component.fieldInfo.validations = [{
      name: 'regex',
      message: 'Only English characters are allowed.',
      value: '^[a-zA-Z0-9]*$'
    }];
    const form = registrationFormService.fieldsToForm([fieldInfo]);
    component.control = form.get(fieldInfo.name);

    const regexValidation: FieldValidation = component.fieldInfo.validations.find((validation) => validation.name === 'regex');

    component.control.setValue(errorString);
    component.control.markAsTouched();
    fixture.detectChanges();

    expect(component.control.hasError('regex')).toBeTruthy();
    expect(component.control.errors.regex).toEqual(regexValidation.value);

    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('class')).toMatch('is-invalid');
    expect(input.getAttribute('class')).toMatch('ng-invalid');
    const errorMessage = fixture.debugElement.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent.trim()).toEqual(regexValidation.message);

    component.control.setValue(correctString);
    component.control.markAsTouched();
    fixture.detectChanges();

    checkFieldValid();
  });

  it('should display first error for multiple errors', () => {
    const errorNoLowercaseAndUppercase = '234323';
    const errorNoUppercase = '234234234dfdsgdfgdfg';

    component.fieldInfo.validations = [{
      name: 'regex',
      message: '1 or more numbers.',
      value: '^.*[0-9].*$'
    },
    {
      name: 'regex',
      message: '1 or more lower case letters.',
      value: '^.*[a-z].*$'
    },
    {
      name: 'regex',
      message: '1 or more upper case letters.',
      value: '^.*[A-Z].*$'
    }];

    const form = registrationFormService.fieldsToForm([fieldInfo]);
    component.control = form.get(fieldInfo.name);

    component.control.setValue(errorNoLowercaseAndUppercase);
    component.control.markAsTouched();
    fixture.detectChanges();

    expect(component.control.hasError('regex')).toBeTruthy();
    expect(component.control.errors.regex).toEqual('^.*[a-z].*$');

    let input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('class')).toMatch('is-invalid');
    expect(input.getAttribute('class')).toMatch('ng-invalid');
    let errorMessage = fixture.debugElement.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent.trim()).toEqual('1 or more lower case letters.');

    component.control.setValue(errorNoUppercase);
    component.control.markAsTouched();
    fixture.detectChanges();

    expect(component.control.hasError('regex')).toBeTruthy();
    expect(component.control.errors.regex).toEqual('^.*[A-Z].*$');

    input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('class')).toMatch('is-invalid');
    expect(input.getAttribute('class')).toMatch('ng-invalid');
    errorMessage = fixture.debugElement.nativeElement.querySelector('.text-danger');
    expect(errorMessage.textContent.trim()).toEqual('1 or more upper case letters.');
  });

  it('should show eye button for password field types', () => {
    component.fieldInfo.type = 'password';
    fixture.detectChanges();

    const showPasswordButton = fixture.debugElement.query(By.css('.fa-eye-slash'));
    expect(showPasswordButton).toBeTruthy();
  });

  function checkFieldValid() {
    expect(component.control.hasError('minlength')).toBeFalsy();
    expect(fixture.debugElement.nativeElement.querySelector('input.is-invalid')).toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('input.ng-invalid')).toBeNull();
    const errorMessage = fixture.debugElement.nativeElement.querySelector('.text-danger');
    expect(errorMessage).toBeNull();
  }
});
