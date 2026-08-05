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
}