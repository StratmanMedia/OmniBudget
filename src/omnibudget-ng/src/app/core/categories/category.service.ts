import { Injectable } from '@angular/core';
import { Guid } from 'src/app/shared/classes/guid';
import { LocalStorageKeys } from 'src/app/shared/classes/local-storage-keys';
import { DataService } from '../data/data.service';
import { LoggingService } from '../logging/logging.service';
import { CategoryModel } from './category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService<CategoryModel> {
  logger(): LoggingService{
    return new LoggingService("CategoryService");
  }

  getLocalStorageKey(): string {
    return LocalStorageKeys.categoryStore;
  }

  modifyDataBeforeAdd(data: CategoryModel): void {
    data.guid = Guid.newGuid().toString();
  }

  findExistingItem(id: string | number): CategoryModel | undefined {
    return this._dataStore.find(a => a.guid === id);
  }

  updateData(current: CategoryModel, updated: CategoryModel): void {
    current.name = updated.name;
    current.description = updated.description;
    current.parentCategoryGuid = updated.parentCategoryGuid;
  }

  findIndex(id: string | number): number {
    return this._dataStore.findIndex(a => a.guid === id);
  }
}
