import {Component, OnInit} from '@angular/core';
import {LoginResponse} from "../../auth/model/IAuth";
import {AuthService} from "../../auth/service/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-dahsboard',
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.scss']
})
export class DahsboardComponent implements OnInit {
  user?: LoginResponse;

  constructor(private readonly service: AuthService,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Dashboard')
  }

  ngOnInit(): void {
    let user = this.service.getUserFromStorage();
    if (!user) return;
    this.user = user;
  }

}
