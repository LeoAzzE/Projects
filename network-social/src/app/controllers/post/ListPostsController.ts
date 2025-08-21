import { IRequest } from "../../interfaces/IRequest";
import { Controller } from "../../contracts/Controller";
import { ListPostsUseCase } from "../../useCases/posts/ListPostsUseCase";
import { IResponse } from "../../interfaces/IResponse";
import { ZodError } from "zod";

export class ListPostsController extends Controller {
  constructor(private readonly listPostsUseCase: ListPostsUseCase) {
    super();
  }

  protected async handle(_: IRequest): Promise<IResponse> {
    try {
      const posts = await this.listPostsUseCase.execute();
      return {
        statusCode: 200,
        body: posts,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return { statusCode: 400, body: error.issues };
      }
      throw error;
    }
  }
}
