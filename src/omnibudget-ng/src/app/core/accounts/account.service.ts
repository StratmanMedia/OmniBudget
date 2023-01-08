import { Injectable } from '@angular/core';
import { Observable, Observer, ReplaySubject } from 'rxjs';
import { Guid } from 'src/app/shared/classes/guid';
import { LocalStorageKeys } from 'src/app/shared/classes/local-storage-keys';
import { LoggingService } from '../logging/logging.service';
import { StorageService } from '../storage/storage.service';
import { AccountModel } from './account-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _logger: LoggingService = new LoggingService("AccountService");
  private _accountStore: AccountModel[] = [];
  private _accountStoreSubject = new ReplaySubject<AccountModel[]>(1);

  constructor(
    private _storage: StorageService) {
      this.refreshStore();
      this._accountStoreSubject.subscribe(
        (accounts: AccountModel[]) => {
          this._logger.debug('updating local storage.');
          this._storage.update(LocalStorageKeys.accountStore, accounts).subscribe();
        });
    }

  add(account: AccountModel): Observable<void> {
    this._logger.debug(`adding account=${JSON.stringify(account)}`);
    return new Observable((o: Observer<void>) => {
      account.guid = Guid.newGuid().toString();
      this._accountStore.push(account);
      this._accountStoreSubject.next(this._accountStore);
      o.next();
      o.complete();
    });
  }

  getAll(): Observable<AccountModel[]> {
    this._logger.debug('getAll.');
    return this._accountStoreSubject.asObservable();
  }

  getOne(guid: string): Observable<AccountModel> {
    this._logger.debug(`getOne. guid=${guid}`);
    return new Observable((o: Observer<AccountModel>) => {
      const account = this._accountStore.find(a => a.guid === guid);
      if (account) {
        o.next(account);
      }
      o.complete();
    });
  }

  update(account: AccountModel): Observable<void> {
    this._logger.debug(`update. account=${JSON.stringify(account)}`);
    return new Observable((o: Observer<void>) => {
      let existing = this._accountStore.find(a => a.guid === account.guid);
      if (existing == null || existing == undefined) {
        o.error('Account does not exist.');
        o.complete();
        return;
      }
      existing.name = account.name;
      this._accountStoreSubject.next(this._accountStore);
      o.next();
      o.complete();
    });
  }

  delete(guid: string): Observable<void> {
    this._logger.debug(`Delete account. guid=${guid}`);
    return new Observable((o: Observer<void>) => {
      const index = this._accountStore.findIndex(a => a.guid === guid);
      this._accountStore.splice(index, 1);
      this._accountStoreSubject.next(this._accountStore);
      o.next();
      o.complete();
    });
  }

  private refreshStore(): void {
    this._logger.debug('account store refresh.');
    this._storage.read<AccountModel[]>(LocalStorageKeys.accountStore).subscribe(
      (accounts: AccountModel[]) => {
        this._logger.debug(`account store=${JSON.stringify(accounts)}`);
        this._accountStore = accounts;
        this._accountStoreSubject.next(accounts);
      });
  }
}
