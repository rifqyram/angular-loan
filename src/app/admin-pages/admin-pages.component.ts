import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {

  collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

}
