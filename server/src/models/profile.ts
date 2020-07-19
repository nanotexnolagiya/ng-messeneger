import { Schema, model, Types } from "mongoose";

const profileSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  avatar: {
    type: Types.ObjectId,
    ref: 'file'
  }
}, { timestamps: true })

export const Profile = model('profile', profileSchema)
