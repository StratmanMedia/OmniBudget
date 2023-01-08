import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OmniBudgetCommonModule } from '../omni-budget-common/omni-budget-common.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    OmniBudgetCommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
