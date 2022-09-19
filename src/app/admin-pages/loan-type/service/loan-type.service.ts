import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoanType} from "../model/LoanType";
import {Observable, Subject, tap} from "rxjs";
import {CommonResponse} from "../../../shared/model/CommonResponse";

@Injectable({
  providedIn: 'root'
})
export class LoanTypeService {
  private loanTypeSubject = new Subject<void>()

  constructor(private readonly http: HttpClient) {
  }

  create(loanType: LoanType): Observable<CommonResponse<LoanType>> {
    return this.http.post<any>('/api/loan-types', loanType)
      .pipe(tap(() => {
        this.loanTypeSubject.next();
      }));
  }

  getById(id: string): Observable<CommonResponse<LoanType>> {
    return this.http.get<CommonResponse<LoanType>>(`/api/loan-types/${id}`)
      .pipe(tap(() => {
        this.loanTypeSubject.next();
        this.loanTypeSubject.complete();
      }));
  }

  getAll(): Observable<CommonResponse<LoanType[]>> {
    return this.http.get<CommonResponse<LoanType[]>>('/api/loan-types');
  }

  update(loanType: LoanType): Observable<CommonResponse<LoanType>> {
    return this.http.put<CommonResponse<LoanType>>(`/api/loan-types`, loanType).pipe(tap(() => {
      this.loanTypeSubject.next();
    }));
  }

  delete(id: string): Observable<CommonResponse<any>> {
    return this.http.delete<CommonResponse<any>>(`api/loan-types/${id}`).pipe(tap(() => {
      this.loanTypeSubject.next();
    }));
  }

  notify(): Observable<void> {
    return this.loanTypeSubject.asObservable();
  }
}
