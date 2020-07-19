import { Schema, model, Types } from "mongoose";

const settingSchema = new Schema({
  title: {
    type: String
  },
  alias: {
    type: String
  },
  defaultValue: {
    type: String
  }
}, { timestamps: true })

export const Setting = model('setting', settingSchema)
