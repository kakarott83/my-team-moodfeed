import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerfifiedComponent } from './not-verfified.component';

describe('NotVerfifiedComponent', () => {
  let component: NotVerfifiedComponent;
  let fixture: ComponentFixture<NotVerfifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotVerfifiedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotVerfifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
