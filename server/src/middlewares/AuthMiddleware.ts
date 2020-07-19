import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../models/user";
import { UserRequest } from "../interfaces";
import {Unauthorized} from "../http-status";


export const AuthMiddleware = {
  async checkToken(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorization: string = `${req.headers['Authorization'] || req.headers['authorization']}`
      const token: string = authorization.replace('Bearer', '').trim()
      const decoded: any = verify(token, config.secret)
      const user = await User.findById(decoded.user._id)
      if (!user) return next(new Unauthorized('not valid token'))
      req.user = user
      next()
    } catch (e) {
      next(new Unauthorized(e))
    }
  }
}
