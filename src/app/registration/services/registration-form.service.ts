import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationField } from '../models';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators';

@Injectable()
export class RegistrationFormService {

  constructor() {  }

  fieldsToForm(fields: RegistrationField[]) {
    const group: any = {};

    fields.forEach(field => {
      group[field.name] = new FormControl();
      const validators = field.required ? [Validators.required] : [];
      if (field.validations && field.validations.length > 0) {
        field.validations.forEach(validation => {
          if (CustomValidators[validation.name]) {
            validators.push(CustomValidators[validation.name](validation.value));
          }
        });
      }
      group[field.name].setValidators(CustomValidators.composeFirst(validators));
    });

    return new FormGroup(group);
  }
}
