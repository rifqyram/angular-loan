import {LoanType} from "../../../admin-pages/loan-type/model/LoanType";
import {InstalmentType} from "../../../admin-pages/instalment-type/model/InstalmentType";
import {Customer, CustomerResponse} from "../../profile-setting/model/Customer";

export interface LoanRequest {
  loanType: Pick<LoanType, "id">;
  instalmentType: Pick<InstalmentType, "id">;
  customer: Pick<Customer, "id">;
  nominal: number;
}

export interface TransactionResponse {
  id: string;
  loanType: LoanType;
  instalmentType: InstalmentType;
  customer: CustomerResponse,
  nominal: number;
  approvedAt: number;
  approvedBy: string;
  approvalStatus: string;
  rejectedBy: string;
  rejectedAt: number;
  createdAt: number;
  updatedAt: number;
  transactionDetailResponses: TransactionDetailResponse[];
}

export interface TransactionDetailResponse {
  id: string;
  transactionDate: number;
  nominal: number;
  guaranteePicture: any;
  loanStatus: string;
  createdAt: number;
  updatedAt: number;
}

export enum LoanForm {
  loanType='loanType',
  instalmentType='instalmentType',
  nominal='nominal'
}
