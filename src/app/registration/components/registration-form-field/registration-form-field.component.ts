import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Memoize } from 'lodash-decorators';

import { RegistrationField } from '../../models';
import { INPUT_TYPES } from '../../registration.constants';

@Component({
  selector: 'app-registration-form-field',
  templateUrl: './registration-form-field.component.html',
  styleUrls: ['./registration-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormFieldComponent implements OnInit {
  @Input() fieldInfo: RegistrationField;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  getFirstError() {
    return Object.keys(this.control.errors)[0];
  }

  @Memoize()
  getInputType(type: string) {
    return INPUT_TYPES[type] ? INPUT_TYPES[type] : type;
  }

  @Memoize()
  isLoginField(type: string) {
    return type === 'email' || type === 'password';
  }

  @Memoize((error, value) => error + value)
  getValidationError(error, value) {
    if (error === 'required') {
      return 'Required field';
    } else {
      if (this.fieldInfo.validations && this.fieldInfo.validations.length > 0) {
        const fieldValidation = this.fieldInfo.validations.find(validation => validation.name === error && validation.value === value);
        if (fieldValidation) {
          return fieldValidation.message;
        }
        return 'Validation error';
      }
      return 'Validation error';
    }
  }
}
