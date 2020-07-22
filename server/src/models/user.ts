import { Schema, model, Types, Document, PaginateModel } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

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

userSchema.plugin(mongoosePaginate)

interface UserModel<T extends Document> extends PaginateModel<T> {}

// @ts-ignore
export const User: UserModel<IUser> = model<IUser>('user', userSchema)
