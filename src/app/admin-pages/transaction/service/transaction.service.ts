import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {CommonResponse} from "../../../shared/model/CommonResponse";
import {TransactionResponse} from "../../../customer-pages/loan/model/Loan";
import {PageResponse} from "../../../shared/model/PageResponse";
import {LoanTransactionApprovalRequest} from "../model/Transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionSubject = new Subject<void>();

  constructor(private readonly http: HttpClient) { }

  getAllTransactions(params: any): Observable<CommonResponse<PageResponse<TransactionResponse>>> {

    let reqParams: any = {};
    if (params) {
      Object.keys(params).map(k => {
        reqParams[k] = params[k];
      })
    }

    return this.http.get<CommonResponse<PageResponse<TransactionResponse>>>(`/api/transactions`, {params})
  }

  getTransactionsById(id: string): Observable<CommonResponse<TransactionResponse>> {
    return this.http.get<CommonResponse<TransactionResponse>>(`/api/transactions/${id}`)
  }

  approved(data: LoanTransactionApprovalRequest): Observable<CommonResponse<TransactionResponse>> {
    return this.http.put<CommonResponse<TransactionResponse>>('/api/transactions/approve', data)
      .pipe(tap(() => this.transactionSubject.next()));
  }

  reject(id: string): Observable<CommonResponse<TransactionResponse>> {
    return this.http.put<CommonResponse<TransactionResponse>>(`/api/transactions/${id}/reject`, null)
      .pipe(tap(() => this.transactionSubject.next()));
  }

  downloadGuaranteePicture(url: string): Observable<any> {
    const requestOptions: Object = {
      responseType: 'blob'
    }
    return this.http.get<any>(url, requestOptions);
  }

  notify(): Observable<void> {
    return this.transactionSubject.asObservable()
  }
}
