import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { AccountModel } from 'src/app/core/accounts/account-model';
import { AccountService } from 'src/app/core/accounts/account.service';
import { CategoryModel } from 'src/app/core/categories/category-model';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { TimePeriod } from 'src/app/core/models/time-period-enum';
import { CadenceModel } from 'src/app/core/transactions/cadence-model';
import { FormMode } from 'src/app/shared/classes/form-mode';
import { SortUtil } from 'src/app/shared/classes/sort-util';

@Component({
  selector: 'omni-cadence-form',
  templateUrl: './cadence-form.component.html',
  styleUrls: ['./cadence-form.component.css']
})
export class CadenceFormComponent implements OnInit {
  private _logger: LoggingService = new LoggingService({
    callerName: "CadenceFormComponent"
  });
  private ngDestroy$ = new Subject<boolean>();
  
  @Input() mode: FormMode;
  @Input() cadence: CadenceModel | undefined;
  @Input() cadence$: Observable<CadenceModel | undefined> | undefined;
  @Output() onSubmit: EventEmitter<CadenceModel> = new EventEmitter<CadenceModel>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  
  initialized$ = new BehaviorSubject<boolean>(false);
  cadenceForm = this.buildForm(undefined);
  accounts: Observable<AccountModel[]>;
  categories: Observable<CategoryModel[]>;
  timePeriods: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._logger.debug(`Initializing.`);
    this.cadence$?.pipe(
      takeUntil(this.ngDestroy$),
      tap(cadence => {
        this._logger.debug(`New cadence emitted.`);
        this.cadenceForm = this.buildForm(cadence);
      })
    ).subscribe();
    combineLatest([this._accountService.getAll(), this._categoryService.getAll()]).pipe(
      takeUntil(this.ngDestroy$),
      tap(([accounts, categories]) => {
        this._logger.debug(`New data emitted.`);
        this.accounts = of(accounts.sort((a, b) => { return SortUtil.sort(a.name, b.name); }));
        this.categories = of(categories.sort((a, b) => { return SortUtil.sort(a.name, b.name); }));
        this.initialized$.next(true);
      })
    ).subscribe();
    this.timePeriods = Object.keys(TimePeriod);
  }

  get formModeEnum(): typeof FormMode {
    return FormMode;
  }

  changeAccount(e: any): void {
    this._logger.debug(`Account changed. Value=${e.target.value}`);
  }

  changeCategory(e: any): void {
    this._logger.debug(`Category changed. Value=${e.target.value}`);
  }

  changeTimePeriod(e: any): void {
    this._logger.debug(`Time period changed. Value=${e.target.value}`);
  }

  submitForm(): void {
    this._logger.debug(`Form submitted. form=${JSON.stringify(this.cadenceForm.value)}`);
    const timePeriod = <string>this.cadenceForm.get('timePeriod')?.value;
    const cadence = <CadenceModel>{
      guid: this.cadenceForm.get('guid')?.value,
      name: this.cadenceForm.get('name')?.value,
      description: this.cadenceForm.get('description')?.value,
      accountGuid: this.cadenceForm.get('account')?.value,
      categoryGuid: this.cadenceForm.get('category')?.value,
      amount: this.cadenceForm.get('amount')?.value,
      interval: this.cadenceForm.get('interval')?.value,
      timePeriod: TimePeriod[timePeriod as keyof typeof TimePeriod]
    };
    this.onSubmit.emit(cadence);
  }

  cancelClicked(): void {
    this.onCancel.emit();
  }

  deleteClicked(): void {
    this.onDelete.emit(<string>this.cadenceForm.get('guid')?.value);
  }

  private buildForm(cadence: CadenceModel | undefined): FormGroup {
    return this._formBuilder.group({
      guid: [cadence?.guid],
      name: [cadence?.name],
      description: [cadence?.description],
      account: [cadence?.accountGuid],
      category: [cadence?.categoryGuid],
      amount: [cadence?.amount],
      interval: [cadence?.interval],
      timePeriod: [cadence?.timePeriod]
    });
  }
}
