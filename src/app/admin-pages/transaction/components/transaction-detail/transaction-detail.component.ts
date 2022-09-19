import {Component, OnInit} from '@angular/core';
import {TransactionResponse} from "../../../../customer-pages/loan/model/Loan";
import {TransactionService} from "../../service/transaction.service";
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {EMPTY, map, switchMap} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  transactions?: TransactionResponse;

  constructor(private readonly transactionService: TransactionService,
              private readonly route: ActivatedRoute,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Transaction Detail')
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params && params['id']) {
          return this.transactionService.getTransactionsById(params['id']);
        }
        return EMPTY;
      }),
      map((transactions) => {
        const transactionDetailResponses = transactions.data.transactionDetailResponses.map(val => {
          if (val.guaranteePicture) {
            return {...val, guaranteePicture: {...val.guaranteePicture, url: `/api${val.guaranteePicture.url}`}}
          }
          return {...val};
        });
        return {...transactions, data: {...transactions.data, transactionDetailResponses} }
      })
    ).subscribe({
      next: ({data}) => {
        console.log(data);
        this.transactions = data
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: err.error
        })
      },
    })
  }

  loanStatusClass(loanStatus: string) {
    return loanStatus === 'PAID' ? 'paid' : 'unpaid';
  }

  downloadGuaranteePicture(url: string, name: string) {
    this.transactionService.downloadGuaranteePicture(url).subscribe({
      next: (val) => {
        let objectURL = URL.createObjectURL(val);
        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        anchor.href = objectURL;
        anchor.download = name;
        anchor.click();

        window.URL.revokeObjectURL(objectURL);
      }
    })
  }
}
