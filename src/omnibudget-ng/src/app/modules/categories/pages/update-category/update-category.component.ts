import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Subject } from 'rxjs';
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
  private ngDestroy$: Subject<boolean>;
  private _guid: string;

  category: CategoryModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this._guid = this._route.snapshot.params['guid'];
    this._categoryService.getOne(this._guid).pipe(
      map(category => {
        if (category === undefined) {
          this._router.navigateByUrl('/categories');
          return;
        }
        this._logger.debug(`Category loaded. Data=${JSON.stringify(category)}`);
        this.category = category;
      })
    );
  }

  get formModeEnum(): typeof FormMode {
    return FormMode;
  }

  onSubmit(category: CategoryModel): void {
    this._categoryService.update(this.category.guid, category).pipe(
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
