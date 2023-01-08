import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { AccountService } from 'src/app/core/accounts/account.service';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { CadenceModel } from 'src/app/core/transactions/cadence-model';
import { CadencesService } from 'src/app/core/transactions/cadences.service';

@Component({
  selector: 'omni-cadence-main',
  templateUrl: './cadence-main.component.html',
  styleUrls: ['./cadence-main.component.css']
})
export class CadenceMainComponent implements OnInit {
  private _logger = new LoggingService('CadenceMainComponent');
  cadenceList: Observable<CadenceModel[]>;

  constructor(
    private _cadenceService: CadencesService,
    private _accountServie: AccountService,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.cadenceList = this._cadenceService.getAll().pipe(map(
      cadences => {
        cadences.map(c => {
          combineLatest([
            this._accountServie.getOne(c.accountGuid),
            this._categoryService.getOne(c.categoryGuid)
          ]).subscribe(
            ([account, category]) => {
              c.account = account || undefined;
              c.category = category;
            }
          );
        });
        return cadences;
      }
    ));
  }

  editCadence(guid: string): void {

  }
}
