import { Schema, model, Types } from "mongoose";

const folderSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user'
  },
  chatId: {
    type: Types.ObjectId,
    ref: 'chat'
  },
  order: {
    type: Number
  }
}, { timestamps: true })

export const Folder = model('folder', folderSchema)
