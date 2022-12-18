import { Request } from 'express';

export interface SRequest extends Request {
  isAdmin: boolean;
  userId: string;
}
