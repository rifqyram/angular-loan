import { Component, OnInit } from '@angular/core';
import {TransactionResponse} from "../../../../customer-pages/loan/model/Loan";
import {TransactionService} from "../../service/transaction.service";
import {LoanTransactionApprovalRequest} from "../../model/Transaction";
import Swal from "sweetalert2";
import {PageResponse} from "../../../../shared/model/PageResponse";
import {map, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions?: TransactionResponse[];
  currentPaginate: { [key: string]: any } = {page: 1, size: 5};
  paginate?: Omit<PageResponse<any>, "content">

  constructor(private readonly transactionService: TransactionService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Transaction')
  }

  ngOnInit(): void {
    this.transactionService.notify().subscribe(() => {
      this.getTransactions();
    })

    this.getTransactions();
  }

  getTransactions(): void {
    this.route.queryParams.pipe(
      switchMap((val) => {
        return this.transactionService.getAllTransactions(val).pipe(map(({data}) => {
          if (Object.getOwnPropertyNames(val).length !== 0) {
            return {params: val, data: data};
          } else {
            return {params: {page: 1, size: 5, direction: 'DESC'}, data: data};
          }
        }))
      }),
    ).subscribe({
      next: ({data}) => {
        console.log(data);
        this.transactions = data.content
        this.paginate = data;
      },
      error: console.error,
    })

  }

  async onApproved(id: string, interestRates: number) {
    const data: LoanTransactionApprovalRequest = {
      interestRates: interestRates,
      loanTransactionId: id
    }

    if (interestRates) {
      this.transactionService.approved(data).subscribe({
        next: () => Swal.fire({icon: 'success', text: 'Success Approve Transaction'}),
        error: (err) => {
          console.log(err);
          Swal.fire({icon: 'error', text: err.error.message})
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Interest Rates Required!'
      })
    }
  }

  onRejected(id: string) {
    this.transactionService.reject(id).subscribe({
      next: () => Swal.fire({icon: 'success', text: 'Success Reject Transaction'}),
      error: (err) => {
        console.log(err);
        Swal.fire({icon: 'error', text: err.error.message})
      }
    });
  }

  statusClass(approvalStatus: string): string {
    if (approvalStatus === 'Approved') return 'approve';
    if (approvalStatus === 'Rejected') return 'reject';
    if (approvalStatus === 'On Progress') return 'info';
    return '';
  }

  async onTableDataChange(page: number) {
    this.currentPaginate = {...this.currentPaginate, page: page}
    await this.router.navigateByUrl(`/transaction?page=${this.currentPaginate['page']}&size=${this.currentPaginate['size']}`)
    this.getTransactions();
  }
}
