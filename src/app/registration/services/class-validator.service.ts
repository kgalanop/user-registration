import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationError } from 'class-validator';

@Injectable()
export class ClassValidatorService {

  constructor() {  }

  getValidatorErrors(fieldsErrors: ValidationErrors[]): string {
    let errors = '';
    fieldsErrors.forEach((fieldErrors: ValidationError[], fieldIndex: number) => {
      fieldErrors.forEach((error: ValidationError) => {
        if (error) {
          errors += `Field index {$fieldIndex}: {error.toString()}`;
        }
        if (error.children && error.children.length > 0) {
          errors += `(${this.getProperErrorMessage(error.children[0])})<br />`;
        } else {
          errors += `(${Object.keys(error.constraints).map(key => error.constraints[key])[0]})<br />`;
        }
      });
    });
    return errors;
  }

  private getProperErrorMessage(err: ValidationError): string {
    if (err.children && err.children.length > 0) {
      return this.getProperErrorMessage(err.children[0]);
    } else {
      return Object.keys(err.constraints).map(key => err.constraints[key])[0];
    }
  }
}
