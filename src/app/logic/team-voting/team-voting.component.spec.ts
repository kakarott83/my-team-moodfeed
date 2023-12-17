import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamVotingComponent } from './team-voting.component';

describe('TeamVotingComponent', () => {
  let component: TeamVotingComponent;
  let fixture: ComponentFixture<TeamVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamVotingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
