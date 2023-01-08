import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { LoggingService } from '../logging/logging.service';
import { BudgetModel } from './budget-model';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService extends DataService<BudgetModel> {
  logger(): LoggingService {
    throw new Error('Method not implemented.');
  }
  getLocalStorageKey(): string {
    throw new Error('Method not implemented.');
  }
  modifyDataBeforeAdd(data: BudgetModel): void {
    throw new Error('Method not implemented.');
  }
  findExistingItem(id: string | number): BudgetModel | undefined {
    throw new Error('Method not implemented.');
  }
  updateData(current: BudgetModel, updated: BudgetModel): void {
    throw new Error('Method not implemented.');
  }
  findIndex(id: string | number): number {
    throw new Error('Method not implemented.');
  }
}
