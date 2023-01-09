import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Guid } from 'src/app/shared/classes/guid';
import { LocalStorageKeys } from 'src/app/shared/classes/local-storage-keys';
import { DataService } from '../data/data.service';
import { LoggingService } from '../logging/logging.service';
import { AccountModel } from './account-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DataService<AccountModel> {
  private _logger: LoggingService = new LoggingService({
    callerName: "AccountService"
  });

  logger(): LoggingService {
    return this._logger;
  }

  localStorageKey(): string {
    return LocalStorageKeys.accountStore;
  }

  modifyDataBeforeAdd(data: AccountModel): void {
    data.guid = Guid.newGuid.toString();
  }

  findExistingItem(id: string | number): Observable<AccountModel | undefined> {
    return this._data$.pipe(
      map(accounts => {
        return accounts.find(a => a.guid === id);
      })
    );
  }

  updateData(current: AccountModel, updated: AccountModel): void {
    current.name = updated.name;
  }

  findIndex(id: string | number): Observable<number> {
    return this._data$.pipe(
      map(accounts => {
        return accounts.findIndex(a => a.guid === id);
      })
    );
  }
}
