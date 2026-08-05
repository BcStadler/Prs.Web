export interface IVendor {
  id?: number;
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  email?: string;


  sortOrder?: number;
}
