export interface HttpException {
  status: number
  error: any
}

export class BadRequest extends Error implements HttpException{
  status: number
  error: any

  constructor(error) {
    super();
    this.message = "Неправильный запрос"
    this.status = 400
    this.error = error
  }
}

export class Unauthorized extends Error implements HttpException{
  status: number
  error: any

  constructor(error) {
    super();
    this.message = "Неавторизованный запрос"
    this.status = 401
    this.error = error
  }
}

export class Forbidden extends Error implements HttpException{
  status: number
  error: any

  constructor(error) {
    super();
    this.message = "Доступ запрещен!"
    this.status = 403
    this.error = error
  }
}

export class NotFound extends Error implements HttpException{
  status: number
  error: any

  constructor(error) {
    super();
    this.message = "Ничего не найдено"
    this.status = 404
    this.error = error
  }
}

export class MethodNotAllowed extends Error implements HttpException{
  status: number
  error: any

  constructor(error) {
    super();
    this.message = "Метод не разрешен"
    this.status = 405
    this.error = error
  }
}

export class InternalServerError extends Error implements HttpException{
  status: number
  error: any

  constructor(error) {
    super();
    this.message = "Внутренняя ошибка сервера"
    this.status = 500
    this.error = error
  }
}
