import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';

const schema = new Schema({
  _id: { type: String, default: v4() },
  value: { type: String },
});

const tokenModel = model('ExpiredToken', schema, 'expiredtokens');

export default tokenModel;
