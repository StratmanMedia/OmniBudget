import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StorageService } from './storage/storage.service';
import { AccountService } from './accounts/account.service';
import { CategoryService } from './categories/category.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    StorageService,
    AccountService,
    CategoryService
  ]
})
export class CoreModule { }
