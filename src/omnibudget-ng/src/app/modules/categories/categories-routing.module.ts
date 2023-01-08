import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'new',
    component: CreateCategoryComponent
  },
  {
    path: ':guid',
    component: UpdateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
