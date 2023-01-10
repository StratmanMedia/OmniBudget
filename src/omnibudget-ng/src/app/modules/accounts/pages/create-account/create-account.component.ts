import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AccountModel } from 'src/app/core/accounts/account-model';
import { AccountService } from 'src/app/core/accounts/account.service';
import { LoggingService } from 'src/app/core/logging/logging.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  private _logger: LoggingService = new LoggingService({
    callerName: "CreateAccountComponent"
  });
  
  accountForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private _router: Router,
    private _accountService: AccountService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._logger.debug(JSON.stringify(this.accountForm.value));
    const account = <AccountModel>{
      name: this.accountForm.get('name')?.value
    };
    this._accountService.add(account).pipe(
      tap(() => {
        this._router.navigateByUrl('/app/accounts');
      })
    ).subscribe();
  }
}