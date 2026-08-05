export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  isManager: boolean;
  isAdmin: boolean;
}
