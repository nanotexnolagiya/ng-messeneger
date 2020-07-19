import { UserRequest } from "../interfaces";
import { NextFunction, Router } from "express";
import { BaseController, ICustomResponse } from "./BaseController";
import { User } from "../models/user";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";


export class UsersController extends BaseController{
  async show(req: UserRequest, res: ICustomResponse, next: NextFunction) {
    const page = req.params.page || 1
    const limits = req.params.limits || 10
    const users = await User.paginate({
      page,
      limits
    })
    res.respondOk(users)
  }

  get routes(): Router {
    this.router.get('/', AuthMiddleware.checkToken, this.show)
    return this.router
  }
}
