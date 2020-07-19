import {NextFunction, Request, Response, Router} from "express";

export interface IBaseController {
  routes: Router
}

export interface ICustomResponse extends Response {
  respondDeleted: (data: any) => void;
  respondUpdated: (data: any) => void;
  respondCreated: (data: any) => void;
  respondOk: (data: any) => void;
}

export abstract class BaseController{
  protected readonly router: Router = Router()

  abstract get routes(): Router
}

export class CustomResponse extends BaseController{
  respondOk(res: Response) {
    return (data: any): void => {
      res.status(200).send({
        message: 'Запрос успешно выполнень',
        status: 200,
        data
      })
    }
  }

  respondCreated(res: Response) {
    return (data: any): void => {
      res.status(201).send({
        message: 'Запрос на создание был успешно выполнен',
        status: 201,
        data
      })
    }
  }

  respondUpdated(res: Response) {
    return (data: any): void => {
      res.status(204).send({
        message: 'Запрос на обновление был успешно выполнен',
        status: 204,
        data
      })
    }
  }

  respondDeleted(res: Response) {
    return (data: any): void => {
      res.status(202).send({
        message: 'Запрос на удаление был успешно выполнен',
        status: 202,
        data
      })
    }
  }

  get routes() {
    const self = this
    this.router.use((req: Request, res: ICustomResponse, next: NextFunction) => {
      res.respondOk = self.respondOk(res)
      res.respondCreated = self.respondCreated(res)
      res.respondUpdated = self.respondUpdated(res)
      res.respondDeleted = self.respondDeleted(res)
      next()
    })
    return this.router
  }
}
