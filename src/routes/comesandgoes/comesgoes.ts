import express, { Request, Response } from "express";
import { requestValidator } from "../../middleware/requestValidator";
import {
  accountSchema,
  cashReceivableSchema,
  customerSchema,
  debtSchema,
  transferManySchema,
  userCashSema,
} from "../../validations/comesandgoes/accountValidator";
import { AccountManager } from "../../bussiness/account/accountManager";
import {
  AccountFields,
  ActiveUsersListFields,
  CustomerFields,
  DebtFields,
  GetCustomerListFields,
  InactiveUsersListFields,
  TransferManyFields,
  UserCashFields,
} from "../../types/comesandgoes";
import { CustomerManager } from "../../bussiness/customer/customerManager";

const router: express.Router = express.Router();
// const accountManager = new AccountManager();

router.post(
  "/addAccount",
  requestValidator(accountSchema),
  async (req: Request, res: Response): Promise<void> => {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body as AccountFields;
    const account = await new AccountManager(request).createAccount(request);
    res.send(account);
  }
);

router.post(
  "/addTransferMany",
  requestValidator(transferManySchema),
  async (req: Request, res: Response): Promise<void> => {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body as TransferManyFields;
    const transferMany = await new AccountManager(request).createtransferMany(
      request
    );
    res.send(transferMany);
  }
);

router.post(
  "/addDebt",
  requestValidator(debtSchema),
  async (req: Request, res: Response): Promise<void> => {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body as DebtFields;
    const debt = await new AccountManager(request).createDebt(request);
    res.send(debt);
  }
);
router.get(
  "/getUserFinancialSummary",
  // requestValidator(userCashSema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("body ekrana yazdırıldı ", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const userCashAmount = await new AccountManager( request).getUserFinancialSummary(request.userId);
      res.send(userCashAmount);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "Hata müşteri total nakit miktarı getirilemedi",
        });
    }
  }
);

router.post(
  "/addCashReceivable",
  requestValidator(cashReceivableSchema),
  async (req: Request, res: Response): Promise<void> => {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body as DebtFields;
    const debt = await new AccountManager(request).createcashReceivable(
      request
    );
    res.send(debt);
  }
);
router.post(
  "/addUserCash",
  requestValidator(userCashSema),
  async (req: Request, res: Response): Promise<void> => {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body as UserCashFields;
    const debt = await new AccountManager(request).createUserCah(request);
    res.send(debt);
  }
);
router.get(
  "/getUserCashAmount",
  // requestValidator(userCashSema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("body ekrana yazdırıldı ", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const userCashAmount = await new AccountManager( request).getUserCashAmount(request.userId);
      res.send(userCashAmount);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "Hata müşteri total nakit miktarı getirilemedi",
        });
    }
  }
);

router.post(
  "/addCustomer",
  requestValidator(customerSchema),
  async (req: Request, res: Response): Promise<void> => {
    console.log("body ekrana yazdırıldı ", req.body);
    const request = req.body as CustomerFields;
    const debt = await new CustomerManager(request).createCustomer(request);
    res.send(debt);
  }
);

router.get(
  "/getCustomerList",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("userId ekrana yazdırıldı", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const getCustomerList = await new CustomerManager(
        request
      ).getCustomerList(request);
      res.send(getCustomerList);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "An error occurred while fetching customer list",
        });
    }
  }
);
router.get(
  "/cashReceivableList",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("userId ekrana yazdırıldı", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const getCustomerList = await new CustomerManager(
        request
      ).cashReceivableList(request);
      res.send(getCustomerList);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "An error occurred while fetching customer list",
        });
    }
  }
);
router.get(
  "/debCustomerList",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("userId ekrana yazdırıldı", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const getCustomerList = await new CustomerManager(
        request
      ).debCustomerList(request);
      res.send(getCustomerList);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "An error occurred while fetching customer list",
        });
    }
  }
);
router.get(
  "/getMoneyTransfers",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("userId ekrana yazdırıldı", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const getCustomerList = await new CustomerManager(
        request
      ).getMoneyTransfers(request);
      res.send(getCustomerList);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "An error occurred while fetching customer list",
        });
    }
  }
);
router.get(
  "/getCombinedCustomerData",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("userId ekrana yazdırıldı", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const getCustomerList = await new CustomerManager(
        request
      ).getCombinedCustomerData(request);
      res.send(getCustomerList);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "An error occurred while fetching customer list",
        });
    }
  }
);
router.post(
  "/getCombinedDetailCustomerData",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, customerId } = req.body;
      console.log(req.body);
      console.log(
        "Burası routesuserId ve customerId ekrana yazdırıldı",
        userId,
        customerId
      );

      if (!userId && !customerId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = {
        userId: parseInt(userId as string, 10),
        customerId: parseInt(customerId as string, 10),
      };
      console.log("istek console yazdırıldı ", request);
      const getCustomerList = await new CustomerManager(
        request
      ).getCombinedDetailCustomerData(request);
      res.send(getCustomerList);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "An error occurred while fetching customer list",
        });
    }
  }
);
router.get(
  "/getInactiveUsers",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId;
      console.log("userId ekrana yazdırıldı", userId);
      if (!userId) {
        res.status(400).send({ success: false, message: "userId is required" });
        return;
      }
      const request = { userId: parseInt(userId as string, 10) };
      const getCustomerList = await new AccountManager(
        request
      ).getInactiveUsers(request);
      res.send(getCustomerList);
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "An error occurred while fetching customer list",
        });
    }
  }
);

router.post(
  "/activatedUser",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const request = req.body as { id: number };

      if (typeof request.id !== "number") {
        res
          .status(400)
          .send({ success: false, message: "Geçersiz kullanıcı ID" });
        return;
      }

      const activateUserResult = await new AccountManager(request).activateUser(
        request
      );
      console.log("kullanıcı ekrana yazdırıldı", activateUserResult);
      res.send(activateUserResult);
    } catch (error) {
      console.error("Hata:", error);
      res
        .status(500)
        .send({
          success: false,
          message: "Kullanıcıyı güncellerken bir hata oluştu",
        });
    }
  }
);

export default router;
