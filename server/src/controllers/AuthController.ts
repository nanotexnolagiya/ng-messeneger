import { NextFunction, Request, Router } from 'express';
import * as Joi from '@hapi/joi'
import { sign, verify } from 'jsonwebtoken'
import {BadRequest, InternalServerError, Unauthorized} from "../http-status";
import {User} from "../models/user";
import { createTransport } from "nodemailer";
import config from "../config";
import {Profile} from "../models/profile";
import {SmsCode} from "../models/sms-code";
import {BaseController, ICustomResponse} from "./BaseController";

const loginValidate = Joi.object({
  email: Joi.string().email().required(),
})

const checkCodeValidate = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.number().integer().required()
})

export class AuthController extends BaseController {
  /**
   * @api {post} /login Login and send code
   * @apiName Login
   * @apiGroup Auth
   * @apiPermission none
   *
   * @apiParam {String} email User email
   *
   * @apiSuccess {String} data Code sent message
   */
  public async login(req: Request, res: ICustomResponse, next: NextFunction) {
    const { error, value } = loginValidate.validate(req.body)
    if (!error) {
      const user = await User.findOne({
        email: value.email
      })

      if(!user) {
        const profile = await Profile.create({})
        await User.create({
          email: value.email,
          profileId: profile._id
        })
      }

      const code = Math.round(Math.random() * 10000000)
      const transport = createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure, // true for 465, false for other ports
        auth: {
          user: config.smtp.auth.user, // generated ethereal user
          pass: config.smtp.auth.pass, // generated ethereal password
        },
      })
      const expiredAt = new Date()
      expiredAt.setHours(expiredAt.getHours() + 1) // after 1 hours
      await SmsCode.create({
        email: value.email,
        code: code,
        expiredAt: expiredAt
      })
      await transport.sendMail({
        from: `"Chat 👻" <info@chat.com>`, // sender address
        to: value.email, // list of receivers
        subject: "SMS Verification", // Subject line
        text: `Verification code: ${code} expired after 1 hours`, // plain text body
        // html: "<b>Hello world?</b>", // html body
      })
      res.respondOk('Код отправлено проверте почту')
    } else {
      next(new BadRequest(error))
    }
  }

  /**
   * @api {post} /check-code Checking sent code and get token
   * @apiName Login
   * @apiGroup Auth
   * @apiPermission none
   *
   * @apiParam {String} email User email
   * @apiParam {String} code Sent code
   *
   * @apiSuccess {String} token token for other requests
   * @apiSuccess {String} refreshToken token for update refresh token and auth
   */
  public async checkCode(req: Request, res: ICustomResponse, next: NextFunction): Promise<ICustomResponse | void> {
    const { error, value } = checkCodeValidate.validate(req.body)
    if (!error) {
      const smsCode = await SmsCode.findOne({
        email: value.email,
        code: value.code,
        expiredAt: {
          $gt: new Date()
        },
        isChecked: false
      })

      if (!smsCode) return next(new BadRequest('not valid code'))
      const user = await User.findOne({
        email: smsCode.email
      })
      if(!user) return next(new InternalServerError('user not found'))
      const token = await sign(
        { user: user.toObject({ getters: true }) },
        config.secret,
        { expiresIn: '1d' }
      )

      const refreshToken = await sign(
        { userId: user._id },
        config.secret,
        { expiresIn: '30d' }
      )
      // smsCode.isChecked = true
      await smsCode.save()
      res.respondOk({
        token,
        refreshToken
      })
    } else {
      next(new BadRequest(error))
    }
  }
  /**
   * @api {get} /auth Checking refresh token and get token
   * @apiName GetToken
   * @apiGroup Auth
   * @apiPermission user
   *
   * @apiHeader {String} Refresh-Token User refresh token
   *
   * @apiSuccess {String} token token for other requests
   * @apiSuccess {String} newRefreshToken token for update refresh token and auth
   */
  async auth(req: Request, res: ICustomResponse, next: NextFunction): Promise<ICustomResponse | void> {
    const refreshToken: string = `${req.headers['Refresh-Token'] || req.headers['refresh-token']}`
    try {
      console.log(refreshToken, req.headers)
      const decoded: any = verify(refreshToken, config.secret)
      const user = await User.findById(decoded.userId)
      if (!user) return next(new Unauthorized('in valid token'))
      const token = await sign(
        { user: user.toObject({ getters: true }) },
        config.secret,
        { expiresIn: '1d' }
      )

      const newRefreshToken = await sign(
        { userId: user._id },
        config.secret,
        { expiresIn: '30d' }
      )
      res.respondOk({
        token,
        newRefreshToken
      })
    } catch (e) {
      next(new Unauthorized('in valid token'))
    }
  }

  get routes(): Router {
    this.router.post('/login', this.login);
    this.router.post('/check-code', this.checkCode);
    this.router.get('/auth', this.auth)
    return this.router
  }
}
