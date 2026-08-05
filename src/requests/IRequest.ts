import { IUser } from "../users/IUser";
import { IRequestLine } from "../requestLines/IRequestLine";

export interface IRequest {
  id?: number;
  description: string;
  justification: string;
  rejectionReason?: string;
  deliveryMode: string;
  status: string;
  total: number;
  userId?: number;
  user?: IUser;
  requestLines?: IRequestLine[];

  tableNumber?: number;
  notes?: string;
  orderedAt?: string;
  requestedAt?: string;
  userName?: string;
  staff?: IUser;
  staffName?: string;
  orderItems?: IRequestLine[];
  requestItems?: IRequestLine[];
  requestlines?: IRequestLine[];
  RejectionReason?: string;
}
