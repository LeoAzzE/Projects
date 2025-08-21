import { IRequest } from "../../interfaces/IRequest";
import { Controller } from "../../contracts/Controller";
import { UpdatePostUseCase } from "../../useCases/posts/UpdatePostUseCase";
import { Schema } from "../../kernel/decorators/Schema";
import { updatePostSchema } from "./schemas/updatePostSchema";
import { IAccount } from "../../../types/Role";
import { PostNotFound } from "../../errors/PostNotFound";
import { IResponse } from "../../interfaces/IResponse";

@Schema(updatePostSchema)
export class UpdatePostController extends Controller {
  constructor(private readonly updatePostUseCase: UpdatePostUseCase) {
    super();
  }

  protected async handle({
    params,
    body,
    account,
  }: IRequest): Promise<IResponse> {
    try {
      const { postId } = params as { postId?: string };
      if (!postId) {
        return { statusCode: 400, body: { error: "postId are required." } };
      }

      const updated = await this.updatePostUseCase.execute(
        {
          postId: Number(postId),
          content: body.content,
          imageUrl: body.imageUrl,
        },
        account as IAccount
      );

      return { statusCode: 200, body: updated };
    } catch (error) {
      if (error instanceof PostNotFound) {
        return { statusCode: 404, body: { error: "Post not found." } };
      }

      throw error;
    }
  }
}
