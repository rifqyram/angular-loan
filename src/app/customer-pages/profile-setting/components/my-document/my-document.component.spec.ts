import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocumentComponent } from './my-document.component';

describe('MyDocumentComponent', () => {
  let component: MyDocumentComponent;
  let fixture: ComponentFixture<MyDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
