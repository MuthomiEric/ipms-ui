export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  policyHolderName: string;
  premium: number;
  startDate: Date;
  endDate?: Date;
}

export interface InsurancePolicyDto {
  id: string;
  policyHolderName: string;
  policyNumber:string;
  premium: number;
  startDate: Date;
  endDate?: Date;
}
