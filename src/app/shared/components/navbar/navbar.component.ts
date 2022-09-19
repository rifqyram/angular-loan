import {Component, OnInit} from '@angular/core';
import {navbarData, NavbarData} from "./model/NavbarData";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/service/auth.service";
import {CustomerResponse} from "../../../customer-pages/profile-setting/model/Customer";
import {CustomerService} from "../../../customer-pages/profile-setting/service/customer.service";
import {map} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarData: NavbarData[] = navbarData;
  collapsed: boolean = false;
  currentCustomer?: CustomerResponse;

  constructor(private router: Router, private authService: AuthService, private readonly customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(): void {
    this.customerService.getCustomerFromToken()
      .pipe(map((res) => {
        if (res.data.profilePicture) {
          return {
            ...res,
            data: {...res.data, profilePicture: {...res.data.profilePicture, url: `/api${res.data.profilePicture.url}`}}
          }
        }
        return {...res};
      }))
      .subscribe({
        next: ({data}) => this.currentCustomer = data,
        error: console.error
      });
  }

  async onLogout(): Promise<void> {
    this.authService.clearStorage();
    await this.router.navigateByUrl('/login');
  }

}
