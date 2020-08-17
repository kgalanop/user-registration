import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RegistrationPageComponent } from './containers';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationSelectors, RegistrationReducer } from './store';
import { RegistrationEffects } from './store/effects';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegistrationApiService, RegistrationFormService, ClassValidatorService } from './services';
import { SharedModule } from '../shared/shared.module';
import { RegistrationFormFieldComponent } from './components/registration-form-field/registration-form-field.component';

export const COMPONENTS = [
  RegistrationFormComponent,
  RegistrationFormFieldComponent
];

export const CONTAINERS = [
  RegistrationPageComponent
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
    StoreModule.forFeature(
      RegistrationSelectors.registrationFeatureKey,
      RegistrationReducer.featureReducer
    ),
    EffectsModule.forFeature([RegistrationEffects]),
  ],
  providers: [ RegistrationApiService, RegistrationFormService, ClassValidatorService ]
})
export class RegistrationModule { }
