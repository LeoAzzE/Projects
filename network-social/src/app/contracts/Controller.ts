import "reflect-metadata";
import { getSchema } from "../kernel/decorators/Schema";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";

export abstract class Controller {
  protected abstract handle(request: IRequest): Promise<IResponse>;

  public execute(request: IRequest): Promise<IResponse> {
    const body = this.validateBody(request.body);

    return this.handle({
      ...request,
      body,
    });
  }

  private validateBody(body: IRequest["body"]): Record<string, any> {
    const schema = getSchema(this);

    if (!schema) {
      return body;
    }

    return schema.parse(body) as Record<string, any>;
  }
}
