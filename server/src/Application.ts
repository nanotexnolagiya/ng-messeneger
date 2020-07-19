import * as cors from 'cors';
import * as compress from 'compression';
import * as helmet from 'helmet';
import * as express from 'express';
import { urlencoded, json } from "body-parser";
import { authorize } from 'socketio-jwt';
import { EventEmitter } from 'events'
import {IoEvents} from "./hooks/events";
import {logger} from "./logger";
import {AuthController} from "./controllers/AuthController";
import {HttpException, NotFound} from "./http-status";
import config from "./config";
import {ChatController} from "./controllers/ChatController";
import {CustomResponse} from "./controllers/BaseController";
import {ContactController} from "./controllers/ContactController";
import {MessageController} from "./controllers/MessageController";

class MyObserver extends EventEmitter{

}

export const observerInstance = new MyObserver()

class Application {
  private readonly app: express.Application;

  constructor () {
    this.app = express();
    this.config();
    this.routes();
  }

  public config (): void {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(helmet());
    this.app.use(compress());
    this.app.use(cors());
  }

  public routes (): void {
    const v = config.apiVersion
    this.app.use(new CustomResponse().routes)
    this.app.use(`/api/${v}/`, new AuthController().routes)
    this.app.use(`/api/${v}/chats`, new ChatController().routes)
    this.app.use(`/api/${v}/contacts`, new ContactController().routes)
    this.app.use(`/api/${v}/messages`, new MessageController().routes)
    this.app.use((req: express.Request, res:express.Response, next: express.NextFunction) => {
      return next(new NotFound('Не существуеший роут'))
    })
    this.app.use((err: HttpException, req: express.Request, res:express.Response, next: express.NextFunction) => {
      res.status(err.status).send(err);
    });
  }

  get instance() {
    return this.app
  }
}

export class Socket {
  private readonly io
  constructor(io) {
    this.io = io
    this.connect()
  }

  public connect() {
    this.io.use(IoEvents.AUTHORIZATION, authorize({
      secret: config.secret,
      handshake: true,
      auth_header_required: true,
      decodedPropertyName: 'user'
    }))

    this.io.on(IoEvents.CONNECTION, (socket: any) => {
      logger.info('User connected', socket.user.email)

      socket.join(`user_${socket.user._id}`)

      observerInstance.on(IoEvents.CREATE_MESSAGE, this.createMessage(this.io, socket))
      observerInstance.on(IoEvents.ADD_MEMBERS_TO_CHAT, this.createChat(this.io, socket))
    })

    this.io.on(IoEvents.CONNECT_TO_CHAT, (socket: any) => {
      socket.join(`chat_${socket.user._id}`)
    })
  }

  createMessage(io, socket) {
    return (message) => {
      io.to(`chat_${message.chatId}`).emit(IoEvents.CREATE_MESSAGE, message)
    }
  }

  createChat(io, socket) {
    return (members) => {
      io.to(`user_${socket.user._id}`).emit(IoEvents.ADD_MEMBERS_TO_CHAT, members)
    }
  }
}

export const App = new Application().instance



