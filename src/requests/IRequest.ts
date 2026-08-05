import { IUser } from "../users/IUser";
import { IRequestLine } from "../requestLines/IRequestLine";

export interface IRequest {
  id?: number;
  tableNumber?: number;
  notes?: string;
  status: string;
  total: number;
  orderedAt: string;
  UserId?: number;
  User?: IUser;
  userName?: string;
  cancellationReason?: string;
  requestLine?: IRequestLine[];
}
