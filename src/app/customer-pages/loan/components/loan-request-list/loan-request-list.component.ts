import {Component, OnInit} from '@angular/core';
import {LoanService} from "../../service/loan.service";
import {CustomerService} from "../../../profile-setting/service/customer.service";
import {TransactionResponse} from "../../model/Loan";
import {PageResponse} from "../../../../shared/model/PageResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";
import Swal from 'sweetalert2';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-loan-request-list',
  templateUrl: './loan-request-list.component.html',
  styleUrls: ['./loan-request-list.component.scss']
})
export class LoanRequestListComponent implements OnInit {
  currentPaginate: { [key: string]: any } = {page: 1, size: 5};
  loans?: TransactionResponse[];
  paginate?: Omit<PageResponse<any>, "content">;
  isPaid: boolean = false;

  constructor(
    private readonly loanService: LoanService,
    private readonly customerService: CustomerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Loan Request')
  }

  ngOnInit(): void {
    this.loanService.notify().subscribe(() => {
      console.log()
      this.getAllLoanRequest();
    });
    this.getAllLoanRequest();
  }

  getAllLoanRequest(): void {
    this.route.queryParams.pipe(
      switchMap((val) => {
        return this.customerService.getCustomerFromToken().pipe(map(({data}) => {
          if (Object.getOwnPropertyNames(val).length !== 0) {
            return {params: val, data: data};
          } else {
            return {params: {page: 1, size: 5, direction: 'DESC'}, data: data};
          }
        }))
      }),
      switchMap((val) => {
        this.currentPaginate = {...val.params};
        return this.loanService.getAllByCustomerId(val.data.id, val.params)
      }),
    ).subscribe({
      next: ({data}) => {
        this.loans = data.content
        this.paginate = data;
        this.isPaid = data.content.map((trxResponse) => {
          return trxResponse.transactionDetailResponses.filter((res) => res.loanStatus === 'PAID').length > 0
        }).length > 0
      },
      error: console.error,
    })

  }

  async onTableDataChange(page: number): Promise<void> {
    this.currentPaginate = {...this.currentPaginate, page: page}
    await this.router.navigateByUrl(`/loan?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    this.getAllLoanRequest();
  }

  statusClass(approvalStatus: string) {
    if (approvalStatus === 'Approved') return 'approve';
    if (approvalStatus === 'Rejected') return 'reject';
    if (approvalStatus === 'On Progress') return 'info';
    return '';
  }

  async onSubmit(id: string, file: any) {
    if (file) {
      const formData = new FormData();
      formData.append('guaranteePicture', file);
      this.loanService.payInstalment(id, formData).subscribe({
        next: () => Swal.fire({
          icon: 'success',
          title: 'Payment Successfully'
        }),
        error: (err) => Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message
        })
      });
    } else {
      await Swal.fire({
        icon: 'warning',
        title: 'Access Denied',
        text: 'Please attach guarantee picture'
      })
    }
  }
}
