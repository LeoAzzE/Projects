import { IResponse } from "../../interfaces/IMiddleware";
import { IRequest } from "../../interfaces/IRequest";
import { Controller } from "../../contracts/Controller";
import { ListPostsUseCase } from "../../useCases/posts/ListPostsUseCase";

export class ListPostsController extends Controller {
  constructor(private readonly listPostsUseCase: ListPostsUseCase) {
    super();
  }

  protected async handle(_: IRequest): Promise<IResponse> {
    const posts = await this.listPostsUseCase.execute();
    return {
      statusCode: 200,
      body: posts,
    };
  }
}
