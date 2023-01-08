import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { LoggingService } from '../logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _logger: LoggingService = new LoggingService('StorageService');
  private _store: Storage = localStorage;

  constructor() { }

  create(key: string, data: any): Observable<void> {
    return new Observable((o: Observer<void>) => {
      const json = JSON.stringify(data);
      this._store.setItem(key, json);
      o.next();
      o.complete();
    });    
  }

  read<T>(key: string): Observable<T> {
    return new Observable((o: Observer<T>) => {
      const json = this._store.getItem(key);
      const data = (json !== null) ? <T>JSON.parse(json) : <T>JSON.parse('[]');
      o.next(data);
      o.complete();
    });
  }

  update(key: string, data: any): Observable<void> {
    this._logger.debug(`StorageService: Entering update.`);
    return new Observable((o: Observer<void>) => {
      const json = JSON.stringify(data);
      this._logger.debug(`StorageService: Updating local storage. Key=${key}, Data=${JSON.stringify(data)}`);
      this._store.setItem(key, json);
      o.next();
      o.complete();
    });    
  }

  delete(key: string): Observable<void> {
    return new Observable((o: Observer<void>) => {
      this._store.removeItem(key);
      o.next();
      o.complete();
    });
  }
}
