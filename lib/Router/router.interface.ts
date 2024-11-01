import { IHttpRequest, IHttpResponse, TRequestHandler } from "../types";
import { HttpMethods } from "../http";

export interface IRouter {
  use(method: HttpMethods, path: string, handler: TRequestHandler): void;
  get(path: string, handler: TRequestHandler): void;
  post(path: string, handler: TRequestHandler): void;
  put(path: string, handler: TRequestHandler): void;
  del(path: string, handler: TRequestHandler): void;
  patch(path: string, handler: TRequestHandler): void;

  resolveRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ): void;
}
