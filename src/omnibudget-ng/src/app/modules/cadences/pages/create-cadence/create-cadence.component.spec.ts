import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCadenceComponent } from './create-cadence.component';

describe('CreateCadenceComponent', () => {
  let component: CreateCadenceComponent;
  let fixture: ComponentFixture<CreateCadenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCadenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCadenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
