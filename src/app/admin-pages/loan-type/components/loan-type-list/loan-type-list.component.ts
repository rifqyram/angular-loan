import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LoanType, LoanTypeForm} from "../../model/LoanType";
import {LoanTypeService} from "../../service/loan-type.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize, switchMap} from "rxjs";

@Component({
  selector: 'app-loan-type-list',
  templateUrl: './loan-type-list.component.html',
  styleUrls: ['./loan-type-list.component.scss']
})
export class LoanTypeListComponent implements OnInit, OnChanges {
  loanTypes: LoanType[] = [];
  loading: boolean = false;

  @Input() loanType?: LoanType;
  @Output() loanTypeChange = new EventEmitter<LoanType>();

  constructor(private readonly service: LoanTypeService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateValuesLoanType();
  }

  getAll(): void {
    this.loading = true;
    this.service.getAll().pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (val) => this.loanTypes = val.data,
        error: (err) => console.log(err)
      })
  }

  onDelete(id: string): void {
    if (confirm('Are u sure?')) {
      this.service.delete(id).pipe(switchMap(() => this.service.getAll())).subscribe({
        next: () => {
          const loanType = this.loanTypes.find(value => value.id === id);
          this.loanTypes = this.loanTypes.filter(val => val.id !== loanType?.id)
        },
        error: (err) => console.log(err)
      });
    }
  }

  onSelectLoanType(id?: string): void {
    if (!id) return;

    this.service.getById(id).subscribe((val) => {
      this.loanTypeChange.emit(val.data);
    })
  }

  updateValuesLoanType() {
    if (!this.loanType?.id) {
      this.loanTypes.push(this.loanType!);
      return;
    } else {
      this.loanTypes = this.loanTypes.map(val => {
        if (val.id === this.loanType?.id) {
          val = this.loanType!;
        }
        return {...val};
      })
    }
  }

}
