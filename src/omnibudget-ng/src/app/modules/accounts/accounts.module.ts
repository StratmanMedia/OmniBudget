import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountListComponent } from './pages/account-list/account-list.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateAccountComponent } from './pages/update-account/update-account.component';

@NgModule({
  declarations: [
    AccountListComponent,
    CreateAccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
