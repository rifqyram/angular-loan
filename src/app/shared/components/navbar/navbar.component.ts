import { Component, OnInit } from '@angular/core';
import {navbarData, NavbarData} from "./model/NavbarData";
import {UserResponse} from "../../../auth/model/IAuth";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarData: NavbarData[] = navbarData;
  collapsed: boolean = false;
  currentUser?: UserResponse;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(): void {
  }

  async onLogout(): Promise<void> {
    this.service.clearStorage();
    await this.router.navigateByUrl('/login');
  }

}
