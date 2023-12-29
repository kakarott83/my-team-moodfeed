import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamVotingListComponent } from './team-voting-list.component';

describe('TeamVotingListComponent', () => {
  let component: TeamVotingListComponent;
  let fixture: ComponentFixture<TeamVotingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamVotingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamVotingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
