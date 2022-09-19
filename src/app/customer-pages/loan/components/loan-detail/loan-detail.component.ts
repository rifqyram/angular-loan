import {Component, OnInit} from '@angular/core';
import {TransactionResponse} from "../../model/Loan";
import {EMPTY, map, switchMap} from "rxjs";
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {TransactionService} from "../../../../admin-pages/transaction/service/transaction.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {
  transactions?: TransactionResponse;

  constructor(private readonly route: ActivatedRoute,
              private readonly transactionService: TransactionService,
              private readonly titleService: Title) {
    this.titleService.setTitle(`Enigma Loan | Loan Detail`)
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (Object.keys(params).length !== 0) {
          return this.transactionService.getTransactionsById(params['id']);
        }
        return EMPTY;
      }),
      map((response) => {
        const transactionDetailResponses = response.data.transactionDetailResponses.map((res) => {
          if (res.guaranteePicture) {
            return {...res, guaranteePicture: {...res.guaranteePicture, url: `/api${res.guaranteePicture.url}`}}
          }
          return {...res}
        })
        return {...response, data: {...response.data, transactionDetailResponses}}
      })
    ).subscribe({
      next: ({data}) => {
        this.transactions = data
      },
      error: (err) => Swal.fire({
        icon: 'error',
        text: err.error.message
      }),
    })

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


  loanStatusClass(loanStatus: string) {
    return loanStatus === 'PAID' ? 'paid' : 'unpaid';
  }
}
