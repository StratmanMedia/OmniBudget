import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestLayoutComponent } from '../guest/components/guest-layout/guest-layout.component';
import { StartComponent } from './pages/start/start.component';

@NgModule({
  declarations: [
    GuestLayoutComponent,
    StartComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
