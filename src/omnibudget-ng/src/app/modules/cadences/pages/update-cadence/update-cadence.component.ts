import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable, Subject } from 'rxjs';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { CadenceModel } from 'src/app/core/transactions/cadence-model';
import { CadenceService } from 'src/app/core/transactions/cadence.service';
import { FormMode } from 'src/app/shared/classes/form-mode';

@Component({
  selector: 'omni-update-cadence',
  templateUrl: './update-cadence.component.html',
  styleUrls: ['./update-cadence.component.css']
})
export class UpdateCadenceComponent implements OnInit, OnDestroy {
  private _logger: LoggingService = new LoggingService({
    callerName: "UpdateCadenceComponent"
  });
  private ngDestroy$ = new Subject<boolean>();
  private _guid: string;

  cadence = new Observable<CadenceModel | undefined>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cadenceService: CadenceService) { }

  ngOnInit(): void {
    this._guid = this._route.snapshot.params['guid'];
    this.cadence = this._cadenceService.getOne(this._guid).pipe(
      map(cadence => {
        if (!cadence) {
          this._router.navigateByUrl('/cadences');
          return;
        } else {
          this._logger.debug(`Cadence loaded. cadence=${JSON.stringify(cadence)}`);
          return cadence;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }

  get formModeEnum(): typeof FormMode {
    return FormMode;
  }

  onSubmit(cadence: CadenceModel): void {
    this._logger.debug(`Form submitted. Data=${JSON.stringify(cadence)}`);
    this._cadenceService.update(cadence.guid, cadence).pipe(
      first(),
      map(() => {
        this._router.navigateByUrl('/app/cadences');
      })
    ).subscribe();
  }

  onCancel(): void {
    this._router.navigateByUrl('/app/cadences');
  }

  onDelete(guid: string): void {
    this._cadenceService.delete(guid).pipe(
      first(),
      map(() => {
        this._router.navigateByUrl('/app/cadences');
      })
    ).subscribe();
  }
}
