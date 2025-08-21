import z, { ZodError } from "zod";
import { SignUpUseCase } from "../../useCases/auth/SignUpUseCase";
import { AccountAlreadyExists } from "../../errors/AccountAlreadyExists";
import { IRequest } from "../../interfaces/IRequest";
import { Schema } from "../../kernel/decorators/Schema";
import { signUpSchema } from "./schemas/signUpSchema";
import { Controller } from "../../contracts/Controller";
import { IResponse } from "../../interfaces/IResponse";

@Schema(signUpSchema)
export class SignUpController extends Controller {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = signUpSchema.parse(body);

      await this.signUpUseCase.execute({
        email,
        name,
        password,
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: { error: "this email already in use." },
        };
      }
      throw error;
    }
  }
}
