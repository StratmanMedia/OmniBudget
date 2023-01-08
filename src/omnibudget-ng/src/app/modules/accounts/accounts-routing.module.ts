import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './pages/account-list/account-list.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { UpdateAccountComponent } from './pages/update-account/update-account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountListComponent
  },
  {
    path: 'new',
    component: CreateAccountComponent
  },
  {
    path: ':guid',
    component: UpdateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
