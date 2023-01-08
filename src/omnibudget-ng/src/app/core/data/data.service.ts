import { Injectable } from '@angular/core';
import { Observable, Observer, ReplaySubject } from 'rxjs';
import { LoggingService } from '../logging/logging.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T> {
  protected _dataStore: T[] = [];
  protected _dataStoreSubject = new ReplaySubject<T[]>(1);
  
  constructor(
    private _storage: StorageService) {
      this.refreshStore();
      this._dataStoreSubject.subscribe(
        (data: T[]) => {
          this.logger().debug('Updating local storage.');
          this._storage.update(this.getLocalStorageKey(), data).subscribe();
        });
    }

    add(data: T): Observable<void> {
      this.logger().debug(`Add data=${JSON.stringify(data)}`);
      return new Observable((o: Observer<void>) => {
        this.modifyDataBeforeAdd(data);
        this._dataStore.push(data);
        this._dataStoreSubject.next(this._dataStore);
        o.next();
        o.complete();
      });
    }
    
    getAll(): Observable<T[]> {
      return this._dataStoreSubject.asObservable();
    }

    getOne(id: string | number): Observable<T | undefined> {
      return new Observable((o: Observer<T | undefined>) => {
        const item = this.findExistingItem(id);
        o.next(item);
      });
    }

    update(id: string | number, data: T): Observable<void> {
      this.logger().debug(`Update data=${JSON.stringify(data)}`);
      return new Observable((o: Observer<void>) => {
        let existing = this.findExistingItem(id);
        if (existing == null || existing == undefined) {
          o.error('Data does not exist.');
          o.complete();
          return;
        }
        this.updateData(existing, data);
        this._dataStoreSubject.next(this._dataStore);
        o.next();
        o.complete();
      });
    }

    delete(id: string | number): Observable<void> {
      this.logger().debug(`Delete data. id=${id}`);
      return new Observable((o: Observer<void>) => {
        const index = this.findIndex(id);
        this._dataStore.splice(index, 1);
        this._dataStoreSubject.next(this._dataStore);
        o.next();
        o.complete();
      });
    }

    private refreshStore(): void {
      this.logger().debug('Data store refresh.');
      this._storage.read<T[]>(this.getLocalStorageKey()).subscribe(
        (data: T[]) => {
          this.logger().debug(`Data store=${JSON.stringify(data)}`);
          this._dataStore = data;
          this._dataStoreSubject.next(data);
        });
    }

    abstract logger(): LoggingService;
    abstract getLocalStorageKey(): string;
    abstract modifyDataBeforeAdd(data: T): void;
    abstract findExistingItem(id: string | number): T | undefined;
    abstract updateData(current: T, updated: T): void;
    abstract findIndex(id: string | number): number;
}
