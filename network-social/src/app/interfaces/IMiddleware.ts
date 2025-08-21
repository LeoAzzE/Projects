import { IRequest } from "./IRequest";
import { IResponse } from "./IResponse";

export interface IData {
  data: Record<string, any>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}
