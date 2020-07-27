import { Schema, model, Types, Document, Model } from "mongoose";

export interface IUser extends Document{
  username?: string
  phone?: string
  email: string
  pswdHash?: string
  profileId: Types.ObjectId
}

const userSchema = new Schema({
  username: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  pswdHash: {
    type: String
  },
  profileId: {
    type: Types.ObjectId,
    ref: 'profile'
  }
}, { timestamps: true })



export const User: Model<IUser> = model<IUser>('user', userSchema)
