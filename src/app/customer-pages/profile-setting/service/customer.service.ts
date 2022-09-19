import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerRequest, CustomerResponse, CustomerUploadRequest} from "../model/Customer";
import {FileResponse} from "../../../shared/model/FileResponse";
import {CommonResponse} from "../../../shared/model/CommonResponse";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly http: HttpClient) {
  }

  getCustomerFromToken(): Observable<CommonResponse<CustomerResponse>> {
    return this.http.get<CommonResponse<CustomerResponse>>('/api/customers/me');
  }

  updateCustomer(customer: CustomerRequest): Observable<CommonResponse<CustomerResponse>> {
    return this.http.put<CommonResponse<CustomerResponse>>('/api/customers', customer);
  }

  uploadAvatar(profilePicture: CustomerUploadRequest): Observable<CommonResponse<FileResponse>> {
    return this.http.post<CommonResponse<FileResponse>>(`/api/customers/${profilePicture.customerId}/upload/avatar`, profilePicture.formData);
  }

  uploadDocuments(uploadData: CustomerUploadRequest): Observable<CommonResponse<FileResponse[]>> {
    return this.http.post<CommonResponse<FileResponse[]>>(`/api/customers/${uploadData.customerId}/documents`, uploadData.formData)
  }

  downloadDocument(documentId: string): Observable<any> {
    const requestOptions: Object = {
      responseType: 'blob'
    }
    return this.http.get<any>(`/api/customers/${documentId}/documents`, requestOptions);
  }

}
