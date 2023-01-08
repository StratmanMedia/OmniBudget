import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadencesRoutingModule } from './cadences-routing.module';
import { CadenceMainComponent } from './pages/cadence-main/cadence-main.component';
import { CadenceFormComponent } from './components/cadence-form/cadence-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCadenceComponent } from './pages/create-cadence/create-cadence.component';


@NgModule({
  declarations: [
    CadenceMainComponent,
    CadenceFormComponent,
    CreateCadenceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CadencesRoutingModule
  ]
})
export class CadencesModule { }
