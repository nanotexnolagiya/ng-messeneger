import { Schema, model, Model, Document } from "mongoose";

export interface IFile extends Document{
  title: string
  path: string
  ext: string
}

const fileSchema = new Schema({
  title: {
    type: String,
  },
  path: {
    type: String,
  },
  ext: {
    type: String,
  },
}, { timestamps: true })

export const File: Model<IFile> = model<IFile>('file', fileSchema)
