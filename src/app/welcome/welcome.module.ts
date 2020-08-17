import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomePageComponent } from './containers';
import { WelcomeRoutingModule } from './welcome-routing.module';

export const COMPONENTS = [

];

export const CONTAINERS = [
  WelcomePageComponent
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
