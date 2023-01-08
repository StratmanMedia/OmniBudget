import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestLayoutRoutingModule } from './guest-layout-routing.module';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';


@NgModule({
  declarations: [
    GuestLayoutComponent
  ],
  imports: [
    CommonModule,
    GuestLayoutRoutingModule
  ]
})
export class GuestLayoutModule { }
