import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChartWorkweekComponent } from './home-chart-workweek.component';

describe('HomeChartWorkweekComponent', () => {
  let component: HomeChartWorkweekComponent;
  let fixture: ComponentFixture<HomeChartWorkweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeChartWorkweekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeChartWorkweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
