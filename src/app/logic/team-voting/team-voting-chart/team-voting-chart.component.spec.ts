import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamVotingChartComponent } from './team-voting-chart.component';

describe('TeamVotingChartComponent', () => {
  let component: TeamVotingChartComponent;
  let fixture: ComponentFixture<TeamVotingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamVotingChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamVotingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
