import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/core/accounts/account-model';
import { AccountService } from 'src/app/core/accounts/account.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

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
    this._accountService.getOne(this._guid).subscribe(
      account => {
        if (account === undefined) {
          this._router.navigateByUrl('/app');
          return;
        }
        this.accountForm = this.buildForm(account);
      });
  }

  onSubmit() {
    console.log(this.accountForm.value);
    const account = <AccountModel>{
      guid: this.accountForm.get('guid')?.value,
      name: this.accountForm.get('name')?.value
    };
    this._accountService.update(account).subscribe(() => {
      this._router.navigateByUrl('/app/accounts');
    });
  }

  onDelete() {
    this._accountService.delete(this._guid).subscribe(() => {
      this._router.navigateByUrl('/app/accounts');
    });
  }

  private buildForm(account: AccountModel|null = null): FormGroup {
    return this._formBuilder.group({
      guid: [account?.guid],
      name: [account?.name]
    });
  }
}