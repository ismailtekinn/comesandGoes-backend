export interface GetCustomerListFields {
    userId: number;
  }
  
  export interface CustomerDebt {
    customerName: string;
    customerSurname: string;
    debtAmount: number;
    debtCurrency: string;
    debtIssuanceDate: Date;
    debtRepaymentDate: Date;
  }
  
  export interface CombinedResult {
    cashReceivables: CustomerDebt[];
    debts: CustomerDebt[];
  }