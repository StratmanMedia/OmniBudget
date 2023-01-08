import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AccountModel } from 'src/app/core/accounts/account-model';
import { AccountService } from 'src/app/core/accounts/account.service';
import { CategoryModel } from 'src/app/core/categories/category-model';
import { CategoryService } from 'src/app/core/categories/category.service';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { TimePeriod } from 'src/app/core/models/time-period.enum';
import { CadenceModel } from 'src/app/core/transactions/cadence-model';
import { FormMode } from 'src/app/shared/classes/form-mode';
import { SortUtil } from 'src/app/shared/classes/sort-util';

@Component({
  selector: 'omni-cadence-form',
  templateUrl: './cadence-form.component.html',
  styleUrls: ['./cadence-form.component.css']
})
export class CadenceFormComponent implements OnInit {
  private _logger = new LoggingService('CadenceFormComponent');
  cadenceForm: FormGroup;
  accounts: Observable<AccountModel[]>;
  categories: Observable<CategoryModel[]>;
  timePeriods: string[] = [];
  @Input() mode: FormMode;
  @Input() cadence: CadenceModel|null;
  @Output() onSubmit: EventEmitter<CadenceModel> = new EventEmitter<CadenceModel>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._logger.debug(`Initializing.`);
    this.cadenceForm = this.buildForm(this.cadence);
    this.accounts = this._accountService.getAll().pipe(map(
      accounts => {
        return accounts.sort((a, b) => { return SortUtil.sort(a.name, b.name) });
      }
    ));
    this.categories = this._categoryService.getAll().pipe(map(
      categories => {
        return categories.sort((a, b) => { return SortUtil.sort(a.name, b.name) });
      }
    ));
    this.timePeriods = Object.keys(TimePeriod);
  }

  get formModeEnum(): typeof FormMode {
    return FormMode;
  }
  accountChange(e: any): void {
    this._logger.debug(`Account changed. Value=${e.target.value}`);
    this.cadenceForm.get('account')?.setValue(e.target.value, {onlySelf: true});
  }

  categoryChange(e: any): void {
    this._logger.debug(`Category changed. Value=${e.target.value}`);
    this.cadenceForm.get('category')?.setValue(e.target.value, {onlySelf: true});
  }

  timePeriodChange(e: any): void {
    this._logger.debug(`Time period changed. Value=${e.target.value}`);
    this.cadenceForm.get('timePeriod')?.setValue(e.target.value, {onlySelf: true});
  }

  submitClicked() {
    this._logger.debug(`Cadence form submitted. form=${JSON.stringify(this.cadenceForm.value)}`);
    const timePeriod = <string>this.cadenceForm.get('timePeriod')?.value;
    const cadence = <CadenceModel>{
      guid: this.cadence?.guid,
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

  deleteClicked() {
    this.onDelete.emit(this.cadence?.guid);
  }

  private buildForm(cadence: CadenceModel|null = null): FormGroup {
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
