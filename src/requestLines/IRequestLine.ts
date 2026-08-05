import { IProduct } from "../products/IProduct";
import { IRequests } from "../requests/IRequest";

export interface IRequestLine {
  id: number | undefined;
  quantity: number;
  notes: string | undefined;
  requestId?: number | undefined;
  RequestId?: number | undefined;
  productId: number | undefined;
  product: IProduct | undefined;
  request?: IRequests | undefined;
}
