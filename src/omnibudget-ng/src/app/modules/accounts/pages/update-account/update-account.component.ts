import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subject, takeUntil, tap } from 'rxjs';
import { AccountModel } from 'src/app/core/accounts/account-model';
import { AccountService } from 'src/app/core/accounts/account.service';
import { LoggingService } from 'src/app/core/logging/logging.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit, OnDestroy {
  private _logger: LoggingService = new LoggingService({
    callerName: "UpdateAccountComponent"
  });
  private ngDestroy$ = new Subject<boolean>();
  private _guid: string;

  accountForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AccountService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._guid = this._route.snapshot.params['guid'];
    this._accountService.getOne(this._guid).pipe(
      takeUntil(this.ngDestroy$),
      tap(account => {
        if (account === undefined) {
          this._router.navigateByUrl('/app');
          return;
        }
        this.accountForm = this.buildForm(account);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }

  onSubmit() {
    this._logger.debug(`Form submitted. form=${JSON.stringify(this.accountForm.value)}`);
    const account = <AccountModel>{
      guid: this.accountForm.get('guid')?.value,
      name: this.accountForm.get('name')?.value
    };
    this._accountService.update(this._guid, account).pipe(
      first(),
      tap(() => {
        this._router.navigateByUrl('/app/accounts');
      })
    ).subscribe();
  }

  onDelete() {
    this._accountService.delete(this._guid).pipe(
      first(),
      tap(() => {
        this._router.navigateByUrl('/app/accounts');
      })
    ).subscribe();
  }

  private buildForm(account: AccountModel): FormGroup {
    return this._formBuilder.group({
      guid: [account.guid],
      name: [account.name]
    });
  }
}