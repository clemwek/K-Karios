import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBreakdownComponent } from './staff-breakdown.component';

describe('StaffBreakdownComponent', () => {
  let component: StaffBreakdownComponent;
  let fixture: ComponentFixture<StaffBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
