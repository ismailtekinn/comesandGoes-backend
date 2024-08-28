import AccountDbManager from "../../database/acountDbManager";
import { AccountFields, ActiveUsersListFields, DebtFields, InactiveUsersListFields, TransferManyFields, UserCashFields } from "../../types/comesandgoes";

export class AccountManager<T> {
    request: T;
    accountDbManager: AccountDbManager;

    constructor(request: T) {
      this.request = request;
      this.accountDbManager = new AccountDbManager();
    }
  
    createAccount = async (accountData :AccountFields) => {
  
      const result = await this.accountDbManager.createAccount(accountData);
  
      return result;
    };

    createtransferMany = async (transfermanyData : TransferManyFields) => {
     const result = await this.accountDbManager.createtransferMany(transfermanyData);
       return result;
    };
    createDebt = async (debtData: DebtFields) => { 
      console.log("burası account manager dept methodu ",debtData)
      const result = await this.accountDbManager.createDebt(debtData);
      return result;
    };
    createcashReceivable = async (debtData: DebtFields) => { 
      console.log("burası account manager dept methodu ",debtData)
      const result = await this.accountDbManager.createcashReceivable(debtData);
      return result;
    };
    createUserCah = async(userCashData: UserCashFields) => {
      console.log("veriler manager sınıfına geldi", userCashData);
      const result = await this.accountDbManager.createUserCash(userCashData);
      return result;
    };
    getInactiveUsers = async(userId: InactiveUsersListFields) => {
      const result = await this.accountDbManager.getInactiveUsers(userId);
      return result;
    };
    activateUser = async(userId: ActiveUsersListFields) => { 
      const result = await this.accountDbManager.activateUser(userId);
       return result;
    }
    getUserCashAmount = async(userId: number) => {
      const result = await this.accountDbManager.getUserCashAmount(userId);
      return result;
    }
    getUserFinancialSummary = async(userId: number) => {
      const result = await this.accountDbManager.getUserFinancialSummary(userId);
      return result;
    }
    getUserTotalDebt = async(userId: number) => {
      const result = await this.accountDbManager.getUserTotalDebt(userId);
      return result;
    }
    // async activatedUser(userId: { id: number }): Promise<any> {
    //   const result =  await this.accountDbManager.activatedUser(userId);
    //   return result;
    // }

  }
  