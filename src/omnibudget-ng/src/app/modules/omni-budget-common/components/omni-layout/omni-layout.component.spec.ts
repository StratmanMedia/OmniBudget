import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniLayoutComponent } from './omni-layout.component';

describe('OmniLayoutComponent', () => {
  let component: OmniLayoutComponent;
  let fixture: ComponentFixture<OmniLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmniLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
