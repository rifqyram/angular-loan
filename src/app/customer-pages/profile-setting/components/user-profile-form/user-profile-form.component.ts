import {Component, OnInit} from '@angular/core';
import {CustomerFormField, CustomerRequest, CustomerResponse, CustomerUploadRequest} from "../../model/Customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../service/customer.service";
import {catchError, EMPTY, finalize, of, switchMap} from "rxjs";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  currentCustomer?: CustomerResponse;
  form!: FormGroup;
  formField: typeof CustomerFormField = CustomerFormField;
  previewImage?: string = this.currentCustomer?.profilePicture.url;
  selectedImage: any;

  constructor(private readonly service: CustomerService,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | User Setting')
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCustomer()
  }

  buildForm(): void {
    const {id, firstName, lastName, dateOfBirth, phone} = this.formField;
    this.form = new FormGroup({
      [id]: new FormControl(null),
      [firstName]: new FormControl(null, [Validators.required]),
      [lastName]: new FormControl(null, [Validators.required]),
      [dateOfBirth]: new FormControl(null),
      [phone]: new FormControl(null, [Validators.required]),
    })
  }

  setFormValues(customer?: CustomerResponse): void {
    if (customer) {
      const {id, firstName, lastName, dateOfBirth, phone} = this.formField;
      this.form.get(id)?.setValue(customer.id);
      this.form.get(firstName)?.setValue(customer.firstName);
      this.form.get(lastName)?.setValue(customer.lastName);
      this.form.get(dateOfBirth)?.setValue(customer.dateOfBirth);
      this.form.get(phone)?.setValue(customer.phone);
    }
  }

  onSubmit(): void {
    let customer: CustomerRequest = this.form.getRawValue();
    this.updateWithUpload(customer);

    if (this.form.valid) {
      if (this.currentCustomer) {

        this.service.updateCustomer(customer).subscribe({
          next: ({data}) => {
            Swal.fire({
              icon: 'success',
              title: 'Successfully Update Profile',
            })
          },
          error: (err) => Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message
          })
        })
      }

    }
  }

  selectAvatar(e: any): void {
    if (e.target.files && e.target.files[0]) {
      this.selectedImage = e.target.files
      this.form.get(this.formField.profilePicture)?.setValue(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  updateWithUpload(customer: CustomerRequest): void {
    if (this.currentCustomer && this.selectedImage) {

      const formData = new FormData();
      formData.append('avatar', this.selectedImage[0])

      const profilePicture: CustomerUploadRequest = {
        formData,
        customerId: this.currentCustomer.id
      }

      this.service.uploadAvatar(profilePicture).pipe(
        catchError((err) => {
          console.log(err);
          return EMPTY;
        }),
        switchMap(() => this.service.updateCustomer(customer)),
      ).subscribe({
        next: ({data}) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Update Profile',
          })
        },
        error: (err) => Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message
        }),
      })
    }
    return;
  }

  getCustomer(): void {
    this.service.getCustomerFromToken()
      .subscribe({
        next: ({data}) => {
          console.log(data);
          this.currentCustomer = data
          this.previewImage = data.profilePicture && `/api/${data.profilePicture.url}`
          this.setFormValues(data);
        },
        error: console.error
      })
  }

}
