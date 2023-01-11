import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable, Subject } from 'rxjs';
import { CategoryModel } from 'src/app/core/categories/category-model';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { FormMode } from 'src/app/shared/classes/form-mode';

@Component({
  selector: 'omni-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  private _logger: LoggingService = new LoggingService({
    callerName: "UpdateCategoryComponent"
  });
  private ngDestroy$ = new Subject<boolean>();
  private _guid: string;

  category: Observable<CategoryModel | undefined>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this._guid = this._route.snapshot.params['guid'];
    this.category = this._categoryService.getOne(this._guid).pipe(
      map(category => {
        if (!category) {
          this._router.navigateByUrl('/categories');
          return;
        } else {
          this._logger.debug(`Category loaded. Data=${JSON.stringify(category)}`);
          return category;
        }
      })
    );
  }

  get formModeEnum(): typeof FormMode {
    return FormMode;
  }

  onSubmit(category: CategoryModel): void {
    this._categoryService.update(category.guid, category).pipe(
      first(),
      map(() => {
        this._router.navigateByUrl('/app/categories');
      })
    ).subscribe();
  }

  onCancel(): void {
    this._router.navigateByUrl('/app/categories');
  }

  onDelete(guid: string): void {
    this._categoryService.delete(guid).pipe(
      first(),
      map(() => {
        this._router.navigateByUrl('/app/categories');
      })
    ).subscribe();
  }
}
