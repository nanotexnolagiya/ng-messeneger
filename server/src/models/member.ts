import {Schema, model, Types, Model, Document} from "mongoose";

export interface IMember extends Document{
  userId: Types.ObjectId,
  chatId: Types.ObjectId
}

// this schema relation many-to-many for schemas user and chat

const memberSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user'
  },
  chatId: {
    type: Types.ObjectId,
    ref: 'chat'
  }
}, { timestamps: true })

export const Member: Model<IMember> = model<IMember>('member', memberSchema)
