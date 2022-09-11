import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-type-list',
  templateUrl: './loan-type-list.component.html',
  styleUrls: ['./loan-type-list.component.scss']
})
export class LoanTypeListComponent implements OnInit {
  loanTypes = [];
  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
