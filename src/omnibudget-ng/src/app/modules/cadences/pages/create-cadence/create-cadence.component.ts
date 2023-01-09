import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, map, Subject } from 'rxjs';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { CadenceModel } from 'src/app/core/transactions/cadence-model';
import { CadenceService } from 'src/app/core/transactions/cadence.service';
import { FormMode } from 'src/app/shared/classes/form-mode';

@Component({
  selector: 'omni-create-cadence',
  templateUrl: './create-cadence.component.html',
  styleUrls: ['./create-cadence.component.css']
})
export class CreateCadenceComponent implements OnInit {
  private _logger: LoggingService = new LoggingService({
    callerName: "CadenceMainComponent"
  });
  private ngDestroy$: Subject<boolean>;
  
  constructor(
    private _router: Router,
    private _cadenceService: CadenceService) { }

  ngOnInit(): void {
  }

  get formModeEnum(): typeof FormMode {
    return FormMode;
  }

  onSubmit(cadence: CadenceModel): void {
    this._logger.debug(`Submitting cadence form. Data=${JSON.stringify(cadence)}`);
    this._cadenceService.add(cadence).pipe(
      first(),
      map(() => {
        this._router.navigateByUrl('/app/cadences');
      })
    ).subscribe();
  }

  onCancel(): void {
    this._router.navigateByUrl('/app/cadences');
  }
}
