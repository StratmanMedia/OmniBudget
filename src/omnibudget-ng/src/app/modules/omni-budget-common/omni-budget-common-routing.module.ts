import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('../accounts/accounts.module').then(m => m.AccountsModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'cadences',
    loadChildren: () => import('../cadences/cadences.module').then(m => m.CadencesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OmniBudgetCommonRoutingModule { }
