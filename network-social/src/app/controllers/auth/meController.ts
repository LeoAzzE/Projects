import { Controller } from "../../contracts/Controller";
import { IResponse } from "../../interfaces/IMiddleware";
import { IRequest } from "../../interfaces/IRequest";

import { UserRepository } from "../../repositories/postgres/UserRepository";

export class MeController extends Controller {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async handle({ account }: IRequest): Promise<IResponse> {
    if (!account?.id) {
      return { statusCode: 401, body: { error: "Unauthorized" } };
    }

    const user = await this.userRepository.findById(account.id);
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
