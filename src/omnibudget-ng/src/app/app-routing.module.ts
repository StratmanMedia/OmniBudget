import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/omni-budget-common/omni-budget-common.module').then(m => m.OmniBudgetCommonModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
