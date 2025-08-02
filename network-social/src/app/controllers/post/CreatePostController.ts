import z, { ZodError } from "zod";
import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { CreatePostUseCase } from "../../useCases/posts/CreatePostUseCase";
import { Schema } from "../../kernel/decorators/Schema";
import { createPostSchema } from "./schemas/createPostSchema";

@Schema(createPostSchema)
export class CreatePostController implements IController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  async handle({ body, accountId }: IRequest): Promise<IResponse> {
    try {
      const { content, imageUrl } = createPostSchema.parse(body);

      const post = await this.createPostUseCase.execute({
        content,
        imageUrl,
        authorId: accountId,
      });

      return {
        statusCode: 201,
        body: post,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (
        error instanceof Error &&
        [
          "O conteúdo do post não pode ser vazio.",
          "O conteúdo do post deve ter no máximo 1000 caracteres.",
          "Autor não encontrado.",
          "Usuário não existe.",
        ].includes(error.message)
      ) {
        return {
          statusCode: 400,
          body: { error: error.message },
        };
      }

      throw error;
    }
  }
}
