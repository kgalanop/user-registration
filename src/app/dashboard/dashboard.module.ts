import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageComponent } from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';

export const COMPONENTS = [

];

export const CONTAINERS = [
  DashboardPageComponent
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
