import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountModel } from 'src/app/core/accounts/account-model';
import { AccountService } from 'src/app/core/accounts/account.service';
import { LoggingService } from 'src/app/core/logging/logging.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  private _logger: LoggingService = new LoggingService('AccountListComponent');
  accountList: Observable<AccountModel[]>;

  constructor(
    private _accountService: AccountService,
    private _router: Router) {
      this.accountList = this._accountService.getAll();
    }

  ngOnInit(): void {
  }

  editAccount(guid: string) {
    this._router.navigateByUrl('/app/accounts/' + guid);
  }
}
