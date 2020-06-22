import { Schema, model } from 'mongoose';
import shortId from 'shortid';

const schema = new Schema({
  _id: { type: String, default: shortId.generate },
  url: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const itemModel = model('Item', schema, 'items');

export default itemModel;
