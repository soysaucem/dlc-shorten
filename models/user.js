import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  shortenUrls: { type: [String], default: [] },
  createdAt: { type: Date },
});

const userModel = model('User', schema, 'users');

export default userModel;
