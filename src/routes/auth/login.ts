import express, { Request, Response } from "express";
import { loginSchema } from "../../validations/auth/loginValidator";
import { requestValidator } from "../../middleware/requestValidator";
import { LoginManager } from "../../bussiness/auth/loginManager";
import { UserLoginFields } from "../../types/login";
import { TokenExpiredError } from "jsonwebtoken";
import { NotFound } from "../../domain/exception";

const router: express.Router = express.Router();

router.post(
  "/",
  // requestValidator(loginSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as UserLoginFields;
    console.log("request ekrana yazdırıldı",request);
    // const user = await new LoginManager(request).findUniqueUser();
    const loginManager = new LoginManager(request);
    // const token  = await loginManager.findUniqueUser();
    // console.log("api tarafında user ekrana yazdırıldı",token);
    // res.send({token},);

    // result.success kontrolü yaparak başarısız durumlarda uygun yanıt döndürebilirsiniz
    const result = await loginManager.findUniqueUser();

    console.log("API tarafında user ekrana yazdırıldı", result);

    // NotFound ya da diğer hatalı durumları ele almak
    if (result instanceof NotFound) {
       res.status(404).send({ message: "Kullanıcı bulunamadı." });
       return;
    }

    if (!result.success) {
       res.status(400).send({ message: result.message });
       return;
    }

    // Başarılı yanıtı token ve user ile döndürüyoruz
    res.send({
      token: result.token,
      user: result.user,
    });
  } 
);

export default router;
