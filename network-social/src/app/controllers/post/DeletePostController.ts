import { PostNotFound } from "../../errors/PostNotFound";
import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { DeletePostUseCase } from "../../useCases/posts/DeletePostUseCase";

export class DeletePostController implements IController {
  constructor(private readonly deletePostUseCase: DeletePostUseCase) {}

  async handle({ params, accountId }: IRequest): Promise<IResponse> {
    try {
      const postId = params?.postId;

      if (!postId) {
        return {
          statusCode: 400,
          body: { error: "postId are required." },
        };
      }

      await this.deletePostUseCase.execute(postId, accountId);
      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof PostNotFound) {
        return {
          statusCode: 404,
          body: {
            error: "Post not found.",
          },
        };
      }
      return {
        statusCode: 500,
        body: { error: "Internal server error." },
      };
    }
  }
}
