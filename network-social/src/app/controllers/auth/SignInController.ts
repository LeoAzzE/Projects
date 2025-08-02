import { ZodError } from "zod";
import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { InvalidCredentials } from "../../errors/InvalidCredentials";
import { SignInUseCase } from "../../useCases/auth/SignInUseCase";
import { Schema } from "../../kernel/decorators/Schema";
import { signInSchema } from "./schemas/signInSchema";

@Schema(signInSchema)
export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = signInSchema.parse(body);

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });

      return {
        statusCode: 200,
        body: { accessToken },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }
      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: "Invalid Credentials",
          },
        };
      }
      throw error;
    }
  }
}
