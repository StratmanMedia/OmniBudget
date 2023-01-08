import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CategoryModel } from 'src/app/core/categories/category-model';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { FormMode } from 'src/app/shared/classes/form-mode';
import { SortUtil } from 'src/app/shared/classes/sort-util';

@Component({
  selector: 'omni-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  private _logger = new LoggingService('CategoryFormComponent');
  categoryForm: FormGroup;
  parentCategories: Observable<CategoryModel[]>;
  @Input() mode: FormMode;
  @Input() category: CategoryModel|null;
  @Output() onSubmit: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this._logger.debug(`Initializing.`);
    this.categoryForm = this.buildForm(this.category);
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

  submitClicked() {
    this._logger.debug(`Category form submitted. form=${JSON.stringify(this.categoryForm.value)}`);
    const category = <CategoryModel>{
      guid: this.categoryForm.get('guid')?.value,
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value,
      parentCategoryGuid: this.categoryForm.get('parent')?.value
    };
    this.onSubmit.emit(category);
  }

  cancelClicked(): void {
    this.onCancel.emit();
  }

  deleteClicked() {
    this.onDelete.emit(this.category?.guid);
  }

  private buildForm(category: CategoryModel|null = null): FormGroup {
    return this._formBuilder.group({
      guid: [category?.guid],
      name: [category?.name],
      description: [category?.description],
      parent: [category?.parentCategoryGuid]
    });
  }
}
