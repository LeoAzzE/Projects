import { JwtPayload, verify } from "jsonwebtoken";
import { IData, IMiddleware } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";
import { env } from "../config/env";
import { IResponse } from "../interfaces/IResponse";

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: null,
      };
    }
    try {
      const [bearer, token] = authorization.split(" ");

      if (bearer !== "Bearer") {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret) as JwtPayload;

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: "Invalid Access token.",
        },
      };
    }
  }
}
