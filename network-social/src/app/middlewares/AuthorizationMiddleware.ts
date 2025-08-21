import { IData, IMiddleware } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: string[]) {}
  async handle({ account }: IRequest): Promise<IResponse | IData> {
    if (!account) {
      return {
        statusCode: 403,
        body: {
          error: "Acess Denied",
        },
      };
    }

    if (!this.allowedRoles.includes(account.role)) {
      return {
        statusCode: 403,
        body: {
          error: "Acess Denied",
        },
      };
    }

    return {
      data: {},
    };
  }
}
