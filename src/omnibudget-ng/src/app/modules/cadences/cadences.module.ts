import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadencesRoutingModule } from './cadences-routing.module';
import { CadenceMainComponent } from './pages/cadence-main/cadence-main.component';
import { CadenceFormComponent } from './components/cadence-form/cadence-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCadenceComponent } from './pages/create-cadence/create-cadence.component';
import { OmniBudgetCommonModule } from '../omni-budget-common/omni-budget-common.module';
import { UpdateCadenceComponent } from './pages/update-cadence/update-cadence.component';

@NgModule({
  declarations: [
    CadenceMainComponent,
    CadenceFormComponent,
    CreateCadenceComponent,
    UpdateCadenceComponent
  ],
  imports: [
    CommonModule,
    OmniBudgetCommonModule,
    ReactiveFormsModule,
    CadencesRoutingModule
  ]
})
export class CadencesModule { }
