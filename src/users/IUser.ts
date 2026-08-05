export interface IUser {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isReviewer: boolean;
  isAdmin: boolean;


  isManager?: boolean;
}
