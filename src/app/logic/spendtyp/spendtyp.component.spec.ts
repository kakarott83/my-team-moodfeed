import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendtypComponent } from './spendtyp.component';

describe('SpendtypComponent', () => {
  let component: SpendtypComponent;
  let fixture: ComponentFixture<SpendtypComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpendtypComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpendtypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
