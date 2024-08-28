import prisma from "../../prisma/client";

import { UserFields } from "../types/user";
export class RegisterDbManager {
  create = async (registerData: UserFields): Promise<any> => {
    console.log("register data ekrana yazdırıldı",registerData)
    const user = prisma.user.create({
      data: {
        name: registerData.name,
        username: registerData.username,
        surname: registerData.surname,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone,
        roleId: registerData.roleId,
    },
    });
    return user;
  };
}
