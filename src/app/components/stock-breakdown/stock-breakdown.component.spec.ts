import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBreakdownComponent } from './stock-breakdown.component';

describe('StockBreakdownComponent', () => {
  let component: StockBreakdownComponent;
  let fixture: ComponentFixture<StockBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
