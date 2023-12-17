import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBundleComponent } from './question-bundle.component';

describe('QuestionBundleComponent', () => {
  let component: QuestionBundleComponent;
  let fixture: ComponentFixture<QuestionBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionBundleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
