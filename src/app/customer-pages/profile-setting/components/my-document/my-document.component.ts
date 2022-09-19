import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {FileResponse} from "../../../../shared/model/FileResponse";
import {map, switchMap} from "rxjs";
import {CustomerUploadRequest} from "../../model/Customer";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-my-document',
  templateUrl: './my-document.component.html',
  styleUrls: ['./my-document.component.scss']
})
export class MyDocumentComponent implements OnInit {
  documents?: FileResponse[];
  files: File[] = [];

  constructor(private readonly service: CustomerService,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | My Document')
  }

  ngOnInit(): void {
    this.getAllDocument();
  }

  getAllDocument(): void {
    this.service.getCustomerFromToken().pipe(
      map(({data}) => {
        if (data.loanDocuments) {
          const loanDocuments = data.loanDocuments.map((ld: FileResponse) => {
            return {...ld, url: `api${ld.url}`};
          })
          return {...data, loanDocuments}
        }
        return {...data}
      })
    ).subscribe({
      next: (val) => {
        this.documents = val.loanDocuments;
      },
      error: console.error,
    })
  }

  downloadDoc(docId: string, filename: string): void {
    this.service.downloadDocument(docId).subscribe({
      next: (val) => {
        let objectURL = URL.createObjectURL(val);
        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        anchor.href = objectURL;
        anchor.download = filename;
        anchor.click();

        window.URL.revokeObjectURL(objectURL);
      },
      error: console.error
    })
  }

  onSelectFiles(event: any) {
    if (event.target.files) {
      const {files} = event.target;
      this.files = files;
    }
  }

  onSubmit(event: any): void {
    event.preventDefault();
    if (this.files && this.files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < this.files.length; i++) {
        formData.append('documents', this.files[i]);
      }

      this.service.getCustomerFromToken().pipe(
        switchMap(({data}) => {
          const uploadRequest: CustomerUploadRequest = {
            customerId: data.id,
            formData: formData
          }
          return this.service.uploadDocuments(uploadRequest)
        }),
      ).subscribe({
        next: ({data}) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Upload Loan Document',
          })
          this.documents = [...this.documents!, ...data]
          this.files = [];
        },
        error: (err) => Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message
        })
      });
    }
  }
}
