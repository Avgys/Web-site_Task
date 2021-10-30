import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakingOrderComponent } from './making-order.component';

describe('MakingOrderComponent', () => {
  let component: MakingOrderComponent;
  let fixture: ComponentFixture<MakingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
