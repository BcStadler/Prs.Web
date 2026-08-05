import { IVendor } from "../vendors/IVendor";

export interface IProduct {
  id: number | undefined;
  name: string;
  price: number | undefined;
  categoryId: number | undefined;
  category: IVendor | undefined;
}
