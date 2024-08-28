import { number } from "joi";
import prisma from "../../prisma/client";

import {
  AccountFields,
  ActiveUsersListFields,
  DebtFields,
  InactiveUsersListFields,
  TransferManyFields,
  UserCashFields,
} from "../types/comesandgoes";

// Account tipini import et

export class AccountDbManager {
  createAccount = async (accountData: AccountFields): Promise<any> => {
    try {
      const account = await prisma.account.create({
        data: {
          totalAmount: accountData.totalAmount ?? 0,
          totalCurrency: accountData.totalCurrency ?? "USD",
          userId: accountData.userId,
          clientId: accountData.clientId,
        },
      });
      return { success: true, message: "Account created succesfully" };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to create account: ${error.message}`,
        };
      } else {
        return {
          success: false,
          message: "Failed to create account due to an unknown error",
        };
      }
    }
  };

  createtransferMany = async (
    transferManyData: TransferManyFields
  ): Promise<any> => {
    try {
      const transferMany = await prisma.moneyTransfer.create({
        data: {
          receivedAmount: transferManyData.receivedAmount,
          moneyCurrency: transferManyData.moneyCurrency,
          senderId: transferManyData.senderId,
          receiverId: transferManyData.receiverId,
          intermediaryId : transferManyData.intermediaryId,
          transferDate: transferManyData.transferDate,
          receivedDate: transferManyData.receivedDate
        },
      });
      return { success: true, message: "Money transfer created successfully" };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: `Failed to create money transfer: ${error.message}`,
        };
      } else {
        return {
          success: false,
          message:
            "Bilinmeyen bir hata nedeniyle para transferi oluşturulamadı",
        };
      }
    }
  };

  // createDebt = async (debtData: DebtFields): Promise<any> => {
  //   try {
  //     const newDept = await prisma.debt.create({
  //       data: {
  //         debtAmount: debtData.debtAmount,
  //         debtCurrency: debtData.debtCurrency,
  //         debtorId: debtData.debtorId,
  //         creditorId: debtData.creditorId,
  //         debtIssuanceDate: debtData.debtIssuanceDate,
  //         debtRepaymentDate: debtData.debtRepaymentDate
  //       },
  //     });
  
  //     return { success: true, message: "Debt created successfully" };
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("Error creating debt:", error.message); // Hata mesajını loglama
  //       return {
  //         success: false,
  //         message: `Failed to create debt: ${error.message}`,
  //       };
  //     } else {
  //       console.error("Unknown error creating debt:", error); // Bilinmeyen hata mesajını loglama
  //       return {
  //         success: false,
  //         message: "Bilinmeyen bir hata nedeniyle borç oluşturulamadı",
  //       };
  //     }
  //   }
  // };
// 1. deneme  createDebt = async (debtData: DebtFields): Promise<any> => {
//     try {
//       // Transaction başlat
//       const result = await prisma.$transaction(async (prisma) => { 
  
//         // Aynı kullanıcıya ait mevcut bir borç kaydı var mı kontrol et
//         const existingDebt = await prisma.debt.findFirst({
//           where: {
//             debtorId: debtData.debtorId,
//             creditorId: debtData.creditorId,
//           },
//         });
  
//         let newDebt;
//         if (existingDebt) {
//           // Mevcut borç kaydını güncelle (miktarı artır)
//           newDebt = await prisma.debt.update({
//             where: { id: existingDebt.id },
//             data: { debtAmount: { increment: debtData.debtAmount } },
//           });
//         } else {
//           // Borç kaydını oluştur
//           newDebt = await prisma.debt.create({
//             data: {
//               debtAmount: debtData.debtAmount,
//               debtCurrency: debtData.debtCurrency,
//               debtorId: debtData.debtorId,
//               creditorId: debtData.creditorId,
//               debtIssuanceDate: debtData.debtIssuanceDate,
//               debtRepaymentDate: debtData.debtRepaymentDate,
//             }, 
//           });
//         }
  
//         // Kullanıcının nakit bilgisini al
//         const userCash = await prisma.userCash.findFirst({
//           where: { userId: debtData.creditorId },
//         });
  
//         if (!userCash) {
//           throw new Error("UserCash record not found");
//         }
  
//         // Toplam nakiti güncelle (azalt)
//         const updatedUserCash = await prisma.userCash.update({
//           where: { id: userCash.id }, 
//           data: { totalCash: { decrement: debtData.debtAmount } }, 
//         }); 
  
//         return { newDebt, updatedUserCash }; 
//       }); 
  
//       return { success: true, message: "Debt created successfully", data: result };
  
//     } catch (error) { 
//       if (error instanceof Error) { 
//         console.error("Error creating debt:", error.message);
//         return {
//           success: false,
//           message: `Failed to create debt: ${error.message}`,
//         }; 
//       } else { 
//         console.error("Unknown error creating debt:", error);
//         return {
//           success: false,
//           message: "Bilinmeyen bir hata nedeniyle borç oluşturulamadı",
//         }; 
//       } 
//     } 
//   };


  createDebt = async (debtData: DebtFields): Promise<any> => {
    try {
      // Transaction başlat
      const result = await prisma.$transaction(async (prisma) => { 
        let newDebt;
        // Aynı kullanıcıya ait mevcut bir borç kaydı var mı kontrol et
        const existingDebt = await prisma.debt.findFirst({
          where: {
            debtorId: debtData.debtorId,
            creditorId: debtData.creditorId,
          },
        });
    
        if (existingDebt) {
          // Mevcut borç kaydını güncelle (miktarı artır)
          newDebt = await prisma.debt.update({
            where: { id: existingDebt.id },
            data: { debtAmount: { increment: debtData.debtAmount } },
          });
        } else {
          // Borç kaydını oluştur
          newDebt = await prisma.debt.create({
            data: {
              debtAmount: debtData.debtAmount,
              debtCurrency: debtData.debtCurrency,
              debtorId: debtData.debtorId,
              creditorId: debtData.creditorId,
              debtIssuanceDate: debtData.debtIssuanceDate,
              debtRepaymentDate: debtData.debtRepaymentDate,
            }, 
          });
        }
    
        // Kullanıcının nakit bilgisini al
        const cashReceivable = await prisma.cashReceivable.findFirst({
          where: {
            creditorId: debtData.debtorId,
          },
        });
    
        if (cashReceivable) {
          // Nakit miktarını güncelle (azalt)
          const updatedCashReceivable = await prisma.cashReceivable.update({
            where: { id: cashReceivable.id },
            data: { debtAmount: { decrement: debtData.debtAmount } },
          });
  
          console.log("Güncellenen nakit alacak: ", updatedCashReceivable);
        } else {
          throw new Error("CashReceivable record not found");
        }
    
        // Kullanıcının nakit bilgisini al
        const userCash = await prisma.userCash.findFirst({
          where: { userId: debtData.creditorId },
        });
    
        if (!userCash) {
          throw new Error("UserCash record not found");
        }
    
        // Toplam nakiti güncelle (azalt)
        const updatedUserCash = await prisma.userCash.update({
          where: { id: userCash.id }, 
          data: { totalCash: { decrement: debtData.debtAmount } }, 
        }); 
    
        return { newDebt, updatedUserCash }; 
      }); 
    
      return { success: true, message: "Debt created successfully", data: result };
    
    } catch (error) { 
      if (error instanceof Error) { 
        console.error("Error creating debt:", error.message);
        return {
          success: false,
          message: `Failed to create debt: ${error.message}`,
        }; 
      } else { 
        console.error("Unknown error creating debt:", error);
        return {
          success: false,
          message: "Bilinmeyen bir hata nedeniyle borç oluşturulamadı",
        }; 
      } 
    } 
  };
  
//  1.deneme createcashReceivable = async (debtData: DebtFields): Promise<any> => {
//     try {
//       // Transaction başlat
//       const result = await prisma.$transaction(async (prisma) => {
//         // Mevcut bir nakit alacak kaydı var mı kontrol et
//         const existingCashReceivable = await prisma.cashReceivable.findFirst({
//           where: {
//             debtorId: debtData.debtorId,
//             creditorId: debtData.creditorId,
//             debtIssuanceDate: debtData.debtIssuanceDate,
//           },
//         });
  
//         let newCashReceivable;
//         if (existingCashReceivable) {
//           // Mevcut nakit alacak kaydını güncelle (miktarı artır)
//           newCashReceivable = await prisma.cashReceivable.update({
//             where: { id: existingCashReceivable.id },
//             data: { debtAmount: { increment: debtData.debtAmount } },
//           });
//         } else {
//           // Yeni nakit alacak kaydını oluştur
//           newCashReceivable = await prisma.cashReceivable.create({
//             data: {
//               debtAmount: debtData.debtAmount,
//               debtCurrency: debtData.debtCurrency,
//               debtorId: debtData.debtorId,
//               creditorId: debtData.creditorId,
//               debtIssuanceDate: debtData.debtIssuanceDate,
//               debtRepaymentDate: debtData.debtRepaymentDate,
//             },
//           });
//         }
  
//         console.log("Nakit alacak: ", newCashReceivable);
  
//         // Kullanıcının nakit bilgisini al
//         const userCash = await prisma.userCash.findFirst({
//           where: { userId: debtData.debtorId },
//         });
  
//         if (!userCash) {
//           throw new Error("UserCash record not found");
//         }
  
//         // Toplam nakiti güncelle (artır)
//         const updatedUserCash = await prisma.userCash.update({
//           where: { id: userCash.id },
//           data: { totalCash: { increment: debtData.debtAmount } },
//         });
  
//         // Mevcut borç kaydını güncelle veya sil
//         const existingDebt = await prisma.debt.findFirst({
//           where: {
//             debtorId: debtData.debtorId,
//             creditorId: debtData.creditorId,
//           },
//         });
  
//         if (existingDebt) {
//           if (existingDebt.debtAmount <= debtData.debtAmount) {
//             // Eğer borç miktarı sıfır veya negatif oluyorsa, borcu sil
//             await prisma.debt.delete({
//               where: { id: existingDebt.id },
//             });
//             console.log("Borç kaydı silindi.");
//           } else {
//             // Borcu verilen miktar kadar güncelle (düşür)
//             const updatedDebt = await prisma.debt.update({
//               where: { id: existingDebt.id },
//               data: { debtAmount: { decrement: debtData.debtAmount } },
//             });
//             console.log("Güncellenen borç: ", updatedDebt);
//           }
//         }
  
//         return { newCashReceivable, updatedUserCash };
//       });
  
//       return { success: true, message: "Cash receivable created successfully", data: result };
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error creating cash receivable:", error.message);
//         return {
//           success: false,
//           message: `Failed to create cash receivable: ${error.message}`,
//         };
//       } else {
//         console.error("Unknown error creating cash receivable:", error);
//         return {
//           success: false,
//           message: "Bilinmeyen bir hata nedeniyle nakit alacak oluşturulamadı",
//         };
//       }
//     }
//   };
  

createcashReceivable = async (debtData: DebtFields): Promise<any> => {
  try {
    // Transaction başlat
    const result = await prisma.$transaction(async (prisma) => {
      // Mevcut bir nakit alacak kaydı var mı kontrol et
      const existingCashReceivable = await prisma.cashReceivable.findFirst({
        where: {
          debtorId: debtData.debtorId,
          creditorId: debtData.creditorId,
          debtIssuanceDate: debtData.debtIssuanceDate,
        },
      });

      let newCashReceivable;
      if (existingCashReceivable) {
        // Mevcut nakit alacak kaydını güncelle (miktarı artır)
        newCashReceivable = await prisma.cashReceivable.update({
          where: { id: existingCashReceivable.id },
          data: { debtAmount: { increment: debtData.debtAmount } },
        });
      } else {
        // Yeni nakit alacak kaydını oluştur
        newCashReceivable = await prisma.cashReceivable.create({
          data: {
            debtAmount: debtData.debtAmount,
            debtCurrency: debtData.debtCurrency,
            debtorId: debtData.debtorId,
            creditorId: debtData.creditorId,
            debtIssuanceDate: debtData.debtIssuanceDate,
            debtRepaymentDate: debtData.debtRepaymentDate,
          },
        });
      }

      console.log("Nakit alacak: ", newCashReceivable);

      // Kullanıcının nakit bilgisini al
      const userCash = await prisma.userCash.findFirst({
        where: { userId: debtData.debtorId },
      });

      if (!userCash) {
        throw new Error("UserCash record not found");
      }

      // Toplam nakiti güncelle (artır)
      const updatedUserCash = await prisma.userCash.update({
        where: { id: userCash.id },
        data: { totalCash: { increment: debtData.debtAmount } },
      });

      // Kullanıcının mevcut borç kaydını kontrol et
      const existingDebt = await prisma.debt.findFirst({
        where: {
          // debtorId: debtData.debtorId,
          debtorId: debtData.creditorId,
        },
      });

      if (existingDebt) {
        if (existingDebt.debtAmount <= debtData.debtAmount) {
          // Borç miktarı sıfır veya negatif oluyorsa, borcu sil
          await prisma.debt.delete({
            where: { id: existingDebt.id },
          });
          console.log("Borç kaydı silindi.");
        } else {
          // Borcu verilen miktar kadar güncelle (düşür)
          const updatedDebt = await prisma.debt.update({
            where: { id: existingDebt.id },
            data: { debtAmount: { decrement: debtData.debtAmount } },
          });
          console.log("Güncellenen borç: ", updatedDebt);
        }
      }

      return { newCashReceivable, updatedUserCash };
    });

    return { success: true, message: "Cash receivable created successfully", data: result };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating cash receivable:", error.message);
      return {
        success: false,
        message: `Failed to create cash receivable: ${error.message}`,
      };
    } else {
      console.error("Unknown error creating cash receivable:", error);
      return {
        success: false,
        message: "Bilinmeyen bir hata nedeniyle nakit alacak oluşturulamadı",
      };
    }
  }
};

  createUserCash = async (userCashData: UserCashFields):Promise<any> => {
    try {
      console.log("veriler dbmaanger sınıfına geldi", userCashData);
        const userCash = await prisma.userCash.create({
          data: {
              ...userCashData
          },
        });
    
        return { success: true, message: "User cash created successfully" };
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating debt:", error.message); // Hata mesajını loglama
          return {
            success: false,
            message: `Failed to create user cash: ${error.message}`,
          };
        } else {
          console.error("Unknown error creating user cash:", error); // Bilinmeyen hata mesajını loglama
          return {
            success: false,
            message: "Bilinmeyen bir hata nedeniyle user cash oluşturulamadı",
          };
        }
      }
  }
   getInactiveUsers = async (userId: InactiveUsersListFields):Promise<any> =>  {
    try {
      const inactiveUsers = await prisma.user.findMany({
        where: {
          isActive: false,
        },
      });
      return inactiveUsers;
    } catch (error) {
      console.error('Hata:', error);
      throw new Error('Kullanıcıları getirirken bir hata oluştu');
    }
  }
  getUserCashAmount = async (userId : number): Promise<any> => {
      try{
        const userCashAmount = await prisma.userCash.findMany({
          where:{
           userId : userId, 
          },
        });
        return userCashAmount;
      }catch(error){
        console.log('Hata: ', error);
        throw new Error('Kullanıcı toplam nakit miktarı getirirken bir hata oluştu');
      }
  }
  getUserTotalDebt = async(userId: number): Promise<any> =>{
    try{
      const userCashAmount = await prisma.debt.aggregate({
        _sum: {
          debtAmount: true,
        },
        where: {
          creditorId : userId,
        }
      });
      return userCashAmount;
    }catch(error){
      console.log('Hata: ', error);
      throw new Error('Kullanıcı toplam nakit miktarı getirirken bir hata oluştu');
    }
  }

  getUserFinancialSummary = async (userId: number): Promise<{ totalCash: number; totalDebt: number }> => {
    try {
      // İlk olarak, toplam nakit miktarını ve toplam borcu çekmek için iki asenkron çağrıyı paralel olarak yapıyoruz
      const [userCashData, userDebtData] = await Promise.all([
        prisma.userCash.findFirst({
          where: { userId },
          select: { totalCash: true },
        }),
        prisma.debt.aggregate({
          _sum: { debtAmount: true },
          where: { creditorId: userId },
        }),
      ]);
  
      // Nakit ve borç miktarlarını çıkartıp döndürüyoruz
      const totalCash = userCashData?.totalCash || 0;
      const totalDebt = userDebtData._sum.debtAmount || 0;
  
      return { totalCash, totalDebt };
    } catch (error) {
      console.log('Hata: ', error);
      throw new Error('Kullanıcı finansal özetini getirirken bir hata oluştu');
    }
  };
  activateUser = async (userId: ActiveUsersListFields): Promise<any> => {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId.id, 
          
        },
        data: {
          isActive: true,
        },
      });
      
      return { success: true, message: "User sisteme erişim izni verildi" };
    } catch (error) {
      console.error('Hata:', error);
      return {
        success: false,
        message: 'Kullanıcıyı güncellerken bir hata oluştu',
      };
    }
  };
}

export default AccountDbManager;
