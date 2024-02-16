import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAdminPendingComponent } from './verify-admin-pending.component';

describe('VerifyAdminPendingComponent', () => {
  let component: VerifyAdminPendingComponent;
  let fixture: ComponentFixture<VerifyAdminPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyAdminPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyAdminPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
