import { Component, OnInit } from '@angular/core';
import {sidenavSetting, SidenavSetting} from "./model/SidenavSetting";

@Component({
  selector: 'app-sidenav-setting',
  templateUrl: './sidenav-setting.component.html',
  styleUrls: ['./sidenav-setting.component.scss']
})
export class SidenavSettingComponent implements OnInit {
  sidenavData: SidenavSetting[] = sidenavSetting;

  constructor() { }

  ngOnInit(): void {
  }

}
