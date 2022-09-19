import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../profile-setting/service/customer.service";
import {CustomerResponse} from "../profile-setting/model/Customer";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser?: CustomerResponse;

  constructor(private readonly service: CustomerService,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Home')
  }

  ngOnInit(): void {
    this.getCustomerFromToken();
  }

  getCustomerFromToken(): void {
    this.service.getCustomerFromToken().subscribe({
      next: ({data}) => {
        this.currentUser = data
      },
    })
  }

}
