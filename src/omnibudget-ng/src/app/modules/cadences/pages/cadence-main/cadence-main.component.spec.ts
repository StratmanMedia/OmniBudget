import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadenceMainComponent } from './cadence-main.component';

describe('CadenceMainComponent', () => {
  let component: CadenceMainComponent;
  let fixture: ComponentFixture<CadenceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadenceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadenceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
