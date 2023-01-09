import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { LoggingService } from '../logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _logger: LoggingService = new LoggingService({
    callerName: 'StorageService'
  });
  private _store: Storage = localStorage;

  constructor() { }

  create(key: string, data: any): Observable<void> {
    this._logger.debug(`create ENTER.`);
    return new Observable((o: Observer<void>) => {
      const json = JSON.stringify(data);
      this._logger.debug(`Adding to local storage. key=${key}, data=${json}`);
      this._store.setItem(key, json);
      o.next();
      o.complete();
    });    
  }

  read<T>(key: string): Observable<T | null> {
    this._logger.debug(`read ENTER.`);
    return new Observable((o: Observer<T | null>) => {
      const json = this._store.getItem(key);
      const data = (!!json) ? JSON.parse(json) as T : null;
      this._logger.debug(`Reading from local storage. key=${key}, data=${json}`);
      o.next(data);
      o.complete();
    });
  }

  update(key: string, data: any): Observable<void> {
    this._logger.debug(`update ENTER.`);
    return new Observable((o: Observer<void>) => {
      const json = JSON.stringify(data);
      this._logger.debug(`Updating local storage. Key=${key}, Data=${json}`);
      this._store.setItem(key, json);
      o.next();
      o.complete();
    });    
  }

  delete(key: string): Observable<void> {
    this._logger.debug(`delete ENTER.`);
    return new Observable((o: Observer<void>) => {
      this._logger.debug(`Removing from local storage. key=${key}`);
      this._store.removeItem(key);
      o.next();
      o.complete();
    });
  }
}
