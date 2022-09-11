import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTypeFormComponent } from './loan-type-form.component';

describe('LoanTypeFormComponent', () => {
  let component: LoanTypeFormComponent;
  let fixture: ComponentFixture<LoanTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
