import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { ShowHidePasswordDirective } from './directives';
import { LoadingSpinnerComponent } from './components';
import { ToastrModule } from 'ngx-toastr';

const SHARED_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  LoadingBarRouterModule,
  ToastrModule.forRoot(),
];

const COMPONENTS = [
  LoadingSpinnerComponent
];

const DIRECTIVES = [
  ShowHidePasswordDirective
];

@NgModule({
  declarations: [
    COMPONENTS,
    DIRECTIVES
  ],
  imports: [
    SHARED_MODULES
  ],
  exports: [
    SHARED_MODULES,
    COMPONENTS,
    DIRECTIVES
  ]
})
export class SharedModule {

}
