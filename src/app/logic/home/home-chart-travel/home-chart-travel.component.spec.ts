import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChartTravelComponent } from './home-chart-travel.component';

describe('HomeChartTravelComponent', () => {
  let component: HomeChartTravelComponent;
  let fixture: ComponentFixture<HomeChartTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeChartTravelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeChartTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
