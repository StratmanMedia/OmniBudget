import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'accounts',
    children: [
      {
        path: '',
        loadChildren: () => import('../accounts/accounts.module').then(m => m.AccountsModule)
      }
    ]
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule)
      }
    ]
  },
  {
    path: 'cadences',
    children: [
      {
        path: '',
        loadChildren: () => import('../cadences/cadences.module').then(m => m.CadencesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
