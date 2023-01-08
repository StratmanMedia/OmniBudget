import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OmniBudgetCommonRoutingModule } from './omni-budget-common-routing.module';
import { OmniLayoutComponent } from './components/omni-layout/omni-layout.component';


@NgModule({
  declarations: [
    OmniLayoutComponent
  ],
  imports: [
    CommonModule,
    OmniBudgetCommonRoutingModule
  ]
})
export class OmniBudgetCommonModule { }
