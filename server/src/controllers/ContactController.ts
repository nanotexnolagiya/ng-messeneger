import {BaseController, ICustomResponse} from "./BaseController";
import {NextFunction, Router} from "express";
import {UserRequest} from "../interfaces";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import { Contact } from "../models/contact";
import * as Joi from '@hapi/joi'
import {BadRequest} from "../http-status";
import {User} from "../models/user";

const createContact = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string()
})

export class ContactController extends BaseController {
  /**
   * @api {get} /contacts/me Get User Contacts
   * @apiName GetUserContacts
   * @apiGroup Contacts
   * @apiPermission user
   *
   *
   * @apiSuccess {Array} data Contacts list
   */
  async userContacts(req: UserRequest, res: ICustomResponse, next: NextFunction): Promise<void> {
    const contacts = await Contact.find({
      userId: req.user._id
    }).populate({
      path: 'contactUserId',
      populate: {
        path: 'profileId'
      }
    })

    res.respondOk(contacts)
  }
  /**
   * @api {post} /contacts/me Create User Contact
   * @apiName CreateUserContact
   * @apiGroup Auth
   * @apiPermission user
   *
   * @apiParam {String} email User email
   * @apiParam {String} phone User phone
   * @apiParam {String} firstName User firstName
   * @apiParam {String} lastName User lastName
   *
   * @apiSuccess {Object} data Created contact
   */
  async createUserContact(req: UserRequest, res: ICustomResponse, next: NextFunction): Promise<void> {
    const { error, value } = createContact.validate(req.body)
    if (!error) {
      const user = await User.findOne({
        email: value.email
      })
      if (!user) return next(new BadRequest('Этот пользовател не существует'))
      const contact = await Contact.create({
        userId: req.user._id,
        email: value.email,
        phone: value.phone,
        firstName: value.firstName,
        lastName: value.lastName,
        contactUserId: user._id
      })
      await contact.populate({
        path: 'contactUserId',
        populate: {
          path: 'profileId'
        }
      }).execPopulate();
      res.respondCreated(contact)
    } else {
      next(new BadRequest(error))
    }
  }
  get routes(): Router {
    this.router.get('/me', AuthMiddleware.checkToken, this.userContacts)
    this.router.post('/me', AuthMiddleware.checkToken, this.createUserContact)
    return this.router
  }
}
