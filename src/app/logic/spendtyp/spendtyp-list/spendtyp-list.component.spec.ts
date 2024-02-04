import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendtypListComponent } from './spendtyp-list.component';

describe('SpendtypListComponent', () => {
  let component: SpendtypListComponent;
  let fixture: ComponentFixture<SpendtypListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpendtypListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpendtypListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
