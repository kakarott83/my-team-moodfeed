import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicCheckboxComponent } from './cic-checkbox.component';

describe('CicCheckboxComponent', () => {
  let component: CicCheckboxComponent;
  let fixture: ComponentFixture<CicCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CicCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CicCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
