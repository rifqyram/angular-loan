import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSettingComponent } from './sidenav-setting.component';

describe('SidenavSettingComponent', () => {
  let component: SidenavSettingComponent;
  let fixture: ComponentFixture<SidenavSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
