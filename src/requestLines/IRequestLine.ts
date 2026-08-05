import { IProduct } from "../products/IProduct";
import { IRequest } from "../requests/IRequest";

export interface IRequestLine {
  id: number | undefined;
  quantity: number;
  notes: string | undefined;
  requestId: number | undefined;
  productId: number | undefined;
  product: IProduct | undefined;
  order: IRequest | undefined;
}
