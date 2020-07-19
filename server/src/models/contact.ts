import {Schema, model, Types, Document, Model} from "mongoose";

export interface IContact extends Document{
  userId: Types.ObjectId
  email: string
  phone: string
  firstName: string
  lastName: string
  contactUserId: Types.ObjectId
}

const contactSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user'
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  contactUserId: {
    type: Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true })

export const Contact: Model<IContact> = model<IContact>('contact', contactSchema)
