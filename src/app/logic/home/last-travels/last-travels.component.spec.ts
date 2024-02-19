import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTravelsComponent } from './last-travels.component';

describe('LastTravelsComponent', () => {
  let component: LastTravelsComponent;
  let fixture: ComponentFixture<LastTravelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastTravelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastTravelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
