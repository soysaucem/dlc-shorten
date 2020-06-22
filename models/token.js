import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: { type: String },
  value: { type: String },
});

const tokenModel = model('ExpiredToken', schema, 'expiredtokens');

export default tokenModel;
