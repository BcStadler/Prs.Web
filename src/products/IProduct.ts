import { IVendor } from "../vendors/IVendor";

export interface IProduct {
  id?: number;
  partNumber: string;
  name: string;
  price: number;
  unit: string;
  photoPath?: string;
  vendorId: number;
  vendor?: IVendor;
}
