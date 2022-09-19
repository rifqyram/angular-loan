import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InstalmentType} from "../model/InstalmentType";
import { Observable} from "rxjs";
import {CommonResponse} from "../../../shared/model/CommonResponse";

@Injectable({
  providedIn: 'root'
})
export class InstalmentTypeService {


  constructor(private readonly http: HttpClient) {
  }

  getById(id: string): Observable<CommonResponse<InstalmentType>> {
    return this.http.get<CommonResponse<InstalmentType>>(`/instalment-type/${id}`);
  }

  getAll(): Observable<CommonResponse<InstalmentType[]>> {
    return this.http.get<CommonResponse<InstalmentType[]>>('/api/instalment-type');
  }

}
