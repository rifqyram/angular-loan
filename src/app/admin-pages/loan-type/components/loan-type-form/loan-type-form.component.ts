import {Component, OnInit} from '@angular/core';
import {LoanType, LoanTypeForm} from "../../model/LoanType";
import {EMPTY, switchMap} from "rxjs";
import {LoanTypeService} from "../../service/loan-type.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-loan-type-form',
  templateUrl: './loan-type-form.component.html',
  styleUrls: ['./loan-type-form.component.scss']
})
export class LoanTypeFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof LoanTypeForm = LoanTypeForm;
  buttonTitle: string = 'Add';

  constructor(private readonly service: LoanTypeService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Loan Type Form')
  }

  ngOnInit(): void {
    this.buildForm()
    this.getById();
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.id]: new FormControl(null),
      [this.formField.loanType]: new FormControl(null, [Validators.required]),
      [this.formField.maxLoan]: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('\\d+')]),
    })
  }

  getById(): void {
    this.route.params.pipe(
      switchMap((params) => {
          if (Object.keys(params).length !== 0) {
            this.buttonTitle = 'Update';
            console.log(params)
            return this.service.getById(params['id']);
          }

          return EMPTY;
        }
      )).subscribe({
      next: (data) => {
        this.form.setValue(data.data);
      },
      error: console.error
    });
  }

  onSubmit(): void {
    const data: LoanType = {
      id: this.form.get([this.formField.id])?.value,
      type: this.form.get([this.formField.loanType])?.value,
      maxLoan: Number(this.form.get([this.formField.maxLoan])?.value),
    }

    this.route.params.pipe(
      switchMap((params) => {
          if (params && params['id']) {
            data.id = params['id'];
            this.router.navigateByUrl('/loan-type').then();
            return this.service.update(data);
          }

          this.router.navigateByUrl('/loan-type').then();
          return this.service.create(data);
        }
      )).subscribe({
      next: () => {
        this.form.reset();
        Swal.fire({
          icon: 'success',
          title: 'Successfully save Loan Type'
        })
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.message
      })
    });

  }

  clearForm(): void {
    this.form.reset();
  }
}
