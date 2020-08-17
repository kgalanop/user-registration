import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RegistrationActions, RegistrationState, RegistrationSelectors } from '../../store';
import { RegistrationField, RegistrationRequest } from '../../models';
import { RegistrationFormService } from '../../services';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  fields$: Observable<RegistrationField[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  form$: Observable<FormGroup>;
  fields: RegistrationField[] = [];

  constructor(
    private store: Store<RegistrationState.State>,
    private registrationFormService: RegistrationFormService
  ) {
    this.fields$ = store.pipe(select(
      RegistrationSelectors.selectRegistrationFields
    ));
    this.loading$ = store.pipe(select(
      RegistrationSelectors.selectRegistrationLoading
    ));
    this.error$ = store.pipe(select(
      RegistrationSelectors.selectRegistrationError
    ));
    this.form$ = this.fields$.pipe(map(fields => this.registrationFormService.fieldsToForm(fields)));
  }

  ngOnInit() {
    this.store.dispatch(new RegistrationActions.GetRegistrationFieldsAction());
  }

  register(user: RegistrationRequest) {
    this.store.dispatch(new RegistrationActions.RegisterUserAction(user));
  }

  ngOnDestroy() {
  }

}
