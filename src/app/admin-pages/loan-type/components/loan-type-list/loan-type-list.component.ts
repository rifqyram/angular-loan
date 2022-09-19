import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoanType} from "../../model/LoanType";
import {LoanTypeService} from "../../service/loan-type.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-loan-type-list',
  templateUrl: './loan-type-list.component.html',
  styleUrls: ['./loan-type-list.component.scss']
})
export class LoanTypeListComponent implements OnInit {
  loanTypes?: LoanType[];

  @Input() loanType?: LoanType;
  @Output() loanTypeChange = new EventEmitter<LoanType>();

  constructor(private readonly service: LoanTypeService,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Loan Type')
  }

  ngOnInit(): void {
    this.service.notify().subscribe(() => {
      this.getAllLoanType();
    })

    this.getAllLoanType();
  }

  getAllLoanType(): void {
    this.service.getAll().subscribe({
      next: ({data}) => this.loanTypes = data
    })
  }

  onDelete(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure want to delete Loan Type?',
      showCancelButton: true,
      confirmButtonColor: 'red'
    }).then((swal) => {
      if (swal.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => Swal.fire({
            icon: 'success',
            title: 'Successfully Deleted Loan Type',
          }),
          error: (err) => Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message
          })
        })
      }
    })
  }
}
