import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Guid } from 'src/app/shared/classes/guid';
import { LocalStorageKeys } from 'src/app/shared/classes/local-storage-keys';
import { DataService } from '../data/data.service';
import { LoggingService } from '../logging/logging.service';
import { StorageService } from '../storage/storage.service';
import { CadenceModel } from './cadence-model';

@Injectable({
  providedIn: 'root'
})
export class CadencesService extends DataService<CadenceModel> {
  constructor(
    _storage: StorageService) {
      //todo: need to inject the budget service
      super(_storage);
  }

  logger(): LoggingService {
    return new LoggingService('CadencesService');
  }
  getLocalStorageKey(): string {
    return LocalStorageKeys.cadenceStore;
  }
  modifyDataBeforeAdd(data: CadenceModel): void {
    data.guid = Guid.newGuid().toString();
  }
  findExistingItem(id: string | number): CadenceModel | undefined {
    return this._dataStore.find(c => c.guid === id);
  }
  updateData(current: CadenceModel, updated: CadenceModel): void {
    current.name = updated.name;
    current.description = updated.description;
    current.accountGuid = updated.accountGuid;
    current.categoryGuid = updated.categoryGuid;
    current.amount = updated.amount;
    current.interval = updated.interval;
    current.timePeriod = updated.timePeriod;
  }
  findIndex(id: string | number): number {
    return this._dataStore.findIndex(c => c.guid === id);
  }

  override add(data: CadenceModel): Observable<void> {
    return super.add(data).pipe(map(() => {
      //todo: add cadence to the budget service
    }));
  }
}
