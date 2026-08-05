import { IProduct } from "../products/IProduct";
import { IRequest } from "../requests/IRequest";

export interface IRequestLine {
  id?: number;
  quantity: number;
  requestId: number;
  productId: number;
  product?: IProduct;
  request?: IRequest;
}