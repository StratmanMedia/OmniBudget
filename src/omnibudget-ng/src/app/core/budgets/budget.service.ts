import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Guid } from 'src/app/shared/classes/guid';
import { LocalStorageKeys } from 'src/app/shared/classes/local-storage-keys';
import { DataService } from '../data/data.service';
import { LoggingService } from '../logging/logging.service';
import { BudgetModel } from './budget-model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends DataService<BudgetModel> {
  private _logger: LoggingService = new LoggingService({
    callerName: "BudgetService"
  });

  logger(): LoggingService {
    return this._logger;
  }

  localStorageKey(): string {
    return LocalStorageKeys.budgetStore;
  }

  modifyDataBeforeAdd(data: BudgetModel): void {
    data.guid = Guid.newGuid.toString();
  }

  findExistingItem(id: string | number): Observable<BudgetModel | undefined> {
    return this._data$.pipe(
      map(budgets => {
        return budgets.find(b => b.guid === id);
      })
    );
  }

  updateData(current: BudgetModel, updated: BudgetModel): void {
    current.name = updated.name;
    current.accountGuid = updated.accountGuid;
    current.categoryGuid = updated.categoryGuid;
    current.amount = updated.amount;
    current.interval = updated.interval;
    current.timePeriod = updated.timePeriod;
  }

  findIndex(id: string | number): Observable<number> {
    return this._data$.pipe(
      map(budgets => {
        return budgets.findIndex(b => b.guid === id);
      })
    );
  }
}
