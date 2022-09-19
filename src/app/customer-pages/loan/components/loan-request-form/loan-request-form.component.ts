import {Component, OnInit} from '@angular/core';
import {LoanType} from "../../../../admin-pages/loan-type/model/LoanType";
import {LoanTypeService} from "../../../../admin-pages/loan-type/service/loan-type.service";
import {InstalmentTypeService} from "../../../../admin-pages/instalment-type/service/instalment-type.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoanForm, LoanRequest} from "../../model/Loan";
import {InstalmentType} from "../../../../admin-pages/instalment-type/model/InstalmentType";
import {LoanService} from "../../service/loan.service";
import {CustomerService} from "../../../profile-setting/service/customer.service";
import {switchMap} from "rxjs";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-loan-request-form',
  templateUrl: './loan-request-form.component.html',
  styleUrls: ['./loan-request-form.component.scss']
})
export class LoanRequestFormComponent implements OnInit {
  loanTypes?: LoanType[];
  instalmentTypes?: InstalmentType[];

  form!: FormGroup
  formField: typeof LoanForm = LoanForm;

  constructor(private readonly loanTypeService: LoanTypeService,
              private readonly instalmentTypeService: InstalmentTypeService,
              private readonly loanService: LoanService,
              private readonly customerService: CustomerService,
              private readonly router: Router,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Loan Request Form')
  }

  ngOnInit(): void {
    this.getAllLoanType();
    this.getAllInstalmentType();
    this.buildForm();
  }

  buildForm(): void {
    const {loanType, instalmentType, nominal} = this.formField;
    this.form = new FormGroup({
      [loanType]: new FormControl(null, [Validators.required]),
      [instalmentType]: new FormControl(null, [Validators.required]),
      [nominal]: new FormControl(null, [Validators.required]),
    })
  }

  getAllLoanType(): void {
    this.loanTypeService.getAll().subscribe({
      next: ({data}) => this.loanTypes = data
    });
  }

  getAllInstalmentType(): void {
    this.instalmentTypeService.getAll().subscribe({
      next: ({data}) => this.instalmentTypes = data
    });
  }

  onSubmit(): void {
    const {loanType, instalmentType, nominal} = this.form.value;

    console.log(this.form.value);

    this.customerService.getCustomerFromToken().pipe(
      switchMap(({data}) => {
        const request: LoanRequest = {
          loanType: {id: loanType},
          instalmentType: {id: instalmentType},
          customer: {id: data.id},
          nominal: nominal
        };
        return this.loanService.requestLoan(request);
      })
    ).subscribe({
      next: ({data}) => {
        Swal.fire({
          title: 'Successfully create request Loan',
          icon: 'success'
        }).then(() => this.router.navigateByUrl('/loan'))
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.message
      })
    });
  }

}
