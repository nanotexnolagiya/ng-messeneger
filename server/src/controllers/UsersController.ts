import { UserRequest } from "../interfaces";
import { NextFunction, Router } from "express";
import { BaseController, ICustomResponse } from "./BaseController";
import { User } from "../models/user";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";


export class UsersController extends BaseController{
  async show(req: UserRequest, res: ICustomResponse, next: NextFunction) {
    const page = req.params.limits ? Math.max(0, Number(req.params.page)) : 0
    const limits = req.params.limits ? Number(req.params.limits) : 20
    const users = await User.find({
      offset: limits * page,
      limits
    })
    res.respondOk(users)
  }

  get routes(): Router {
    this.router.get('/', AuthMiddleware.checkToken, this.show)
    return this.router
  }
}
