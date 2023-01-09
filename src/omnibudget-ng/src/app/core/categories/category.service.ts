import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Guid } from 'src/app/shared/classes/guid';
import { LocalStorageKeys } from 'src/app/shared/classes/local-storage-keys';
import { DataService } from '../data/data.service';
import { LoggingService } from '../logging/logging.service';
import { CategoryModel } from './category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService<CategoryModel> {
  private _logger: LoggingService = new LoggingService({
    callerName: "CategoryService"
  });

  logger(): LoggingService{
    return this._logger;
  }

  localStorageKey(): string {
    return LocalStorageKeys.categoryStore;
  }

  modifyDataBeforeAdd(data: CategoryModel): void {
    data.guid = Guid.newGuid().toString();
  }

  findExistingItem(id: string | number): Observable<CategoryModel | undefined> {
    return this._data$.pipe(
      map(categories => {
        return categories.find(c => c.guid === id);
      })
    );
  }

  updateData(current: CategoryModel, updated: CategoryModel): void {
    current.name = updated.name;
    current.description = updated.description;
    current.parentCategoryGuid = updated.parentCategoryGuid;
  }

  findIndex(id: string | number): Observable<number> {
    return this._data$.pipe(
      map(categories => {
        return categories.findIndex(c => c.guid === id);
      })
    );
  }
}
