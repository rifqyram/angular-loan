import {FileResponse} from "../../../shared/model/FileResponse";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
  status: string;
  profilePicture: FileResponse
  loanDocuments: [],
  user: {}
}

export interface CustomerResponse {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
  status: string;
  profilePicture: FileResponse
  loanDocuments: [],
  userId: string;
}

export interface CustomerRequest {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
  status: string;
  profilePicture: Pick<FileResponse, "id">
  loanDocuments: [],
  user: {}
}

export interface CustomerUploadRequest {
  customerId: string;
  formData: FormData
}

export enum CustomerFormField {
  id='id',
  firstName='firstName',
  lastName='lastName',
  dateOfBirth='dateOfBirth',
  phone='phone',
  profilePicture='profilePicture',
}
