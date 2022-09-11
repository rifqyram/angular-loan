import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalmentTypeListComponent } from './instalment-type-list.component';

describe('InstalmentTypeListComponent', () => {
  let component: InstalmentTypeListComponent;
  let fixture: ComponentFixture<InstalmentTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalmentTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalmentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
