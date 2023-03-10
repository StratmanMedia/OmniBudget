import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { CategoryModel } from 'src/app/core/categories/category-model';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { SortUtil } from 'src/app/shared/classes/sort-util';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  private _logger: LoggingService = new LoggingService({
    callerName: "CategoryListComponent"
  });
  private ngDestroy$ = new Subject<boolean>();

  categoryList: Observable<CategoryModel[]>;

  constructor(
    private _router: Router,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryList = this._categoryService.getAll().pipe(
      takeUntil(this.ngDestroy$),
      map(categories => {
        return categories.sort((a, b) => { return SortUtil.sort(a.name, b.name); });
      })
    );
  }

  editCategory(guid: string): void {
    this._router.navigateByUrl('/app/categories/' + guid);
  }
}
