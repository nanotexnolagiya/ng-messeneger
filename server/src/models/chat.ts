import { Schema, model, Model, Document } from "mongoose";
import { Access, Status } from "./enums";

export interface IChat extends Document{
  type: string
  status: string
  deletedAt?: Date
}

const chatSchema = new Schema({
  type: Access,
  status: Status,
  deletedAt: {
    type: Date
  }
}, { timestamps: true })

export const Chat: Model<IChat> = model<IChat>('temp', chatSchema)
