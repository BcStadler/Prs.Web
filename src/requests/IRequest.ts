import { IUser } from "../users/IUser";
import { IRequestLine } from "../requestLines/IRequestLine";

export interface IRequests {
  id?: number;
  tableNumber?: number;
  notes?: string;
  status: string;
  total: number;
  requestedAt?: string;
  orderedAt?: string;
  userId?: number;
  UserId?: number;
  user?: IUser;
  User?: IUser;
  staff?: IUser;
  staffName?: string;
  userName?: string;
  cancellationReason?: string;
  RejectionReason?: string;
  requestLine?: IRequestLine[];
  requestLines?: IRequestLine[];
  requestlines?: IRequestLine[];
  requestItems?: IRequestLine[];
}

export interface IRequest extends IRequests {}
