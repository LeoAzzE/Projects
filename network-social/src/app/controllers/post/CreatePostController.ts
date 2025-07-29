import z, { ZodError } from "zod";
import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { CreatePostUseCase } from "../../useCases/posts/CreatePostUseCase";

const schema = z.object({
  content: z.string().min(1).max(1000),
  imageUrl: z.string().optional(),
  authorId: z.number().int().positive(),
});

export class CreatePostController implements IController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { content, imageUrl, authorId } = schema.parse(body);

      const post = await this.createPostUseCase.execute({
        content,
        imageUrl,
        authorId,
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
