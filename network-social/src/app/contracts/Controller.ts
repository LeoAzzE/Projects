// kernel/contracts/Controller.ts
import { IResponse } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";
import { getSchema } from "../kernel/decorators/Schema";
import { ZodSchema } from "zod";

export abstract class Controller {
  abstract handle(request: IRequest): Promise<IResponse>;

  async execute(request: IRequest): Promise<IResponse> {
    const schema = getSchema(this) as ZodSchema<any> | undefined;
    const body = schema ? schema.parse(request.body) : request.body;
    return this.handle({ ...request, body });
  }
}
