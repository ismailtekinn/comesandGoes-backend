import { LoginDbManager } from "../../database/loginDbManager";
import { NotFound } from "../../domain/exception";
import { generateToken } from "../../helpers/jwt";
import { UserLoginFields } from "../../types/login";
export class LoginManager {
  request: UserLoginFields;
  loginDbManager: LoginDbManager;
  constructor(request: UserLoginFields) {
    this.request = request;
    this.loginDbManager = new LoginDbManager();
  }

  findUniqueUser = async () => {
    try {
      const user = await this.loginDbManager.findUniqueUser({
        ...this.request,
      });

      // const result = await this.loginDbManager.checkUserPassword(
      //   this.request.passwordHash,
      //   user.passwordHash
      // );
      // return new InvalidParameter();
      // else if(!result) return new InvalidParameter
      if (!user) return new NotFound();
      if (!user.isActive) {
        return {
          success: false,
          message: "Hesabınız henüz aktif değil. Yönetici onayı bekleniyor.",
        };
      }
      const token = generateToken(user);
      return {
        success: true,
        token,
        user,
      };
    } catch (error) {
      console.error("findUniqueUser'da hata oluştu:", error);
      throw error;
    }
  };
}
