import { Schema, model, Types } from "mongoose";

const userSettingSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user'
  },
  settingId: {
    type: Types.ObjectId,
    ref: 'setting'
  },
  value: {
    type: String
  }
}, { timestamps: true })

export const UserSetting = model('user_setting', userSettingSchema)
