import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalmentTypeComponent } from './instalment-type.component';

describe('InstalmentTypeComponent', () => {
  let component: InstalmentTypeComponent;
  let fixture: ComponentFixture<InstalmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalmentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
