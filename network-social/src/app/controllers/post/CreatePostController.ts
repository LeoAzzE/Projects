import { IResponse } from "../../interfaces/IMiddleware";
import { IRequest } from "../../interfaces/IRequest";
import { CreatePostUseCase } from "../../useCases/posts/CreatePostUseCase";
import { Schema } from "../../kernel/decorators/Schema";
import { Controller } from "../../contracts/Controller";
import { createPostSchema } from "./schemas/createPostSchema";

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
