import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { UserRepository } from "../../repositories/postgres/UserRepository";

export class MeController implements IController {
  constructor(private userRepository: UserRepository) {}

  async handle({ accountId }: IRequest): Promise<IResponse> {
    if (!accountId) {
      return { statusCode: 401, body: { error: "Unauthorized" } };
    }

    const user = await this.userRepository.findById(accountId);
    if (!user) {
      return { statusCode: 404, body: { error: "User not found" } };
    }

    return {
      statusCode: 200,
      body: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
