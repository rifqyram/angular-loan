export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
  status: string;
  profilePicture: string;
  loanDocuments: []
}

export interface UploadProfilePictureRequest {
  customerId: string;
  formData: FormData
}
