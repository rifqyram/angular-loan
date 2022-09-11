import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {INavData} from "./model/INavData";
import { navData } from './model/NavData';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
  ]

})
export class SidenavComponent implements OnInit {
  collapsed: boolean = false;
  navData: INavData[] = navData;
  @Output() onToggleSidenav = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit(this.collapsed);
  }
}
