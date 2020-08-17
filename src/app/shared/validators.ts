import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {
  static minlength(value: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value && control.value.length < value ? {minlength: value} : null;
    };
  }

  static maxlength(value: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value && control.value.length > value ? {maxlength: value} : null;
    };
  }

  static regex(pattern: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regexPattern = new RegExp(pattern);
      const valid = regexPattern.test(control.value);
      return !valid ? {regex : pattern} : null;
    };
  }

  // return first validation error in case of multiple validation errors
  static composeFirst(validators: ValidatorFn[]) {
    if (!validators || !validators.length) {
      return null;
    }

    return (control: FormControl) => {
      const errors = validators.map(v => v(control));
      const firstError = errors.find(e => {
        if (!e) {
          return false;
        }

        const keys = Object.keys(e);
        if (!keys.length) {
          return false;
        }

        const key = keys[0];
        return e[key];
      });

      return firstError || null;
    };
  }
}
