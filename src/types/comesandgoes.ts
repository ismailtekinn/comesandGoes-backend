export type CustomerFields = {
  id: number;
  clientName: string;
  clientSurname: string;
  clientPhone : string;
  userId: number;
  accounts: AccountFields[];
};
export type GetCustomerListFields = {
  userId: number;
}
export type GetDetailCustomerListFields = {
  userId: number;
  customerId: number;
}
export type InactiveUsersListFields = {
  userId: number;
}
export type ActiveUsersListFields = {
  id: number;
}

export type AccountFields = {
    // acountId: number;
    totalAmount: number;
    totalCurrency: string;
    clientId: number;
    userId: number;
  };

  export type TransferManyFields = {
    id :number;
    receivedAmount: number;
    moneyCurrency: string;
    senderId: number;
    receiverId: number;
    intermediaryId: number;
    transferDate: Date;
    receivedDate: Date;
  };
  export type DebtFields = {
    id : number;
    debtAmount: number;
    debtCurrency: string;
    debtorId: number;
    creditorId: number;
    debtIssuanceDate: Date;
    debtRepaymentDate: Date;
  };
  export type UserCashFields = {
    // id : number;
    totalCash: number;
    cashCurrency: string;
    userId: number;
  };
  
  
