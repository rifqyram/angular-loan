export interface LoanType {
  id?: string;
  type: string;
  maxLoan: number
}

export enum LoanTypeForm {
  id = 'id',
  loanType = 'type',
  maxLoan = 'maxLoan'
}
