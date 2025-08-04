import { PostNotFound } from "../../errors/PostNotFound";
import { IController, IResponse } from "../../interfaces/IController";
import { DeletePostUseCase } from "../../useCases/posts/DeletePostUseCase";
import { IRequest } from "../../interfaces/IRequest";
import { IAccount } from "../../../types/Role";

export class DeletePostController implements IController {
  constructor(private readonly deletePostUseCase: DeletePostUseCase) {}

  async handle({ params, account }: IRequest): Promise<IResponse> {
    try {
      const postId = params?.postId;

      if (!postId) {
        return {
          statusCode: 400,
          body: { error: "postId are required." },
        };
      }

      await this.deletePostUseCase.execute(postId, account as IAccount);
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
