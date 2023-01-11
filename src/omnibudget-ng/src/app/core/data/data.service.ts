import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, concatMap, first, map, Observable } from 'rxjs';
import { LoggingService } from '../logging/logging.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T> {
  protected _data$ = new BehaviorSubject<T[]>([]);
  
  constructor(
    private _storage: StorageService) {

    this.loadFromStorage();
    this._data$.pipe(
      concatMap((data: T[]) => {
        this.logger().debug(`New data emitted. data=${JSON.stringify(data)}`);
        return this._storage.save(this.localStorageKey(), data).pipe(first());
      })
    ).subscribe();
  }

  add(newData: T): Observable<void> {
    this.logger().debug(`Adding data. data=${JSON.stringify(newData)}`);
    return this._data$.pipe(
      first(),
      map(data => {
        this.modifyDataBeforeAdd(newData);
        data.push(newData);
        this._data$.next(data);
      })
    );
  }
    
  getAll(): Observable<T[]> {
    return this._data$.asObservable();
  }

  getOne(id: string | number): Observable<T | undefined> {
    return this.findExistingItem(id);
  }

  update(id: string | number, updatedData: T): Observable<void> {
    this.logger().debug(`Updating data=${JSON.stringify(updatedData)}`);
    return combineLatest([this._data$, this.findExistingItem(id)]).pipe(
      first(),
      map(([data, existing]) => {
        if (!existing) { return; }
        this.updateData(existing, updatedData);
        this._data$.next(data);
      })
    );
  }

  delete(id: string | number): Observable<void> {
    this.logger().debug(`Deleting data. id=${id}`);
    return combineLatest([this._data$, this.findIndex(id)]).pipe(
      first(),
      map(([data, index]) => {
        data.splice(index, 1);
        this._data$.next(data);
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
          this._data$.next([]);
          return;
        }
        this._data$.next(data);
      })
    ).subscribe();
  }

  abstract logger(): LoggingService;
  abstract localStorageKey(): string;
  abstract modifyDataBeforeAdd(data: T): void;
  abstract findExistingItem(id: string | number): Observable<T | undefined>;
  abstract findIndex(id: string | number): Observable<number>;
  abstract updateData(current: T, updated: T): void;
}
