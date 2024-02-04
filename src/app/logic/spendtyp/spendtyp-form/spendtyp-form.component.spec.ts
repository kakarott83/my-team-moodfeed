import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendtypFormComponent } from './spendtyp-form.component';

describe('SpendtypFormComponent', () => {
  let component: SpendtypFormComponent;
  let fixture: ComponentFixture<SpendtypFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpendtypFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpendtypFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
