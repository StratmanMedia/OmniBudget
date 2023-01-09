import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, first, map, Observable, Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../logging/logging.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T> {
  private ngDestroy$ = new Subject<boolean>();
  protected _dataSubject$ = new BehaviorSubject<T[]>([]);
  
  constructor(
    private _storage: StorageService) {

    this.loadFromStorage();
    this._dataSubject$.pipe(
      takeUntil(this.ngDestroy$),
      concatMap((data: T[]) => {
        this.logger().debug(`New data emitted. data=${JSON.stringify(data)}`);
        return this._storage.update(this.localStorageKey(), data);
      })
    );
  }

  add(newData: T): Observable<void> {
    this.logger().debug(`Adding data. data=${JSON.stringify(newData)}`);
    return this._dataSubject$.pipe(
      first(),
      map(data => {
        this.modifyDataBeforeAdd(newData);
        data.push(newData);
        this._dataSubject$.next(data);
      })
    );
  }
    
  getAll(): Observable<T[]> {
    return this._dataSubject$.asObservable();
  }

  getOne(id: string | number): Observable<T | null> {
    return this._dataSubject$.pipe(
      map(data => {
        return this.findExistingItem(id);
      })
    );
  }

  update(id: string | number, updatedData: T): Observable<void> {
    this.logger().debug(`Updating data=${JSON.stringify(updatedData)}`);
    return this._dataSubject$.pipe(
      first(),
      map(data => {
        let existing = this.findExistingItem(id);
        if (!existing) { return; }
        this.updateData(existing, updatedData);
        this._dataSubject$.next(data);
      })
    );
  }

  delete(id: string | number): Observable<void> {
    this.logger().debug(`Deleting data. id=${id}`);
    return this._dataSubject$.pipe(
      first(),
      map(data => {
        const index = this.findIndex(id);
        data.splice(index, 1);
        this._dataSubject$.next(data);
      })
    );
  }

  private loadFromStorage(): void {
    this.logger().debug('Data store refresh.');
    this._storage.read<T[]>(this.localStorageKey()).pipe(
      first(),
      map(data => {
        this.logger().debug(`Local storage=${JSON.stringify(data)}`);
        if (!data) {
          this._dataSubject$.next([]);
          return;
        }
        this._dataSubject$.next(data);
      })
    );
  }

  abstract logger(): LoggingService;
  abstract localStorageKey(): string;
  abstract modifyDataBeforeAdd(data: T): void;
  abstract findExistingItem(id: string | number): T | null;
  abstract updateData(current: T, updated: T): void;
  abstract findIndex(id: string | number): number;
}
