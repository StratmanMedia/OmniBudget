import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCadenceComponent } from './update-cadence.component';

describe('UpdateCadenceComponent', () => {
  let component: UpdateCadenceComponent;
  let fixture: ComponentFixture<UpdateCadenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCadenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCadenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
