'use strict';

import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';

const schema = new Schema({
  _id: { type: String, default: v4 },
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const userModel = model('User', schema, 'users');

export default userModel;
