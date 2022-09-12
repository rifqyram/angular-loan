import {Component, OnInit} from '@angular/core';
import {LoanType} from "./model/LoanType";

@Component({
  selector: 'app-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.scss']
})
export class LoanTypeComponent implements OnInit {
  loanType?: LoanType;

  constructor() { }

  ngOnInit(): void {
  }

}
