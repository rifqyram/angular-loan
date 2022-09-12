import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LoanType, LoanTypeForm} from "../../model/LoanType";
import {finalize} from "rxjs";
import {LoanTypeService} from "../../service/loan-type.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-loan-type-form',
  templateUrl: './loan-type-form.component.html',
  styleUrls: ['./loan-type-form.component.scss']
})
export class LoanTypeFormComponent implements OnInit, OnChanges {
  form!: FormGroup;
  formField: typeof LoanTypeForm = LoanTypeForm;
  loading: boolean = false;

  @Input() loanType?: LoanType;
  @Output() loanTypeChange = new EventEmitter<LoanType>();

  constructor(private readonly service: LoanTypeService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loanType) {
      this.form.setValue(this.loanType);
    }
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.id]: new FormControl(null),
      [this.formField.loanType]: new FormControl(null, [Validators.required]),
      [this.formField.maxLoan]: new FormControl(null, [Validators.required, Validators.min(1)]),
    })
  }

  onSubmit(): void {
    const data: LoanType = {
      id: this.form.get([this.formField.id])?.value,
      type: this.form.get([this.formField.loanType])?.value,
      maxLoan: Number(this.form.get([this.formField.maxLoan])?.value),
    }

    this.loading = true;

    if (!data.id) {
      this.service.create(data).pipe(finalize(() => this.loading = false)).subscribe({
        next: (val) => {
          this.loanTypeChange.emit(data);
          this.clearForm();
        },
        error: (err) => console.log(err)
      })
      return;
    }

    this.onUpdate(data);
  }

  clearForm(): void {
    this.form.reset();
  }

  private onUpdate(data: LoanType) {
    this.loading = true;
    this.service.update(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.loanTypeChange.emit(data);
          this.clearForm();
        }
      })
  }
}
