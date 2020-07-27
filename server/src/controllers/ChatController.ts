import {BaseController, ICustomResponse} from "./BaseController";
import {NextFunction, Router} from "express";
import {UserRequest} from "../interfaces";
import {Member} from "../models/member";
import {Chat} from "../models/chat";
import {hasValue} from "../utils";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import * as Joi from '@hapi/joi'
import {BadRequest} from "../http-status";
import {User} from "../models/user";
import {observerInstance} from "../Application";
import {IoEvents} from "../hooks/events";

const addUsersToChatSchema = Joi.object({
  chatId: Joi.string().required(),
  users: Joi.array().items(Joi.string()).required()
})

export class ChatController extends BaseController{
  /**
   * @api {get} /users/me Get current user chats
   * @apiName GetUserChats
   * @apiGroup Chats
   * @apiPermission user
   *
   *
   * @apiSuccess {String} data Chats list
   */
  async userChats(req: UserRequest, res: ICustomResponse, next: NextFunction): Promise<void> {
    const memberChats = await Member.find({
      userId: req.user._id
    })

    if (!hasValue(memberChats)) return res.respondOk([])

    const chats = await Chat.find({
      _id: {
        $in: memberChats.map(member => member.chatId)
      }
    })

    return res.respondOk(chats)
  }

  /**
   * @api {post} /users/me Create current user chat
   * @apiName CreateUserChat
   * @apiGroup Chats
   * @apiPermission user
   *
   * @apiSuccess {String} data Created chat
   */
  async createUserChat(req: UserRequest, res: ICustomResponse, next: NextFunction): Promise<void> {
    const chat = await Chat.create({
      status: 'active',
      type: 'public'
    })

    const member = await Member.create({
      userId: req.user._id,
      chatId: chat._id
    })

    return res.respondCreated(chat)
  }

  /**
   * @api {post} /users/me/add-users Add users to current user chat
   * @apiName AddUsersToCurrentUserChat
   * @apiGroup Chats
   * @apiPermission user
   *
   * @apiParam {String} chatId Added chat id
   * @apiParam {Array} users Added users ids list
   *
   * @apiSuccess {String} data Added users list
   */
  async addingUsersToChat(req: UserRequest, res: ICustomResponse, next: NextFunction): Promise<void> {
    const { error, value } = addUsersToChatSchema.validate(req.body)
    if (!error) {
      const authorChat = await Member.findOne({
        userId: req.user._id,
        chatId: value.chatId
      })

      if (!authorChat) return next(new BadRequest('У пользователя нет такого чата'))
      const users = await User.find({
        _id: {
          $in: value.users
        }
      })
      const membersList = users.map((user) => ({
        userId: user._id,
        chatId: authorChat.chatId
      }))

      const members = await Member.create(membersList)
      observerInstance.emit(IoEvents.ADD_MEMBERS_TO_CHAT, members)
      res.respondCreated(members)
    } else {
      next(new BadRequest(error))
    }
  }

  get routes(): Router {
    this.router.get('/me', AuthMiddleware.checkToken, this.userChats)
    this.router.post('/me', AuthMiddleware.checkToken, this.createUserChat)
    this.router.post('/me/add-users', AuthMiddleware.checkToken, this.addingUsersToChat)
    return this.router
  }
}
