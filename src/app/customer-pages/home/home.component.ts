import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../profile-setting/service/customer.service";
import {ICustomer} from "../../auth/model/ICustomer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser?: Partial<ICustomer>;
  booa: boolean = false

  constructor(private readonly service: CustomerService) {
    console.log(this.booa)
  }

  ngOnInit(): void {
    this.getCustomerFromToken();
  }

  getCustomerFromToken(): void {
    this.service.getCustomerFromToken().subscribe({
      next: ({data}) => {
        console.log(data)
        this.currentUser = data
      },
    })
  }

}
