import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonResponse} from "../../../shared/model/CommonResponse";
import {UserResponse} from "../../../auth/model/IAuth";
import {ICustomer, UploadProfilePictureRequest} from "../../../auth/model/ICustomer";
import {FileResponse} from "../../../shared/model/FileResponse";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly http: HttpClient) {
  }

  getCustomerFromToken(): Observable<CommonResponse<ICustomer>> {
    return this.http.get<CommonResponse<ICustomer>>('/api/customers/me');
  }

  updateCustomer(customer: ICustomer): Observable<CommonResponse<ICustomer>> {
    return this.http.put<CommonResponse<ICustomer>>('/api/customers', customer);
  }

  uploadAvatar(profilePicture: UploadProfilePictureRequest): Observable<CommonResponse<FileResponse>> {
    return this.http.post<CommonResponse<FileResponse>>(`/customers/${profilePicture.customerId}/upload/avatar`, profilePicture.formData);
  }

}
