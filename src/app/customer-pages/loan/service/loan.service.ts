import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoanRequest, TransactionResponse} from "../model/Loan";
import {Observable, Subject, tap} from "rxjs";
import {CommonResponse} from "../../../shared/model/CommonResponse";
import {PageResponse} from "../../../shared/model/PageResponse";

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loanNotify = new Subject<void>();

  constructor(private readonly http: HttpClient) { }

  requestLoan(request: LoanRequest): Observable<CommonResponse<TransactionResponse>> {
    return this.http.post<CommonResponse<TransactionResponse>>('/api/transactions', request).pipe(
      tap(() => {
        this.loanNotify.next();
      }),
    );
  }

  getAllByCustomerId(customerId: string, params: any): Observable<CommonResponse<PageResponse<TransactionResponse>>> {
    let reqParams: any = {};
    if (params) {
      Object.keys(params).map(k => {
        reqParams[k] = params[k];
      })
    }
    return this.http.get<CommonResponse<PageResponse<TransactionResponse>>>(`/api/transactions/${customerId}/customers`, {params: reqParams});
  }

  notify(): Observable<any> {
    return this.loanNotify.asObservable();
  }

  payInstalment(id: string, formData: FormData): Observable<void> {
    return this.http.put<void>(`api/transactions/${id}/pay`, formData).pipe(tap(() => this.loanNotify.next()));
  }
}
