import { Schema, model, Types } from "mongoose";
import {Access} from "./enums";

const groupSchema = new Schema({
  chatId: {
    type: Types.ObjectId,
    ref: 'chat'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  type: Access,
  deletedAt: {
    type: Date
  }
}, { timestamps: true })

export const Group = model('group', groupSchema)
