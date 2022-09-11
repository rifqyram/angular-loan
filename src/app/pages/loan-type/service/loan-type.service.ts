import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoanType, LoanTypeForm} from "../model/LoanType";
import {Observable} from "rxjs";
import {CommonResponse} from "../../../shared/model/CommonResponse";

@Injectable({
  providedIn: 'root'
})
export class LoanTypeService {

  loading: boolean = false;

  constructor(private readonly http: HttpClient) {
  }

  create(loanType: LoanTypeForm): Observable<CommonResponse<LoanType>> {
    return this.http.post<any>('/api/loan-types', loanType);
  }

  getById(id: string): Observable<CommonResponse<LoanType>> {
    return this.http.get<CommonResponse<LoanType>>(`/api/loan-types/${id}`);
  }

  getAll(): Observable<CommonResponse<LoanType>> {
    return this.http.get<CommonResponse<LoanType>>('/api/loan-types');
  }
}
