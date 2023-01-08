import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CategoryModel } from 'src/app/core/categories/category-model';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { SortUtil } from 'src/app/shared/classes/sort-util';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  private _logger: LoggingService = new LoggingService('CreateCategoryComponent');
  categoryForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    parent: new FormControl('')
  });
  parentCategories: Observable<CategoryModel[]>;

  constructor(
    private _router: Router,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.parentCategories = this._categoryService.getAll().pipe(map(
      categories => {
        return categories.sort((a, b) => { return SortUtil.sort(a.name, b.name) });
      })
    );
  }

  parentChange(e: any): void {
    this._logger.debug(`Parent changed. Value=${e.target.value}`);
    this.categoryForm.get('parent')?.setValue(e.target.value, {onlySelf: true});
  }

  onSubmit() {
    this._logger.debug(`Submitting category form. Data=${JSON.stringify(this.categoryForm.value)}`);
    const category = <CategoryModel>{
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value,
      parentCategoryGuid: this.categoryForm.get('parent')?.value
    };
    this._categoryService.add(category).subscribe(() => {
      this._router.navigateByUrl('/app/categories');
    });
  }
}
