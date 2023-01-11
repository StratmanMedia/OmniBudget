import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/core/accounts/account.service';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { CadenceModel } from 'src/app/core/transactions/cadence-model';
import { CadenceService } from 'src/app/core/transactions/cadence.service';
import { SortUtil } from 'src/app/shared/classes/sort-util';

@Component({
  selector: 'omni-cadence-main',
  templateUrl: './cadence-main.component.html',
  styleUrls: ['./cadence-main.component.css']
})
export class CadenceMainComponent implements OnInit {
  private _logger: LoggingService = new LoggingService({
    callerName: "CadenceMainComponent"
  });
  private ngDestroy$ = new Subject<boolean>();

  cadenceList: Observable<CadenceModel[]>;

  constructor(
    private _cadenceService: CadenceService,
    private _accountService: AccountService,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.cadenceList = combineLatest([
      this._cadenceService.getAll(),
      this._accountService.getAll(),
      this._categoryService.getAll()
    ]).pipe(
      takeUntil(this.ngDestroy$),
      map(([cadences, accounts, categories]) => {
        this._logger.debug(`New data emitted. cadences=${JSON.stringify(cadences)}, accounts=${JSON.stringify(accounts)}, categories=${JSON.stringify(categories)}`);
        const cadenceList = cadences.map(cadence => {
          return <CadenceModel>{
            ...cadence,
            account: accounts.find(acc => acc.guid === cadence.accountGuid),
            category: categories.find(cat => cat.guid === cadence.categoryGuid)
          };
        });
        this._logger.debug(`Cadences mapped. cadenceList=${JSON.stringify(cadenceList)}`);
        return cadenceList.sort((a, b) => { return SortUtil.sort(a.name, b.name); });
      })
    );
  }

  editCadence(guid: string): void {

  }
}
