import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadenceFormComponent } from './cadence-form.component';

describe('CadenceFormComponent', () => {
  let component: CadenceFormComponent;
  let fixture: ComponentFixture<CadenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadenceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
