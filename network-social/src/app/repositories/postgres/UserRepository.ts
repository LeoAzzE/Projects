import { prismaClient } from "../../lib/prismaClient";
import { ISignUpPayload } from "../../../types/SignUpPayload";

export class UserRepository {
  async findByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  async create({ name, email, password, role }: ISignUpPayload) {
    console.log(name, email, password, role);
    return prismaClient.user.create({
      data: { name, email, password, role: role },
    });
  }

  async findById(id: number) {
    return await prismaClient.user.findUnique({ where: { id } });
  }
}
