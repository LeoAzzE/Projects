import { IRequest } from "../../interfaces/IRequest";
import { CreatePostUseCase } from "../../useCases/posts/CreatePostUseCase";
import { Schema } from "../../kernel/decorators/Schema";
import { Controller } from "../../contracts/Controller";
import { createPostSchema } from "./schemas/createPostSchema";
import { IResponse } from "../../interfaces/IResponse";
import { ZodError } from "zod";

@Schema(createPostSchema)
export class CreatePostController extends Controller {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {
    super();
  }

  protected async handle({ body, account }: IRequest): Promise<IResponse> {
    try {
      const { content, imageUrl } = body;

      const post = await this.createPostUseCase.execute({
        content,
        imageUrl,
        authorId: account?.id,
      });

      return {
        statusCode: 201,
        body: post,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return { statusCode: 400, body: error.issues };
      }
      throw error;
    }
  }
}
