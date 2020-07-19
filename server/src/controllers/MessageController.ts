import {BaseController, ICustomResponse} from "./BaseController";
import {NextFunction, Router} from "express";
import {UserRequest} from "../interfaces";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import * as Joi from '@hapi/joi'
import {BadRequest} from "../http-status";
import {Message} from "../models/message";
import {observerInstance} from "../Application";
import {IoEvents} from "../hooks/events";
import {multerStorage} from "../utils";
import {File} from "../models/file";

const fileUpload = multerStorage.single('file')

const getChatMessagesSchema = Joi.object({
  chatId: Joi.string().required()
})

const createChatMessagesSchema = Joi.object({
  chatId: Joi.string().required(),
  message: Joi.string().required()
})

export class MessageController extends BaseController {
  async getChatMessages(req: UserRequest, res: ICustomResponse, next: NextFunction): Promise<void> {
    const { error, value } = getChatMessagesSchema.validate(req.params)
    if(!error) {
      const messages = await Message.find({
        chatId: value.chatId,
        userId: req.user._id
      })
      res.respondOk(messages)
    } else {
      next(new BadRequest(error))
    }
  }
  async createChatMessages(req: UserRequest, res: ICustomResponse, next: NextFunction): Promise<void> {
    const { error, value } = createChatMessagesSchema.validate(req.body)
    if(!error) {
      const message = new Message({
        chatId: value.chatId,
        userId: req.user._id,
        message: value.message
      })
      if (req.file) {
        const file = await File.create({
          title: req.file.filename,
          path: req.file.path.replace('public', ''),
          ext: req.file.mimetype
        })
        message.fileId = file._id
      }
      await message.save()
      observerInstance.emit(IoEvents.CREATE_MESSAGE, message)
      res.respondCreated(message)
    } else {
      next(new BadRequest(error))
    }
  }
  get routes(): Router {
    this.router.get('/me/chat/:chatId', AuthMiddleware.checkToken, this.getChatMessages)
    this.router.post('/me/chat', AuthMiddleware.checkToken, fileUpload, this.createChatMessages)
    return this.router
  }
}
