import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, catchError, exhaustMap, tap, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { RegistrationActions } from './';
import { RegistrationApiService, ClassValidatorService } from '../services';
import { RegistrationField, RegistrationRequest } from '../models';
import { ActionTypes } from './actions';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RegistrationEffects {

  constructor(
    private actions$: Actions,
    private registrationApiService: RegistrationApiService,
    private toastrService: ToastrService,
    private router: Router,
    private classValidatorService: ClassValidatorService
  ) {}

  $registrationFields = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_REGISTRATION_FIELDS),
      exhaustMap(() => {
        return this.registrationApiService.getRegistrationFields().pipe(
          mergeMap((registrationFields: RegistrationField[]) => {
            return Promise.all(registrationFields.map((field: RegistrationField) =>  {
              return validate(plainToClass(RegistrationField, field), {
                validationError: {
                  target: false
                }
              });
            }
            )).then((fieldsErrors: ValidationError[][]) => {
              const errors = this.classValidatorService.getValidatorErrors(fieldsErrors);
              return {
                fields: registrationFields,
                errors
              };
            });
          }),
          map((response) => {
            if (response.errors) {
              return new RegistrationActions.RegistrationFieldsErrorAction(response.errors);
            }
            return new RegistrationActions.RegistrationFieldsSuccessAction(response.fields);
          }),
          catchError(() =>
            of(new RegistrationActions.RegistrationFieldsErrorAction('There was an error retrieving registration fields'))
          )
        );
      })
    )
  );

  $submitRegistration = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.REGISTER_USER),
      exhaustMap((payload: RegistrationRequest) => {
        return this.registrationApiService.registerUser(payload).pipe(
          map(() => new RegistrationActions.RegisterUserSuccessAction()),
          catchError(() =>
            of(new RegistrationActions.RegisterUserErrorAction('Error registering user!'))
          )
        );
      })
    )
  );

  $successRegistration = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.REGISTER_USER_SUCCESS),
      tap(() => {
        this.toastrService.success('Successfully registered!');
        this.router.navigate(['/welcome']);
      })
    ), { dispatch: false }
  );

}
