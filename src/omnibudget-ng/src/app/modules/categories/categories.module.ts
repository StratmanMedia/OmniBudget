import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
