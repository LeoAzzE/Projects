import { compare } from "bcryptjs";
import { InvalidCredentials } from "../../errors/InvalidCredentials";
import { sign } from "jsonwebtoken";
import { env } from "../../config/env";
import { UserRepository } from "../../repositories/postgres/UserRepository";

interface IInput {
  email: string;
  password: string;
}
interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await this.userRepository.findByEmail(email);

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }
    const accessToken = sign({ sub: account.id }, env.jwtSecret, {
      expiresIn: "1d",
    });

    return {
      accessToken,
    };
  }
}
