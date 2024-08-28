import prisma from "../../prisma/client";
import { generateToken } from "../helpers/jwt";
import { UserLoginFields } from "../types/login";
import * as bcrypt from "bcrypt";
export class LoginDbManager {
  findUniqueUser = async (loginData: UserLoginFields): Promise<any> => {
    let user;
    if (loginData.phone) {
      user = await prisma.user.findUnique({
        where: { phone: loginData.phone },
      });
    } else if (loginData.password) {
      user = await prisma.user.findUnique({
        where: {
          password: loginData.password,
        },
      });
    } 
    console.log("user ekrana yazdırıldı;");
    return user;
  };

  checkUserPassword = async (
    password: string,
    hashPassword: string
  ): Promise<any> => {
    return await bcrypt.compare(password, hashPassword);
  };
}
