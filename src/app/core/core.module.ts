import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

export const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  imports: [
    SharedModule, RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
