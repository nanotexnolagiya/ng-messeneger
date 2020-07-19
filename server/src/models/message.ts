import {Schema, model, Types, Model, Document} from "mongoose";
import {Status} from "./enums";

export interface IMessage extends Document{
  userId: string
  chatId: string
  message: string
  fileId: string
  replayMessageId: string
  status: string
  sendingOn: Date
  deletedAt: Date
}

const messageSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user'
  },
  chatId: {
    type: Types.ObjectId,
    ref: 'chat'
  },
  message: {
    type: String
  },
  fileId: {
    type: Types.ObjectId,
    ref: 'file'
  },
  replayMessageId: {
    type: Types.ObjectId,
    ref: 'message'
  },
  status: Status,
  sendingOn: {
    type: Date
  },
  deletedAt: {
    type: Date
  }
}, { timestamps: true })

export const Message: Model<IMessage> = model<IMessage>('message', messageSchema)
