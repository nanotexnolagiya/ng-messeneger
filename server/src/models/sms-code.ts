import { Schema, model, Types, Document } from "mongoose";

export interface ISmsCode extends Document{
  email: string
  code: number
  expiredAt: Date
  isChecked?: boolean
}

const smsCodeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export const SmsCode = model<ISmsCode>('sms_code', smsCodeSchema)
