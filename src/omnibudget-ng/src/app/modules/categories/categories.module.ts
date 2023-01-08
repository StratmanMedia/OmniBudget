import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { OmniBudgetCommonModule } from '../omni-budget-common/omni-budget-common.module';

@NgModule({
  declarations: [
    CategoryListComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    OmniBudgetCommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
