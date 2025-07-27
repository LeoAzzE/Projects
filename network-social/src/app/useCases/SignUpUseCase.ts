import { ISignUpPayload } from "../../types/SignUpPayload";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ email, name, password }: ISignUpPayload): Promise<IOutput> {
    const accountAlreadyExists = await this.userRepository.findByEmail(email);

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });
  }
}
