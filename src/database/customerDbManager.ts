import { custom } from "joi";
import prisma from "../../prisma/client";

import { CustomerFields, GetCustomerListFields, GetDetailCustomerListFields } from "../types/comesandgoes";
import { CombinedResult } from "../interface/customer";
export class CustomerDbManager {
  createCustomer = async (customerData: CustomerFields): Promise<any> => {
    console.log("burası customer backend",customerData)
    try {
      const customer = await prisma.client.create({
        data: {
          clientName: customerData.clientName,
          clientSurname: customerData.clientSurname,
          clientPhone: customerData.clientPhone,
          userId: customerData.userId
          
        },
      });
      return { success: true, message: "Müşteri Başarıyla oluşturuldu" };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to create account: ${error.message}`,
        };
      } else {
        return {
          success: false,
          message: "Failed to create customer due to an unknown error",
        };
      }
    }
  };

  getCustomerList = async(getCustomerList: GetCustomerListFields): Promise<any> => {
    console.log("burası customer backend ", getCustomerList)
    try{
      const customers = await prisma.client.findMany({
        where: {
           userId: getCustomerList.userId
        },
      });
      return customers;
    }catch(error){
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to get customers: ${error.message}`,
        };
      }
    }
  }
  cashReceivableList = async (getCustomerList: GetCustomerListFields): Promise<any> => {
    console.log("burası customer backend ", getCustomerList);
    try {
      const receivables = await prisma.cashReceivable.findMany({
        where: {
          debtorId: getCustomerList.userId,
        },
        include: {
          creditor: true, 
        },
      });
  
      return receivables.map((receivable) => ({
        customerName: receivable.creditor.clientName, // Müşterinin adı
        customerSurname: receivable.creditor.clientSurname,
        debtAmount: receivable.debtAmount, // Nakit miktarı
        debtCurrency: receivable.debtCurrency, // Para birimi
        debtIssuanceDate: receivable.debtIssuanceDate, // Borç verme tarihi
        debtRepaymentDate: receivable.debtRepaymentDate, // Geri ödeme tarihi
      }));
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to get customers: ${error.message}`,
        };
      }
    }
  };
  debCustomerList = async (getCustomerList: GetCustomerListFields): Promise<any> => {
    console.log("burası customer backend ", getCustomerList);
    try {
      const debts = await prisma.debt.findMany({
        where: {
          creditorId: getCustomerList.userId,
        },
        include: {
          debtor: true, 
        },
      });
  
      return debts.map((debt) => ({
        customerName: debt.debtor.clientName, //
        customerSurname: debt.debtor.clientSurname,
        debtAmount: debt.debtAmount, 
        debtCurrency: debt.debtCurrency, 
        debtIssuanceDate: debt.debtIssuanceDate, 
        debtRepaymentDate: debt.debtRepaymentDate, 
      }));
      
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to get customers: ${error.message}`,
        };
      }
    }
  };
  getMoneyTransfers = async (getCustomerList: GetCustomerListFields): Promise<any> => {
    try {
      const transfers = await prisma.moneyTransfer.findMany({
        where: {
          intermediaryId: getCustomerList.userId, 
        },
        include: {
          sender: true, 
          receiver: true, 
          intermediary: true, 
        },
      });
  
      return transfers.map((transfer) => ({
        senderName: transfer.sender.clientName, 
        senderSurname: transfer.sender.clientSurname, 
        receiverName: transfer.receiver.clientName, 
        receiverSurname: transfer.receiver.clientName, 
        receivedAmount: transfer.receivedAmount, 
        moneyCurrency: transfer.moneyCurrency, 
        receivedDate: transfer.receivedDate, 
        transferDate: transfer.transferDate,  
      }));
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to get money transfers: ${error.message}`,
        };
      }
    }
  }
  getCombinedCustomerData = async (getCustomerList: GetCustomerListFields): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const cashReceivables = await prisma.cashReceivable.findMany({
        where: {
          debtorId: getCustomerList.userId,
        },
        include: {
          creditor: true, // Alacaklı olan müşteri bilgilerini almak için
        },
      });
    
      const debts = await prisma.debt.findMany({
        where: {
          creditorId: getCustomerList.userId,
        },
        include: {
          debtor: true, // Borçlu olan müşteri bilgilerini almak için
        },
      });
    
      // Alacakları ve borçları tek bir dizi halinde birleştir
      const combinedResult = [
        ...cashReceivables.map((receivable) => ({
          type: 'Receivable',
          id: receivable.creditor.id,
          customerName: receivable.creditor.clientName,
          customerSurname: receivable.creditor.clientSurname,
          debtAmount: receivable.debtAmount,
          debtCurrency: receivable.debtCurrency,
          debtIssuanceDate: receivable.debtIssuanceDate,
          debtRepaymentDate: receivable.debtRepaymentDate,
        })),
        ...debts.map((debt) => ({
          type: 'Debt',
          id: debt.debtor.id,
          customerName: debt.debtor.clientName,
          customerSurname: debt.debtor.clientSurname,
          debtAmount: debt.debtAmount,
          debtCurrency: debt.debtCurrency,
          debtIssuanceDate: debt.debtIssuanceDate,
          debtRepaymentDate: debt.debtRepaymentDate,
        })),
      ];
      
    
      return {
        success: true,
        data: combinedResult,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to get customer data: ${error.message}`,
        };
      }
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  };
  getCombinedDetailCustomerData = async (getCustomerList: GetDetailCustomerListFields): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const { userId, customerId } = getCustomerList;
           console.log("burası db manager  customerıd ve userıd yazdırıldı burası manager sınıfı:", userId,customerId)
      const cashReceivables = await prisma.cashReceivable.findMany({
        where: {
          creditorId: customerId,
          debtorId: userId
        },
        include: {
          creditor: true, // Alacaklı olan müşteri bilgilerini almak için
          debtor: true,
        },
      });
    
      const debts = await prisma.debt.findMany({
        where: {
          debtorId: customerId,
          // creditorId: userId,
        },
        include: {
          debtor: true, // Borçlu olan müşteri bilgilerini almak için
          creditor:true,
        },
      });
      console.log('Cash Receivables:', cashReceivables);
      console.log('Debts:', debts);
      // Alacakları ve borçları tek bir dizi halinde birleştir
      const combinedResult = [
        ...cashReceivables.map((receivable) => ({
          type: 'Receivable',
          id: receivable.creditor.id,
          customerName: receivable.creditor.clientName,
          customerSurname: receivable.creditor.clientSurname,
          debtAmount: receivable.debtAmount,
          debtCurrency: receivable.debtCurrency,
          debtIssuanceDate: receivable.debtIssuanceDate,
          debtRepaymentDate: receivable.debtRepaymentDate,
        })),
        ...debts.map((debt) => ({
          type: 'Debt',
          id: debt.debtor.id,
          customerName: debt.debtor.clientName,
          customerSurname: debt.debtor.clientSurname,
          debtAmount: debt.debtAmount,
          debtCurrency: debt.debtCurrency,
          debtIssuanceDate: debt.debtIssuanceDate,
          debtRepaymentDate: debt.debtRepaymentDate,
        })),
      ];
      const totalReceivables = cashReceivables.reduce((acc, curr) => acc + curr.debtAmount, 0);
      const totalDebts = debts.reduce((acc, curr) => acc + curr.debtAmount, 0);
  
      // Farkı hesapla
      const difference = totalReceivables - totalDebts;
    
      return {
        success: true,
        data: {
          combinedResult,
          totalReceivables,
          totalDebts,
          difference,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to get customer data: ${error.message}`,
        };
      }
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  };
  
}



export default CustomerDbManager;
