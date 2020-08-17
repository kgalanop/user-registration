import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationFormFieldComponent } from '../registration-form-field/registration-form-field.component';
import { RegistrationFormService } from '../../services';
import { SharedModule } from 'src/app/shared/shared.module';

const fieldsMock = require('./fields_mock.json');

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let registrationFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        RegistrationFormComponent,
        RegistrationFormFieldComponent
      ],
      providers: [ RegistrationFormService ]
    })
    .overrideComponent(RegistrationFormComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    registrationFormService = TestBed.inject(RegistrationFormService);

    component.fields = fieldsMock;
    component.error = '';
    component.loading = false;
    component.form = registrationFormService.fieldsToForm(fieldsMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render registration fields', () => {
    fixture.detectChanges();

    const fields = fixture.debugElement.nativeElement.querySelectorAll('app-registration-form-field');
    expect(component.fields.length).toEqual(fields.length);
  });

  it('should display error and not the form in case of an error', () => {
    component.error = 'Test error';
    fixture.detectChanges();

    const fields = fixture.debugElement.nativeElement.querySelectorAll('app-registration-form-field');
    const error = fixture.debugElement.nativeElement.querySelector('.registration-form > .alert-danger');
    expect(fields.length).toEqual(0);
    expect(error.textContent).toEqual(component.error);

  });

  it('show disable submit if form is loading', () => {
    component.loading = true;

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

});
