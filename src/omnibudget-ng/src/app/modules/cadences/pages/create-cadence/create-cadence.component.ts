import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/core/logging/logging.service';
import { CadenceModel } from 'src/app/core/transactions/cadence-model';
import { CadencesService } from 'src/app/core/transactions/cadences.service';
import { FormMode } from 'src/app/shared/classes/form-mode';

@Component({
  selector: 'omni-create-cadence',
  templateUrl: './create-cadence.component.html',
  styleUrls: ['./create-cadence.component.css']
})
export class CreateCadenceComponent implements OnInit {
  private _logger = new LoggingService('CreateCadenceComponent');
  
  constructor(
    private _router: Router,
    private _cadenceService: CadencesService) { }

  ngOnInit(): void {
  }

  get formModeEnum(): typeof FormMode {
    return FormMode;
  }

  onSubmit(cadence: CadenceModel): void {
    this._logger.debug(`Submitting cadence form. Data=${JSON.stringify(cadence)}`);
    this._cadenceService.add(cadence).subscribe(() => {
      this._router.navigateByUrl('/app/cadences');
    });
  }

  onCancel(): void {
    this._router.navigateByUrl('/app/cadences');
  }
}
