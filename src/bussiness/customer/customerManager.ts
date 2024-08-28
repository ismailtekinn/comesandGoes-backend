import CustomerDbManager from "../../database/customerDbManager";
import { CustomerFields, GetCustomerListFields, GetDetailCustomerListFields } from "../../types/comesandgoes";

export class CustomerManager<T> {
    request: T;
    customerDbManager: CustomerDbManager;

    constructor(request: T) {
      this.request = request;
      this.customerDbManager = new CustomerDbManager();
    }
  
    createCustomer = async (customerData: CustomerFields) => {
     const result = await this.customerDbManager.createCustomer(customerData)
      return result;
    };
    getCustomerList = async(getCustomerList: GetCustomerListFields) => {
      const resullt = await this.customerDbManager.getCustomerList(getCustomerList)
      return resullt;
    }
    cashReceivableList = async(getCustomerList: GetCustomerListFields) => {
      const resullt = await this.customerDbManager.cashReceivableList(getCustomerList)
      return resullt;
    }
    debCustomerList = async(getCustomerList: GetCustomerListFields) => {
      const resullt = await this.customerDbManager.debCustomerList(getCustomerList)
      return resullt;
    }
    getMoneyTransfers = async(getCustomerList: GetCustomerListFields) => {
      const resullt = await this.customerDbManager.getMoneyTransfers(getCustomerList)
      return resullt;
    }
    getCombinedCustomerData = async(getCustomerList: GetCustomerListFields) => {
      const resullt = await this.customerDbManager.getCombinedCustomerData(getCustomerList)
      return resullt;
 
    }
    getCombinedDetailCustomerData = async(getCustomerList: GetDetailCustomerListFields) => {
      const resullt = await this.customerDbManager.getCombinedDetailCustomerData(getCustomerList)
      return resullt;
 
    }
  }
  