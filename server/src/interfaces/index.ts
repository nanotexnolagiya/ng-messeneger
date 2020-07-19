import { Request } from 'express'
import { IUser } from "../models/user";

export interface UserRequest extends Request{
  user: IUser
}
