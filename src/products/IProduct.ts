import { IVendor } from "../vendors/IVendor";

export interface IProduct {
  id: number | undefined;
  name: string;
  price: number | undefined;
  vendorId: number | undefined;
  vendor: IVendor | undefined;
}
