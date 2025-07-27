import { prismaClient } from "../lib/prismaClient";
import { ISignUpPayload } from "../../types/SignUpPayload";

export class UserRepository {
  async findByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  async create({ name, email, password }: ISignUpPayload) {
    return prismaClient.user.create({ data: { name, email, password } });
  }
}
