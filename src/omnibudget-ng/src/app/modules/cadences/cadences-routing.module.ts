import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadenceMainComponent } from './pages/cadence-main/cadence-main.component';
import { CreateCadenceComponent } from './pages/create-cadence/create-cadence.component';
import { UpdateCadenceComponent } from './pages/update-cadence/update-cadence.component';

const routes: Routes = [
  {
    path: '',
    component: CadenceMainComponent
  },
  {
    path: 'new',
    component: CreateCadenceComponent
  },
  {
    path: ':guid',
    component: UpdateCadenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadencesRoutingModule { }
