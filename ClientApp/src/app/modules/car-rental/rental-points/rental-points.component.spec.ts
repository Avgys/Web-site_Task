import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointsComponent } from './rental-points.component';

describe('RentalPointsComponent', () => {
  let component: RentalPointsComponent;
  let fixture: ComponentFixture<RentalPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
